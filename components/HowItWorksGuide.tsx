import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { UploadIcon, CpuChipIcon, DocumentCheckIcon } from './Icons';

const Step: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-card border-2 border-brand-gold/50 mx-auto">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-brand-light">{title}</h3>
        <p className="mt-2 text-base text-gray-400">{description}</p>
    </div>
);

export const HowItWorksGuide: React.FC = () => {
    const { t } = useTranslations();

    return (
        <section className="py-16 sm:py-24 bg-brand-card/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('how_it_works_title')}</h2>
                </div>
                <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 relative">
                    {/* Dashed line connector for desktop */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-px">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute">
                            <line x1="25%" y1="0" x2="75%" y2="0" stroke="#D4AF37" strokeWidth="2" strokeDasharray="8 8" />
                        </svg>
                    </div>
                    
                    <Step icon={<UploadIcon className="w-8 h-8 text-brand-gold" />} title={t('how_it_works_step1_title')} description={t('how_it_works_step1_desc')} />
                    <Step icon={<CpuChipIcon className="w-8 h-8 text-brand-gold" />} title={t('how_it_works_step2_title')} description={t('how_it_works_step2_desc')} />
                    <Step icon={<DocumentCheckIcon className="w-8 h-8 text-brand-gold" />} title={t('how_it_works_step3_title')} description={t('how_it_works_step3_desc')} />
                </div>
            </div>
        </section>
    );
};