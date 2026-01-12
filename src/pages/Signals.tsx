import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Activity,
  TrendingUp,
  TrendingDown,
  Building2,
  ArrowUpRight,
  Briefcase,
  Globe,
  Zap,
  Info,
} from 'lucide-react';

// Mock signals data
const trendingCompanies = [
  { name: 'Flutterwave', sector: 'Fintech', momentum: 94, change: '+12', signals: ['Hiring surge', 'News mentions'] },
  { name: 'Moniepoint', sector: 'Fintech', momentum: 91, change: '+15', signals: ['Funding announced', 'Hiring'] },
  { name: 'Andela', sector: 'HR Tech', momentum: 89, change: '+8', signals: ['Expansion news', 'Partnership'] },
  { name: 'SeamlessHR', sector: 'HR Tech', momentum: 85, change: '+10', signals: ['Product launch', 'Hiring'] },
  { name: 'Paystack', sector: 'Fintech', momentum: 82, change: '+5', signals: ['Market expansion'] },
  { name: 'Workpay', sector: 'HR Tech', momentum: 78, change: '+7', signals: ['Funding round'] },
];

const signalTypes = [
  {
    type: 'hiring',
    label: 'Hiring Activity',
    icon: Briefcase,
    description: 'Companies with increased job postings in the last 30 days',
    companies: 156,
    trend: '+23%',
  },
  {
    type: 'news',
    label: 'News Mentions',
    icon: Globe,
    description: 'Companies with increased media coverage and press mentions',
    companies: 89,
    trend: '+18%',
  },
  {
    type: 'funding',
    label: 'Funding Signals',
    icon: TrendingUp,
    description: 'Companies showing signs of upcoming or recent funding activity',
    companies: 34,
    trend: '+45%',
  },
];

const Signals = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">Signals</h1>
          </div>
          <p className="text-muted-foreground">
            Track momentum indicators and market signals across African companies
          </p>
        </div>

        {/* Methodology Note */}
        <div className="data-card bg-primary/5 border-primary/20 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">How Momentum Scores Work</h3>
            <p className="text-sm text-muted-foreground">
              Momentum scores (0-100) are calculated based on hiring activity, news mentions, web traffic trends, 
              and funding signals. Higher scores indicate increased market activity. 
              <Link to="/methodology" className="text-primary hover:underline ml-1">
                Learn more about our methodology
              </Link>
            </p>
          </div>
        </div>

        {/* Signal Types */}
        <div className="grid md:grid-cols-3 gap-4">
          {signalTypes.map((signal) => (
            <div key={signal.type} className="data-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <signal.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{signal.label}</h3>
                  <p className="text-xs text-muted-foreground">{signal.companies} companies</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{signal.description}</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">{signal.trend} this month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Companies */}
        <div className="data-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Top Momentum Companies</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/directory">View all companies</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {trendingCompanies.map((company, index) => (
              <div
                key={company.name}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{company.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-sector text-xs">{company.sector}</span>
                      {company.signals.map((signal) => (
                        <span key={signal} className="text-xs text-muted-foreground">
                          • {signal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Momentum</div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${company.momentum}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-8">
                        {company.momentum}
                      </span>
                    </div>
                  </div>
                  <div className="text-right w-16">
                    <div className="text-xs text-muted-foreground mb-1">Change</div>
                    <span className="text-sm font-medium text-success">{company.change}</span>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/startup/${company.name.toLowerCase()}`}>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="data-card">
            <h3 className="font-semibold text-foreground mb-2">Web Traffic Trends</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track website traffic changes for companies in your watchlist.
            </p>
            <div className="h-32 bg-secondary/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Coming Soon</span>
            </div>
          </div>
          <div className="data-card">
            <h3 className="font-semibold text-foreground mb-2">App Download Trends</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor app store rankings and download trends.
            </p>
            <div className="h-32 bg-secondary/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Signals;
