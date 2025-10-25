import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { TranslateIcon, SparklesIcon, BoltIcon, ShieldSearchIcon } from './Icons';

// FIX: Explicitly typed the props for the Feature component to resolve TypeScript errors.
const Feature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-brand-card p-6 rounded-lg shadow-lg border border-gray-800 text-center transition-transform transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-gold/10 text-brand-gold mx-auto">
            {icon}
        </div>
        <div className="mt-5">
            <h3 className="text-lg leading-6 font-bold text-brand-light">{title}</h3>
            <p className="mt-2 text-base text-gray-400">{description}</p>
        </div>
    </div>
);


export const KeyFeatures: React.FC = () => {
    const { t } = useTranslations();
    
    const featureList = [
        { icon: <SparklesIcon className="w-6 h-6" />, title: t('features_ocr_title'), description: t('features_ocr_desc') },
        { icon: <TranslateIcon className="w-6 h-6" />, title: t('features_multilingual_title'), description: t('features_multilingual_desc') },
        { icon: <BoltIcon className="w-6 h-6" />, title: t('features_accessible_title'), description: t('features_accessible_desc') },
        { icon: <ShieldSearchIcon className="w-6 h-6" />, title: t('features_research_title'), description: t('features_research_desc') },
    ];

  return (
    <section className="py-16 sm:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('features_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('features_subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
         {featureList.map((feature, index) => (
             <Feature key={index} {...feature} />
         ))}
        </div>
      </div>
    </section>
  );
};

// Renamed from Features.tsx
export { KeyFeatures as Features };