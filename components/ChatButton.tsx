import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ChatBubbleOvalLeftEllipsisIcon } from './Icons';

interface ChatButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, disabled }) => {
    const { t } = useTranslations();
    return (
        <div className="tooltip-container relative">
            <button
                onClick={onClick}
                disabled={disabled}
                className="flex items-center gap-3 px-4 py-3 bg-brand-card text-brand-light border border-gray-700 rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold disabled:bg-brand-card disabled:text-gray-500 disabled:border-gray-800 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={t('chat_button_label')}
                aria-disabled={disabled}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                <span className="font-semibold">{t('chat_button_label')}</span>
            </button>
            {disabled && (
                <span className="tooltip-text absolute z-10 w-64 p-3 text-sm leading-tight text-white bg-brand-card shadow-lg rounded-md border border-gray-700 transition-opacity duration-300">
                    {t('analyze_to_chat_tooltip')}
                </span>
            )}
        </div>
    );
};