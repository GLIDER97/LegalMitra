import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { 
    HomeIcon, 
    BriefcaseIcon, 
    PencilIcon, 
    BuildingStorefrontIcon, 
    KeyIcon, 
    AcademicCapIcon,
    PaintBrushIcon,
    DocumentCheckIcon,
    EyeSlashIcon,
    ShieldExclamationIcon,
} from './Icons';

// FIX: Explicitly type UseCaseCard as React.FC to resolve issue with props spreading.
const UseCaseCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-brand-card p-6 rounded-lg shadow-lg border border-gray-800 transition-transform transform hover:-translate-y-1 h-full">
        <div className="flex items-center justify-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-gold/10 text-brand-gold">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-brand-light">{title}</h3>
        </div>
        <p className="mt-4 text-base text-gray-400">{description}</p>
    </div>
);


export const UseCases: React.FC = () => {
    const { t } = useTranslations();
    
    const useCaseList = [
        { icon: <HomeIcon className="w-6 h-6" />, title: t('use_cases_1_title'), description: t('use_cases_1_desc') },
        { icon: <BriefcaseIcon className="w-6 h-6" />, title: t('use_cases_2_title'), description: t('use_cases_2_desc') },
        { icon: <PencilIcon className="w-6 h-6" />, title: t('use_cases_3_title'), description: t('use_cases_3_desc') },
        { icon: <BuildingStorefrontIcon className="w-6 h-6" />, title: t('use_cases_4_title'), description: t('use_cases_4_desc') },
        { icon: <KeyIcon className="w-6 h-6" />, title: t('use_cases_5_title'), description: t('use_cases_5_desc') },
        { icon: <AcademicCapIcon className="w-6 h-6" />, title: t('use_cases_6_title'), description: t('use_cases_6_desc') },
        { icon: <PaintBrushIcon className="w-6 h-6" />, title: t('use_cases_7_title'), description: t('use_cases_7_desc') },
        { icon: <DocumentCheckIcon className="w-6 h-6" />, title: t('use_cases_8_title'), description: t('use_cases_8_desc') },
        { icon: <EyeSlashIcon className="w-6 h-6" />, title: t('use_cases_9_title'), description: t('use_cases_9_desc') },
        { icon: <ShieldExclamationIcon className="w-6 h-6" />, title: t('use_cases_10_title'), description: t('use_cases_10_desc') },
    ];

  return (
    <section className="py-16 sm:py-24 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('use_cases_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('use_cases_subtitle')}</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
         {useCaseList.map((useCase, index) => (
             <UseCaseCard key={index} {...useCase} />
         ))}
        </div>
      </div>
    </section>
  );
};
