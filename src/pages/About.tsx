import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Target, Eye, Heart, Users, Globe, Lightbulb, TrendingUp, Award, MapPin, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'Ernest Mensa',
    role: 'Founder & CEO',
    bio: 'Passionate about democratizing access to African startup data and empowering investors with actionable intelligence.',
    avatar: 'EM',
  },
  {
    name: 'Adaeze Nwosu',
    role: 'Head of Data',
    bio: 'Data scientist with 8+ years experience in market research and analytics across emerging markets.',
    avatar: 'AN',
  },
  {
    name: 'Kwame Asante',
    role: 'Head of Partnerships',
    bio: 'Former VC associate with deep networks across African investment ecosystems.',
    avatar: 'KA',
  },
  {
    name: 'Fatima Hassan',
    role: 'Lead Engineer',
    bio: 'Full-stack developer passionate about building tools that drive economic development in Africa.',
    avatar: 'FH',
  },
];

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We believe in open access to data that powers better investment decisions.',
    accent: 'gold',
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Every startup we track represents potential to transform lives across Africa.',
    accent: 'terracotta',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously evolve our platform to meet the needs of the African ecosystem.',
    accent: 'emerald',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build bridges between founders, investors, and institutions.',
    accent: 'indigo',
  },
] as const;

const milestones = [
  { year: '2025', event: 'Founded in Mansfield, Texas, with a mission to connect African startups and global investors through trusted data and intelligence.' },
  { year: '2025', event: 'Launched beta platform, tracking 500+ African startups across key sectors including fintech, healthtech, agritech, logistics, and climate tech.' },
  { year: '2025', event: 'Reached 2,000+ startups and 500+ investors on the platform, validating strong demand for structured African startup data.' },
  { year: '2026', event: 'Expanded coverage to all 54 African countries, deepening data quality on startups, funding rounds, investors, and ecosystem signals.' },
];

const accentClasses = {
  gold: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20' },
  emerald: { bg: 'bg-emerald/10', text: 'text-emerald', border: 'border-emerald/20' },
  terracotta: { bg: 'bg-terracotta/10', text: 'text-terracotta', border: 'border-terracotta/20' },
  indigo: { bg: 'bg-indigo/10', text: 'text-indigo', border: 'border-indigo/20' },
};

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="section border-b border-border">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-foreground text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 text-gold" />
                About TelAfrik
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
                The Definitive Data & Intelligence Platform for{' '}
                <span className="text-emerald">African Startups</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Powering smarter investments, stronger ecosystems, and sustainable growth across all 54 African countries.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-sm">Headquartered in Mansfield, Texas</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Story */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              {/* Section Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold">Our Story</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  The <span className="text-gold">TelAfrik</span> Story
                </h2>
              </div>
              
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  TelAfrik was born out of a clear and persistent gap in Africa's innovation ecosystem.
                </p>
                <p>
                  Despite Africa's startup landscape attracting billions of dollars in venture capital and development funding, there was no single, reliable, and structured source of truth for understanding the companies driving this growth. Critical information was fragmented across press releases, pitch decks, social media, and disconnected databases—making informed decision-making unnecessarily difficult.
                </p>
                <p>
                  Investors struggled to discover credible deal flow and track emerging sectors. Founders lacked benchmarks to measure traction and valuations. Journalists depended on scattered or outdated sources. Researchers and policymakers faced persistent data gaps that limited insight into Africa's innovation economy.
                </p>
                <p>
                  Founded in 2025 by a team of data enthusiasts and long-term believers in Africa's potential, TelAfrik set out to solve this problem at its core.
                </p>
                <p>
                  We built the infrastructure to systematically track, verify, and analyze startups, funding rounds, investors, and market signals across the African continent. Our platform combines structured company data, ecosystem intelligence, and continuously updated insights—designed specifically for Africa's unique markets.
                </p>
                <p>
                  Today, TelAfrik serves as a trusted intelligence layer for venture capital firms, angel investors, accelerators, development finance institutions, researchers, and media organizations seeking accurate, up-to-date visibility into Africa's startup ecosystem.
                </p>
                <p className="font-medium text-foreground">
                  Headquartered in Mansfield, Texas, TelAfrik was founded with a global perspective and a clear mission: to make it easier for African startups and global investors to discover each other, make better decisions, and accelerate innovation across the continent.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="section">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-terracotta" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">Market Timing</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Why <span className="text-terracotta">Now</span>
                </h2>
                <div className="w-12 h-1 bg-terracotta/30 rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Africa's startup ecosystem has reached an inflection point—but its infrastructure has not.
                </p>
              </div>

              <div className="space-y-5 text-muted-foreground leading-relaxed mb-12">
                <p>
                  Over the last decade, Africa has produced thousands of venture-backed startups, attracted billions of dollars in private capital, and created a new generation of founders building globally relevant technology companies. The ecosystem is no longer emerging; it is scaling.
                </p>
                <p className="font-medium text-foreground">
                  Yet, the core infrastructure required to support a mature venture market is still missing.
                </p>
              </div>

              {/* Fragmentation Section */}
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                  Fragmentation Is Now the Bottleneck
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                  Today, African startup and investor data is fragmented across newsletters, media articles, spreadsheets, WhatsApp groups, LinkedIn posts, pitch decks, and global platforms that were not designed for African markets.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    'Investors struggle to get reliable, comparable deal flow',
                    'Founders struggle to gain visibility beyond their immediate networks',
                    'Corporates, DFIs, and governments lack structured intelligence',
                    'Analysts and researchers rely on manual, error-prone aggregation',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-center text-sm">
                  This fragmentation was tolerable when deal volume was small.{' '}
                  <span className="font-semibold text-foreground">It is untenable at today's scale.</span>
                </p>
              </div>

              {/* Outgrown Manual Discovery */}
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                  Africa Has Outgrown Manual Discovery
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  What has changed is not interest in Africa—it is <strong className="text-foreground">velocity</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'More startups are raising earlier and faster',
                    'More funds are actively deploying across multiple African markets',
                    'More cross-border and diaspora investors are participating',
                    'More governments and institutions require data-backed insight',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-emerald/5 border border-emerald/20 rounded-lg"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <Card className="border-border">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-3 text-sm">
                      At this scale, manual discovery breaks.
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm">
                      Every major venture ecosystem—Silicon Valley, Europe, China, India—only truly accelerated after a <strong className="text-foreground">system of record</strong> emerged to standardize data, surface signals, and connect actors efficiently.
                    </p>
                    <p className="font-semibold text-emerald">
                      Africa is the last major venture market without that system.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Global Platforms */}
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                  Global Platforms Are Not Solving This
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  Global tools like Crunchbase, PitchBook, and Dealroom are invaluable—but they are <strong className="text-foreground">Africa-light</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-border">
                    <CardContent className="p-5">
                      <h4 className="font-semibold mb-3 text-foreground text-sm">They rely on:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          Voluntary reporting
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          Western media signals
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          Global heuristics that do not reflect African realities
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-terracotta/20 bg-terracotta/5">
                    <CardContent className="p-5">
                      <h4 className="font-semibold mb-3 text-foreground text-sm">As a result:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                          Coverage is incomplete
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                          Context is missing
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                          Local investors, founders, and regulators are underserved
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-center text-muted-foreground text-sm">
                  Africa does not need a copy of global tools.{' '}
                  <span className="font-semibold text-foreground">It needs infrastructure designed for its markets, data gaps, and growth patterns.</span>
                </p>
              </div>

              {/* Timing Is Right */}
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                  The Timing Is Now Right
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-center">
                  Three forces are converging:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      title: 'Ecosystem Maturity',
                      description: 'The number of fundable startups and active investors has crossed the threshold where a unified platform creates immediate value.',
                      icon: Users,
                      accent: 'indigo' as const,
                    },
                    {
                      title: 'Data Exhaust',
                      description: 'African startups now leave digital signals—funding, hiring, traction, expansion—that can be captured and structured for the first time.',
                      icon: TrendingUp,
                      accent: 'gold' as const,
                    },
                    {
                      title: 'Demand for Trust',
                      description: 'Capital allocators increasingly require verified data, audit trails, and repeatable insights—not anecdotes.',
                      icon: Award,
                      accent: 'emerald' as const,
                    },
                  ].map((item) => {
                    const classes = accentClasses[item.accent];
                    return (
                      <Card key={item.title} className="border-border hover:shadow-md transition-shadow">
                        <CardContent className="p-5 text-center">
                          <div className={`w-10 h-10 rounded-lg ${classes.bg} ${classes.border} border flex items-center justify-center mx-auto mb-4`}>
                            <item.icon className={`h-5 w-5 ${classes.text}`} />
                          </div>
                          <h4 className="font-semibold mb-2 text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <p className="text-center text-muted-foreground text-sm italic">
                  Together, these forces create a narrow window where a first-class, Africa-first system of record can become the default.
                </p>
              </div>

              {/* Why TelAfrik */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Why <span className="text-gold">TelAfrik</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  TelAfrik exists because the African venture ecosystem is ready for <strong className="text-foreground">infrastructure</strong>, not another directory or community.
                </p>
                <Card className="border-border bg-muted/30">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">By unifying:</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {[
                        'Structured startup and investor data',
                        'Live market signals',
                        'Trusted founder–investor connections',
                      ].map((item, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-foreground font-medium text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold text-emerald">
                      TelAfrik transforms fragmentation into clarity, and discovery into infrastructure.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center mb-5">
                    <Target className="h-5 w-5 text-emerald" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To make it easier for African startups and global investors to discover each other, make better decisions, and accelerate innovation across the continent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Globe className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the definitive data and intelligence platform for African startups, powering smarter investments, stronger ecosystems, and sustainable growth across all 54 African countries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section">
          <div className="container-wide">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo" />
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo">Our Journey</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                TelAfrik Timeline
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                
                {milestones.map((milestone, index) => (
                  <div
                    key={`${milestone.year}-${index}`}
                    className="relative pl-16 pb-8 last:pb-0"
                  >
                    {/* Year badge */}
                    <div className="absolute left-3 w-6 h-6 rounded-full bg-indigo/10 border border-indigo/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-indigo">{milestone.year.slice(-2)}</span>
                    </div>
                    {/* Content card */}
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <span className="text-xs font-semibold text-indigo">{milestone.year}</span>
                        <p className="text-foreground mt-1 text-sm">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="h-4 w-4 text-terracotta" />
                <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">What We Believe</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Our Values
              </h2>
              <div className="w-12 h-1 bg-terracotta/30 rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do at TelAfrik
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {values.map((value) => {
                const classes = accentClasses[value.accent];
                return (
                  <Card key={value.title} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-5 text-center">
                      <div className={`w-10 h-10 rounded-lg ${classes.bg} ${classes.border} border flex items-center justify-center mx-auto mb-4`}>
                        <value.icon className={`h-5 w-5 ${classes.text}`} />
                      </div>
                      <h3 className="font-semibold mb-2 text-foreground">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container-wide">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-indigo" />
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo">Our People</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Meet the Team
              </h2>
              <div className="w-12 h-1 bg-indigo/30 rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground max-w-xl mx-auto">
                The passionate people behind TelAfrik's mission
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => {
                const accents = ['emerald', 'gold', 'terracotta', 'indigo'] as const;
                const accent = accents[index % accents.length];
                const classes = accentClasses[accent];
                return (
                  <Card key={member.name} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-5 text-center">
                      <div className={`w-14 h-14 rounded-full ${classes.bg} ${classes.border} border flex items-center justify-center mx-auto mb-4`}>
                        <span className={`text-lg font-bold ${classes.text}`}>{member.avatar}</span>
                      </div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className={`text-sm font-medium mb-2 ${classes.text}`}>{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '2,000+', label: 'Startups Tracked', accent: 'emerald' as const },
                { value: '54', label: 'African Countries', accent: 'gold' as const },
                { value: '500+', label: 'Active Investors', accent: 'indigo' as const },
                { value: '$15B+', label: 'Funding Tracked', accent: 'terracotta' as const },
              ].map((stat) => {
                const classes = accentClasses[stat.accent];
                return (
                  <div key={stat.label} className="text-center">
                    <div className={`text-3xl md:text-4xl font-bold mb-1 ${classes.text}`}>
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-lg bg-primary">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Zap className="h-10 w-10 text-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
                Join the Movement
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
                Whether you're an investor seeking deal flow, a founder looking to benchmark, 
                or a researcher needing data — TelAfrik is built for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/directory">Explore Startups</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
