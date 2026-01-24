import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const mainNavItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Ask TelAfrik', path: '/ask', highlight: true },
  ];

  const resourcesNavItems = [
    { label: 'Startups', path: '/directory' },
    { label: 'Founders', path: '/founders' },
    { label: 'Sectors', path: '/sectors' },
    { label: 'Companies', path: '/companies' },
    { label: 'Countries/Markets', path: '/countries' },
    { label: 'Funding & Deals', path: '/deals' },
    { label: 'Signals', path: '/signals' },
    { label: 'Reports', path: '/reports' },
    { label: 'Investors', path: '/investors' },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-gradient-to-r from-background via-secondary/30 to-background backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" 
           style={{ backgroundSize: '200% 100%' }} 
      />
      
      <div className="container-full">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/25"
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                TelAfrik
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide">
                by Ennylytics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                    isActive(item.path) 
                      ? 'text-primary bg-primary/10' 
                      : item.highlight
                        ? 'text-primary hover:bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {item.highlight && <Sparkles className="h-3.5 w-3.5" />}
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  className="nav-link flex items-center gap-1"
                >
                  Resources
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
                {resourcesNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild className="hover:bg-primary/10 focus:bg-primary/10">
                    <Link to={item.path}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:bg-primary/10 focus:bg-primary/10">
                  <Link to="/pricing">Pricing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-primary/10 focus:bg-primary/10">
                  <Link to="/methodology">Methodology</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/search" className="hidden sm:flex">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary/80">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                <Link to="/auth">Log in</Link>
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px hsl(173 80% 45% / 0.4)" }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button size="sm" asChild className="hidden sm:inline-flex bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25">
                <Link to="/auth">Start Free</Link>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border/50"
          >
            <nav className="flex flex-col gap-1">
              {[...mainNavItems, ...resourcesNavItems].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3" />
              <Link
                to="/pricing"
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/methodology"
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Methodology
              </Link>
              <div className="flex gap-2 pt-4 px-3">
                <Button variant="outline" size="sm" asChild className="flex-1 border-border/50">
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-primary to-accent">
                  <Link to="/auth">Start Free</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
