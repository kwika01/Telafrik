import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  Sparkles, 
  MessageSquare, 
  UserPlus, 
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
  Zap
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Konekt = () => {
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Get smart recommendations connecting startups with relevant investors based on sector, stage, and preferences.',
      icon: Sparkles,
      accent: 'indigo' as const,
      href: '/konekt/matches',
      badge: 'AI-Powered'
    },
    {
      title: 'Introduction Requests',
      description: 'Request warm intros to companies and investors in our network. Build meaningful connections.',
      icon: MessageSquare,
      accent: 'gold' as const,
      href: '/konekt/intros',
      badge: 'Request Access'
    },
    {
      title: 'Networking Directory',
      description: 'Browse professionals open to connecting, filtered by role, sector, and country.',
      icon: UserPlus,
      accent: 'emerald' as const,
      href: '/konekt/connections',
      badge: 'Explore'
    },
  ];

  const stats = [
    { label: 'Active Network Members', value: '1,200+', icon: Users, accent: 'indigo' as const },
    { label: 'Companies Connected', value: '850+', icon: Building2, accent: 'emerald' as const },
    { label: 'Successful Intros', value: '340+', icon: Handshake, accent: 'gold' as const },
    { label: 'Deals Facilitated', value: '$45M+', icon: TrendingUp, accent: 'terracotta' as const },
  ];

  const recentMatches = [
    { startup: 'Paystack', investor: 'Stripe', sector: 'Fintech', status: 'Connected' },
    { startup: 'Andela', investor: 'SoftBank', sector: 'HR Tech', status: 'In Progress' },
    { startup: 'Flutterwave', investor: 'Tiger Global', sector: 'Fintech', status: 'Connected' },
  ];

  const accentClasses = {
    indigo: { bg: 'bg-indigo/10', text: 'text-indigo', border: 'border-indigo/20', hoverBorder: 'hover:border-indigo/40' },
    gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20', hoverBorder: 'hover:border-gold/40' },
    emerald: { bg: 'bg-emerald/10', text: 'text-emerald', border: 'border-emerald/20', hoverBorder: 'hover:border-emerald/40' },
    terracotta: { bg: 'bg-terracotta/10', text: 'text-terracotta', border: 'border-terracotta/20', hoverBorder: 'hover:border-terracotta/40' },
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="section border-b border-border">
        <div className="container-wide">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo/10 border border-indigo/20 text-foreground text-sm font-medium mb-6">
              <Handshake className="h-4 w-4 text-indigo" />
              KonektAfrik Network
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Connect with Africa's{' '}
              <span className="text-indigo">Startup Ecosystem</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              AI-powered matching, warm introductions, and a curated network of founders, 
              investors, and ecosystem players across 54 African countries.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/konekt/matches">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find Your Match
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/konekt/connections">
                  Browse Network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-muted/30 border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const classes = accentClasses[stat.accent];
              return (
                <div
                  key={stat.label}
                  className="text-center p-4"
                >
                  <div className={`w-10 h-10 rounded-lg ${classes.bg} ${classes.border} border flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`h-5 w-5 ${classes.text}`} />
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold ${classes.text}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <div className="container-wide">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">Features</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              How KonektAfrik Works
            </h2>
            <div className="w-12 h-1 bg-gold/30 rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Build meaningful connections with the right people at the right time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((feature) => {
              const classes = accentClasses[feature.accent];
              return (
                <Link key={feature.title} to={feature.href}>
                  <Card className={`h-full border-border ${classes.hoverBorder} hover:shadow-md transition-all group cursor-pointer`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 rounded-lg ${classes.bg} ${classes.border} border`}>
                          <feature.icon className={`h-5 w-5 ${classes.text}`} />
                        </div>
                        <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                      </div>
                      <CardTitle className={`group-hover:${classes.text} transition-colors`}>
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center text-sm ${classes.text}`}>
                        Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Matches */}
      <section className="section bg-muted/30">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Handshake className="h-4 w-4 text-emerald" />
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald">Network Activity</span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Recent Connections</h2>
              <p className="text-muted-foreground text-sm mt-1">Latest successful matches in our network</p>
            </div>
            <Button variant="outline" size="sm" asChild className="border-emerald/20 hover:border-emerald/40 hover:bg-emerald/5">
              <Link to="/konekt/matches">View All Matches</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {recentMatches.map((match, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-indigo border-indigo/20 bg-indigo/5">
                      {match.sector}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${match.status === 'Connected' ? 'text-emerald' : 'text-gold'}`} />
                      <span className={match.status === 'Connected' ? 'text-emerald' : 'text-gold'}>
                        {match.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">Startup</div>
                      <div className="font-semibold text-foreground">{match.startup}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                      <Handshake className="h-4 w-4 text-emerald" />
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">Investor</div>
                      <div className="font-semibold text-foreground">{match.investor}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Zap className="h-10 w-10 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Ready to Expand Your Network?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Join KonektAfrik and get matched with the right investors, partners, and ecosystem players to accelerate your growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Konekt;
