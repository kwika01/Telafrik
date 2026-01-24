import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AskRequest {
  question: string;
  scope: "startups" | "investors" | "founders" | "funding";
  session_id?: string;
}

interface EntityResult {
  entity_type: string;
  id: string;
  name: string;
  headline: string;
  country: string;
  sector: string;
  stage: string;
  logo_url?: string;
  score: number;
}

interface StructuredResponse {
  answer_summary: string;
  filters_applied: Record<string, string | string[]>;
  results: EntityResult[];
  confidence: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authorization required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { question, scope, session_id }: AskRequest = await req.json();

    if (!question || !scope) {
      return new Response(JSON.stringify({ error: "Question and scope are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch relevant data from database based on scope
    let dbResults: any[] = [];
    let dbContext = "";

    if (scope === "startups") {
      const { data: companies } = await supabase
        .from("companies")
        .select(`
          id, name, slug, tagline, description, logo_url, year_founded,
          total_funding_usd, is_verified, trending_score,
          sectors:sector_id(name),
          countries:hq_country_id(name, code, region)
        `)
        .limit(100);
      
      dbResults = companies || [];
      dbContext = JSON.stringify(dbResults.map(c => ({
        id: c.id,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        sector: c.sectors?.name,
        country: c.countries?.name,
        region: c.countries?.region,
        funding: c.total_funding_usd,
        year_founded: c.year_founded,
        is_verified: c.is_verified
      })));
    } else if (scope === "investors") {
      const { data: investors } = await supabase
        .from("investors")
        .select(`
          id, name, slug, type, description, logo_url, 
          total_investments, portfolio_count,
          countries:hq_country_id(name, code, region)
        `)
        .limit(100);
      
      dbResults = investors || [];
      dbContext = JSON.stringify(dbResults.map(i => ({
        id: i.id,
        name: i.name,
        type: i.type,
        description: i.description,
        country: i.countries?.name,
        region: i.countries?.region,
        investments: i.total_investments,
        portfolio: i.portfolio_count
      })));
    } else if (scope === "founders") {
      const { data: founders } = await supabase
        .from("founders")
        .select(`
          id, name, slug, title, bio, avatar_url,
          company_founders(
            companies:company_id(name, slug, sector_id(name), hq_country_id(name))
          )
        `)
        .limit(100);
      
      dbResults = founders || [];
      dbContext = JSON.stringify(dbResults.map(f => ({
        id: f.id,
        name: f.name,
        title: f.title,
        bio: f.bio,
        companies: f.company_founders?.map((cf: any) => cf.companies?.name)
      })));
    } else if (scope === "funding") {
      const { data: rounds } = await supabase
        .from("funding_rounds")
        .select(`
          id, stage, amount_usd, date, valuation_usd,
          companies:company_id(name, slug, sector_id(name), hq_country_id(name, region))
        `)
        .order("date", { ascending: false })
        .limit(100);
      
      dbResults = rounds || [];
      dbContext = JSON.stringify(dbResults.map(r => ({
        id: r.id,
        stage: r.stage,
        amount: r.amount_usd,
        date: r.date,
        valuation: r.valuation_usd,
        company: r.companies?.name,
        sector: r.companies?.sector_id?.name,
        country: r.companies?.hq_country_id?.name,
        region: r.companies?.hq_country_id?.region
      })));
    }

    // Call Lovable AI to analyze the question and filter results
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are TelAfrik's AI assistant, specialized in the African startup ecosystem. 
You have access to TelAfrik's database of ${scope}. Your job is to analyze user questions and return relevant results.

CRITICAL RULES:
1. ONLY return entities that exist in the provided database context
2. If no matching entities found, return empty results with a helpful message
3. Never make up or hallucinate entities
4. Always be specific about what filters you applied
5. Score results 0-100 based on relevance to the query

DATABASE CONTEXT (${scope}):
${dbContext}

You must respond with ONLY valid JSON in this exact format:
{
  "answer_summary": "Brief summary of findings (2-3 sentences)",
  "filters_applied": {
    "sector": "...",
    "country": "...",
    "stage": "...",
    "region": "..."
  },
  "results": [
    {
      "entity_type": "${scope === 'startups' ? 'startup' : scope === 'investors' ? 'investor' : scope === 'founders' ? 'founder' : 'funding'}",
      "id": "uuid from database",
      "name": "entity name",
      "headline": "brief description",
      "country": "country name",
      "sector": "sector name",
      "stage": "funding stage if applicable",
      "score": 85
    }
  ],
  "confidence": 75
}

If no results match, return:
{
  "answer_summary": "No matching ${scope} found in TelAfrik. Try broadening your search criteria.",
  "filters_applied": {},
  "results": [],
  "confidence": 100
}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let structuredResponse: StructuredResponse;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
      }
      if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
      }
      structuredResponse = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      structuredResponse = {
        answer_summary: "I found some results but had trouble formatting them. Please try rephrasing your question.",
        filters_applied: {},
        results: [],
        confidence: 50,
      };
    }

    // Enrich results with additional data from original query
    if (structuredResponse.results && structuredResponse.results.length > 0) {
      structuredResponse.results = structuredResponse.results.map(result => {
        const originalEntity = dbResults.find(e => e.id === result.id);
        if (originalEntity) {
          return {
            ...result,
            logo_url: originalEntity.logo_url || originalEntity.avatar_url,
          };
        }
        return result;
      });
    }

    // Save to chat session if session_id provided
    if (session_id) {
      await supabase.from("ai_chat_messages").insert([
        { session_id, role: "user", content: question },
        { session_id, role: "assistant", content: structuredResponse.answer_summary, structured_response: structuredResponse },
      ]);

      // Update session title if it's still "New Chat"
      const { data: session } = await supabase
        .from("ai_chat_sessions")
        .select("title")
        .eq("id", session_id)
        .single();
      
      if (session?.title === "New Chat") {
        const shortTitle = question.length > 40 ? question.substring(0, 40) + "..." : question;
        await supabase
          .from("ai_chat_sessions")
          .update({ title: shortTitle })
          .eq("id", session_id);
      }
    }

    return new Response(JSON.stringify(structuredResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ask-telafrik error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
