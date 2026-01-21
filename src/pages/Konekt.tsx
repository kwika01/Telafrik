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
  Search,
  Filter,
  Star,
  CheckCircle2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Konekt = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Get smart recommendations connecting startups with relevant investors based on sector, stage, and preferences.',
      icon: Sparkles,
      color: 'from-violet-500 to-fuchsia-500',
      href: '/konekt/matches',
      badge: 'AI-Powered'
    },
    {
      title: 'Introduction Requests',
      description: 'Request warm intros to companies and investors in our network. Build meaningful connections.',
      icon: MessageSquare,
      color: 'from-cyan-500 to-blue-500',
      href: '/konekt/intros',
      badge: 'Request Access'
    },
    {
      title: 'Networking Directory',
      description: 'Browse professionals open to connecting, filtered by role, sector, and country.',
      icon: UserPlus,
      color: 'from-emerald-500 to-teal-500',
      href: '/konekt/connections',
      badge: 'Explore'
    },
  ];

  const stats = [
    { label: 'Active Network Members', value: '1,200+', icon: Users },
    { label: 'Companies Connected', value: '850+', icon: Building2 },
    { label: 'Successful Intros', value: '340+', icon: Handshake },
    { label: 'Deals Facilitated', value: '$45M+', icon: TrendingUp },
  ];

  const recentMatches = [
    { startup: 'Paystack', investor: 'Stripe', sector: 'Fintech', status: 'Connected' },
    { startup: 'Andela', investor: 'SoftBank', sector: 'HR Tech', status: 'In Progress' },
    { startup: 'Flutterwave', investor: 'Tiger Global', sector: 'Fintech', status: 'Connected' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-background to-fuchsia-950 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-wide relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-sm font-medium mb-6"
            >
              <Handshake className="h-4 w-4" />
              KonektAfrik Network
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Connect with Africa's{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Startup Ecosystem
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-10"
            >
              AI-powered matching, warm introductions, and a curated network of founders, 
              investors, and ecosystem players across 54 African countries.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90">
                <Link to="/konekt/matches">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Find Your Match
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-violet-500/30 hover:bg-violet-500/10">
                <Link to="/konekt/connections">
                  Browse Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border/50">
        <div className="container-wide">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-violet-400" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container-wide">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How KonektAfrik Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build meaningful connections with the right people at the right time
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Link to={feature.href}>
                  <Card className="h-full hover:shadow-xl hover:border-violet-500/50 transition-all group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary">{feature.badge}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-violet-400 transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-violet-400 group-hover:text-violet-300">
                        Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Matches */}
      <section className="py-16 bg-gradient-to-b from-background to-violet-950/20">
        <div className="container-wide">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Recent Connections</h2>
              <p className="text-muted-foreground">Latest successful matches in our network</p>
            </div>
            <Button variant="outline" asChild className="border-violet-500/30">
              <Link to="/konekt/matches">View All Matches</Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {recentMatches.map((match, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-violet-400 border-violet-400/30">
                        {match.sector}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className={match.status === 'Connected' ? 'text-emerald-400' : 'text-amber-400'}>
                          {match.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">Startup</div>
                        <div className="font-semibold">{match.startup}</div>
                      </div>
                      <Handshake className="h-5 w-5 text-violet-400" />
                      <div className="flex-1 text-right">
                        <div className="text-sm text-muted-foreground">Investor</div>
                        <div className="font-semibold">{match.investor}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-wide">
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.1)'%3E%3C/path%3E%3C/svg%3E\")" }} />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Expand Your Network?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join KonektAfrik and get matched with the right investors, partners, and ecosystem players to accelerate your growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/auth">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Konekt;