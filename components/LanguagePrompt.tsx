import React, { useState, useEffect } from 'react';
import { useLanguage, useTranslations } from '../hooks/useTranslations';
import type { Language } from '../translations';
import { TranslateIcon } from './Icons';

interface SupportedLangInfo {
  code: Language;
  name: string;
}

const supportedLangs: SupportedLangInfo[] = [
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'te', name: 'తెలుగు' },
];

export const LanguagePrompt: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLangInfo | null>(null);

  useEffect(() => {
    const promptDismissed = sessionStorage.getItem('languagePromptDismissed');
    if (promptDismissed || language !== 'en') {
      return;
    }

    const browserLang = navigator.language.split('-')[0] as Language;
    const matchedLang = supportedLangs.find(lang => lang.code === browserLang);

    if (matchedLang) {
      setDetectedLang(matchedLang);
      setIsVisible(true);
    }
  }, [language]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('languagePromptDismissed', 'true');
  };

  const handleTranslate = () => {
    if (detectedLang) {
      setLanguage(detectedLang.code);
    }
    handleDismiss();
  };

  if (!isVisible || !detectedLang) {
    return null;
  }

  const title = t('language_prompt_title').replace('{languageName}', detectedLang.name);
  const message = t('language_prompt_message').replace('{languageName}', detectedLang.name);
  const translateButtonText = t('language_prompt_translate').replace('{languageName}', detectedLang.name);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-prompt-title"
    >
      <div className="w-full max-w-md bg-brand-card border border-gray-700 rounded-lg shadow-2xl p-6 text-center transform transition-all animate-fade-in-down">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold/10 text-brand-gold mb-4">
            <TranslateIcon className="h-6 w-6" />
        </div>
        <h3 id="language-prompt-title" className="text-xl font-bold text-brand-light">
          {title}
        </h3>
        <p className="mt-2 text-gray-300">
          {message}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleTranslate}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-gold text-base font-medium text-brand-dark hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold sm:text-sm"
          >
            {translateButtonText}
          </button>
          <button
            onClick={handleDismiss}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-transparent text-base font-medium text-brand-light hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold sm:text-sm"
          >
            {t('language_prompt_no_thanks')}
          </button>
        </div>
      </div>
    </div>
  );
};
