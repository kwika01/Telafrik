import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Building2,
  TrendingUp,
  Globe,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';
import PasswordStrengthIndicator from '@/components/auth/PasswordStrengthIndicator';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', fullName: '' });

  // Get the intended destination after login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        toast.success('Welcome to TelAfrik!', {
          description: 'Redirecting to your dashboard...'
        });
        navigate(from, { replace: true });
      }
    });

    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(from, { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'Invalid email or password. Please try again.' 
        : error.message);
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate password strength
    const hasMinLength = signupData.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(signupData.password);
    const hasLowercase = /[a-z]/.test(signupData.password);
    const hasNumber = /[0-9]/.test(signupData.password);

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
      setError('Please ensure your password meets all requirements.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: signupData.fullName,
        },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        setError('This email is already registered. Please sign in instead.');
        setActiveTab('login');
        setLoginData({ email: signupData.email, password: '' });
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    } else {
      setSuccess('Account created! Check your email to confirm your account.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      setError('Please enter your email address first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(loginData.email, {
      redirectTo: `${window.location.origin}/auth?reset=true`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset link sent! Check your email.');
    }
    setIsLoading(false);
  };

  // Features with accent colors
  const features = [
    { icon: Building2, text: 'Track 2,400+ African startups', accent: 'emerald' },
    { icon: TrendingUp, text: 'Real-time funding data & valuations', accent: 'gold' },
    { icon: Globe, text: 'Coverage across 54 countries', accent: 'terracotta' },
  ] as const;

  const accentClasses = {
    emerald: { bg: 'bg-emerald/10', text: 'text-emerald', border: 'border-emerald/20' },
    gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20' },
    terracotta: { bg: 'bg-terracotta/10', text: 'text-terracotta', border: 'border-terracotta/20' },
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted/30 border-r border-border">
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-12">
          {/* Logo */}
          <Link to="/" className="flex items-center mb-12">
            <img
              src="/logo.png"
              alt="TelAfrik by Ennylytics"
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          {/* Headline */}
          <h1 className="text-3xl xl:text-4xl font-semibold text-foreground mb-4 leading-tight">
            Africa's Premier{' '}
            <span className="text-emerald">Investment Intelligence</span>{' '}
            Platform
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
            Access detailed funding data, valuations, and growth metrics on thousands of African startups. Make data-driven investment decisions.
          </p>
          
          {/* Features */}
          <div className="space-y-4 mb-12">
            {features.map((feature) => {
              const classes = accentClasses[feature.accent];
              return (
                <div
                  key={feature.text}
                  className="flex items-center gap-4"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${classes.bg} ${classes.border} border`}>
                    <feature.icon className={`w-5 h-5 ${classes.text}`} />
                  </div>
                  <span className="text-foreground font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Social proof */}
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-semibold">2,500+</span> investors
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "TelAfrik has transformed how we source deals across Africa. The data quality is unmatched."
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="TelAfrik by Ennylytics"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-11 p-1 bg-muted">
              <TabsTrigger 
                value="login" 
                className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Error Alert */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert className="mb-6 border-emerald/50 bg-emerald/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald" />
                    <AlertDescription className="text-emerald">{success}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Tab */}
            <TabsContent value="login" className="mt-0">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
                  <p className="text-muted-foreground mt-2">
                    Sign in to access your investment dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@company.com"
                        className="pl-10 h-11"
                        value={loginData.email}
                        onChange={(e) => {
                          setLoginData({ ...loginData, email: e.target.value });
                          setError(null);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11"
                        value={loginData.password}
                        onChange={(e) => {
                          setLoginData({ ...loginData, password: e.target.value });
                          setError(null);
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      New to TelAfrik?
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-11"
                  onClick={() => setActiveTab('signup')}
                >
                  Create an account
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="mt-0">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground">Create your account</h2>
                  <p className="text-muted-foreground mt-2">
                    Start tracking African startups today
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-11"
                        value={signupData.fullName}
                        onChange={(e) => {
                          setSignupData({ ...signupData, fullName: e.target.value });
                          setError(null);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@company.com"
                        className="pl-10 h-11"
                        value={signupData.email}
                        onChange={(e) => {
                          setSignupData({ ...signupData, email: e.target.value });
                          setError(null);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 h-11"
                        value={signupData.password}
                        onChange={(e) => {
                          setSignupData({ ...signupData, password: e.target.value });
                          setError(null);
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    <AnimatePresence>
                      {signupData.password && (
                        <PasswordStrengthIndicator 
                          password={signupData.password}
                          showRequirements={true}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-11"
                  onClick={() => setActiveTab('login')}
                >
                  Sign in instead
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
