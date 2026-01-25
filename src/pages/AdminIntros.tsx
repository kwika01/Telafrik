import { useState } from 'react';
import { Shield, Mail, Filter, Clock, CheckCircle, MessageSquare, XCircle, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AppLayout from '@/components/layout/AppLayout';
import { useIntroRequests, IntroRequest, IntroStatus } from '@/hooks/useIntroRequests';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { format } from 'date-fns';

const statusConfig: Record<IntroStatus, { label: string; icon: typeof Clock; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  queued: { label: 'Queued', icon: Clock, variant: 'secondary' },
  sent: { label: 'Sent', icon: MessageSquare, variant: 'default' },
  replied: { label: 'Replied', icon: CheckCircle, variant: 'default' },
  closed: { label: 'Closed', icon: XCircle, variant: 'outline' },
};

const AdminIntros = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { introRequests, isLoading, updateIntroStatus } = useIntroRequests(true);
  const [selectedIntro, setSelectedIntro] = useState<IntroRequest | null>(null);
  const [activeTab, setActiveTab] = useState<IntroStatus | 'all'>('all');
  const [editStatus, setEditStatus] = useState<IntroStatus>('queued');
  const [editNotes, setEditNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const filteredRequests = activeTab === 'all' 
    ? introRequests 
    : introRequests.filter(r => r.status === activeTab);

  const handleOpenDetail = (intro: IntroRequest) => {
    setSelectedIntro(intro);
    setEditStatus(intro.status as IntroStatus);
    setEditNotes(intro.admin_notes || '');
  };

  const handleSave = async () => {
    if (!selectedIntro) return;
    
    setIsSaving(true);
    const success = await updateIntroStatus(selectedIntro.id, editStatus, editNotes);
    setIsSaving(false);
    
    if (success) {
      setSelectedIntro(null);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive mb-4">
            <Shield className="h-4 w-4" />
            Admin Dashboard
          </div>
          <h1 className="text-3xl font-bold mb-2">Intro Request Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track all introduction requests across the platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['queued', 'sent', 'replied', 'closed'] as IntroStatus[]).map(status => {
            const config = statusConfig[status];
            const count = introRequests.filter(r => r.status === status).length;
            return (
              <Card key={status}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <config.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-sm text-muted-foreground">{config.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as IntroStatus | 'all')}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({introRequests.length})</TabsTrigger>
            <TabsTrigger value="queued">Queued</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="replied">Replied</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
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
                  <h3 className="font-semibold text-lg mb-2">No Requests</h3>
                  <p className="text-muted-foreground">
                    No intro requests in this category.
                  </p>
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
                      onClick={() => handleOpenDetail(intro)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{intro.startup?.name || 'Unknown Startup'}</h3>
                              <span className="text-muted-foreground">→</span>
                              <h3 className="font-semibold">{intro.investor?.name || 'Unknown Investor'}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {intro.contact_email} • {intro.investor?.type}
                            </p>
                          </div>

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

        {/* Admin Edit Sheet */}
        <Sheet open={!!selectedIntro} onOpenChange={() => setSelectedIntro(null)}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Manage Intro Request</SheetTitle>
              <SheetDescription>
                Update status and add admin notes
              </SheetDescription>
            </SheetHeader>
            
            {selectedIntro && (
              <div className="mt-6 space-y-6">
                {/* Startup → Investor */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{selectedIntro.startup?.name}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-semibold">{selectedIntro.investor?.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedIntro.contact_email}</p>
                </div>

                {/* Founder Message */}
                <div>
                  <Label className="text-muted-foreground">Founder Message</Label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedIntro.founder_message || 'No message'}
                    </p>
                  </div>
                </div>

                {/* Status Update */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editStatus} onValueChange={(v) => setEditStatus(v as IntroStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="queued">Queued</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Admin Notes */}
                <div className="space-y-2">
                  <Label>Admin Notes</Label>
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Internal notes about this intro request..."
                    rows={4}
                  />
                </div>

                {/* Save Button */}
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default AdminIntros;
