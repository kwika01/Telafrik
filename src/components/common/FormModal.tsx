import { useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

export interface FormModalProps {
  /** Trigger button content */
  trigger: ReactNode;
  /** Modal title */
  title: string;
  /** Icon to display in title */
  icon?: LucideIcon;
  /** Form content (fields) */
  children: ReactNode;
  /** Submit button text */
  submitText?: string;
  /** Loading state text */
  loadingText?: string;
  /** Is form submitting? */
  isLoading?: boolean;
  /** Is submit button disabled? */
  isSubmitDisabled?: boolean;
  /** Submit handler */
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  /** Callback when modal closes */
  onOpenChange?: (open: boolean) => void;
  /** Callback when form is successfully submitted */
  onSuccess?: () => void;
  /** Max width of modal */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional className for DialogContent */
  contentClassName?: string;
  /** Show cancel button? */
  showCancel?: boolean;
  /** Cancel button text */
  cancelText?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const FormModal = ({
  trigger,
  title,
  icon: Icon,
  children,
  submitText = 'Submit',
  loadingText = 'Submitting...',
  isLoading = false,
  isSubmitDisabled = false,
  onSubmit,
  onOpenChange,
  onSuccess,
  maxWidth = 'lg',
  contentClassName,
  showCancel = true,
  cancelText = 'Cancel',
}: FormModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen && !isLoading) {
      // Reset form state when closing (caller should handle this)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(e);
      // Only close if onSubmit doesn't throw
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      // Error handling should be done in onSubmit (toast, etc.)
      // Don't close modal on error
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto ${contentClassName || ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {children}
          <div className="flex justify-end gap-3 pt-4">
            {showCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
            )}
            <Button type="submit" disabled={isLoading || isSubmitDisabled}>
              {isLoading ? loadingText : submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
