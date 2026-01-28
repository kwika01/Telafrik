/**
 * Toast utility wrapper
 * 
 * Standardized toast notifications using sonner.
 * Import this instead of importing sonner directly.
 */
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string, options?: { description?: string }) => {
    sonnerToast.success(message, options);
  },
  error: (message: string, options?: { description?: string }) => {
    sonnerToast.error(message, options);
  },
  info: (message: string, options?: { description?: string }) => {
    sonnerToast.info(message, options);
  },
  warning: (message: string, options?: { description?: string }) => {
    sonnerToast.warning(message, options);
  },
  loading: (message: string) => {
    return sonnerToast.loading(message);
  },
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },
};

export default toast;
