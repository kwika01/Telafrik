import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component for catching React errors
 * Wrap components that might throw errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback UI
 */
const ErrorFallback = ({ error }: { error: Error | null }) => {
  const handleReset = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
          </AlertDescription>
        </Alert>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.stack}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="flex-1">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook-based error boundary wrapper (for functional components)
 * Usage: <ErrorBoundary><YourComponent /></ErrorBoundary>
 */
export default ErrorBoundary;
