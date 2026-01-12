import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  Users,
  DollarSign,
  AlertTriangle,
  Upload,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Shield,
  MoreHorizontal,
  FileText,
  Settings,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const mockCompanies = [
  { id: '1', name: 'Flutterwave', sector: 'Fintech', status: 'verified', issues: 0, lastUpdated: '2 days ago' },
  { id: '2', name: 'Andela', sector: 'HR Tech', status: 'verified', issues: 0, lastUpdated: '1 week ago' },
  { id: '3', name: 'SeamlessHR', sector: 'HR Tech', status: 'pending', issues: 2, lastUpdated: '3 days ago' },
  { id: '4', name: 'Paystack', sector: 'Fintech', status: 'verified', issues: 0, lastUpdated: '5 days ago' },
  { id: '5', name: 'Workpay', sector: 'HR Tech', status: 'review', issues: 1, lastUpdated: '1 day ago' },
];

const mockPendingEdits = [
  { id: '1', company: 'Flutterwave', field: 'valuation', oldValue: '$3B', newValue: '$3.5B', submittedBy: 'user@example.com', date: '2 hours ago' },
  { id: '2', company: 'Andela', field: 'employee_count', oldValue: '1000-2500', newValue: '2500-5000', submittedBy: 'founder@andela.com', date: '1 day ago' },
  { id: '3', company: 'SeamlessHR', field: 'funding_total', oldValue: '$10M', newValue: '$14M', submittedBy: 'ceo@seamlesshr.com', date: '3 days ago' },
];

const mockDataQualityIssues = [
  { id: '1', company: 'SeamlessHR', type: 'missing_source', field: 'valuation', severity: 'high' },
  { id: '2', company: 'SeamlessHR', type: 'outdated', field: 'employee_count', severity: 'medium' },
  { id: '3', company: 'Workpay', type: 'missing_source', field: 'revenue', severity: 'high' },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Companies', value: '2,847', icon: Building2, change: '+12 today' },
    { label: 'Pending Reviews', value: '23', icon: Clock, change: '5 urgent' },
    { label: 'Data Quality Issues', value: '47', icon: AlertTriangle, change: '12 high priority' },
    { label: 'User Submissions', value: '156', icon: Users, change: 'This month' },
  ];

  const filteredCompanies = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="badge-verified"><CheckCircle className="h-3 w-3" /> Verified</span>;
      case 'pending':
        return <span className="badge-estimated"><Clock className="h-3 w-3" /> Pending</span>;
      case 'review':
        return <span className="badge-reported"><AlertTriangle className="h-3 w-3" /> Review</span>;
      default:
        return null;
    }
  };

  return (
    <AppLayout showSidebar={false}>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage companies, data quality, and user submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="pending">Pending Edits</TabsTrigger>
            <TabsTrigger value="quality">Data Quality</TabsTrigger>
            <TabsTrigger value="founders">Founders</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="data-card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 table-header">Company</th>
                    <th className="text-left py-3 px-4 table-header">Sector</th>
                    <th className="text-left py-3 px-4 table-header">Status</th>
                    <th className="text-left py-3 px-4 table-header">Issues</th>
                    <th className="text-left py-3 px-4 table-header">Last Updated</th>
                    <th className="text-right py-3 px-4 table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-foreground">{company.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge-sector">{company.sector}</span>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(company.status)}</td>
                      <td className="py-3 px-4">
                        {company.issues > 0 ? (
                          <span className="text-warning font-medium">{company.issues}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{company.lastUpdated}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit2 className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Pending Edits Tab */}
          <TabsContent value="pending" className="space-y-4">
            <div className="data-card">
              <h3 className="font-semibold text-foreground mb-4">User-Submitted Corrections</h3>
              <div className="space-y-3">
                {mockPendingEdits.map((edit) => (
                  <div key={edit.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{edit.company}</span>
                        <span className="text-xs text-muted-foreground">• {edit.field}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground line-through">{edit.oldValue}</span>
                        <span className="mx-2">→</span>
                        <span className="text-foreground">{edit.newValue}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        By {edit.submittedBy} • {edit.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Data Quality Tab */}
          <TabsContent value="quality" className="space-y-4">
            <div className="data-card">
              <h3 className="font-semibold text-foreground mb-4">Data Quality Issues</h3>
              <div className="space-y-3">
                {mockDataQualityIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        issue.severity === 'high' ? 'bg-destructive/10' : 'bg-warning/10'
                      }`}>
                        <AlertTriangle className={`h-4 w-4 ${
                          issue.severity === 'high' ? 'text-destructive' : 'text-warning'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{issue.company}</div>
                        <div className="text-sm text-muted-foreground">
                          {issue.type === 'missing_source' ? 'Missing source for' : 'Outdated data:'} {issue.field}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Resolve</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Founders Tab */}
          <TabsContent value="founders">
            <div className="empty-state data-card py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Founders Management</h3>
              <p className="text-muted-foreground mb-4">Add and manage founder profiles</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Founder
              </Button>
            </div>
          </TabsContent>

          {/* Investors Tab */}
          <TabsContent value="investors">
            <div className="empty-state data-card py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Investors Management</h3>
              <p className="text-muted-foreground mb-4">Add and manage investor profiles</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Investor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
