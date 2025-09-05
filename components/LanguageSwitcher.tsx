import React, { useState } from 'react';
import { useLanguage } from '../hooks/useTranslations';
import { TranslateIcon } from './Icons';
import { Language } from '../translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '简体中文' },
  ];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`absolute bottom-full mb-2 right-0 bg-brand-card border border-gray-700 rounded-lg shadow-2xl w-36 origin-bottom-right transition-all duration-300 ease-in-out transform-gpu ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="py-1">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-brand-gold text-brand-dark font-semibold'
                    : 'text-brand-light hover:bg-gray-700'
                }`}
              >
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="bg-brand-gold text-brand-dark p-3 rounded-full shadow-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-transform transform hover:scale-110"
      >
        <TranslateIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
