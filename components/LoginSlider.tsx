import React, { useState, FormEvent, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, SpinnerIcon } from './Icons';

interface LoginSliderProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginSlider: React.FC<LoginSliderProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslations();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', occupation: '' });
    const slideCount = 5;

    useEffect(() => {
        if (isOpen) {
            // Reset state when slider opens
            setCurrentSlide(0);
            setFormStatus('idle');
            setFormData({ name: '', email: '', whatsapp: '', occupation: '' });
        }
    }, [isOpen]);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slideCount - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));
    const goToSlide = (index: number) => {
        if (index >= 0 && index < slideCount) {
            setCurrentSlide(index);
        }
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            console.log('Waitlist form submitted:', formData);
            setFormStatus('success');
        }, 1500);
    };

    const slides = [
        // Card 1: Status
        <div className="flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-2xl font-bold text-brand-light mb-4">{t('flashcard1_title')}</h3>
            <p className="text-lg text-gray-300">{t('flashcard1_body')}</p>
            <p className="mt-6 text-base text-gray-400">
                {t('flashcard1_cta_p1')}
                <b className="text-brand-gold not-italic">{t('flashcard1_cta_p2')}</b>
            </p>
        </div>,
        // Card 2: Benefits
        <div className="flex flex-col items-start justify-center text-left h-full w-full">
            <h3 className="text-2xl font-bold text-brand-light mb-6 self-center">{t('flashcard2_title')}</h3>
            <ul className="space-y-4 text-gray-300 text-base">
                <li className="flex items-start gap-3"><span className="text-brand-gold mt-1">&#10003;</span><span>{t('flashcard2_item1')}</span></li>
                <li className="flex items-start gap-3"><span className="text-brand-gold mt-1">&#10003;</span><span>{t('flashcard2_item2')}</span></li>
                <li className="flex items-start gap-3"><span className="text-brand-gold mt-1">&#10003;</span><span>{t('flashcard2_item3')}</span></li>
                <li className="flex items-start gap-3"><span className="text-brand-gold mt-1">&#10003;</span><span>{t('flashcard2_item4')}</span></li>
            </ul>
            <p className="mt-8 text-center text-gray-400 text-sm self-center italic">{t('flashcard2_footer')}</p>
        </div>,
        // Card 3: Premium
        <div className="flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-2xl font-bold text-brand-light mb-4">{t('flashcard3_title')}</h3>
            <p className="text-base text-gray-300 max-w-sm leading-relaxed">{t('flashcard3_body')}</p>
        </div>,
        // Card 4: Offer
        <div className="flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-2xl font-bold text-brand-light mb-4">{t('flashcard4_title')}</h3>
            <p className="text-base text-gray-300 max-w-md leading-relaxed">{t('flashcard4_body')}</p>
            <button
                onClick={() => goToSlide(4)}
                className="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all"
            >
                {t('flashcard4_button')}
            </button>
            <p className="mt-4 text-gray-400 text-sm italic">{t('flashcard4_footer')}</p>
        </div>,
        // Card 5: Form
        <div className="flex flex-col items-center justify-center text-center h-full w-full">
            {formStatus === 'success' ? (
                <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-brand-light mb-4">Thank You!</h3>
                    <p className="text-lg text-gray-300 max-w-sm">{t('form_success_message')}</p>
                     <button
                        onClick={onClose}
                        className="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-brand-light mb-2">{t('flashcard5_title')}</h3>
                    <p className="text-gray-300 mb-8">{t('flashcard5_body')}</p>
                    <form onSubmit={handleFormSubmit} className="w-full max-w-sm space-y-4 text-left">
                        <div>
                            <label htmlFor="name" className="sr-only">{t('form_name_label')}</label>
                            <input type="text" name="name" id="name" required placeholder={t('form_name_label')} value={formData.name} onChange={handleFormChange} className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-4 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">{t('form_email_label')}</label>
                            <input type="email" name="email" id="email" required placeholder={t('form_email_label')} value={formData.email} onChange={handleFormChange} className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-4 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="whatsapp" className="sr-only">{t('form_whatsapp_label')}</label>
                            <input type="tel" name="whatsapp" id="whatsapp" placeholder={t('form_whatsapp_label')} value={formData.whatsapp} onChange={handleFormChange} className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-4 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="occupation" className="sr-only">{t('form_occupation_label')}</label>
                            <input type="text" name="occupation" id="occupation" placeholder={t('form_occupation_label')} value={formData.occupation} onChange={handleFormChange} className="block w-full rounded-md border-0 bg-gray-800 py-2.5 px-4 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm" />
                        </div>
                        <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {formStatus === 'submitting' ? (
                                <>
                                  <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />
                                  {t('form_submitting_button')}
                                </>
                            ) : t('form_submit_button')}
                        </button>
                    </form>
                </>
            )}
        </div>
    ];


    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-slider-title"
        >
            <div 
                className="relative w-full max-w-lg h-[90vh] max-h-[520px] bg-brand-card shadow-2xl rounded-2xl border border-gray-700 flex flex-col" 
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 z-20 p-2 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    aria-label="Close"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="flex-grow overflow-hidden relative">
                    <div 
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0 p-6 sm:p-8">
                                {slide}
                            </div>
                        ))}
                    </div>
                </div>

                {currentSlide > 0 && (
                    <button 
                        onClick={prevSlide}
                        className="absolute top-1/2 left-0 sm:-left-5 transform -translate-y-1/2 bg-brand-card/70 rounded-full p-2 text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                )}
                {currentSlide < slideCount - 1 && (
                     <button 
                        onClick={nextSlide}
                        className="absolute top-1/2 right-0 sm:-right-5 transform -translate-y-1/2 bg-brand-card/70 rounded-full p-2 text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                )}

                <div className="flex justify-center items-center gap-2 p-4">
                    {Array.from({ length: slideCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === index ? 'bg-brand-gold scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};