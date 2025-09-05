import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LawBookIcon } from './Icons';

export const MissionVision: React.FC = () => {
    const { t } = useTranslations();
    
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className="bg-brand-card relative">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 relative">
                <LawBookIcon className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">{t('mission_vision_title')}</span>
                </h2>
                
                <div className="mt-8 text-left space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-brand-gold">{t('mission_title')}</h3>
                        <p className="mt-4 text-lg leading-relaxed text-gray-300">
                           {t('mission_text')}
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-brand-gold">{t('vision_title')}</h3>
                        <p className="mt-4 text-lg leading-relaxed text-gray-300">
                           {t('vision_text')}
                        </p>
                    </div>
                </div>
                 <button
                    onClick={handleScrollToTop}
                    className="mt-10 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-brand-dark bg-brand-gold hover:bg-yellow-300 transition-transform transform hover:scale-105"
                >
                    {t('mission_vision_cta')}
                </button>
            </div>
        </section>
    );
};

// Renamed from CTA.tsx
export { MissionVision as CTA };