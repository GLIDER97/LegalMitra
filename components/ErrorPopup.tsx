import React from 'react';
import { AlertTriangleIcon, XMarkIcon } from './Icons';

interface ErrorPopupProps {
  error: {
    title: string;
    message: string;
  } | null;
  onDismiss: () => void;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm animate-fade-in-down" role="alert" aria-live="assertive">
      <div className="bg-red-900/80 backdrop-blur-md border border-red-700 text-red-300 rounded-lg shadow-lg p-4 flex items-start gap-4">
        <div className="flex-shrink-0 pt-0.5">
            <AlertTriangleIcon className="h-6 w-6 text-red-400" />
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-red-200">{error.title}</h4>
            <p className="mt-1 text-sm">{error.message}</p>
        </div>
        <div className="flex-shrink-0">
            <button
                onClick={onDismiss}
                aria-label="Dismiss"
                className="-mt-1 -mr-1 p-1 rounded-full text-red-300 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
};
