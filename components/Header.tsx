import React from 'react';
import { LegalIqLogoIcon, SparklesIcon, MenuIcon, XMarkIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';
import { Navbar } from './Navbar';

interface HeaderProps {
    onOpenLegalSupport: () => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    onOpenAboutUsModal: () => void;
    onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLegalSupport, isMobileMenuOpen, toggleMobileMenu, onOpenAboutUsModal, onOpenContactModal }) => {
  const { t } = useTranslations();

  const closeMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <header className="bg-brand-card/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="https://legaliq.app" className="flex items-center" aria-label="LegalIQ.app homepage">
              <div className="flex-shrink-0">
                <LegalIqLogoIcon className="h-8 w-8 text-brand-gold" />
              </div>
              <div className="ml-4">
                <h1 className="text-xl sm:text-2xl font-bold text-brand-light">
                  Legal<span style={{ color: '#D4AF37' }}>IQ</span>.app
                </h1>
                <p className="text-xs sm:text-sm text-brand-gold font-semibold tracking-wide">{t('tagline')}</p>
              </div>
            </a>
            
            <div className="hidden md:flex items-center space-x-4">
              <Navbar onLinkClick={() => {}} onAboutClick={onOpenAboutUsModal} onContactClick={onOpenContactModal} />
              <button
                  onClick={onOpenLegalSupport}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-brand-gold/80 text-sm font-medium rounded-md shadow-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all"
              >
                  <SparklesIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">{t('ai_legal_support_button_label')}</span>
              </button>
            </div>

            <div className="md:hidden flex items-center">
               <button
                  onClick={onOpenLegalSupport}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-brand-gold/80 text-sm font-medium rounded-md shadow-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 mr-2"
              >
                  <SparklesIcon className="h-5 w-5" />
                  <span className="text-xs">{t('ai_legal_support_button_label')}</span>
              </button>
              <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:bg-brand-gold/20 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
      </div>
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-brand-card shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
           <h2 className="text-lg font-bold text-brand-light">Menu</h2>
            <button onClick={toggleMobileMenu} className="p-1 rounded-full text-gray-400 hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="p-4">
          <Navbar onLinkClick={closeMenu} isMobile={true} onAboutClick={onOpenAboutUsModal} onContactClick={onOpenContactModal} />
        </div>
      </div>
    </>
  );
};