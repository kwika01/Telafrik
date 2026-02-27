import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  Users,
  Layers,
  Globe,
  TrendingUp,
  Activity,
  FileText,
  Shield,
  Bookmark,
  Settings,
  CreditCard,
  Handshake,
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

  type NavItem = { label: string; path: string; icon: React.ElementType; highlight?: boolean; soon?: boolean };

  const dataNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Ask TelAfrik', path: '/ask', icon: BrainCircuit, highlight: true },
    { label: 'Startups', path: '/directory', icon: Rocket },
    { label: 'Founders', path: '/founders', icon: Users, soon: true },
    { label: 'Investors', path: '/investors', icon: Users },
    { label: 'Sectors', path: '/sectors', icon: Layers },
    { label: 'Countries', path: '/countries', icon: Globe },
  ];

  const signalsNavItems: NavItem[] = [
    { label: 'Deals', path: '/deals', icon: TrendingUp },
    { label: 'Signals', path: '/signals', icon: Activity, soon: true },
    { label: 'Watchlist', path: '/watchlist', icon: Bookmark, soon: true },
  ];

  const insightsNavItems: NavItem[] = [
    { label: 'Reports', path: '/reports', icon: FileText, soon: true },
    { label: 'Regulatory Intel', path: '/regulatory-intel', icon: Shield, soon: true },
  ];

  const konektNavItems: NavItem[] = [
    { label: 'Network Hub', path: '/konekt', icon: Handshake, soon: true },
  ];

  return (
    <aside className={cn("w-60 flex-shrink-0 border-r border-border bg-background", className)}>
      <div className="flex flex-col h-full py-6 px-2">
        {/* TelAfrik Data */}
        <div className="px-2 mb-6">
          <h3 className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> TelAfrik Data
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
                {item.soon && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">Soon</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* TelAfrik Signals */}
        <div className="px-2 mb-6">
          <h3 className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" /> TelAfrik Signals
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
                {item.soon && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">Soon</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* TelAfrik Insights */}
        <div className="px-2 mb-6">
          <h3 className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" /> TelAfrik Insights
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
                {item.soon && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">Soon</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* KonektAfrik */}
        <div className="px-2 mb-6">
          <h3 className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> KonektAfrik
            <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">Soon</span>
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
                {item.soon && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">Soon</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto px-2 pt-4 border-t border-border">
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
