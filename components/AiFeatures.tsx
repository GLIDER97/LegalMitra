import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { 
    ChatBubbleOvalLeftEllipsisIcon, 
    MicrophoneIcon, 
    ShieldSearchIcon, 
    LawBookIcon, 
    LightbulbIcon, 
    BoltIcon 
} from './Icons';
// FIX: Corrected import path for translations module.
import type { TranslationKeys } from '../translations/index';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    howTo: string;
    proTip: string;
    impact: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, howTo, proTip, impact }) => {
    const { t } = useTranslations();

    return (
        <div className="bg-brand-card/50 p-6 rounded-2xl shadow-lg border border-gray-800 flex flex-col h-full transition-all duration-300 hover:border-brand-gold/50 hover:shadow-brand-gold/10">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-brand-gold/10 text-brand-gold">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-brand-light">{title}</h3>
            </div>
            <div className="mt-5 space-y-4 text-gray-300">
                <div>
                    <h4 className="font-semibold text-brand-gold tracking-wide">How to Use:</h4>
                    <p className="mt-1 text-base">{howTo}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-brand-gold tracking-wide flex items-center gap-2">
                        <LightbulbIcon className="h-4 w-4" />
                        Pro Tip:
                    </h4>
                    <p className="mt-1 text-base italic">{proTip}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-brand-gold tracking-wide flex items-center gap-2">
                         <BoltIcon className="h-4 w-4" />
                        Your Impact:
                    </h4>
                    <p className="mt-1 text-base">{impact}</p>
                </div>
            </div>
        </div>
    );
};

export const AiFeatures: React.FC = () => {
    const { t } = useTranslations();

    const features: FeatureCardProps[] = [
        {
            icon: <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />,
            title: t('ai_features_chat_title'),
            howTo: t('ai_features_chat_how_to'),
            proTip: t('ai_features_chat_pro_tip'),
            impact: t('ai_features_chat_impact'),
        },
        {
            icon: <MicrophoneIcon className="w-7 h-7" />,
            title: t('ai_features_vani_title'),
            howTo: t('ai_features_vani_how_to'),
            proTip: t('ai_features_vani_pro_tip'),
            impact: t('ai_features_vani_impact'),
        },
        {
            icon: <ShieldSearchIcon className="w-7 h-7" />,
            title: t('ai_features_guardian_title'),
            howTo: t('ai_features_guardian_how_to'),
            proTip: t('ai_features_guardian_pro_tip'),
            impact: t('ai_features_guardian_impact'),
        },
        {
            icon: <LawBookIcon className="w-7 h-7" />,
            title: t('ai_features_support_title'),
            howTo: t('ai_features_support_how_to'),
            proTip: t('ai_features_support_pro_tip'),
            impact: t('ai_features_support_impact'),
        },
    ];

    return (
        <section className="py-16 sm:py-24 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('ai_features_title')}</h2>
                    <p className="mt-4 text-lg text-gray-300">{t('ai_features_subtitle')}</p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
