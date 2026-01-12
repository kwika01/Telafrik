import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  X, 
  Plus,
  Building2,
  Lock,
  ArrowRight,
} from 'lucide-react';

// Mock data for demonstration
const mockCompanies = [
  {
    id: '1',
    name: 'Flutterwave',
    logo: null,
    sector: 'Fintech',
    country: 'Nigeria',
    founded: 2016,
    funding: '$474.5M',
    valuation: '$3B',
    employees: '500-1000',
    stage: 'Series D',
    revenue: '$100M-$250M (Est)',
  },
  {
    id: '2',
    name: 'Paystack',
    logo: null,
    sector: 'Fintech',
    country: 'Nigeria',
    founded: 2015,
    funding: '$210M (Acquired)',
    valuation: 'Acquired for $200M+',
    employees: '100-250',
    stage: 'Acquired',
    revenue: '$25M-$50M (Est)',
  },
  {
    id: '3',
    name: 'Andela',
    logo: null,
    sector: 'HR Tech',
    country: 'Pan-Africa',
    founded: 2014,
    funding: '$381M',
    valuation: '$1.5B',
    employees: '1000-2500',
    stage: 'Series E',
    revenue: '$50M-$100M (Est)',
  },
];

const Compare = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<typeof mockCompanies>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredCompanies = mockCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCompanies.find((sc) => sc.id === c.id)
  );

  const addCompany = (company: typeof mockCompanies[0]) => {
    if (selectedCompanies.length < 3) {
      setSelectedCompanies([...selectedCompanies, company]);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const removeCompany = (id: string) => {
    setSelectedCompanies(selectedCompanies.filter((c) => c.id !== id));
  };

  const comparisonFields = [
    { key: 'sector', label: 'Sector' },
    { key: 'country', label: 'HQ Country' },
    { key: 'founded', label: 'Founded' },
    { key: 'employees', label: 'Employees' },
    { key: 'stage', label: 'Stage' },
    { key: 'funding', label: 'Total Funding' },
    { key: 'valuation', label: 'Valuation' },
    { key: 'revenue', label: 'Revenue' },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Compare Companies</h1>
          <p className="text-muted-foreground mt-1">
            Compare up to 3 companies side-by-side
          </p>
        </div>

        {/* Company Selection */}
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => {
            const company = selectedCompanies[index];
            return (
              <div
                key={index}
                className="data-card min-h-[200px] flex flex-col items-center justify-center"
              >
                {company ? (
                  <div className="w-full text-center">
                    <div className="relative inline-block">
                      <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <button
                        onClick={() => removeCompany(company.id)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">{company.sector}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                      <Plus className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Add Company</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Search Modal */}
        {showSearch && selectedCompanies.length < 3 && (
          <div className="data-card">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => addCompany(company)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                >
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{company.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {company.sector} • {company.country}
                    </div>
                  </div>
                </button>
              ))}
              {filteredCompanies.length === 0 && searchQuery && (
                <p className="text-center text-muted-foreground py-4">
                  No companies found matching "{searchQuery}"
                </p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedCompanies.length > 0 && (
          <div className="data-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 table-header w-40">Metric</th>
                  {selectedCompanies.map((company) => (
                    <th key={company.id} className="text-left py-4 px-4 table-header">
                      {company.name}
                    </th>
                  ))}
                  {selectedCompanies.length < 3 && (
                    <th className="text-left py-4 px-4 table-header text-muted-foreground">
                      Add company
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-b border-border/50">
                    <td className="py-4 px-4 text-sm text-muted-foreground">{field.label}</td>
                    {selectedCompanies.map((company) => (
                      <td key={company.id} className="py-4 px-4 text-sm text-foreground">
                        {company[field.key as keyof typeof company]}
                      </td>
                    ))}
                    {selectedCompanies.length < 3 && (
                      <td className="py-4 px-4 text-sm text-muted-foreground">—</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {selectedCompanies.length === 0 && !showSearch && (
          <div className="empty-state">
            <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Select companies to compare
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Add up to 3 companies to see a side-by-side comparison of their key metrics, funding, and more.
            </p>
            <Button onClick={() => setShowSearch(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Company
            </Button>
          </div>
        )}

        {/* Pro Feature Notice */}
        <div className="data-card bg-primary/5 border-primary/20 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">Compare is a Pro feature</h3>
            <p className="text-sm text-muted-foreground">
              Free users can compare 1 time. Upgrade to Pro for unlimited comparisons.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link to="/pricing">
              Upgrade <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Compare;
