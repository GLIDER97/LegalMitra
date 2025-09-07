import React from 'react';
import { LawBookIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';

export const Header: React.FC = () => {
  const { t } = useTranslations();

  return (
    <header className="bg-brand-card/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LawBookIcon className="h-8 w-8 text-brand-gold" />
            </div>
            <div className="ml-4 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-brand-light">LegalMitra</h1>
              <p className="text-xs sm:text-sm text-brand-gold font-semibold tracking-wide">{t('tagline')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};