import { useParams, Link } from 'react-router-dom';
import {
  Globe,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Linkedin,
  Twitter,
  Building2,
  TrendingUp,
  AlertTriangle,
  FileText,
  Loader2,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ConfidenceIndicator from '@/components/startups/ConfidenceIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClaimCompanyModal from '@/components/claims/ClaimCompanyModal';
import CorrectionRequestModal from '@/components/claims/CorrectionRequestModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCompanyDetails, useSimilarCompanies } from '@/api/queries/useCompanies';
import { formatCurrency } from '@/types/domain';

const StartupProfile = () => {
  const { slug } = useParams();
  const { data: company, isLoading, error } = useCompanyDetails(slug);
  const { data: similarCompanies = [] } = useSimilarCompanies(
    company?.sector_id,
    company?.id
  );

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-3">Loading startup…</p>
        </div>
      </AppLayout>
    );
  }

  if (error || !company) {
    return (
      <AppLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Building2 className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Startup not found</h1>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            The startup you're looking for doesn't exist or hasn't been added yet.
          </p>
          <Button asChild>
            <Link to="/directory">Browse Directory</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Extract data with safe defaults
  const founders = company.company_founders || [];
  const fundingRounds = company.funding_rounds || [];
  const operatingCountries = company.company_countries || [];
  const isTrending = (company.trending_score || 0) > 50;

  // Calculate total funding
  const totalFundingUsd = company.total_funding_usd || 0;
  const totalFundingDisplay = totalFundingUsd > 0 ? formatCurrency(totalFundingUsd) : 'Undisclosed';

  return (
    <AppLayout>
      {/* Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {company.name}
                  </h1>
                  {isTrending && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-4">{company.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {company.hq_country && (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {company.hq_country.flag_emoji} {company.hq_country.name}
                    </span>
                  )}
                  {company.sector && (
                    <Link 
                      to={`/sectors/${company.sector.slug}`}
                      className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {company.sector.name}
                    </Link>
                  )}
                  {company.business_model && (
                    <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {company.business_model}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex flex-wrap gap-3">
              {company.website_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {company.linkedin_url && (
                <Button variant="outline" size="icon" asChild>
                  <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {company.twitter_url && (
                <Button variant="outline" size="icon" asChild>
                  <a href={company.twitter_url} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <ClaimCompanyModal companyName={company.name} companyId={company.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="border-b border-border py-6 bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Total Funding */}
            <div className="space-y-1">
              <span className="metric-label">Total Funding</span>
              <p className="text-xl font-bold text-success">{totalFundingDisplay}</p>
              <p className="text-xs text-muted-foreground">{fundingRounds.length} rounds</p>
            </div>

            {/* Year Founded */}
            <div className="space-y-1">
              <span className="metric-label">Founded</span>
              <p className="text-xl font-bold text-foreground">{company.year_founded || '—'}</p>
              <p className="text-xs text-muted-foreground">Year established</p>
            </div>

            {/* Headcount */}
            <div className="space-y-1">
              <span className="metric-label">Employees</span>
              <p className="text-xl font-bold text-foreground">
                {company.employee_count_min && company.employee_count_max 
                  ? `${company.employee_count_min}-${company.employee_count_max}`
                  : '—'}
              </p>
              {company.is_hiring && (
                <Badge variant="secondary" className="bg-success/10 text-success border-0">
                  Hiring
                </Badge>
              )}
            </div>

            {/* Team Size */}
            <div className="space-y-1">
              <span className="metric-label">Founders</span>
              <p className="text-xl font-bold text-foreground">{founders.length}</p>
              <p className="text-xs text-muted-foreground">Leadership team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="funding"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                  >
                    Funding History
                  </TabsTrigger>
                  <TabsTrigger
                    value="team"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3"
                  >
                    Team
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  {/* Description */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">About {company.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {company.description || company.tagline || 'No description available yet.'}
                    </p>
                  </div>

                  {/* Company Details */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Company Details</h2>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-muted-foreground">Founded</dt>
                        <dd className="font-medium text-foreground">{company.year_founded || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Headquarters</dt>
                        <dd className="font-medium text-foreground">
                          {company.hq_country ? `${company.hq_country.flag_emoji} ${company.hq_country.name}` : '—'}
                        </dd>
                      </div>
                      {operatingCountries.length > 0 && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Operating Countries</dt>
                          <dd className="font-medium text-foreground">
                            {operatingCountries.map((c: any) => c.country?.name).filter(Boolean).join(', ') || '—'}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm text-muted-foreground">Business Model</dt>
                        <dd className="font-medium text-foreground">{company.business_model || '—'}</dd>
                      </div>
                      {company.primary_domain && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Domain</dt>
                          <dd>
                            <a
                              href={`https://${company.primary_domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline flex items-center gap-1"
                            >
                              {company.primary_domain}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </dd>
                        </div>
                      )}
                      {company.sub_sector && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Sub-sector</dt>
                          <dd className="font-medium text-foreground">{company.sub_sector}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </TabsContent>

                <TabsContent value="funding" className="mt-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground">Funding Rounds</h2>
                    </div>
                    {fundingRounds.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Round</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Investors</TableHead>
                            <TableHead>Valuation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fundingRounds.map((round: any) => (
                            <TableRow key={round.id}>
                              <TableCell className="font-medium">{round.stage}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {round.date ? new Date(round.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '—'}
                              </TableCell>
                              <TableCell className="font-semibold text-success">
                                {round.amount_usd ? formatCurrency(round.amount_usd) : (round.amount_disclosed === false ? 'Undisclosed' : '—')}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {round.funding_round_investors?.map((fri: any) => fri.investor?.name).filter(Boolean).join(', ') || '—'}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {round.valuation_usd ? formatCurrency(round.valuation_usd) : '—'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No funding rounds recorded yet.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="team" className="mt-6">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Leadership Team</h2>
                    {founders.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {founders.map((cf: any) => cf.founder && (
                          <div
                            key={cf.founder.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                          >
                            <div className="w-14 h-14 rounded-full bg-card overflow-hidden flex items-center justify-center">
                              {cf.founder.avatar_url ? (
                                <img
                                  src={cf.founder.avatar_url}
                                  alt={cf.founder.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Users className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{cf.founder.name}</h3>
                              <p className="text-sm text-muted-foreground">{cf.role || cf.founder.title || 'Founder'}</p>
                              {cf.founder.linkedin_url && (
                                <a
                                  href={cf.founder.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary text-sm hover:underline flex items-center gap-1 mt-1"
                                >
                                  <Linkedin className="h-3 w-3" />
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Team information coming soon.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Data Disclaimer</p>
                  <p className="text-muted-foreground">
                    Financial metrics for private companies are based on public reports, press releases,
                    and proprietary estimates. Actual figures may vary. See our{' '}
                    <Link to="/methodology" className="text-primary hover:underline">
                      methodology
                    </Link>{' '}
                    for details.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Request Correction */}
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Is this your company?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Claim your profile to update information, add verified metrics, and gain visibility.
                </p>
                <CorrectionRequestModal companyName={company.name} companyId={company.id} />
              </div>

              {/* Similar Companies */}
              {similarCompanies.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-4">Similar Companies</h3>
                  <div className="space-y-4">
                    {similarCompanies.map((s) => (
                      <Link
                        key={s.id}
                        to={`/startup/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {s.logoUrl ? (
                            <img src={s.logoUrl} alt={s.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {s.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {s.hqCountry?.name || ''} {s.sector?.name ? `• ${s.sector.name}` : ''}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default StartupProfile;
