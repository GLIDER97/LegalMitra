import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ChevronDownIcon } from './Icons';

type FaqItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-800">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left py-6 text-lg font-semibold text-brand-light hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/50 rounded-md"
      aria-expanded={isOpen}
    >
      <span className="pr-2">{question}</span>
      <ChevronDownIcon
        className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="pb-6 pr-8 text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  </div>
);


export const FAQ: React.FC = () => {
    const { t } = useTranslations();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqList: { q: any, a: any }[] = [
        { q: 'faq_q1', a: 'faq_a1' },
        { q: 'faq_q2', a: 'faq_a2' },
        { q: 'faq_q3', a: 'faq_a3' },
        { q: 'faq_q4', a: 'faq_a4' },
        { q: 'faq_q5', a: 'faq_a5' },
        { q: 'faq_q6', a: 'faq_a6' },
        { q: 'faq_q7', a: 'faq_a7' },
        { q: 'faq_q8', a: 'faq_a8' },
        { q: 'faq_q9', a: 'faq_a9' },
        { q: 'faq_q10', a: 'faq_a10' },
    ];

    return (
        <section className="py-16 sm:py-24 bg-brand-card/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-light tracking-tight">{t('faq_title')}</h2>
                    <p className="mt-4 text-lg text-gray-300">{t('faq_subtitle')}</p>
                </div>
                <div className="mt-12">
                    {faqList.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={t(faq.q)}
                            answer={t(faq.a)}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
