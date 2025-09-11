import React from 'react';
import { jsPDF } from 'jspdf';
import type { AnalysisResult, JargonTerm } from '../types';
import { 
    DownloadIcon, 
    AlertTriangleIcon, 
    HandshakeIcon, 
    DocumentTextIcon, 
    ChartBarIcon, 
    ScaleIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    LightbulbIcon
} from './Icons';
import { useTranslations, useLanguage } from '../hooks/useTranslations';
import { NotoSansDevanagariRegular } from './NotoSansDevanagariFont';
import { savePdfToDrive } from '../services/driveService';

interface AnalysisReportProps {
    result: AnalysisResult;
    fileName: string;
    setError: (error: { title: string; message: string } | null) => void;
}

const JargonExplainer: React.FC<{ text: string; glossary: JargonTerm[] }> = ({ text, glossary }) => {
  if (!glossary || glossary.length === 0) {
    return <>{text}</>;
  }

  // Sort glossary by term length, descending, to match longer phrases first
  const sortedGlossary = [...glossary].sort((a, b) => b.term.length - a.term.length);

  // Create a regex that finds any of the terms as whole words, case-insensitively
  const termsRegex = new RegExp(
    `\\b(${sortedGlossary.map(item => item.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts = text.split(termsRegex);
  
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // This is a matched term
          const term = part;
          const definition = sortedGlossary.find(
            item => item.term.toLowerCase() === term.toLowerCase()
          )?.definition;
          
          return (
            <span key={index} tabIndex={0} className="tooltip-container relative">
              <span className="underline cursor-pointer italic focus:outline-none">{term}</span>
              <span className="tooltip-text absolute z-10 w-64 p-3 text-sm leading-tight text-white bg-brand-card shadow-lg rounded-md border border-gray-700 transition-opacity duration-300">
                {definition || 'No definition found.'}
              </span>
            </span>
          );
        }
        return part; // This is a regular text part
      })}
    </>
  );
};


const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-brand-card/50 p-6 rounded-lg shadow-lg border border-gray-800">
        <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-gold/10 text-brand-gold">
                {icon}
            </div>
            <h3 className="ml-4 text-xl font-bold text-brand-light">{title}</h3>
        </div>
        <div className="mt-4 md:pl-14 text-gray-300 space-y-4">{children}</div>
    </div>
);

const SwotCard: React.FC<{ title: string; items: string[]; color: string; icon: React.ReactNode; glossary: JargonTerm[] }> = ({ title, items, color, icon, glossary }) => {
    const { t } = useTranslations();
    const borderColor = color.replace('text-', 'border-');
    const bgColor = color.replace('text-', 'bg-');

    return (
        <div className={`bg-brand-card rounded-lg shadow-md border-t-4 ${borderColor}`}>
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${bgColor}/20 ${color}`}>
                        {icon}
                    </div>
                    <h4 className={`ml-3 font-semibold text-lg text-brand-light`}>{title}</h4>
                </div>
                {items && items.length > 0 ? (
                    <ul className="mt-4 space-y-3 text-gray-300">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${bgColor}`}></span>
                                <span className="flex-1"><JargonExplainer text={item} glossary={glossary} /></span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="mt-4 text-gray-500 italic">{t('report_none_identified')}</p>}
            </div>
        </div>
    );
};


export const AnalysisReport: React.FC<AnalysisReportProps> = ({ result, fileName, setError }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();
    const { documentTitle, swot, redFlags, complexityScore, summary, negotiationPoints, jargonGlossary } = result;

    const handleDownloadPdf = () => {
        try {
            setError(null); // Clear previous errors before attempting to generate a new PDF.
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            // File Name Logic for download filename
            const effectiveFileName = fileName || 'Document';
            const baseFileName = effectiveFileName.includes('.')
                ? effectiveFileName.split('.').slice(0, -1).join('.')
                : effectiveFileName;
            
            const downloadBaseFileName = baseFileName.length > 15
                ? baseFileName.substring(0, 15)
                : baseFileName;
            
            const pdfDownloadName = `${downloadBaseFileName}_Analysis by LegalIQ.app.pdf`;
            
            const FONT_SIZE = 11;
            const MARGIN = 15;
            const MAX_WIDTH = doc.internal.pageSize.getWidth() - MARGIN * 2;
            let y = MARGIN;

            const isHindi = language === 'hi';
            const fontName = isHindi ? 'NotoSansDevanagari' : 'Helvetica';
            
            if (isHindi) {
                doc.addFileToVFS('NotoSansDevanagari-Regular.ttf', NotoSansDevanagariRegular);
                doc.addFont('NotoSansDevanagari-Regular.ttf', 'NotoSansDevanagari', 'normal');
            }
            
            doc.setFont(fontName);
            
            const headingColors = [
                [40, 40, 40],    // Dark Grey
                [0, 51, 102],    // Dark Blue
                [0, 100, 0],     // Dark Green
                [139, 69, 19],   // Dark Gold/Brown
                [85, 26, 139]    // Dark Purple
            ];
            let colorIndex = 0;

            const setBold = (isBold: boolean) => {
                if (isHindi) {
                    // For Hindi, we only have the regular font, so we don't switch to bold.
                    doc.setFont(fontName, 'normal');
                } else {
                    doc.setFont(fontName, isBold ? 'bold' : 'normal');
                }
            };

            const addText = (text: string | string[], options: any = {}, spacing: number = 7, underlineJargon: boolean = true) => {
                const textAsString = Array.isArray(text) ? text.join('\n') : text;
                if (!textAsString.trim()) {
                    y += spacing;
                    return;
                }
            
                const lines = doc.splitTextToSize(textAsString, MAX_WIDTH);
                
                // Convert font size from points to mm and apply a multiplier for line height.
                const fontSizeInMM = FONT_SIZE / doc.internal.scaleFactor;
                const lineHeightMultiplier = isHindi ? 1.7 : 1.5;
                const lineHeight = fontSizeInMM * lineHeightMultiplier;
            
                // Memoized regex creation
                const getJargonRegex = (() => {
                    let regex: RegExp | null = null;
                    let isInitialized = false;
                    return () => {
                        if (isInitialized) return regex;
                        isInitialized = true;
                        if (!jargonGlossary || jargonGlossary.length === 0) return null;
                        
                        const sortedGlossary = [...jargonGlossary].sort((a, b) => b.term.length - a.term.length);
                        const terms = sortedGlossary.map(item => item.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).filter(Boolean);
                        
                        if (terms.length > 0) {
                            regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
                        }
                        return regex;
                    };
                })();
            
                const jargonRegex = getJargonRegex();
            
                for (const line of lines) {
                    if (y + lineHeight > doc.internal.pageSize.getHeight() - MARGIN) {
                        doc.addPage();
                        y = MARGIN;
                    }
            
                    if (jargonRegex && underlineJargon) {
                        const parts = line.split(jargonRegex);
                        let currentX = MARGIN;
            
                        parts.forEach((part, index) => {
                            if (!part) return;
            
                            const isJargon = index % 2 === 1;
                            doc.text(part, currentX, y, options);
                            const partWidth = doc.getTextWidth(part);
            
                            if (isJargon) {
                                doc.setDrawColor(80, 80, 80);
                                doc.setLineWidth(0.2);
                                doc.line(currentX, y + 1.2, currentX + partWidth, y + 1.2); 
                            }
                            currentX += partWidth;
                        });
                    } else {
                        doc.text(line, MARGIN, y, options);
                    }
                    y += lineHeight;
                }
                
                if (spacing > 0) {
                    y += spacing;
                }
            };

            const addTitle = (text: string) => {
                 if (y > doc.internal.pageSize.getHeight() - MARGIN - 10) { 
                    doc.addPage();
                    y = MARGIN;
                }
                doc.setFontSize(16);
                
                const currentColor = headingColors[colorIndex % headingColors.length];
                doc.setTextColor(currentColor[0], currentColor[1], currentColor[2]);
                colorIndex++;

                addText(text, {}, 4);
                doc.setFontSize(FONT_SIZE);
                doc.setTextColor(80, 80, 80); // Reset for body text
            };
            
            const addListItem = (item: string) => addText(`• ${item}`, {}, 3);
            
            const addFlagOrPoint = (item: { flag?: string, point?: string, explanation: string, citation?: string, example?: string }) => {
                const title = item.flag || item.point || '';
                const textLines = doc.splitTextToSize(title, MAX_WIDTH);
                const explanationLines = doc.splitTextToSize(item.explanation, MAX_WIDTH);
                const exampleLines = item.example ? doc.splitTextToSize(`${t('report_example_prefix')} ${item.example}`, MAX_WIDTH) : [];
                const citationLines = item.citation ? doc.splitTextToSize(`Source: ${item.citation}`, MAX_WIDTH) : [];

                if (y + (textLines.length + explanationLines.length + exampleLines.length + citationLines.length) * 5 > doc.internal.pageSize.getHeight() - MARGIN) {
                    doc.addPage();
                    y = MARGIN;
                }
                
                setBold(true);
                addText(title, {}, 2);
                setBold(false);
                addText(item.explanation, {}, 2);

                if (item.example) {
                    if (isHindi) {
                        addText(`${t('report_example_prefix')} ${item.example}`, {}, item.citation ? 2 : 8);
                    } else {
                        doc.setFont(fontName, 'bolditalic');
                        addText(`${t('report_example_prefix')} ${item.example}`, {}, item.citation ? 2 : 8);
                        doc.setFont(fontName, 'normal');
                    }
                } else {
                     y += item.citation ? 0 : 6;
                }


                if (item.citation) {
                    doc.setFontSize(FONT_SIZE - 2);
                    doc.setTextColor(128, 128, 128);
                    addText(`Source: ${item.citation}`, {}, 8);
                    doc.setFontSize(FONT_SIZE);
                    doc.setTextColor(80, 80, 80);
                }
            };
            
            // PDF Heading
            const pdfMainTitle = t('report_title');
            const pdfDocumentName = documentTitle || baseFileName;
            
            doc.setFontSize(22);
            doc.setTextColor('#121212');
            const splitTitle = doc.splitTextToSize(pdfMainTitle, MAX_WIDTH);
            doc.text(splitTitle, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
            y += (splitTitle.length * 8) + 2;

            doc.setFontSize(12);
            doc.setTextColor('#555555');
            const truncatedDocName = pdfDocumentName.length > 80 ? pdfDocumentName.substring(0, 77) + '...' : pdfDocumentName;
            const splitDocName = doc.splitTextToSize(truncatedDocName, MAX_WIDTH);
            doc.text(splitDocName, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
            y += (splitDocName.length * 5) + 4;
            
            doc.setFontSize(14);
            doc.setTextColor('#444444');
            const analysisByText = t('pdf_analysis_by');
            const linkText = 'LegalIQ.app';
            const url = 'https://legaliq.app/';
            const parts = analysisByText.split(linkText);
            const prefix = parts[0];
            const suffix = parts.length > 1 ? parts[1] : '';

            const prefixWidth = doc.getTextWidth(prefix);
            const linkWidth = doc.getTextWidth(linkText);
            const suffixWidth = doc.getTextWidth(suffix);
            const totalWidth = prefixWidth + linkWidth + suffixWidth;

            const startX = (doc.internal.pageSize.getWidth() - totalWidth) / 2;
            const linkX = startX + prefixWidth;
            const suffixX = linkX + linkWidth;
            const textHeight = (doc.getFontSize() / doc.internal.scaleFactor);

            // Draw the prefix
            doc.text(prefix, startX, y);

            // Draw the link text
            doc.setTextColor(0, 0, 238); // Blue for link
            doc.text(linkText, linkX, y);
            
            // Add the hyperlink
            doc.link(linkX, y - textHeight, linkWidth, textHeight, { url: url });
            
            // Draw underline
            doc.setDrawColor(0, 0, 238);
            doc.setLineWidth(0.2);
            doc.line(linkX, y + 1, linkX + linkWidth, y + 1);

            // Draw the suffix
            doc.setTextColor('#444444'); // Reset color
            doc.text(suffix, suffixX, y);

            y += 8;

            doc.setFontSize(10);
            doc.setTextColor('#666666');
            doc.text(`${t('pdf_generated_on')}: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
            y += 10;
            doc.setDrawColor(212, 175, 55);
            doc.setLineWidth(0.5);
            doc.line(MARGIN, y, doc.internal.pageSize.getWidth() - MARGIN, y);
            y += 10;
            
            doc.setFontSize(FONT_SIZE);
            doc.setTextColor('#121212');

            addTitle(t('pdf_summary_title'));
            addText(summary);

            addTitle(`${t('report_complexity_title')}: ${complexityScore}/10`);

            addTitle(t('report_swot_title'));
            setBold(true);
            addText(t('swot_strengths'), {}, 2);
            setBold(false);
            swot.strengths.forEach(addListItem);
            y += 4;
            
            setBold(true);
            addText(t('swot_weaknesses'), {}, 2);
            setBold(false);
            swot.weaknesses.forEach(addListItem);
            y += 4;

            setBold(true);
            addText(t('swot_opportunities'), {}, 2);
            setBold(false);
            swot.opportunities.forEach(addListItem);
            y += 4;
            
            setBold(true);
            addText(t('swot_threats'), {}, 2);
            setBold(false);
            swot.threats.forEach(addListItem);
            y += 4;


            addTitle(t('report_redflags_title'));
            if (redFlags.length > 0) redFlags.forEach(item => addFlagOrPoint(item));
            else addText(t('report_none_identified'));
            
            addTitle(t('report_negotiate_title'));
            if (negotiationPoints.length > 0) negotiationPoints.forEach(item => addFlagOrPoint(item));
            else addText(t('report_none_identified_negotiate'));
            
            if (jargonGlossary && jargonGlossary.length > 0) {
                addTitle(t('pdf_glossary_title'));
                jargonGlossary.forEach(item => {
                    const termLines = doc.splitTextToSize(item.term, MAX_WIDTH);
                    const definitionLines = doc.splitTextToSize(item.definition, MAX_WIDTH);
                    
                    if (y + (termLines.length + definitionLines.length) * 6 > doc.internal.pageSize.getHeight() - MARGIN) {
                        doc.addPage();
                        y = MARGIN;
                    }

                    setBold(true);
                    addText(item.term, {}, 2, false);
                    setBold(false);
                    addText(item.definition, {}, 8, false);
                });
            }

            // Footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor('#666666');

                const pageNumY = doc.internal.pageSize.getHeight() - 10;
                doc.text(`${t('pdf_page')} ${i} ${t('pdf_of')} ${pageCount}`, doc.internal.pageSize.getWidth() - MARGIN, pageNumY, { align: 'right' });
                doc.text(t('pdf_footer_disclaimer'), MARGIN, pageNumY);

                const ctaY = doc.internal.pageSize.getHeight() - 5;
                const ctaPrefix = t('pdf_footer_cta_prefix');
                const ctaLinkText = t('pdf_footer_cta_link');
                
                doc.text(ctaPrefix, MARGIN, ctaY);
                
                const prefixWidth = doc.getTextWidth(ctaPrefix);
                const linkWidth = doc.getTextWidth(ctaLinkText);
                const linkHeight = (doc.getFontSize() / doc.internal.scaleFactor);

                doc.setTextColor(0, 0, 238); // Blue for link
                doc.text(ctaLinkText, MARGIN + prefixWidth, ctaY);

                // Add underline for footer link
                doc.setDrawColor(0, 0, 238);
                doc.setLineWidth(0.2);
                doc.line(MARGIN + prefixWidth, ctaY + 0.5, MARGIN + prefixWidth + linkWidth, ctaY + 0.5);
                
                doc.link(MARGIN + prefixWidth, ctaY - linkHeight, linkWidth, linkHeight, {
                    url: 'https://legaliq.app/'
                });
            }

            // --- Save a copy to Google Drive ---
            // This happens silently in the background without affecting the user's download.
            const pdfDataUri = doc.output('datauristring');
            const base64PdfData = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
            savePdfToDrive(base64PdfData, pdfDownloadName);

            doc.save(pdfDownloadName);
        } catch (e) {
            console.error("PDF Generation Error:", e);
            const isHindi = language === 'hi';
            if (isHindi) {
                setError({
                    title: t('error_pdf_hindi_title'),
                    message: t('error_pdf_hindi_message')
                });
            } else {
                 setError({
                    title: t('error_pdf_generic_title'),
                    message: t('error_pdf_generic_message')
                });
            }
        }
    };

    const getComplexityInfo = (score: number): { text: string; color: string } => {
        if (score <= 2) return { text: 'Very Simple', color: 'text-green-400' };
        if (score <= 4) return { text: 'Simple', color: 'text-green-500' };
        if (score <= 6) return { text: 'Moderate', color: 'text-yellow-400' };
        if (score <= 8) return { text: 'Complex', color: 'text-orange-400' };
        return { text: 'Very Complex', color: 'text-red-500' };
    };
    
    const complexityInfo = getComplexityInfo(complexityScore);

    return (
        <>
            <div className="bg-brand-card/30 p-4 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-10">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-light">{t('report_title')}</h2>
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
                    <p className="leading-relaxed whitespace-pre-wrap text-lg">
                        <JargonExplainer text={summary} glossary={jargonGlossary} />
                    </p>
                </Section>

                <Section icon={<ChartBarIcon className="w-6 h-6" />} title={t('report_complexity_title')}>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-full flex items-center gap-4">
                            <span className={`text-2xl font-bold ${complexityInfo.color}`}>{complexityScore}/10</span>
                            <div className="w-full bg-gray-700 rounded-full h-4 relative">
                                <div 
                                    className={`h-4 rounded-full transition-all duration-500 ${complexityInfo.color.replace('text-','bg-')}`} 
                                    style={{ width: `${complexityScore * 10}%`}}
                                ></div>
                            </div>
                        </div>
                        <span className={`text-lg font-semibold ${complexityInfo.color} w-full sm:w-36 text-left sm:text-right mt-2 sm:mt-0`}>{complexityInfo.text}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{t('report_complexity_desc')}</p>
                </Section>

                <Section icon={<ScaleIcon className="w-6 h-6" />} title={t('report_swot_title')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <SwotCard title={t('swot_strengths')} items={swot.strengths} color="text-green-400" icon={<ThumbsUpIcon className="w-5 h-5"/>} glossary={jargonGlossary} />
                       <SwotCard title={t('swot_weaknesses')} items={swot.weaknesses} color="text-yellow-400" icon={<ThumbsDownIcon className="w-5 h-5"/>} glossary={jargonGlossary} />
                       <SwotCard title={t('swot_opportunities')} items={swot.opportunities} color="text-blue-400" icon={<LightbulbIcon className="w-5 h-5"/>} glossary={jargonGlossary} />
                       <SwotCard title={t('swot_threats')} items={swot.threats} color="text-red-400" icon={<AlertTriangleIcon className="w-5 h-5"/>} glossary={jargonGlossary} />
                    </div>
                </Section>
                
                <Section icon={<AlertTriangleIcon className="w-6 h-6" />} title={t('report_redflags_title')}>
                    {redFlags && redFlags.length > 0 ? (
                        <ul className="space-y-4">
                            {redFlags.map((flag, index) => (
                                <li key={index} className="p-4 bg-red-900/30 border-l-4 border-red-500 rounded-r-md">
                                    <div className="flex items-start">
                                        <AlertTriangleIcon className="h-5 w-5 text-red-400 mt-1 flex-shrink-0"/>
                                        <div className="ml-3 flex-1">
                                            <h4 className="font-bold text-red-300">{flag.flag}</h4>
                                            <p className="mt-1 text-gray-300 whitespace-pre-wrap">
                                                <JargonExplainer text={flag.explanation} glossary={jargonGlossary} />
                                            </p>
                                            {flag.example && (
                                                <p className="mt-2 text-red-200/90 whitespace-pre-wrap font-bold italic">
                                                    {t('report_example_prefix')} {flag.example}
                                                </p>
                                            )}
                                            {flag.citation && (
                                                <div className="mt-2 flex items-center gap-2 text-sm text-red-200/70">
                                                    <DocumentTextIcon className="h-4 w-4" />
                                                    <span className="font-semibold text-red-200">Source: <span className="font-normal">{flag.citation}</span></span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500 italic">{t('report_none_identified')}</p>}
                </Section>

                <Section icon={<HandshakeIcon className="w-6 h-6" />} title={t('report_negotiate_title')}>
                     {negotiationPoints && negotiationPoints.length > 0 ? (
                        <ul className="space-y-4">
                            {negotiationPoints.map((point, index) => (
                                <li key={index} className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-r-md">
                                    <div className="flex items-start">
                                        <HandshakeIcon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0"/>
                                        <div className="ml-3">
                                            <h4 className="font-bold text-blue-300">{point.point}</h4>
                                            <p className="mt-1 text-gray-300 whitespace-pre-wrap">
                                                <JargonExplainer text={point.explanation} glossary={jargonGlossary} />
                                            </p>
                                            {point.example && (
                                                <p className="mt-2 text-blue-200/90 whitespace-pre-wrap font-bold italic">
                                                    {t('report_example_prefix')} {point.example}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500 italic">{t('report_none_identified_negotiate')}</p>}
                </Section>
            </div>
            <div id="chat-anchor" className="h-1" />
        </>
    );
};