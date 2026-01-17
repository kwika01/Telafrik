import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Target, Eye, Heart, Users, Globe, Lightbulb, TrendingUp, Award, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Every startup we track represents potential to transform lives across Africa.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously evolve our platform to meet the needs of the African ecosystem.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build bridges between founders, investors, and institutions.',
  },
];

const milestones = [
  { year: '2025', event: 'Founded in Mansfield, Texas, with a mission to connect African startups and global investors through trusted data and intelligence.' },
  { year: '2025', event: 'Launched beta platform, tracking 500+ African startups across key sectors including fintech, healthtech, agritech, logistics, and climate tech.' },
  { year: '2025', event: 'Reached 2,000+ startups and 500+ investors on the platform, validating strong demand for structured African startup data.' },
  { year: '2026', event: 'Expanded coverage to all 54 African countries, deepening data quality on startups, funding rounds, investors, and ecosystem signals.' },
];

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-fuchsia-500/20 to-orange-500/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                About TelAfrik
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500">
                The Definitive Data & Intelligence Platform for African Startups
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Powering smarter investments, stronger ecosystems, and sustainable growth across all 54 African countries.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Headquartered in Mansfield, Texas</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Story */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                The <span className="text-gradient-gold">TelAfrik</span> Story
              </h2>
              
              <div className="prose prose-lg dark:prose-invert mx-auto space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  TelAfrik was born out of a clear and persistent gap in Africa's innovation ecosystem.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Despite Africa's startup landscape attracting billions of dollars in venture capital and development funding, there was no single, reliable, and structured source of truth for understanding the companies driving this growth. Critical information was fragmented across press releases, pitch decks, social media, and disconnected databases—making informed decision-making unnecessarily difficult.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Investors struggled to discover credible deal flow and track emerging sectors. Founders lacked benchmarks to measure traction and valuations. Journalists depended on scattered or outdated sources. Researchers and policymakers faced persistent data gaps that limited insight into Africa's innovation economy.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2025 by a team of data enthusiasts and long-term believers in Africa's potential, TelAfrik set out to solve this problem at its core.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We built the infrastructure to systematically track, verify, and analyze startups, funding rounds, investors, and market signals across the African continent. Our platform combines structured company data, ecosystem intelligence, and continuously updated insights—designed specifically for Africa's unique markets.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, TelAfrik serves as a trusted intelligence layer for venture capital firms, angel investors, accelerators, development finance institutions, researchers, and media organizations seeking accurate, up-to-date visibility into Africa's startup ecosystem.
                </p>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Headquartered in Mansfield, Texas, TelAfrik was founded with a global perspective and a clear mission: to make it easier for African startups and global investors to discover each other, make better decisions, and accelerate innovation across the continent.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center mb-6">
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To make it easier for African startups and global investors to discover each other, make better decisions, and accelerate innovation across the continent.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-2 border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/5 to-transparent">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-orange-500 flex items-center justify-center mb-6">
                      <Globe className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To become the definitive data and intelligence platform for African startups, powering smarter investments, stronger ecosystems, and sustainable growth across all 54 African countries.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              TelAfrik <span className="text-gradient-rainbow">Timeline</span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-violet-500 to-fuchsia-500" />
                
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={`${milestone.year}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20 pb-10 last:pb-0"
                  >
                    <div className="absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="bg-card border rounded-xl p-6">
                      <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                      <p className="text-foreground mt-1">{milestone.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient-gold">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at TelAfrik
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the <span className="text-gradient-rainbow">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind TelAfrik's mission
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold group-hover:scale-110 transition-transform">
                        {member.avatar}
                      </div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: '2,000+', label: 'Startups Tracked', icon: TrendingUp },
                { value: '54', label: 'African Countries', icon: Globe },
                { value: '500+', label: 'Active Investors', icon: Users },
                { value: '$15B+', label: 'Funding Tracked', icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-violet-500/10 to-fuchsia-500/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Movement
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Whether you're an investor seeking deal flow, a founder looking to benchmark, 
                or a researcher needing data — TelAfrik is built for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/directory" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Explore Startups
                </a>
                <a 
                  href="/pricing" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
