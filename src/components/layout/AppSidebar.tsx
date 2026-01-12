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
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  className?: string;
}

const AppSidebar = ({ className }: AppSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.startsWith(path + '/');

  const mainNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Companies', path: '/companies', icon: Building2 },
    { label: 'Startups', path: '/directory', icon: Rocket },
    { label: 'Founders', path: '/founders', icon: Users },
    { label: 'Investors', path: '/investors', icon: Users },
  ];

  const dataNavItems = [
    { label: 'Sectors', path: '/sectors', icon: Layers },
    { label: 'Countries', path: '/countries', icon: Globe },
    { label: 'Deals', path: '/deals', icon: TrendingUp },
    { label: 'Signals', path: '/signals', icon: Activity },
  ];

  const resourceNavItems = [
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Watchlist', path: '/watchlist', icon: Bookmark },
  ];

  return (
    <aside className={cn("w-56 flex-shrink-0 border-r border-sidebar-border bg-sidebar-background", className)}>
      <div className="flex flex-col h-full py-4">
        {/* Main Navigation */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Overview
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
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

        {/* Data Navigation */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Data
          </h3>
          <nav className="space-y-1">
            {dataNavItems.map((item) => (
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

        {/* Resources */}
        <div className="px-3 mb-6">
          <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Resources
          </h3>
          <nav className="space-y-1">
            {resourceNavItems.map((item) => (
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
