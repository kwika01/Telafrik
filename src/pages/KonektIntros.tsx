import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Building2,
  Users
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const KonektIntros = () => {
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

  const introRequests = [
    {
      id: 1,
      targetName: 'Y Combinator',
      targetType: 'Investor',
      status: 'pending',
      requestedAt: '2 days ago',
      message: 'Looking to discuss Series A funding opportunities in the African fintech space.',
      connector: 'John Doe'
    },
    {
      id: 2,
      targetName: 'Stripe',
      targetType: 'Company',
      status: 'accepted',
      requestedAt: '1 week ago',
      message: 'Interested in partnership discussions for payment infrastructure.',
      connector: 'Jane Smith',
      introScheduled: 'Tomorrow, 3:00 PM'
    },
    {
      id: 3,
      targetName: 'Partech Africa',
      targetType: 'Investor',
      status: 'declined',
      requestedAt: '2 weeks ago',
      message: 'Seeking growth capital for expansion into East Africa.',
      connector: 'Mike Johnson',
      declineReason: 'Not investing in current stage'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'accepted':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      declined: 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    return variants[status] || '';
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 border-b border-border/50 bg-gradient-to-b from-cyan-950/30 to-background">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                </div>
                <Badge variant="secondary">Introduction Requests</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Warm Introductions
              </h1>
              <p className="text-muted-foreground">
                Request and manage introductions to investors, companies, and ecosystem players. 
                Our network facilitates meaningful connections.
              </p>
            </motion.div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Request Intro
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Tabs */}
      <section className="py-6 border-b border-border/50">
        <div className="container-wide">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="declined">Declined</TabsTrigger>
              </TabsList>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-10" />
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {introRequests.map((request) => (
                  <motion.div key={request.id} variants={itemVariants}>
                    <Card className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-cyan-500/10">
                            {request.targetType === 'Investor' ? (
                              <Users className="h-6 w-6 text-cyan-400" />
                            ) : (
                              <Building2 className="h-6 w-6 text-cyan-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.targetName}</h3>
                              <Badge variant="outline">{request.targetType}</Badge>
                              <Badge variant="outline" className={getStatusBadge(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1 capitalize">{request.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Via {request.connector}</span>
                              <span>•</span>
                              <span>{request.requestedAt}</span>
                              {request.introScheduled && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-400">📅 {request.introScheduled}</span>
                                </>
                              )}
                              {request.declineReason && (
                                <>
                                  <span>•</span>
                                  <span className="text-red-400">{request.declineReason}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="text-center py-12 text-muted-foreground">
                Pending requests will appear here
              </div>
            </TabsContent>
            <TabsContent value="accepted">
              <div className="text-center py-12 text-muted-foreground">
                Accepted introductions will appear here
              </div>
            </TabsContent>
            <TabsContent value="declined">
              <div className="text-center py-12 text-muted-foreground">
                Declined requests will appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-gradient-to-b from-background to-cyan-950/10">
        <div className="container-wide">
          <h2 className="text-xl font-bold mb-6">How Warm Intros Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Find a Match', desc: 'Browse AI-matched investors or companies' },
              { step: 2, title: 'Request Intro', desc: 'Submit an introduction request with context' },
              { step: 3, title: 'Get Connected', desc: 'Our network facilitates the warm intro' },
              { step: 4, title: 'Start Conversation', desc: 'Begin your relationship on the right foot' },
            ].map((item) => (
              <Card key={item.step} className="text-center border-cyan-500/20">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KonektIntros;