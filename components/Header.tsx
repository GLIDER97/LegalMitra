import React from 'react';
import { LegalIqLogoIcon, LawBookIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';

interface HeaderProps {
    onOpenLegalSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLegalSupport }) => {
  const { t } = useTranslations();

  return (
    <header className="bg-brand-card/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LegalIqLogoIcon className="h-8 w-8 text-brand-gold" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl sm:text-2xl font-bold text-brand-light">
                Legal<span style={{ color: '#D4AF37' }}>IQ</span>.app
              </h1>
              <p className="text-xs sm:text-sm text-brand-gold font-semibold tracking-wide">{t('tagline')}</p>
            </div>
          </div>
          <div className="flex items-center">
             <button
                onClick={onOpenLegalSupport}
                className="inline-flex items-center gap-2 px-3 py-2 border border-brand-gold/80 text-sm font-medium rounded-md shadow-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all"
            >
                <LawBookIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{t('ai_legal_support_button_label')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};