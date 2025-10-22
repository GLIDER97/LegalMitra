import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { MicrophoneIcon } from './Icons';

interface VaniMitraButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const VaniMitraButton: React.FC<VaniMitraButtonProps> = ({ onClick, disabled }) => {
    const { t } = useTranslations();
    return (
        <div className="tooltip-container relative">
            <button
                onClick={onClick}
                disabled={disabled}
                className="flex items-center gap-3 px-4 py-3 bg-brand-gold text-brand-dark rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={t('vani_mitra_button_label')}
                aria-disabled={disabled}
            >
                <MicrophoneIcon className="h-6 w-6" />
                <span className="font-semibold">{t('vani_mitra_button_label')}</span>
            </button>
            {disabled && (
                 <span className="tooltip-text absolute z-10 w-64 p-3 text-sm leading-tight text-white bg-brand-card shadow-lg rounded-md border border-gray-700 transition-opacity duration-300">
                    {t('analyze_to_talk_tooltip')}
                </span>
            )}
        </div>
    );
};