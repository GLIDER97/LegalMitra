import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { FeedbackIcon } from './Icons';

export const FeedbackButton: React.FC = () => {
  const { t } = useTranslations();
  const feedbackLink = "https://forms.gle/gW86qs769Gfpr7Gb8";

  return (
    <a
      href={feedbackLink}
      target="_blank"
      rel="noopener noreferrer"
      title={t('feedback_button_tooltip')}
      aria-label={t('feedback_button_tooltip')}
      className="fixed bottom-5 left-5 z-50 bg-brand-card text-brand-gold p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-all transform hover:scale-110"
    >
      <FeedbackIcon className="h-6 w-6" />
    </a>
  );
};
