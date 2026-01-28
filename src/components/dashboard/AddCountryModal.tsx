import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

interface AddCountryModalProps {
  onSuccess?: () => void;
}

const AddCountryModal = ({ onSuccess }: AddCountryModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: '',
    flag_emoji: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('countries').insert({
        name: formData.name,
        code: formData.code.toUpperCase(),
        region: formData.region as any,
        flag_emoji: formData.flag_emoji || null,
      });

      if (error) throw error;

      toast.success('Country added successfully!');
      setOpen(false);
      setFormData({
        name: '',
        code: '',
        region: '',
        flag_emoji: '',
      });
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Country
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Add New Country
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Country Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Nigeria"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Country Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., NG"
                maxLength={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flag_emoji">Flag Emoji</Label>
              <Input
                id="flag_emoji"
                value={formData.flag_emoji}
                onChange={(e) => setFormData({ ...formData, flag_emoji: e.target.value })}
                placeholder="🇳🇬"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">African Region *</Label>
            <Select
              value={formData.region}
              onValueChange={(value) => setFormData({ ...formData, region: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="West Africa">West Africa</SelectItem>
                <SelectItem value="East Africa">East Africa</SelectItem>
                <SelectItem value="North Africa">North Africa</SelectItem>
                <SelectItem value="Central Africa">Central Africa</SelectItem>
                <SelectItem value="Southern Africa">Southern Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.region}>
              {loading ? 'Adding...' : 'Add Country'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCountryModal;
