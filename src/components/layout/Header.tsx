import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  LogOut, 
  User, 
  Settings, 
  CreditCard,
  Bookmark,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Marketing navigation (logged out)
  const marketingNavItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Ask TelAfrik', path: '/ask', highlight: true },
  ];

  const resourcesNavItems = [
    { label: 'Startups', path: '/directory' },
    { label: 'Founders', path: '/founders' },
    { label: 'Sectors', path: '/sectors' },
    { label: 'Countries/Markets', path: '/countries' },
    { label: 'Funding & Deals', path: '/deals' },
    { label: 'Signals', path: '/signals' },
    { label: 'Reports', path: '/reports' },
    { label: 'Regulatory Intel', path: '/regulatory-intel' },
    { label: 'Investors', path: '/investors' },
  ];

  // Product navigation (logged in)
  const productNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Directory', path: '/directory' },
    { label: 'Signals', path: '/signals' },
    { label: 'Reports', path: '/reports' },
    { label: 'KonektAfrik', path: '/konekt' },
  ];

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
            <img
              src="/logo.png"
              alt="TelAfrik by Ennylytics"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {isAuthenticated ? (
              // Product navigation
              productNavItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'text-foreground bg-muted' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-muted rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))
            ) : (
              // Marketing navigation
              <>
                {marketingNavItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                        isActive(item.path) 
                          ? 'text-foreground bg-muted' 
                          : item.highlight
                            ? 'text-emerald hover:bg-emerald/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {item.highlight && <Sparkles className="h-3.5 w-3.5" />}
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-muted rounded-lg -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 flex items-center gap-1">
                      Resources
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {resourcesNavItems.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/pricing">Pricing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/methodology">Methodology</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/search" className="hidden sm:flex">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald rounded-full" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-muted/50 transition-colors">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-emerald/10 text-emerald text-xs font-medium">
                          {getInitials(user?.user_metadata?.full_name || user?.email)}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/watchlist" className="flex items-center">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Watchlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/pricing" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                        <Badge className="ml-auto text-[10px] px-1.5 py-0 h-4 bg-gold/10 border-gold/20 text-gold">
                          NEW
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                  <Link to="/auth">Log in</Link>
                </Button>
                <Button size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/auth">Start Free</Link>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden py-4 border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col gap-1">
                {isAuthenticated ? (
                  // Product navigation for mobile
                  productNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        isActive(item.path)
                          ? 'text-foreground bg-muted'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                ) : (
                  // Marketing navigation for mobile
                  <>
                    {[...marketingNavItems, ...resourcesNavItems].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                          isActive(item.path)
                            ? 'text-foreground bg-muted'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
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
                  </>
                )}
                <div className="flex gap-2 pt-4 px-3">
                  {isAuthenticated ? (
                    <>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="flex-1"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                      </Button>
                      <Button size="sm" asChild className="flex-1">
                        <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Start Free</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
