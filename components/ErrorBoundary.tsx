import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangleIcon } from './Icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark text-brand-light p-4">
            <div className="max-w-2xl w-full p-6 bg-brand-card border border-red-700 text-red-300 rounded-lg flex items-start gap-4">
                <div className="flex-shrink-0 pt-0.5">
                    <AlertTriangleIcon className="h-8 w-8 text-red-400" />
                </div>
                <div>
                    <h1 className="font-bold text-xl text-red-200">Something went wrong</h1>
                    <p className="mt-2">We've encountered an unexpected error. Please try refreshing the page. If the problem persists, please contact support.</p>
                     <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-all"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
