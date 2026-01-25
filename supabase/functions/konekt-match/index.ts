import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MatchProfile {
  id: string;
  raise_stage: string;
  raise_amount_min: number | null;
  raise_amount_max: number | null;
  target_geos: string[];
  sector: string | null;
  sub_sector: string | null;
  traction_notes: string | null;
  investor_preferences: string | null;
  startup: {
    name: string;
    sector_id: string | null;
  };
}

interface Investor {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  total_investments: number | null;
  portfolio_count: number | null;
  hq_country: { name: string; code: string } | null;
  sectors: { sector: { name: string; slug: string } }[];
  regions: { region: string }[];
}

interface MatchResult {
  investor_id: string;
  investor: Investor;
  fit_score: number;
  fit_tags: string[];
  why_bullets: string[];
}

// Deterministic scoring function
function calculateFitScore(profile: MatchProfile, investor: Investor): { score: number; tags: string[]; reasons: string[] } {
  let score = 0;
  const tags: string[] = [];
  const reasons: string[] = [];

  // Sector fit (max 30 points)
  const investorSectors = investor.sectors?.map(s => s.sector?.slug?.toLowerCase()) || [];
  const profileSector = profile.sector?.toLowerCase();
  if (profileSector && investorSectors.some(s => s?.includes(profileSector) || profileSector.includes(s || ''))) {
    score += 30;
    tags.push('Sector fit');
    reasons.push(`Invests in ${profile.sector} sector which matches your startup`);
  } else if (investorSectors.length === 0) {
    score += 15; // Generalist investor
    reasons.push('Generalist investor open to various sectors');
  }

  // Stage fit (max 25 points)
  const stageMap: Record<string, string[]> = {
    'pre-seed': ['angel', 'accelerator', 'vc'],
    'seed': ['angel', 'accelerator', 'vc'],
    'series-a': ['vc', 'pe'],
    'series-b': ['vc', 'pe'],
    'series-c': ['vc', 'pe', 'corporate'],
    'growth': ['pe', 'corporate', 'family office'],
  };
  const investorType = investor.type?.toLowerCase() || '';
  const targetStages = stageMap[profile.raise_stage?.toLowerCase()] || [];
  if (targetStages.some(t => investorType.includes(t))) {
    score += 25;
    tags.push('Stage fit');
    reasons.push(`${investor.type} typically invests at ${profile.raise_stage} stage`);
  }

  // Geographic fit (max 25 points)
  const investorRegions = investor.regions?.map(r => r.region?.toLowerCase()) || [];
  const targetGeos = profile.target_geos?.map(g => g.toLowerCase()) || [];
  const hasGeoOverlap = targetGeos.some(geo => 
    investorRegions.some(r => r?.includes(geo) || geo.includes(r || ''))
  );
  if (hasGeoOverlap || investorRegions.length === 0) {
    score += 25;
    tags.push('Geo fit');
    if (hasGeoOverlap) {
      reasons.push(`Active in your target regions: ${profile.target_geos?.join(', ')}`);
    } else {
      reasons.push('Pan-African or global investor with broad geographic coverage');
    }
  }

  // Portfolio activity (max 10 points)
  if ((investor.portfolio_count || 0) > 5) {
    score += 10;
    tags.push('Active portfolio');
    reasons.push(`Active investor with ${investor.portfolio_count} portfolio companies`);
  } else if ((investor.portfolio_count || 0) > 0) {
    score += 5;
  }

  // Investment track record (max 10 points)
  if ((investor.total_investments || 0) > 10) {
    score += 10;
    reasons.push(`Strong track record with ${investor.total_investments} investments in Africa`);
  } else if ((investor.total_investments || 0) > 0) {
    score += 5;
  }

  return { score: Math.min(score, 100), tags, reasons };
}

// Generate personalized why bullets using LLM
async function generateWhyBullets(
  profile: MatchProfile,
  investor: Investor,
  baseReasons: string[],
  apiKey: string
): Promise<string[]> {
  try {
    const prompt = `You are an investor matching expert. Given the following startup profile and investor, generate 3-5 concise bullet points explaining why this investor is a good match. Keep each bullet under 100 characters.

Startup seeking funding:
- Stage: ${profile.raise_stage}
- Sector: ${profile.sector || 'Not specified'}
- Target regions: ${profile.target_geos?.join(', ') || 'Not specified'}
- Traction: ${profile.traction_notes || 'Not provided'}

Investor:
- Name: ${investor.name}
- Type: ${investor.type}
- Focus sectors: ${investor.sectors?.map(s => s.sector?.name).join(', ') || 'Generalist'}
- Focus regions: ${investor.regions?.map(r => r.region).join(', ') || 'Pan-African'}
- Portfolio size: ${investor.portfolio_count || 0} companies

Base reasons we've identified:
${baseReasons.map(r => `- ${r}`).join('\n')}

Return only the bullet points, one per line, without numbers or dashes. Be specific and actionable.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: 'You are an expert at matching startups with investors. Be concise and specific.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      console.error('LLM error:', await response.text());
      return baseReasons.slice(0, 5);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const bullets = content.split('\n').filter((line: string) => line.trim().length > 0).slice(0, 5);
    
    return bullets.length > 0 ? bullets : baseReasons.slice(0, 5);
  } catch (error) {
    console.error('Error generating why bullets:', error);
    return baseReasons.slice(0, 5);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { match_profile_id } = await req.json();

    if (!match_profile_id) {
      return new Response(JSON.stringify({ error: 'match_profile_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch match profile with startup details
    const { data: profile, error: profileError } = await supabase
      .from('match_profiles')
      .select(`
        *,
        startup:companies(name, sector_id)
      `)
      .eq('id', match_profile_id)
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Match profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch all investors with their sectors and regions
    const { data: investors, error: investorsError } = await supabase
      .from('investors')
      .select(`
        *,
        hq_country:countries(name, code),
        sectors:investor_sectors(sector:sectors(name, slug)),
        regions:investor_regions(region)
      `)
      .limit(100);

    if (investorsError) {
      throw investorsError;
    }

    // Score each investor deterministically
    const scoredInvestors: MatchResult[] = [];
    
    for (const investor of investors || []) {
      const { score, tags, reasons } = calculateFitScore(profile, investor);
      
      if (score >= 20) { // Only include investors with reasonable fit
        // Generate personalized why bullets using LLM
        const whyBullets = await generateWhyBullets(profile, investor, reasons, lovableApiKey);
        
        scoredInvestors.push({
          investor_id: investor.id,
          investor,
          fit_score: score,
          fit_tags: tags,
          why_bullets: whyBullets,
        });
      }
    }

    // Sort by fit score descending
    scoredInvestors.sort((a, b) => b.fit_score - a.fit_score);

    // Take top 20 matches
    const topMatches = scoredInvestors.slice(0, 20);

    // Store results in database
    const matchResultsToInsert = topMatches.map(match => ({
      match_profile_id,
      investor_id: match.investor_id,
      fit_score: match.fit_score,
      fit_tags: match.fit_tags,
      why_bullets: match.why_bullets,
    }));

    // Delete old results for this profile
    await supabase
      .from('match_results')
      .delete()
      .eq('match_profile_id', match_profile_id);

    // Insert new results
    const { error: insertError } = await supabase
      .from('match_results')
      .insert(matchResultsToInsert);

    if (insertError) {
      console.error('Error saving match results:', insertError);
    }

    return new Response(JSON.stringify({
      success: true,
      match_profile_id,
      total_investors_scored: investors?.length || 0,
      matches: topMatches,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Matching error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Matching failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
