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
  CheckCircle2,
  FileText,
  Flag,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
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
import { startups } from '@/lib/mockData';

const StartupProfile = () => {
  const { slug } = useParams();
  const startup = startups.find((s) => s.slug === slug);

  if (!startup) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Startup Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The startup you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/directory">Browse Directory</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const similarStartups = startups
    .filter((s) => s.sector === startup.sector && s.id !== startup.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/30 border-b border-border py-10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {startup.name}
                  </h1>
                  {startup.trending && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-4">{startup.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {startup.hqCountry}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {startup.sector}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {startup.stage}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {startup.businessModel}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${startup.domain}`} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
              {startup.socialLinks.linkedin && (
                <Button variant="outline" size="icon" asChild>
                  <a href={startup.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {startup.socialLinks.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a href={startup.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <ClaimCompanyModal companyName={startup.name} companyId={startup.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="border-b border-border py-6 bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Valuation */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="metric-label">Valuation</span>
                <ConfidenceIndicator
                  score={startup.valuation.confidenceScore}
                  source={startup.valuation.source}
                  showScore
                />
              </div>
              <p className="text-xl font-bold text-foreground">{startup.valuation.range}</p>
              <p className="text-xs text-muted-foreground">{startup.valuation.type}</p>
            </div>

            {/* Revenue */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="metric-label">Revenue</span>
                <ConfidenceIndicator
                  score={startup.revenue.confidenceScore}
                  source={startup.revenue.source}
                  showScore
                />
              </div>
              <p className="text-xl font-bold text-foreground">{startup.revenue.range}</p>
              <p className="text-xs text-muted-foreground">{startup.revenue.metricType}</p>
            </div>

            {/* Total Funding */}
            <div className="space-y-1">
              <span className="metric-label">Total Funding</span>
              <p className="text-xl font-bold text-success">{startup.totalFunding}</p>
              <p className="text-xs text-muted-foreground">{startup.fundingRounds.length} rounds</p>
            </div>

            {/* Headcount */}
            <div className="space-y-1">
              <span className="metric-label">Employees</span>
              <p className="text-xl font-bold text-foreground">{startup.headcount}</p>
              <Badge
                variant="secondary"
                className={
                  startup.hiringStatus === 'Actively Hiring'
                    ? 'bg-success/10 text-success border-0'
                    : 'bg-secondary text-secondary-foreground'
                }
              >
                {startup.hiringStatus}
              </Badge>
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
                    <h2 className="text-lg font-semibold text-foreground mb-4">About {startup.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{startup.description}</p>
                  </div>

                  {/* Company Details */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Company Details</h2>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-muted-foreground">Founded</dt>
                        <dd className="font-medium text-foreground">{startup.yearFounded}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Headquarters</dt>
                        <dd className="font-medium text-foreground">{startup.hqCountry}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Operating Countries</dt>
                        <dd className="font-medium text-foreground">
                          {startup.operatingCountries.join(', ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Business Model</dt>
                        <dd className="font-medium text-foreground">{startup.businessModel}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Domain</dt>
                        <dd>
                          <a
                            href={`https://${startup.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            {startup.domain}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground">Sub-sector</dt>
                        <dd className="font-medium text-foreground">{startup.subSector}</dd>
                      </div>
                    </dl>
                  </div>
                </TabsContent>

                <TabsContent value="funding" className="mt-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground">Funding Rounds</h2>
                    </div>
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
                        {startup.fundingRounds.map((round) => (
                          <TableRow key={round.id}>
                            <TableCell className="font-medium">{round.round}</TableCell>
                            <TableCell className="text-muted-foreground">{round.date}</TableCell>
                            <TableCell className="font-semibold text-success">{round.amount}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {round.investors.join(', ')}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {round.valuation || '—'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="mt-6">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Leadership Team</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {startup.founders.map((founder) => (
                        <div
                          key={founder.id}
                          className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
                        >
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-foreground">{founder.name}</h3>
                            <p className="text-sm text-muted-foreground">{founder.role}</p>
                            {founder.linkedin && (
                              <a
                                href={founder.linkedin}
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
                <CorrectionRequestModal companyName={startup.name} companyId={startup.id} />
              </div>

              {/* Similar Companies */}
              {similarStartups.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-4">Similar Companies</h3>
                  <div className="space-y-4">
                    {similarStartups.map((s) => (
                      <Link
                        key={s.id}
                        to={`/startup/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <img src={s.logo} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {s.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {s.hqCountry} • {s.stage}
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
    </Layout>
  );
};

export default StartupProfile;
