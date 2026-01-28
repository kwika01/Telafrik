import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Filter, 
  Search,
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  Globe,
  Star,
  ChevronRight
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KonektMatches = () => {
  const [matchType, setMatchType] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const matches = [
    {
      id: 1,
      type: 'investor',
      name: 'Y Combinator',
      logo: '🏢',
      matchScore: 95,
      reason: 'High alignment with your Fintech focus and Series A stage',
      sectors: ['Fintech', 'SaaS'],
      checkSize: '$500K - $1M',
      location: 'Global'
    },
    {
      id: 2,
      type: 'investor',
      name: 'Partech Africa',
      logo: '🌍',
      matchScore: 92,
      reason: 'Strong Africa focus, active in your sector',
      sectors: ['Fintech', 'Logistics'],
      checkSize: '$1M - $5M',
      location: 'Africa'
    },
    {
      id: 3,
      type: 'startup',
      name: 'PayStack',
      logo: '💳',
      matchScore: 88,
      reason: 'Potential strategic partner for payment infrastructure',
      sectors: ['Fintech'],
      stage: 'Series C',
      location: 'Nigeria'
    },
    {
      id: 4,
      type: 'investor',
      name: 'TLcom Capital',
      logo: '💼',
      matchScore: 87,
      reason: 'Active Series A investor in East Africa tech',
      sectors: ['Fintech', 'Healthtech'],
      checkSize: '$1M - $10M',
      location: 'Kenya'
    },
    {
      id: 5,
      type: 'startup',
      name: 'Andela',
      logo: '👩‍💻',
      matchScore: 85,
      reason: 'Complementary talent solution for your growth',
      sectors: ['HR Tech'],
      stage: 'Series E',
      location: 'Nigeria'
    },
  ];

  const filteredMatches = matchType === 'all' 
    ? matches 
    : matches.filter(m => m.type === matchType);

  return (
    <AppLayout>
      {/* Header */}
      <section className="py-12 border-b border-border/50 bg-gradient-to-b from-violet-950/30 to-background">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-violet-500/20">
                <Sparkles className="h-5 w-5 text-violet-400" />
              </div>
              <Badge variant="secondary">AI-Powered</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Smart Matches
            </h1>
            <p className="text-muted-foreground">
              AI-curated recommendations based on your profile, sector focus, and growth stage. 
              Connect with the right investors and partners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border/50">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search matches..." className="pl-10" />
            </div>
            <Select value={matchType} onValueChange={setMatchType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Match type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="investor">Investors</SelectItem>
                <SelectItem value="startup">Startups</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Matches Grid */}
      <section className="py-8">
        <div className="container-wide">
          <motion.div 
            className="grid gap-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {filteredMatches.map((match) => (
              <motion.div key={match.id} variants={itemVariants}>
                <Card className="hover:shadow-lg hover:border-violet-500/30 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Logo/Avatar */}
                      <div className="text-4xl">{match.logo}</div>

                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg group-hover:text-violet-400 transition-colors">
                            {match.name}
                          </h3>
                          <Badge variant="outline" className="capitalize">
                            {match.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{match.reason}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          {match.sectors.map((sector) => (
                            <Badge key={sector} variant="secondary" className="bg-violet-500/10 text-violet-400">
                              {sector}
                            </Badge>
                          ))}
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Globe className="h-3.5 w-3.5" />
                            {match.location}
                          </span>
                          {match.checkSize && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <TrendingUp className="h-3.5 w-3.5" />
                              {match.checkSize}
                            </span>
                          )}
                          {match.stage && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              {match.stage}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-2">
                          <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              className="text-muted/20"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(match.matchScore / 100) * 176} 176`}
                              className="text-violet-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">{match.matchScore}%</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">Match Score</span>
                      </div>

                      {/* Action */}
                      <Button variant="ghost" size="icon" className="group-hover:bg-violet-500/10">
                        <ChevronRight className="h-5 w-5 group-hover:text-violet-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or complete your profile for better matches.</p>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default KonektMatches;