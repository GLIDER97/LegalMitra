import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LockClosedIcon, CpuChipIcon, ScaleIcon } from './Icons';

// FIX: Explicitly type TrustFeature as React.FC to resolve issue with props spreading.
const TrustFeature: React.FC<{ icon: React.ReactNode, title: string, description:string }> = ({ icon, title, description }) => (
    <div className="bg-brand-card p-6 rounded-lg shadow-lg border border-gray-800 text-center transition-transform transform hover:-translate-y-1 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-gold/10 text-brand-gold mx-auto">
            {icon}
        </div>
        <div className="mt-5">
            <h3 className="text-lg leading-6 font-bold text-brand-light">{title}</h3>
            <p className="mt-2 text-base text-gray-400">{description}</p>
        </div>
    </div>
);


export const TrustAndCredibility: React.FC = () => {
    const { t } = useTranslations();
    
    const featureList = [
        { icon: <LockClosedIcon className="w-6 h-6" />, title: t('trust_feature_1_title'), description: t('trust_feature_1_desc') },
        { icon: <CpuChipIcon className="w-6 h-6" />, title: t('trust_feature_2_title'), description: t('trust_feature_2_desc') },
        { icon: <ScaleIcon className="w-6 h-6" />, title: t('trust_feature_3_title'), description: t('trust_feature_3_desc') },
    ];

  return (
    <section className="py-16 sm:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('trust_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('trust_subtitle')}</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
         {featureList.map((feature, index) => (
             <TrustFeature key={index} {...feature} />
         ))}
        </div>
      </div>
    </section>
  );
};
