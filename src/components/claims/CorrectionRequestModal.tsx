import { useState } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
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
import { toast } from 'sonner';

interface CorrectionRequestModalProps {
  companyName: string;
  companyId: string;
  trigger?: React.ReactNode;
}

const CorrectionRequestModal = ({ companyName, companyId, trigger }: CorrectionRequestModalProps) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    field: '',
    suggestedValue: '',
    sourceUrl: '',
    email: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Correction request submitted!');
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ field: '', suggestedValue: '', sourceUrl: '', email: '', notes: '' });
    }, 300);
  };

  const fieldOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'valuation', label: 'Valuation' },
    { value: 'funding', label: 'Total Funding' },
    { value: 'headcount', label: 'Employee Count' },
    { value: 'description', label: 'Company Description' },
    { value: 'founders', label: 'Founders / Team' },
    { value: 'location', label: 'Location / HQ' },
    { value: 'website', label: 'Website / Domain' },
    { value: 'social', label: 'Social Links' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Request Correction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <DialogTitle className="mb-2">Correction Submitted</DialogTitle>
            <DialogDescription className="mb-6">
              Thank you for helping us improve our data. Our team will review your correction and update the profile if verified.
            </DialogDescription>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Correction</DialogTitle>
              <DialogDescription>
                Help us keep {companyName}'s profile accurate by suggesting corrections.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="field">What needs to be corrected?</Label>
                <Select
                  value={formData.field}
                  onValueChange={(value) => setFormData({ ...formData, field: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="suggestedValue">Correct Value</Label>
                <Textarea
                  id="suggestedValue"
                  placeholder="Enter the correct information..."
                  value={formData.suggestedValue}
                  onChange={(e) => setFormData({ ...formData, suggestedValue: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceUrl">Source URL (Optional)</Label>
                <Input
                  id="sourceUrl"
                  type="url"
                  placeholder="Link to verify this information"
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="For follow-up questions"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any context that might help us verify this..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={!formData.field || !formData.suggestedValue || isSubmitting} className="flex-1">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CorrectionRequestModal;
