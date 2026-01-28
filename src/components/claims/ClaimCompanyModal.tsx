import { useState } from 'react';
import { Flag, Upload, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/lib/toast';

interface ClaimCompanyModalProps {
  companyName: string;
  companyId: string;
}

const ClaimCompanyModal = ({ companyName, companyId }: ClaimCompanyModalProps) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    proofUrl: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Claim submitted successfully!');
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ role: '', email: '', proofUrl: '', notes: '' });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Flag className="h-4 w-4 mr-2" />
          Claim Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <DialogTitle className="mb-2">Claim Submitted</DialogTitle>
            <DialogDescription className="mb-6">
              Thank you for your claim. Our team will review your submission and get back to you within 2-3 business days.
            </DialogDescription>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Claim {companyName}</DialogTitle>
              <DialogDescription>
                Verify your affiliation with this company to gain access to update information and add verified metrics.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="role">Your Role at {companyName}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="founder">Founder / Co-founder</SelectItem>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="executive">Executive (C-suite)</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="investor">Investor / Board Member</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use your company email for faster verification
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proof">Proof (Optional)</Label>
                <Input
                  id="proof"
                  type="url"
                  placeholder="LinkedIn profile, company page, etc."
                  value={formData.proofUrl}
                  onChange={(e) => setFormData({ ...formData, proofUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information to help verify your claim..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={!formData.role || !formData.email || isSubmitting} className="flex-1">
                  {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClaimCompanyModal;
