import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Star, BookmarkPlus, Mail, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/components/layout/AppLayout';
import { useKonektMatch, MatchResult } from '@/hooks/useKonektMatch';
import { useShortlist } from '@/hooks/useShortlist';
import RequestIntroModal from '@/components/konekt/RequestIntroModal';

const KonektAfrikResults = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get('profile');
  const { matchResults, loadExistingResults } = useKonektMatch();
  const { shortlists, addToShortlist, getOrCreateDefaultShortlist } = useShortlist();
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<MatchResult | null>(null);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [startupId, setStartupId] = useState<string | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      if (profileId) {
        const data = await loadExistingResults(profileId);
        setResults(data);
        
        // Get startup ID from match profile for intro requests
        // This would need to be fetched from the match_profiles table
      } else if (matchResults.length > 0) {
        setResults(matchResults);
      }
      setLoading(false);
    };
    loadResults();
  }, [profileId, matchResults, loadExistingResults]);

  const handleSaveToShortlist = async (investorId: string) => {
    let shortlist = shortlists[0];
    if (!shortlist) {
      shortlist = await getOrCreateDefaultShortlist();
    }
    if (shortlist) {
      await addToShortlist(shortlist.id, investorId);
    }
  };

  const handleRequestIntro = (result: MatchResult) => {
    setSelectedInvestor(result);
    setIntroModalOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Moderate Match';
    return 'Low Match';
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/konekt/match">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Match Profile
            </Link>
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Match Results
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Investor Matches</h1>
          <p className="text-muted-foreground">
            {results.length} investors ranked by fit score. Scores are based on sector, stage, geography, and investment history.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : results.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Matches Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find investors matching your criteria. Try broadening your preferences.
              </p>
              <Button asChild>
                <Link to="/konekt/match">Update Match Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card key={result.investor_id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Rank & Score */}
                    <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-2 p-6 bg-muted/30 lg:w-32">
                      <div className="text-3xl font-bold text-muted-foreground">#{index + 1}</div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(result.fit_score)}`}>
                          {result.fit_score}
                        </div>
                        <div className="text-xs text-muted-foreground">Fit Score</div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                        {/* Logo & Name */}
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                            {result.investor.logo_url ? (
                              <img 
                                src={result.investor.logo_url} 
                                alt={result.investor.name} 
                                className="h-full w-full object-cover" 
                              />
                            ) : (
                              <span className="text-xl font-bold text-muted-foreground">
                                {result.investor.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{result.investor.name}</h3>
                            <p className="text-sm text-muted-foreground">{result.investor.type}</p>
                          </div>
                        </div>

                        {/* Score Progress */}
                        <div className="sm:ml-auto flex items-center gap-3">
                          <Progress value={result.fit_score} className="w-32" />
                          <span className={`text-sm font-medium ${getScoreColor(result.fit_score)}`}>
                            {getScoreLabel(result.fit_score)}
                          </span>
                        </div>
                      </div>

                      {/* Fit Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.fit_tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Why Bullets */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Why this match:</h4>
                        <ul className="space-y-1">
                          {result.why_bullets.slice(0, 4).map((bullet, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button size="sm" onClick={() => handleRequestIntro(result)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Request Intro
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSaveToShortlist(result.investor_id)}
                        >
                          <BookmarkPlus className="mr-2 h-4 w-4" />
                          Save to Shortlist
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/investor/${result.investor.slug}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Request Intro Modal */}
        <RequestIntroModal
          open={introModalOpen}
          onOpenChange={setIntroModalOpen}
          investor={selectedInvestor?.investor}
          startupId={startupId}
        />
      </div>
    </AppLayout>
  );
};

export default KonektAfrikResults;
