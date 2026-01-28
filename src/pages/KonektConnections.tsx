import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Search,
  Filter,
  Globe,
  Briefcase,
  Mail,
  Linkedin,
  Twitter,
  MessageCircle,
  Star
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const KonektConnections = () => {
  const [roleFilter, setRoleFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const networkMembers = [
    {
      id: 1,
      name: 'Adaora Nwankwo',
      role: 'Founder & CEO',
      company: 'PayStack',
      avatar: null,
      initials: 'AN',
      sector: 'Fintech',
      country: 'Nigeria',
      openTo: ['Mentorship', 'Partnerships'],
      verified: true
    },
    {
      id: 2,
      name: 'Kwame Asante',
      role: 'Partner',
      company: 'Partech Africa',
      avatar: null,
      initials: 'KA',
      sector: 'VC',
      country: 'Ghana',
      openTo: ['Deal Flow', 'Investments'],
      verified: true
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      role: 'CTO',
      company: 'Andela',
      avatar: null,
      initials: 'FH',
      sector: 'HR Tech',
      country: 'Kenya',
      openTo: ['Tech Partnerships', 'Hiring'],
      verified: false
    },
    {
      id: 4,
      name: 'Samuel Obi',
      role: 'Angel Investor',
      company: 'Independent',
      avatar: null,
      initials: 'SO',
      sector: 'Healthtech',
      country: 'Nigeria',
      openTo: ['Investments', 'Advisory'],
      verified: true
    },
    {
      id: 5,
      name: 'Amina Diallo',
      role: 'Head of Growth',
      company: 'Flutterwave',
      avatar: null,
      initials: 'AD',
      sector: 'Fintech',
      country: 'Senegal',
      openTo: ['Partnerships', 'Speaking'],
      verified: true
    },
    {
      id: 6,
      name: 'Tendai Moyo',
      role: 'Managing Director',
      company: 'TLcom Capital',
      avatar: null,
      initials: 'TM',
      sector: 'VC',
      country: 'South Africa',
      openTo: ['Deal Flow', 'Mentorship'],
      verified: true
    },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <section className="py-12 border-b border-border/50 bg-gradient-to-b from-emerald-950/30 to-background">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <UserPlus className="h-5 w-5 text-emerald-400" />
              </div>
              <Badge variant="secondary">Network Directory</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Connections Directory
            </h1>
            <p className="text-muted-foreground">
              Browse professionals across the African startup ecosystem who are open to connecting. 
              Filter by role, sector, and country to find the right people.
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
              <Input placeholder="Search by name, company, or role..." className="pl-10" />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="founder">Founders</SelectItem>
                <SelectItem value="investor">Investors</SelectItem>
                <SelectItem value="executive">Executives</SelectItem>
                <SelectItem value="advisor">Advisors</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="healthtech">Healthtech</SelectItem>
                <SelectItem value="edtech">Edtech</SelectItem>
                <SelectItem value="vc">VC / Investors</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-8">
        <div className="container-wide">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {networkMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card className="hover:shadow-lg hover:border-emerald-500/30 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-14 w-14 border-2 border-emerald-500/30">
                        <AvatarImage src={member.avatar || undefined} />
                        <AvatarFallback className="bg-emerald-500/10 text-emerald-400 font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                            {member.name}
                          </h3>
                          {member.verified && (
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          {member.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                        {member.sector}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        <Globe className="h-3 w-3 mr-1" />
                        {member.country}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Open to:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.openTo.map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4 text-muted-foreground hover:text-blue-400" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Twitter className="h-4 w-4 text-muted-foreground hover:text-sky-400" />
                        </Button>
                      </div>
                      <Button size="sm" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Members
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default KonektConnections;