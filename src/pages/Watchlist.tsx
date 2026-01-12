import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bookmark,
  Plus,
  MoreHorizontal,
  Building2,
  Trash2,
  Edit2,
  Bell,
  ArrowUpRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const mockWatchlists = [
  {
    id: '1',
    name: 'Fintech Ghana Seed',
    companies: [
      { id: 'c1', name: 'Flutterwave', sector: 'Fintech', country: 'Nigeria', change: '+12%' },
      { id: 'c2', name: 'Paystack', sector: 'Fintech', country: 'Nigeria', change: '+5%' },
    ],
    updatedAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'HR Tech Portfolio',
    companies: [
      { id: 'c3', name: 'SeamlessHR', sector: 'HR Tech', country: 'Nigeria', change: '+10%' },
      { id: 'c4', name: 'Workpay', sector: 'HR Tech', country: 'Kenya', change: '+8%' },
      { id: 'c5', name: 'Andela', sector: 'HR Tech', country: 'Pan-Africa', change: '+3%' },
    ],
    updatedAt: '1 day ago',
  },
];

const Watchlist = () => {
  const [watchlists, setWatchlists] = useState(mockWatchlists);
  const [selectedList, setSelectedList] = useState(watchlists[0]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');

  const createList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName.trim(),
        companies: [],
        updatedAt: 'Just now',
      };
      setWatchlists([...watchlists, newList]);
      setSelectedList(newList);
      setNewListName('');
      setShowCreateForm(false);
    }
  };

  const deleteList = (id: string) => {
    const updated = watchlists.filter((w) => w.id !== id);
    setWatchlists(updated);
    if (selectedList?.id === id) {
      setSelectedList(updated[0] || null);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Watchlists</h1>
            <p className="text-muted-foreground mt-1">
              Track companies and get notified of changes
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New List
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Lists */}
          <div className="space-y-2">
            {watchlists.map((list) => (
              <button
                key={list.id}
                onClick={() => setSelectedList(list)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                  selectedList?.id === list.id
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Bookmark className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate text-sm font-medium">{list.name}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{list.companies.length}</span>
              </button>
            ))}

            {/* Create New Form */}
            {showCreateForm && (
              <div className="p-3 border border-border rounded-lg space-y-2">
                <Input
                  placeholder="List name..."
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && createList()}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={createList} className="flex-1">
                    Create
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedList ? (
              <div className="data-card">
                {/* List Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedList.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedList.companies.length} companies • Updated {selectedList.updatedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Alerts
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteList(selectedList.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Companies */}
                {selectedList.companies.length > 0 ? (
                  <div className="space-y-2">
                    {selectedList.companies.map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{company.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {company.sector} • {company.country}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-success font-medium">{company.change}</span>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/startup/${company.name.toLowerCase()}`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state py-12">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No companies yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Add companies from the directory to track them here.
                    </p>
                    <Button asChild>
                      <Link to="/directory">Browse Companies</Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state data-card py-16">
                <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No watchlists yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create a watchlist to track companies and get notified of changes.
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First List
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Watchlist;
