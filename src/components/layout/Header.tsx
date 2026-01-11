import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Startups', path: '/directory' },
    { label: 'Investors', path: '/investors' },
    { label: 'Trending', path: '/trending' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Africa<span className="text-accent">Base</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors">
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/sectors">Sectors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/countries">Countries</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/reports">Reports</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/search" className="hidden sm:flex">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/signup">Get Started</Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-foreground bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 px-4">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
