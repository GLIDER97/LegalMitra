import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Keyword: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <strong className="text-brand-gold font-semibold not-italic">{children}</strong>
);

const CtaButton = () => {
    const { t } = useTranslations();
    const handleScrollToTop = () => {
        const uploadSection = document.getElementById('upload');
        if (uploadSection) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="text-center my-12">
            <button
                onClick={handleScrollToTop}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-all transform hover:scale-105"
            >
                {t('blog_cta_button')}
            </button>
        </div>
    );
};

const ParagraphWithKeywords: React.FC<{ translationKey: any }> = ({ translationKey }) => {
    const { t } = useTranslations();
    const text = t(translationKey);

    if (!text) return null;

    const parts = text.split(/<k>|<\/k>/g);

    return (
        <p className="leading-8">
            {parts.map((part, index) =>
                index % 2 === 1 ? <Keyword key={index}>{part}</Keyword> : part
            )}
        </p>
    );
};


export const BlogContent: React.FC = () => {
    const { t } = useTranslations();
    return (
        <div className="py-16 sm:py-24 bg-brand-dark animate-fade-in">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-lg text-gray-300">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-light tracking-tight text-center mb-12">
                    {t('blog_main_title_p1')}<Keyword>{t('blog_main_title_k1')}</Keyword>
                </h1>
                
                <ParagraphWithKeywords translationKey="blog_p1" />

                <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-brand-light">{t('blog_h2_1')}</h2>
                <p className="leading-8">{t('blog_p2')}</p>
                <p className="leading-8 mt-4">{t('blog_p3')}</p>
                
                <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-brand-light">{t('blog_h2_2')}</h2>
                <ParagraphWithKeywords translationKey="blog_p4" />
                <p className="leading-8 mt-4">{t('blog_p5')}</p>

                <CtaButton />

                <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-brand-light">{t('blog_h2_3')}</h2>

                <h3 className="text-xl sm:text-2xl font-semibold mt-12 mb-4 text-brand-gold">{t('blog_h3_1')}</h3>
                <ParagraphWithKeywords translationKey="blog_p6" />
                <ul className="list-disc pl-8 mt-4 space-y-2">
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_s1_b')}</strong> {t('blog_li_s1_t')}</li>
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_s2_b')}</strong> {t('blog_li_s2_t')}</li>
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_s3_b')}</strong> {t('blog_li_s3_t')}</li>
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_s4_b')}</strong> {t('blog_li_s4_t')}</li>
                </ul>

                <h3 className="text-xl sm:text-2xl font-semibold mt-12 mb-4 text-brand-gold">{t('blog_h3_2')}</h3>
                <ParagraphWithKeywords translationKey="blog_p7" />

                <h3 className="text-xl sm:text-2xl font-semibold mt-12 mb-4 text-brand-gold">{t('blog_h3_3')}</h3>
                <ParagraphWithKeywords translationKey="blog_p8" />
                
                <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-brand-light">{t('blog_h2_4')}</h2>
                <p className="leading-8">{t('blog_p9')}</p>
                <ol className="list-decimal pl-8 mt-4 space-y-2">
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_g1_b')}</strong>{t('blog_li_g1_t')}</li>
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_g2_b')}</strong>{t('blog_li_g2_t')}</li>
                    <li><strong className="font-semibold text-gray-100">{t('blog_li_g3_b')}</strong>{t('blog_li_g3_t')}</li>
                </ol>

                <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-6 text-brand-light">{t('blog_h2_5')}</h2>
                <p className="leading-8">{t('blog_p10')}</p>
                <div className="mt-4">
                    <ParagraphWithKeywords translationKey="blog_p11" />
                </div>

                <CtaButton />
            </article>
        </div>
    );
};