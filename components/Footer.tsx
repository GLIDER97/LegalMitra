import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const Footer: React.FC = () => {
  const { t } = useTranslations();
  return (
    <footer className="bg-brand-card border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} {t('footer_copyright')}
        </p>
        <p>
          Created by <a href="https://www.linkedin.com/in/vipulsingh97/" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-gold hover:underline">Vipul Singh</a>
        </p>
        <p className="max-w-xl text-xs text-gray-500">
            <strong>{t('footer_disclaimer_title')}:</strong> {t('footer_disclaimer_text')}
        </p>
      </div>
    </footer>
  );
};