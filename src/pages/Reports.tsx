import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  FileText,
  Download,
  Lock,
  Calendar,
  ArrowRight,
  BarChart3,
  Globe,
  TrendingUp,
} from 'lucide-react';

const reports = [
  {
    id: '1',
    title: 'African Fintech Landscape 2024',
    description: 'Comprehensive analysis of the fintech sector across 15 African markets, including funding trends, key players, and growth projections.',
    date: 'January 2024',
    pages: 48,
    type: 'free',
    category: 'Sector Report',
  },
  {
    id: '2',
    title: 'HR Tech in Africa: Market Overview',
    description: 'Deep dive into the payroll, HRIS, and workforce management landscape across Nigeria, Kenya, South Africa, and Egypt.',
    date: 'December 2023',
    pages: 32,
    type: 'free',
    category: 'Sector Report',
  },
  {
    id: '3',
    title: 'Q4 2023 Funding Report',
    description: 'Quarterly analysis of funding rounds, valuations, and investor activity across the African startup ecosystem.',
    date: 'January 2024',
    pages: 24,
    type: 'pro',
    category: 'Quarterly Report',
  },
  {
    id: '4',
    title: 'Nigeria Startup Ecosystem Deep Dive',
    description: 'Comprehensive market analysis covering regulatory environment, key sectors, top companies, and investment opportunities.',
    date: 'November 2023',
    pages: 56,
    type: 'pro',
    category: 'Country Report',
  },
  {
    id: '5',
    title: 'East Africa Tech Corridor',
    description: 'Analysis of Kenya, Rwanda, Tanzania, and Uganda tech ecosystems with cross-border investment trends.',
    date: 'October 2023',
    pages: 42,
    type: 'enterprise',
    category: 'Regional Report',
  },
  {
    id: '6',
    title: 'African Unicorns & Soonicorns',
    description: 'Profiles and analysis of billion-dollar African startups and companies approaching unicorn status.',
    date: 'September 2023',
    pages: 38,
    type: 'enterprise',
    category: 'Special Report',
  },
];

const Reports = () => {
  const freeReports = reports.filter((r) => r.type === 'free');
  const proReports = reports.filter((r) => r.type === 'pro');
  const enterpriseReports = reports.filter((r) => r.type === 'enterprise');

  const getIcon = (category: string) => {
    switch (category) {
      case 'Sector Report':
        return BarChart3;
      case 'Country Report':
      case 'Regional Report':
        return Globe;
      default:
        return TrendingUp;
    }
  };

  const ReportCard = ({ report }: { report: typeof reports[0] }) => {
    const Icon = getIcon(report.category);
    const isLocked = report.type !== 'free';

    return (
      <div className="data-card group">
        <div className="flex items-start justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {isLocked && (
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              report.type === 'pro' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-secondary text-muted-foreground'
            }`}>
              <Lock className="h-3 w-3" />
              {report.type === 'pro' ? 'Pro' : 'Enterprise'}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mb-2">{report.category}</div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {report.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {report.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {report.date}
          </div>
          <div>{report.pages} pages</div>
        </div>

        {isLocked ? (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/pricing">
              <Lock className="h-3 w-3 mr-2" />
              Upgrade to Access
            </Link>
          </Button>
        ) : (
          <Button size="sm" className="w-full">
            <Download className="h-3 w-3 mr-2" />
            Download PDF
          </Button>
        )}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
            </div>
            <p className="text-muted-foreground">
              In-depth research and analysis on African markets
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/pricing">
              View Plans <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Free Reports */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Free Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>

        {/* Pro Reports */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-foreground">Pro Reports</h2>
            <span className="badge-reported">Pro</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>

        {/* Enterprise Reports */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-foreground">Enterprise Reports</h2>
            <span className="badge-sector">Enterprise</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="data-card bg-primary/5 border-primary/20 text-center py-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Need a Custom Report?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            Enterprise clients can request custom research on specific sectors, countries, or companies.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
