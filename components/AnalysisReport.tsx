import React from 'react';
import { jsPDF } from 'jspdf';
import type { AnalysisResult } from '../types';
import { DownloadIcon, AlertTriangleIcon, HandshakeIcon, DocumentTextIcon, ChartBarIcon, ScaleIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-brand-card p-6 rounded-lg shadow-lg border border-gray-800">
        <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-gold/10 text-brand-gold">
                {icon}
            </div>
            <h3 className="ml-4 text-xl font-bold text-brand-light">{title}</h3>
        </div>
        <div className="mt-4 pl-14 text-gray-300 space-y-4">{children}</div>
    </div>
);

const SwotCard: React.FC<{ title: string; items: string[]; color: string }> = ({ title, items, color }) => {
    const { t } = useTranslations();
    return (
        <div>
            <h4 className={`font-semibold text-lg ${color}`}>{title}</h4>
            {items && items.length > 0 ? (
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-400">
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : <p className="text-gray-500 italic">{t('report_none_identified')}</p>}
        </div>
    );
};


export const AnalysisReport: React.FC<{ result: AnalysisResult }> = ({ result }) => {
    const { t } = useTranslations();
    const { swot, redFlags, complexityScore, summary, negotiationPoints } = result;

    const handleDownloadPdf = () => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });
        const FONT_SIZE = 11;
        const MARGIN = 15;
        const MAX_WIDTH = doc.internal.pageSize.getWidth() - MARGIN * 2;
        let y = MARGIN;

        // Note: Default jsPDF fonts have limited support for non-Latin characters (like Arabic or Chinese).
        // The PDF may not render them correctly without embedding specific fonts.
        // For now, we use Helvetica as a default.
        doc.setFont('Helvetica');

        // FIX: Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
        const addText = (text: string, options: any = {}, spacing: number = 7) => {
            if (y > doc.internal.pageSize.getHeight() - MARGIN) {
                doc.addPage();
                y = MARGIN;
            }
            const lines = doc.splitTextToSize(text, MAX_WIDTH);
            doc.text(lines, MARGIN, y, options);
            y += (lines.length * (FONT_SIZE / 2.5)) + spacing;
        };

        const addTitle = (text: string) => {
             if (y > doc.internal.pageSize.getHeight() - MARGIN - 10) { // check space for title
                doc.addPage();
                y = MARGIN;
            }
            doc.setFontSize(16);
            doc.setTextColor(40, 40, 40); // Darker text for titles
            addText(text, {}, 4);
            doc.setFontSize(FONT_SIZE);
            doc.setTextColor(80, 80, 80);
        };
        
        const addListItem = (item: string) => addText(`• ${item}`, {}, 2);
        
        const addFlagOrPoint = (item: { flag?: string, point?: string, explanation: string }) => {
            const title = item.flag || item.point || '';
            const textLines = doc.splitTextToSize(title, MAX_WIDTH);
            const explanationLines = doc.splitTextToSize(item.explanation, MAX_WIDTH);
            if (y + (textLines.length + explanationLines.length) * 5 > doc.internal.pageSize.getHeight() - MARGIN) {
                doc.addPage();
                y = MARGIN;
            }
            doc.setFont(undefined, 'bold');
            addText(title, {}, 2);
            doc.setFont(undefined, 'normal');
            addText(item.explanation, {}, 6);
        };
        
        // --- HEADER ---
        doc.setFontSize(22);
        doc.setTextColor('#121212');
        doc.text(t('pdf_title'), doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 8;
        doc.setFontSize(10);
        doc.setTextColor('#666666');
        doc.text(`${t('pdf_generated_on')}: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 10;
        doc.setDrawColor(212, 175, 55); // brand-gold
        doc.setLineWidth(0.5);
        doc.line(MARGIN, y, doc.internal.pageSize.getWidth() - MARGIN, y);
        y += 10;
        
        doc.setFontSize(FONT_SIZE);
        doc.setTextColor('#121212');

        // --- CONTENT ---
        addTitle(t('pdf_summary_title'));
        addText(summary);

        addTitle(`${t('report_complexity_title')}: ${complexityScore}/10`);

        addTitle(t('report_swot_title'));
        doc.setFont(undefined, 'bold');
        addText(t('swot_strengths'), {}, 2);
        doc.setFont(undefined, 'normal');
        swot.strengths.forEach(addListItem);
        y += 4;
        
        doc.setFont(undefined, 'bold');
        addText(t('swot_weaknesses'), {}, 2);
        doc.setFont(undefined, 'normal');
        swot.weaknesses.forEach(addListItem);
        y += 4;

        doc.setFont(undefined, 'bold');
        addText(t('swot_opportunities'), {}, 2);
        doc.setFont(undefined, 'normal');
        swot.opportunities.forEach(addListItem);
        y += 4;
        
        doc.setFont(undefined, 'bold');
        addText(t('swot_threats'), {}, 2);
        doc.setFont(undefined, 'normal');
        swot.threats.forEach(addListItem);
        y += 4;


        addTitle(t('report_redflags_title'));
        if (redFlags.length > 0) redFlags.forEach(item => addFlagOrPoint(item));
        else addText(t('report_none_identified'));
        
        addTitle(t('report_negotiate_title'));
        if (negotiationPoints.length > 0) negotiationPoints.forEach(item => addFlagOrPoint(item));
        else addText(t('report_none_identified_negotiate'));

        // --- FOOTER ---
        // FIX: Property 'getNumberOfPages' does not exist on type '...'. The method is on the jsPDF instance.
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor('#666666');
            doc.text(`${t('pdf_page')} ${i} ${t('pdf_of')} ${pageCount}`, doc.internal.pageSize.getWidth() - MARGIN, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
            doc.text(t('pdf_footer_disclaimer'), MARGIN, doc.internal.pageSize.getHeight() - 10);
        }

        doc.save('LegalMitra_Analysis_Report.pdf');
    };

    const getComplexityColor = (score: number) => {
        if (score <= 3) return 'text-green-400';
        if (score <= 7) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="space-y-8">
            <div className="text-center p-6 bg-brand-card/50 rounded-lg border border-gray-800">
                <h2 className="text-3xl font-bold text-brand-light">{t('report_title')}</h2>
                <p className="mt-2 text-brand-gold">{t('report_subtitle')}</p>
                <button 
                    onClick={handleDownloadPdf}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-all"
                >
                    <DownloadIcon className="h-5 w-5" />
                    {t('report_download_button')}
                </button>
            </div>

            <Section icon={<DocumentTextIcon className="w-6 h-6" />} title={t('report_summary_title')}>
                <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>
            </Section>

            <Section icon={<ChartBarIcon className="w-6 h-6" />} title={t('report_complexity_title')}>
                 <div className="flex items-center gap-4">
                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div 
                            className={`h-4 rounded-full transition-all duration-500 ${getComplexityColor(complexityScore).replace('text-','bg-')}`} 
                            style={{ width: `${complexityScore * 10}%`}}
                        ></div>
                    </div>
                    <span className={`text-2xl font-bold ${getComplexityColor(complexityScore)}`}>{complexityScore}/10</span>
                </div>
                <p className="text-sm text-gray-500">{t('report_complexity_desc')}</p>
            </Section>

            <Section icon={<ScaleIcon className="w-6 h-6" />} title={t('report_swot_title')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <SwotCard title={t('swot_strengths')} items={swot.strengths} color="text-green-400" />
                   <SwotCard title={t('swot_weaknesses')} items={swot.weaknesses} color="text-yellow-400" />
                   <SwotCard title={t('swot_opportunities')} items={swot.opportunities} color="text-blue-400" />
                   <SwotCard title={t('swot_threats')} items={swot.threats} color="text-red-400" />
                </div>
            </Section>
            
            <Section icon={<AlertTriangleIcon className="w-6 h-6" />} title={t('report_redflags_title')}>
                {redFlags && redFlags.length > 0 ? (
                    <ul className="space-y-4">
                        {redFlags.map((flag, index) => (
                            <li key={index} className="p-4 bg-red-900/20 border-l-4 border-red-500 rounded-r-md">
                                <h4 className="font-bold text-red-300">{flag.flag}</h4>
                                <p className="mt-1 text-gray-400 whitespace-pre-wrap">{flag.explanation}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-500 italic">{t('report_none_identified')}</p>}
            </Section>

            <Section icon={<HandshakeIcon className="w-6 h-6" />} title={t('report_negotiate_title')}>
                 {negotiationPoints && negotiationPoints.length > 0 ? (
                    <ul className="space-y-4">
                        {negotiationPoints.map((point, index) => (
                            <li key={index} className="p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-md">
                                <h4 className="font-bold text-blue-300">{point.point}</h4>
                                <p className="mt-1 text-gray-400 whitespace-pre-wrap">{point.explanation}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-500 italic">{t('report_none_identified_negotiate')}</p>}
            </Section>
        </div>
    );
};