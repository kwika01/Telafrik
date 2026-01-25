import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Filter, Clock, CheckCircle, MessageSquare, XCircle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AppLayout from '@/components/layout/AppLayout';
import { useIntroRequests, IntroRequest, IntroStatus } from '@/hooks/useIntroRequests';
import { format } from 'date-fns';

const statusConfig: Record<IntroStatus, { label: string; icon: typeof Clock; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  queued: { label: 'Queued', icon: Clock, variant: 'secondary' },
  sent: { label: 'Sent', icon: MessageSquare, variant: 'default' },
  replied: { label: 'Replied', icon: CheckCircle, variant: 'default' },
  closed: { label: 'Closed', icon: XCircle, variant: 'outline' },
};

const KonektAfrikIntros = () => {
  const { introRequests, isLoading, fetchIntroRequests } = useIntroRequests();
  const [selectedIntro, setSelectedIntro] = useState<IntroRequest | null>(null);
  const [activeTab, setActiveTab] = useState<IntroStatus | 'all'>('all');

  const filteredRequests = activeTab === 'all' 
    ? introRequests 
    : introRequests.filter(r => r.status === activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value as IntroStatus | 'all');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Mail className="h-4 w-4" />
              My Intro Requests
            </div>
            <h1 className="text-3xl font-bold mb-2">Introduction Requests</h1>
            <p className="text-muted-foreground">
              Track the status of your investor introduction requests.
            </p>
          </div>
          <Button asChild>
            <Link to="/konekt/match">
              Find More Investors
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({introRequests.length})</TabsTrigger>
            <TabsTrigger value="queued">
              Queued ({introRequests.filter(r => r.status === 'queued').length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({introRequests.filter(r => r.status === 'sent').length})
            </TabsTrigger>
            <TabsTrigger value="replied">
              Replied ({introRequests.filter(r => r.status === 'replied').length})
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed ({introRequests.filter(r => r.status === 'closed').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Intro Requests</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === 'all' 
                      ? "You haven't requested any investor introductions yet."
                      : `No requests with status "${activeTab}".`}
                  </p>
                  <Button asChild>
                    <Link to="/konekt/match">Find Investors</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map(intro => {
                  const status = statusConfig[intro.status as IntroStatus];
                  const StatusIcon = status.icon;
                  
                  return (
                    <Card 
                      key={intro.id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedIntro(intro)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {/* Investor Info */}
                          <div className="flex items-center gap-4 flex-1">
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                              {intro.investor?.logo_url ? (
                                <img 
                                  src={intro.investor.logo_url} 
                                  alt={intro.investor.name} 
                                  className="h-full w-full object-cover" 
                                />
                              ) : (
                                <span className="font-bold text-muted-foreground">
                                  {intro.investor?.name?.charAt(0) || '?'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{intro.investor?.name || 'Unknown Investor'}</h3>
                              <p className="text-sm text-muted-foreground">
                                {intro.investor?.type} • via {intro.startup?.name || 'Your Startup'}
                              </p>
                            </div>
                          </div>

                          {/* Status & Date */}
                          <div className="flex items-center gap-4">
                            <Badge variant={status.variant} className="flex items-center gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(intro.created_at), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Detail Sheet */}
        <Sheet open={!!selectedIntro} onOpenChange={() => setSelectedIntro(null)}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Introduction Request</SheetTitle>
              <SheetDescription>
                Details about your intro request
              </SheetDescription>
            </SheetHeader>
            
            {selectedIntro && (
              <div className="mt-6 space-y-6">
                {/* Investor */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Investor</h4>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      {selectedIntro.investor?.logo_url ? (
                        <img 
                          src={selectedIntro.investor.logo_url} 
                          alt={selectedIntro.investor.name} 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <span className="font-bold">
                          {selectedIntro.investor?.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedIntro.investor?.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedIntro.investor?.type}</p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/investor/${selectedIntro.investor?.slug}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Startup */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Startup</h4>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      {selectedIntro.startup?.logo_url ? (
                        <img 
                          src={selectedIntro.startup.logo_url} 
                          alt={selectedIntro.startup.name} 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <span className="font-bold">
                          {selectedIntro.startup?.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedIntro.startup?.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                  <Badge variant={statusConfig[selectedIntro.status as IntroStatus].variant}>
                    {statusConfig[selectedIntro.status as IntroStatus].label}
                  </Badge>
                </div>

                {/* Your Message */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Message</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedIntro.founder_message || 'No message provided'}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requested</span>
                      <span>{format(new Date(selectedIntro.created_at), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                    {selectedIntro.updated_at !== selectedIntro.created_at && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span>{format(new Date(selectedIntro.updated_at), 'MMM d, yyyy h:mm a')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default KonektAfrikIntros;
