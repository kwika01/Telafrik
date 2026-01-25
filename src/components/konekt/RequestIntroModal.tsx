import { useState, useEffect } from 'react';
import { Mail, Building2, User, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useIntroRequests } from '@/hooks/useIntroRequests';
import { supabase } from '@/integrations/supabase/client';

interface Investor {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo_url: string | null;
}

interface RequestIntroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investor?: Investor | null;
  startupId?: string | null;
  matchResultId?: string;
}

const RequestIntroModal = ({
  open,
  onOpenChange,
  investor,
  startupId,
  matchResultId,
}: RequestIntroModalProps) => {
  const { createIntroRequest } = useIntroRequests();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [founderMessage, setFounderMessage] = useState('');
  const [userStartups, setUserStartups] = useState<{ id: string; name: string }[]>([]);
  const [selectedStartupId, setSelectedStartupId] = useState(startupId || '');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
        
        // Fetch user's approved startups
        const { data: claims } = await supabase
          .from('claims')
          .select('company_id, companies:company_id(id, name)')
          .eq('user_id', user.id)
          .eq('status', 'approved');

        const startups = claims?.map(c => ({
          id: (c.companies as any)?.id,
          name: (c.companies as any)?.name,
        })).filter(s => s.id && s.name) || [];

        setUserStartups(startups);
        if (startups.length > 0 && !selectedStartupId) {
          setSelectedStartupId(startups[0].id);
        }
      }
    };

    if (open) {
      fetchUserData();
    }
  }, [open, selectedStartupId]);

  const handleSubmit = async () => {
    if (!investor || !selectedStartupId || !founderMessage.trim()) {
      return;
    }

    setIsSubmitting(true);
    const result = await createIntroRequest(
      selectedStartupId,
      investor.id,
      founderMessage,
      userEmail,
      matchResultId
    );
    setIsSubmitting(false);

    if (result) {
      setFounderMessage('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Request Introduction
          </DialogTitle>
          <DialogDescription>
            Request a warm introduction to this investor through our network.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Investor Info */}
          {investor && (
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {investor.logo_url ? (
                  <img src={investor.logo_url} alt={investor.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h4 className="font-semibold">{investor.name}</h4>
                <p className="text-sm text-muted-foreground">{investor.type}</p>
              </div>
            </div>
          )}

          {/* Startup Selection */}
          <div className="space-y-2">
            <Label>Your Startup</Label>
            {userStartups.length === 0 ? (
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <Building2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  You need to claim a startup profile to request introductions.
                </p>
              </div>
            ) : (
              <select
                value={selectedStartupId}
                onChange={(e) => setSelectedStartupId(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {userStartups.map(startup => (
                  <option key={startup.id} value={startup.id}>
                    {startup.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label>Your Contact Email</Label>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>Your Message to the Investor</Label>
            <Textarea
              value={founderMessage}
              onChange={(e) => setFounderMessage(e.target.value)}
              placeholder="Introduce yourself and your startup briefly. Explain why you're interested in this investor and what you're looking for."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This message will be shared with the investor when we facilitate the introduction.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !selectedStartupId || !founderMessage.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestIntroModal;
