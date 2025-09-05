import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const TestimonialCard = ({ quote, name, role }: { quote: string, name: string, role: string }) => (
    <div className="bg-brand-card p-8 rounded-lg shadow-lg border border-gray-800 flex flex-col h-full text-left">
        <QuoteIcon className="w-8 h-8 text-brand-gold/80 mb-4" />
        <blockquote className="text-gray-300 flex-grow italic">"{quote}"</blockquote>
        <footer className="mt-6">
            <p className="font-semibold text-brand-light">{name}</p>
            <p className="text-sm text-gray-400">{role}</p>
        </footer>
    </div>
);


export const Testimonials: React.FC = () => {
    const { t } = useTranslations();
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    
    const testimonialList = [
        { quote: t('testimonial_1_quote'), name: t('testimonial_1_name'), role: t('testimonial_1_role') },
        { quote: t('testimonial_2_quote'), name: t('testimonial_2_name'), role: t('testimonial_2_role') },
        { quote: t('testimonial_3_quote'), name: t('testimonial_3_name'), role: t('testimonial_3_role') },
        { quote: t('testimonial_4_quote'), name: t('testimonial_4_name'), role: t('testimonial_4_role') },
        { quote: t('testimonial_5_quote'), name: t('testimonial_5_name'), role: t('testimonial_5_role') },
        { quote: t('testimonial_6_quote'), name: t('testimonial_6_name'), role: t('testimonial_6_role') },
        { quote: t('testimonial_7_quote'), name: t('testimonial_7_name'), role: t('testimonial_7_role') },
        { quote: t('testimonial_8_quote'), name: t('testimonial_8_name'), role: t('testimonial_8_role') },
        { quote: t('testimonial_9_quote'), name: t('testimonial_9_name'), role: t('testimonial_9_role') },
    ];

    const handleScroll = (direction: 'prev' | 'next') => {
        const slider = sliderRef.current;
        if (!slider) return;

        const firstSlide = slider.querySelector(':scope > div') as HTMLElement;
        if (!firstSlide) return;
        
        const slideWidth = firstSlide.offsetWidth;
        const scrollAmount = direction === 'prev' ? -slideWidth : slideWidth;
        
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const checkScrollButtons = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const { scrollLeft, scrollWidth, clientWidth } = slider;
        // Add a small buffer for floating point inaccuracies
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }, []);

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            checkScrollButtons();
            slider.addEventListener('scroll', checkScrollButtons, { passive: true });
            window.addEventListener('resize', checkScrollButtons);

            return () => {
                slider.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, [checkScrollButtons, testimonialList]);


  return (
    <section className="py-16 sm:py-24 bg-brand-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('testimonials_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('testimonials_subtitle')}</p>
        </div>
        
        <div className="mt-16 max-w-6xl mx-auto relative">
            <div 
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4"
                role="region"
                aria-label="Testimonials carousel"
            >
                {testimonialList.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start px-4"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${testimonialList.length}`}
                    >
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>
            
            <button
                onClick={() => handleScroll('prev')}
                disabled={isAtStart}
                className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-brand-card/70 rounded-full p-2 text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
                onClick={() => handleScroll('next')}
                disabled={isAtEnd}
                className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-brand-card/70 rounded-full p-2 text-brand-light hover:bg-brand-gold hover:text-brand-dark transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
    </section>
  );
};