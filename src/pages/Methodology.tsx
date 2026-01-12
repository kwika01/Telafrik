import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const Methodology = () => {
  return (
    <Layout>
      <div className="py-16 lg:py-24">
        <div className="container-wide max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Data Integrity</span>
            </div>
            <h1 className="text-4xl font-semibold text-foreground mb-4">
              Methodology & Data Integrity
            </h1>
            <p className="text-lg text-muted-foreground">
              Trust is our product. Here's how we collect, verify, and present data on African companies.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Data Types */}
            <section className="data-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Understanding Our Data Labels
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Verified / Reported</h3>
                    <p className="text-sm text-muted-foreground">
                      Data confirmed through official sources: company press releases, SEC/regulatory filings, 
                      verified company submissions, or reputable news outlets with direct company quotes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Estimated</h3>
                    <p className="text-sm text-muted-foreground">
                      Data derived from analysis, comparable companies, market research, or secondary sources. 
                      Always shown with a confidence score (0-100%) and reasoning when available.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sources */}
            <section className="data-card">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Our Sources
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Primary Sources (Highest Confidence)</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      Company press releases and official announcements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      Regulatory filings (where available)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      Verified submissions from company founders/executives
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      Lead investor announcements
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Secondary Sources (Medium Confidence)</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      TechCrunch, Disrupt Africa, TechCabal, Weetrack
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Bloomberg, Reuters, Financial Times coverage
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Crunchbase, PitchBook (cross-referenced)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Estimated Data (Lower Confidence)</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                      Revenue ranges based on employee count, sector benchmarks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                      Valuation estimates from comparable funding rounds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                      Market intelligence and analyst reports
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Confidence Scores */}
            <section className="data-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Confidence Scores
              </h2>
              <p className="text-muted-foreground mb-4">
                Every data point in Lumora carries a confidence score from 0-100%. Here's how we calculate it:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-foreground">90-100%</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: '95%' }} />
                  </div>
                  <div className="text-sm text-muted-foreground">Official company confirmation</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-foreground">70-89%</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                  </div>
                  <div className="text-sm text-muted-foreground">Multiple credible sources</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-foreground">50-69%</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="text-sm text-muted-foreground">Single source or estimation</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-foreground">&lt;50%</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-muted-foreground rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="text-sm text-muted-foreground">Limited data available</div>
                </div>
              </div>
            </section>

            {/* Data Updates */}
            <section className="data-card">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Data Freshness
              </h2>
              <p className="text-muted-foreground mb-4">
                Every company profile shows a "Last Updated" timestamp. Our update policy:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Funding rounds: Updated within 24-48 hours of announcement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Company profiles: Reviewed quarterly at minimum
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  User-submitted corrections: Reviewed within 72 hours
                </li>
              </ul>
            </section>

            {/* Request Correction */}
            <section className="data-card bg-primary/5 border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Request a Correction
              </h2>
              <p className="text-muted-foreground mb-4">
                Found an error or have updated information? We welcome corrections from founders, 
                investors, and researchers. All submissions are reviewed by our data team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/auth">
                    Submit Correction <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:data@lumora.africa" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Email Data Team
                  </a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Methodology;
