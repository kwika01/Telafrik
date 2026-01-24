import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Rocket,
  Users,
  Layers,
  Globe,
  TrendingUp,
  Activity,
  FileText,
  Bookmark,
  Settings,
  CreditCard,
  Handshake,
  Sparkles,
  MessageSquare,
  UserPlus,
  BrainCircuit,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  className?: string;
}

const AppSidebar = ({ className }: AppSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.startsWith(path + '/');

  // TelAfrik Data - startup & investor database
  const dataNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Ask TelAfrik', path: '/ask', icon: BrainCircuit, highlight: true },
    { label: 'Companies', path: '/companies', icon: Building2 },
    { label: 'Startups', path: '/directory', icon: Rocket },
    { label: 'Founders', path: '/founders', icon: Users },
    { label: 'Investors', path: '/investors', icon: Users },
    { label: 'Sectors', path: '/sectors', icon: Layers },
    { label: 'Countries', path: '/countries', icon: Globe },
  ];

  // TelAfrik Signals - funding & growth alerts
  const signalsNavItems = [
    { label: 'Deals', path: '/deals', icon: TrendingUp },
    { label: 'Signals', path: '/signals', icon: Activity },
    { label: 'Watchlist', path: '/watchlist', icon: Bookmark },
  ];

  // TelAfrik Insights - reports & research
  const insightsNavItems = [
    { label: 'Reports', path: '/reports', icon: FileText },
  ];

  // KonektAfrik - connections & intros
  const konektNavItems = [
    { label: 'Network Hub', path: '/konekt', icon: Handshake },
    { label: 'Find Matches', path: '/konekt/matches', icon: Sparkles },
    { label: 'Intro Requests', path: '/konekt/intros', icon: MessageSquare },
    { label: 'Connections', path: '/konekt/connections', icon: UserPlus },
  ];

  return (
    <aside className={cn("w-56 flex-shrink-0 border-r border-sidebar-border bg-sidebar-background", className)}>
      <div className="flex flex-col h-full py-4">
        {/* TelAfrik Data */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="text-primary">●</span> TelAfrik Data
          </h3>
          <nav className="space-y-1">
            {dataNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link',
                  item.highlight && !isActive(item.path) && 'text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.highlight && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-medium">AI</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* TelAfrik Signals */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="text-orange-400">●</span> TelAfrik Signals
          </h3>
          <nav className="space-y-1">
            {signalsNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link'}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* TelAfrik Insights */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="text-emerald-400">●</span> TelAfrik Insights
          </h3>
          <nav className="space-y-1">
            {insightsNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link'}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* KonektAfrik */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <span className="text-violet-400">●</span> KonektAfrik
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 font-medium">New</span>
          </h3>
          <nav className="space-y-1">
            {konektNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? 'sidebar-link-active' : 'sidebar-link'}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto px-3">
          <nav className="space-y-1">
            <Link to="/pricing" className="sidebar-link">
              <CreditCard className="h-4 w-4" />
              Upgrade
            </Link>
            <Link to="/settings" className="sidebar-link">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
