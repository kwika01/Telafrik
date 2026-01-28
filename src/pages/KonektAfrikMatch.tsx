import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { useKonektMatch, MatchProfileInput } from '@/hooks/useKonektMatch';
import { toast } from '@/lib/toast';

const RAISE_STAGES = [
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'series-c', label: 'Series C+' },
  { value: 'growth', label: 'Growth/PE' },
];

const REGIONS = [
  'West Africa',
  'East Africa',
  'North Africa',
  'Southern Africa',
  'Central Africa',
  'Pan-African',
  'Global',
];

interface UserStartup {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  sector: { name: string } | null;
}

const KonektAfrikMatch = () => {
  const navigate = useNavigate();
  const { generateMatches, isLoading } = useKonektMatch();
  
  const [step, setStep] = useState(1);
  const [userStartups, setUserStartups] = useState<UserStartup[]>([]);
  const [loadingStartups, setLoadingStartups] = useState(true);
  const [sectors, setSectors] = useState<{ id: string; name: string; slug: string }[]>([]);
  
  const [formData, setFormData] = useState<MatchProfileInput>({
    startup_id: '',
    raise_stage: '',
    raise_amount_min: null,
    raise_amount_max: null,
    target_geos: [],
    sector: '',
    sub_sector: '',
    traction_notes: '',
    investor_preferences: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Authentication Required', {
          description: 'Please sign in to use KonektAfrik AI matching.',
        });
        navigate('/auth');
        return;
      }

      // Fetch user's startups (companies they've claimed or created)
      const { data: claims } = await supabase
        .from('claims')
        .select('company_id')
        .eq('user_id', user.id)
        .eq('status', 'approved');

      const companyIds = claims?.map(c => c.company_id) || [];
      
      if (companyIds.length > 0) {
        const { data: companies } = await supabase
          .from('companies')
          .select('id, name, slug, logo_url, sector:sectors(name)')
          .in('id', companyIds);
        
        setUserStartups((companies as UserStartup[]) || []);
      }

      // Fetch sectors
      const { data: sectorsData } = await supabase
        .from('sectors')
        .select('id, name, slug')
        .order('name');
      
      setSectors(sectorsData || []);
      setLoadingStartups(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleStartupSelect = (startupId: string) => {
    const startup = userStartups.find(s => s.id === startupId);
    setFormData(prev => ({
      ...prev,
      startup_id: startupId,
      sector: startup?.sector?.name || prev.sector,
    }));
    setStep(2);
  };

  const toggleGeo = (geo: string) => {
    setFormData(prev => ({
      ...prev,
      target_geos: prev.target_geos.includes(geo)
        ? prev.target_geos.filter(g => g !== geo)
        : [...prev.target_geos, geo],
    }));
  };

  const handleGenerateMatches = async () => {
    if (!formData.startup_id || !formData.raise_stage || !formData.sector) {
      toast.error('Missing Information', {
        description: 'Please fill in all required fields.',
      });
      return;
    }

    const result = await generateMatches(formData);
    if (result) {
      navigate(`/konekt/results?profile=${result.match_profile_id}`);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            KonektAfrik AI Matching
          </div>
          <h1 className="text-3xl font-bold mb-2">Find Your Ideal Investors</h1>
          <p className="text-muted-foreground">
            Complete your match profile and let our AI find the best-fit investors for your startup.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              1
            </div>
            <span className="font-medium">Select Startup</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </div>
            <span className="font-medium">Match Profile</span>
          </div>
        </div>

        {/* Step 1: Select Startup */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Startup</CardTitle>
              <CardDescription>
                Choose the startup you want to find investors for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStartups ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : userStartups.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Startups Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You need to claim or create a startup profile first.
                  </p>
                  <Button asChild>
                    <a href="/directory">Browse & Claim a Startup</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userStartups.map(startup => (
                    <button
                      key={startup.id}
                      onClick={() => handleStartupSelect(startup.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        {startup.logo_url ? (
                          <img src={startup.logo_url} alt={startup.name} className="h-full w-full object-cover" />
                        ) : (
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{startup.name}</h3>
                        {startup.sector && (
                          <p className="text-sm text-muted-foreground">{startup.sector.name}</p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Match Profile Form */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Match Profile</CardTitle>
              <CardDescription>
                Tell us about your fundraising goals and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Raise Stage *</Label>
                  <Select
                    value={formData.raise_stage}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, raise_stage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {RAISE_STAGES.map(stage => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sector *</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector.id} value={sector.name}>
                          {sector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Raise Amount Min ($)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 500000"
                    value={formData.raise_amount_min || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      raise_amount_min: e.target.value ? parseInt(e.target.value) : null 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Raise Amount Max ($)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 2000000"
                    value={formData.raise_amount_max || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      raise_amount_max: e.target.value ? parseInt(e.target.value) : null 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sub-sector (Optional)</Label>
                <Input
                  placeholder="e.g., B2B SaaS, AgriTech, Digital Payments"
                  value={formData.sub_sector || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, sub_sector: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Geographies</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Select regions where you're looking for investors
                </p>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map(geo => (
                    <Badge
                      key={geo}
                      variant={formData.target_geos.includes(geo) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleGeo(geo)}
                    >
                      {geo}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Traction Notes</Label>
                <Textarea
                  placeholder="Briefly describe your traction: revenue, users, key metrics, notable customers..."
                  value={formData.traction_notes || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, traction_notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Investor Preferences (Optional)</Label>
                <Textarea
                  placeholder="Any specific investor characteristics you're looking for? e.g., 'Prefer investors with operational experience' or 'Looking for lead investors only'"
                  value={formData.investor_preferences || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, investor_preferences: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleGenerateMatches} disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Matches...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Matches
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default KonektAfrikMatch;
