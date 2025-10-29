import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useTranslations';
import { TranslateIcon } from './Icons';
// FIX: Corrected import path for translations module.
import { Language } from '../translations/index';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const hideMenuTimer = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup timer on component unmount
    return () => {
      if (hideMenuTimer.current) {
        clearTimeout(hideMenuTimer.current);
      }
    };
  }, []);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' },
  ];

  const handleMouseEnter = () => {
    if (hideMenuTimer.current) {
      clearTimeout(hideMenuTimer.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hideMenuTimer.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay allows user to move cursor to menu
  };

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
