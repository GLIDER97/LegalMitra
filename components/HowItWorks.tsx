import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { TranslateIcon, ShieldCheckIcon, BoltIcon, DocumentTextIcon } from './Icons';

const Feature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
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


export const WhyLegalMitra: React.FC = () => {
    const { t } = useTranslations();
    
    const featureList = [
        { icon: <TranslateIcon className="w-6 h-6" />, title: t('why_feature_1_title'), description: t('why_feature_1_desc') },
        { icon: <ShieldCheckIcon className="w-6 h-6" />, title: t('why_feature_2_title'), description: t('why_feature_2_desc') },
        { icon: <BoltIcon className="w-6 h-6" />, title: t('why_feature_3_title'), description: t('why_feature_3_desc') },
        { icon: <DocumentTextIcon className="w-6 h-6" />, title: t('why_feature_4_title'), description: t('why_feature_4_desc') },
    ];

  return (
    <section className="py-16 sm:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('why_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('why_subtitle')}</p>
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
export { WhyLegalMitra as Features };