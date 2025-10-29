import React from 'react';
import { jsPDF } from 'jspdf';
import type { AnalysisResult, JargonTerm, SectionError, Message, RedFlag, GroundingInfo } from '../types';
// FIX: Import `TranslationKeys` which is now properly exported.
// FIX: Corrected import path for translations module.
import type { TranslationKeys } from '../translations/index';
import { generateSpeech, getRealWorldGrounding } from '../services/geminiService';
import { 
    DownloadIcon, 
    AlertTriangleIcon, 
    HandshakeIcon, 
    DocumentTextIcon, 
    ChartBarIcon, 
    ScaleIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    LightbulbIcon,
    SpeakerWaveIcon,
    StopCircleIcon,
    SpinnerIcon,
    ShieldSearchIcon,
    ChevronDownIcon
} from './Icons';
import { useTranslations, useLanguage } from '../hooks/useTranslations';
import { NotoSansDevanagariRegular } from './NotoSansDevanagariFont';

interface AnalysisReportProps {
    result: AnalysisResult;
    fileName: string;
    setError: (error: { title: string; message: string } | null) => void;
    isLoading: boolean;
    isGlossaryLoading: boolean;
    loadingMessageKey: TranslationKeys;
    sectionErrors: SectionError[];
    onRetry: (section: keyof AnalysisResult) => void;
    chatMessages: Message[];
}

const SkeletonLoader: React.FC<{ className?: string }> = ({ className = 'h-4 bg-gray-700 rounded w-3/4' }) => (
    <div className={`animate-pulse ${className}`}></div>
);

const SectionErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="p-4 bg-red-900/30 border border-red-800 rounded-lg flex flex-col sm:flex-row items-center gap-4">
        <AlertTriangleIcon className="h-6 w-6 text-red-400 flex-shrink-0" />
        <div className="flex-grow text-center sm:text-left">
            <p className="font-semibold text-red-300">Could not load this section</p>
            <p className="text-sm text-red-400">{message}</p>
        </div>
        <button
            onClick={onRetry}
            className="px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all"
        >
            Retry
        </button>
    </div>
);


const JargonExplainer: React.FC<{ text: string; glossary?: JargonTerm[] }> = ({ text, glossary }) => {
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

const ReadAloudButton: React.FC<{
    isPlaying: boolean;
    isLoading: boolean;
    onClick: () => void;
}> = ({ isPlaying, isLoading, onClick }) => {
    const Icon = isPlaying ? StopCircleIcon : SpeakerWaveIcon;
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="p-2 rounded-full text-brand-gold hover:bg-brand-gold/20 disabled:text-gray-500 disabled:cursor-wait transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
            aria-label={isPlaying ? "Stop reading" : "Read section aloud"}
        >
            {isLoading ? (
                <SpinnerIcon className="h-5 w-5 animate-spin" />
            ) : (
                <Icon className="h-5 w-5" />
            )}
        </button>
    );
};


const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; isLoading?: boolean, error?: SectionError | null; onRetry?: () => void; onPlay?: () => void; isPlaying?: boolean; isPlayLoading?: boolean }> = ({ icon, title, children, isLoading, error, onRetry, onPlay, isPlaying, isPlayLoading }) => (
    <div className="bg-brand-card/50 p-6 rounded-lg shadow-lg border border-gray-800">
        <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-gold/10 text-brand-gold">
                {icon}
            </div>
            <h3 className="ml-4 text-xl font-bold text-brand-light">{title}</h3>
            {onPlay && (
                <div className="ml-auto">
                    <ReadAloudButton isPlaying={!!isPlaying} isLoading={!!isPlayLoading} onClick={onPlay} />
                </div>
            )}
        </div>
        <div className="mt-4 md:pl-14 text-gray-300 space-y-4">
            {isLoading && <div className="space-y-3"><SkeletonLoader /><SkeletonLoader className="h-4 bg-gray-700 rounded w-1/2" /></div>}
            {error && onRetry && <SectionErrorState message={error.message} onRetry={onRetry} />}
            {!isLoading && !error && children}
        </div>
    </div>
);

const SwotCard: React.FC<{ title: string; items: string[] | undefined; color: string; icon: React.ReactNode; glossary?: JargonTerm[], isLoading?: boolean }> = ({ title, items, color, icon, glossary, isLoading }) => {
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
                {isLoading && <div className="mt-4 space-y-3"><SkeletonLoader /><SkeletonLoader className="w-5/6" /></div>}
                {!isLoading && items && items.length > 0 ? (
                    <ul className="mt-4 space-y-3 text-gray-300">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${bgColor}`}></span>
                                <span className="flex-1"><JargonExplainer text={item} glossary={glossary} /></span>
                            </li>
                        ))}
                    </ul>
                ) : !isLoading && <p className="mt-4 text-gray-500 italic">{t('report_none_identified')}</p>}
            </div>
        </div>
    );
};

// Audio decoding utilities
function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


export const AnalysisReport: React.FC<AnalysisReportProps> = ({ result, fileName, setError, isLoading, isGlossaryLoading, loadingMessageKey, sectionErrors, onRetry, chatMessages }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();
    const { documentTitle, swot, redFlags, complexityScore, summary, negotiationPoints, jargonGlossary } = result;
    
    const [groundingData, setGroundingData] = React.useState<Record<number, GroundingInfo | 'loading' | { error: string }>>({});
    const [openGroundingIndexes, setOpenGroundingIndexes] = React.useState<Set<number>>(new Set());
    const audioContextRef = React.useRef<AudioContext | null>(null);
    const audioSourceRef = React.useRef<AudioBufferSourceNode | null>(null);
    const [playingSection, setPlayingSection] = React.useState<{ id: string, isLoading: boolean }>({ id: '', isLoading: false });

    React.useEffect(() => {
        return () => {
            audioSourceRef.current?.stop();
            audioContextRef.current?.close();
        };
    }, []);

    const handleStopAudio = React.useCallback(() => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.disconnect();
            audioSourceRef.current = null;
        }
        setPlayingSection({ id: '', isLoading: false });
    }, []);

    const handlePlayAudio = React.useCallback(async (sectionId: string, textToRead: string) => {
        if (playingSection.id === sectionId) {
            handleStopAudio();
            return;
        }

        handleStopAudio();
        
        if (!textToRead.trim()) return;

        setPlayingSection({ id: sectionId, isLoading: true });

        try {
            const base64Audio = await generateSpeech(textToRead, language);

            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const ctx = audioContextRef.current;
            const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
            
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.start();

            audioSourceRef.current = source;
            setPlayingSection({ id: sectionId, isLoading: false });
            
            source.onended = () => {
                if (audioSourceRef.current === source) {
                    handleStopAudio();
                }
            };
        } catch (e: any) {
            console.error("Error playing audio:", e);
            setError({ title: "Audio Error", message: "Could not play audio. " + e.message });
            setPlayingSection({ id: '', isLoading: false });
        }

    }, [language, playingSection.id, handleStopAudio, setError]);


    const handleGroundingSearch = React.useCallback(async (index: number, flag: RedFlag) => {
        setGroundingData(prev => ({ ...prev, [index]: 'loading' }));
        try {
            const flagText = `${flag.flag}: ${flag.explanation}`;
            const groundingResult = await getRealWorldGrounding(flagText, language);
            setGroundingData(prev => ({ ...prev, [index]: groundingResult }));
        } catch (e: any) {
            console.error(`Grounding search failed for flag ${index}:`, e);
            setGroundingData(prev => ({ ...prev, [index]: { error: e.message || 'An unknown error occurred.' } }));
        }
    }, [language]);
    
    const handleToggleGrounding = React.useCallback((index: number, flag: RedFlag) => {
        const hasData = groundingData[index] && groundingData[index] !== 'loading';
        
        setOpenGroundingIndexes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });

        if (!hasData) {
            handleGroundingSearch(index, flag);
        }
    }, [groundingData, handleGroundingSearch]);


    const findError = (section: keyof AnalysisResult) => sectionErrors.find(e => e.section === section) || null;

    const handleDownloadPdf = () => {
        if (language !== 'en') {
            setError({ title: t('error_pdf_language_title'), message: t('error_pdf_language_message') });
            return;
        }
        
        try {
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pageWidth - margin * 2;
            let y = margin;
            let pageNum = 1;

            doc.setFont('helvetica');
            
            const addPageIfNeeded = (spaceNeeded: number) => {
                if (y + spaceNeeded > pageHeight - margin) {
                    addFooter();
                    doc.addPage();
                    pageNum++;
                    y = margin;
                    addHeader();
                }
            };

            const addHeader = () => {
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(t('pdf_analysis_by'), pageWidth / 2, 10, { align: 'center' });
            };
            
            const addFooter = () => {
                doc.setFontSize(8);
                doc.setTextColor(150);
                const pageStr = `${t('pdf_page')} ${pageNum} ${t('pdf_of')}`;
                doc.text(pageStr, pageWidth / 2, pageHeight - 10, { align: 'center' });
                doc.text(`${t('pdf_footer_disclaimer_title')}: ${t('pdf_footer_disclaimer')}`, margin, pageHeight - 10);
            };
            
            const addText = (text: string, size: number, style: 'normal' | 'bold' = 'normal', spaceAfter = 5, color = '#000000') => {
                const lines = doc.splitTextToSize(text, contentWidth);
                addPageIfNeeded(lines.length * (size / 2.5) + spaceAfter);
                doc.setFontSize(size);
                doc.setFont('helvetica', style);
                doc.setTextColor(color);
                doc.text(lines, margin, y);
                y += (lines.length * (size / 2.5)) + spaceAfter;
            };

            addHeader();

            // ---- PDF CONTENT ----
            
            // Main Title
            addText(t('report_title'), 22, 'bold', 4, '#D4AF37');
            addText(`${t('pdf_for_document')} "${documentTitle || fileName}"`, 12, 'normal', 4, '#333333');
            addText(`${t('pdf_generated_on')} ${new Date().toLocaleDateString()}`, 10, 'normal', 10, '#888888');

            // Summary
            if (summary) {
                addText(t('report_summary_title'), 16, 'bold', 6);
                addText(summary, 10, 'normal', 10);
            }

            // Complexity
            if (complexityScore !== undefined) {
                 addText(t('report_complexity_title'), 16, 'bold', 6);
                 const { text: complexityText } = getComplexityInfo(complexityScore);
                 addText(`${complexityScore}/10 - ${complexityText}`, 12, 'bold', 10);
            }
            
            // SWOT
            if(swot) {
                addText(t('report_swot_title'), 16, 'bold', 6);
                addText(t('swot_strengths'), 12, 'bold', 4, '#22c55e');
                swot.strengths.forEach(s => addText(`• ${s}`, 10, 'normal', 3));
                y += 5;
                addText(t('swot_weaknesses'), 12, 'bold', 4, '#facc15');
                swot.weaknesses.forEach(s => addText(`• ${s}`, 10, 'normal', 3));
                y += 5;
                addText(t('swot_opportunities'), 12, 'bold', 4, '#3b82f6');
                swot.opportunities.forEach(s => addText(`• ${s}`, 10, 'normal', 3));
                y += 5;
                addText(t('swot_threats'), 12, 'bold', 4, '#ef4444');
                swot.threats.forEach(s => addText(`• ${s}`, 10, 'normal', 3));
                y += 10;
            }

            // Red Flags
            if (redFlags && redFlags.length > 0) {
                addText(t('report_redflags_title'), 16, 'bold', 6);
                redFlags.forEach(flag => {
                    addText(flag.flag, 12, 'bold', 4, '#ef4444');
                    addText(flag.explanation, 10, 'normal', 3);
                    if (flag.example) addText(`${t('report_example_prefix')} ${flag.example}`, 10, 'normal', 3);
                    if (flag.citation) addText(`Source: ${flag.citation}`, 8, 'normal', 6);
                });
            }
            
            // Negotiation Points
            if (negotiationPoints && negotiationPoints.length > 0) {
                addText(t('report_negotiate_title'), 16, 'bold', 6);
                negotiationPoints.forEach(point => {
                    addText(point.point, 12, 'bold', 4, '#3b82f6');
                    addText(point.explanation, 10, 'normal', 3);
                    if (point.example) addText(`${t('report_example_prefix')} ${point.example}`, 10, 'normal', 6);
                });
            }

            // Glossary
            if (jargonGlossary && jargonGlossary.length > 0) {
                 addText(t('pdf_glossary_title'), 16, 'bold', 6);
                 jargonGlossary.forEach(item => {
                    addText(item.term, 11, 'bold', 2);
                    addText(item.definition, 10, 'normal', 5);
                 });
            }
            
            // Chat History
            if (chatMessages && chatMessages.length > 0) {
                 addText(t('pdf_chat_history_title'), 16, 'bold', 6);
                 chatMessages.forEach(msg => {
                    const prefix = msg.role === 'user' ? t('pdf_chat_user_prefix') : t('pdf_chat_model_prefix');
                    addText(`${prefix} ${msg.text}`, 10, (msg.role === 'user' ? 'bold' : 'normal'), 5);
                 });
            }
            
            // Finalize footers on all pages
            const totalPages = doc.getNumberOfPages();
            for(let i = 1; i <= totalPages; i++){
                doc.setPage(i);
                const pageStr = `${t('pdf_page')} ${i} ${t('pdf_of')} ${totalPages}`;
                doc.setFontSize(8).setTextColor(150);
                doc.text(pageStr, pageWidth / 2, pageHeight - 10, { align: 'center' });
                doc.text(`${t('pdf_footer_disclaimer_title')}: ${t('pdf_footer_disclaimer')}`, margin, pageHeight - 10);
            }

            const pdfFileName = `${(documentTitle || fileName).replace(/[^a-z0-9]/gi, '_').slice(0, 50)}_Report.pdf`;
            doc.save(pdfFileName);
            
        } catch (error) {
            console.error("PDF generation failed:", error);
            setError({ title: t('error_pdf_generic_title'), message: t('error_pdf_generic_message') });
        }
    };

    const getComplexityInfo = (score: number): { text: string; color: string } => {
        if (score <= 2) return { text: 'Very Simple', color: 'text-green-400' };
        if (score <= 4) return { text: 'Simple', color: 'text-green-500' };
        if (score <= 6) return { text: 'Moderate', color: 'text-yellow-400' };
        if (score <= 8) return { text: 'Complex', color: 'text-orange-400' };
        return { text: 'Very Complex', color: 'text-red-500' };
    };
    
    const complexityInfo = complexityScore !== undefined ? getComplexityInfo(complexityScore) : null;
    const isAnythingLoading = isLoading || isGlossaryLoading || (Object.keys(result).length > 0 && (!summary || !complexityScore || !swot || !redFlags || !negotiationPoints));

    const isDownloadDisabled = isAnythingLoading || sectionErrors.length > 0;

    if (isLoading && Object.keys(result).length === 0) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                    <span className="ml-4 text-lg font-semibold text-gray-300">{t(loadingMessageKey)}</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-brand-card/30 p-4 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-10 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-light">{t('report_title')}</h2>
                <p className="mt-2 text-brand-gold">{t('report_subtitle')}</p>
                <button 
                    onClick={handleDownloadPdf}
                    disabled={isDownloadDisabled}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-all disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    <DownloadIcon className="h-5 w-5" />
                    {isDownloadDisabled ? 'Analysis in Progress...' : t('report_download_button')}
                </button>
            </div>

            {isGlossaryLoading && (
                <div className="flex justify-center items-center p-4 -my-4 bg-brand-dark/30 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full animate-pulse bg-brand-gold"></div>
                        <div className="w-3 h-3 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s]"></div>
                        <div className="w-3 h-3 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                        <span className="ml-3 text-md font-semibold text-gray-300">{t('loader_step_jargon')}</span>
                    </div>
                </div>
            )}

            <Section 
                icon={<DocumentTextIcon className="w-6 h-6" />} 
                title={t('report_summary_title')} 
                isLoading={!summary} 
                error={findError('summary')} 
                onRetry={() => onRetry('summary')}
                onPlay={summary ? () => handlePlayAudio('summary', summary) : undefined}
                isPlaying={playingSection.id === 'summary' && !playingSection.isLoading}
                isPlayLoading={playingSection.id === 'summary' && playingSection.isLoading}
            >
                {summary && <p className="leading-relaxed whitespace-pre-wrap text-lg"><JargonExplainer text={summary} glossary={jargonGlossary} /></p>}
            </Section>

            <Section icon={<ChartBarIcon className="w-6 h-6" />} title={t('report_complexity_title')} isLoading={complexityScore === undefined} error={findError('complexityScore')} onRetry={() => onRetry('complexityScore')}>
                {complexityInfo && complexityScore !== undefined && (
                    <>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-full flex items-center gap-4">
                                <span className={`text-2xl font-bold ${complexityInfo.color}`}>{complexityScore}/10</span>
                                <div className="w-full bg-gray-700 rounded-full h-4 relative">
                                    <div className={`h-4 rounded-full transition-all duration-500 ${complexityInfo.color.replace('text-','bg-')}`} style={{ width: `${complexityScore * 10}%`}}></div>
                                </div>
                            </div>
                            <span className={`text-lg font-semibold ${complexityInfo.color} w-full sm:w-36 text-left sm:text-right mt-2 sm:mt-0`}>{complexityInfo.text}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{t('report_complexity_desc')}</p>
                    </>
                )}
            </Section>

            <div>
                 <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-brand-gold/10 text-brand-gold"><ScaleIcon className="w-6 h-6" /></div>
                    <h3 className="ml-4 text-xl font-bold text-brand-light">{t('report_swot_title')}</h3>
                </div>
                {findError('swot') ? (
                    <div className="mt-4"><SectionErrorState message={findError('swot')!.message} onRetry={() => onRetry('swot')} /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <SwotCard title={t('swot_strengths')} items={swot?.strengths} color="text-green-400" icon={<ThumbsUpIcon className="w-5 h-5"/>} glossary={jargonGlossary} isLoading={!swot} />
                       <SwotCard title={t('swot_weaknesses')} items={swot?.weaknesses} color="text-yellow-400" icon={<ThumbsDownIcon className="w-5 h-5"/>} glossary={jargonGlossary} isLoading={!swot} />
                       <SwotCard title={t('swot_opportunities')} items={swot?.opportunities} color="text-blue-400" icon={<LightbulbIcon className="w-5 h-5"/>} glossary={jargonGlossary} isLoading={!swot} />
                       <SwotCard title={t('swot_threats')} items={swot?.threats} color="text-red-400" icon={<AlertTriangleIcon className="w-5 h-5"/>} glossary={jargonGlossary} isLoading={!swot} />
                    </div>
                )}
            </div>
            
            <Section 
                icon={<AlertTriangleIcon className="w-6 h-6" />} 
                title={t('report_redflags_title')} 
                isLoading={!redFlags} 
                error={findError('redFlags')} 
                onRetry={() => onRetry('redFlags')}
                onPlay={redFlags && redFlags.length > 0 ? () => handlePlayAudio('redFlags', redFlags.map(f => `${f.flag}. ${f.explanation}`).join('\n\n')) : undefined}
                isPlaying={playingSection.id === 'redFlags' && !playingSection.isLoading}
                isPlayLoading={playingSection.id === 'redFlags' && playingSection.isLoading}
            >
                {redFlags && redFlags.length > 0 ? (
                    <ul className="space-y-4">
                        {redFlags.map((flag, index) => {
                            const groundingResult = groundingData[index];
                            const isGroundingLoading = groundingResult === 'loading';
                            const isGroundingOpen = openGroundingIndexes.has(index);

                            return (
                                <li key={index} className="p-4 bg-red-900/30 border-l-4 border-red-500 rounded-r-md">
                                    <div className="flex items-start"><AlertTriangleIcon className="h-5 w-5 text-red-400 mt-1 flex-shrink-0"/>
                                        <div className="ml-3 flex-1">
                                            <h4 className="font-bold text-red-300">{flag.flag}</h4>
                                            <p className="mt-1 text-gray-300 whitespace-pre-wrap"><JargonExplainer text={flag.explanation} glossary={jargonGlossary} /></p>
                                            {flag.example && <p className="mt-2 text-red-200/90 whitespace-pre-wrap font-bold italic">{t('report_example_prefix')} {flag.example}</p>}
                                            {flag.citation && <div className="mt-2 flex items-center gap-2 text-sm text-red-200/70"><DocumentTextIcon className="h-4 w-4" /><span className="font-semibold text-red-200">Source: <span className="font-normal">{flag.citation}</span></span></div>}
                                            
                                            <div className="mt-4">
                                                <button
                                                    onClick={() => handleToggleGrounding(index, flag)}
                                                    disabled={isGroundingLoading}
                                                    className="inline-flex items-center justify-between w-full sm:w-auto gap-2 px-4 py-2 border border-brand-gold/50 text-base font-medium rounded-md text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold transition-all disabled:opacity-50 disabled:cursor-wait"
                                                    aria-expanded={isGroundingOpen}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {isGroundingLoading ? (
                                                            <SpinnerIcon className="h-5 w-5 animate-spin" />
                                                        ) : (
                                                            <ShieldSearchIcon className="h-5 w-5" />
                                                        )}
                                                        <span>{isGroundingLoading ? t('grounding_searching') : t('grounding_button')}</span>
                                                    </div>
                                                    {!isGroundingLoading && (
                                                        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${isGroundingOpen ? 'rotate-180' : ''}`} />
                                                    )}
                                                </button>
                                            </div>

                                            <div className={`grid transition-all duration-500 ease-in-out ${isGroundingOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
                                                <div className="overflow-hidden">
                                                    {groundingResult && typeof groundingResult === 'object' && 'error' in groundingResult && (
                                                        <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-300">
                                                            <p><strong className="font-semibold">{t('grounding_error_prefix')}</strong> {groundingResult.error}</p>
                                                        </div>
                                                    )}
                                                    
                                                    {groundingResult && typeof groundingResult === 'object' && !('error' in groundingResult) && (
                                                        <div className="space-y-4 p-4 bg-brand-dark/30 rounded-lg border border-gray-700">
                                                            {(groundingResult.legalCitations?.length ?? 0) > 0 && (
                                                                <div>
                                                                    <h5 className="font-bold text-gray-200">{t('grounding_relevant_law')}</h5>
                                                                    <ul className="mt-2 space-y-3">
                                                                        {groundingResult.legalCitations?.map((cite, i) => {
                                                                            const lawSearchQuery = encodeURIComponent(`${cite.lawName} ${cite.section}`);
                                                                            const lawSearchUrl = `https://www.google.com/search?q=${lawSearchQuery}`;
                                                                            return (
                                                                                <li key={i} className="text-sm p-3 bg-gray-800/50 rounded-md">
                                                                                    <p>
                                                                                        <a href={lawSearchUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gold underline hover:text-yellow-300">
                                                                                            {cite.lawName} - {cite.section}
                                                                                        </a>
                                                                                    </p>
                                                                                    <p className="text-gray-300 mt-1">{cite.explanation}</p>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {(groundingResult.newsArticles?.length ?? 0) > 0 && (
                                                                <div>
                                                                    <h5 className="font-bold text-gray-200">{t('grounding_real_world')}</h5>
                                                                    <ul className="mt-2 space-y-3">
                                                                        {groundingResult.newsArticles?.map((article, i) => {
                                                                            const newsSearchQuery = encodeURIComponent(article.title);
                                                                            const newsSearchUrl = `https://www.google.com/search?q=${newsSearchQuery}`;
                                                                            return (
                                                                                <li key={i} className="text-sm">
                                                                                    <a href={newsSearchUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 underline hover:text-blue-300">{article.title}</a>
                                                                                    <p className="text-gray-400 mt-1">{article.summary}</p>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            
                                                             {(groundingResult.sources?.length ?? 0) > 0 && (
                                                                <div className="pt-3 mt-3 border-t border-gray-700">
                                                                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('grounding_sources')}</h5>
                                                                    <div className="mt-2 text-xs text-gray-400 space-y-1">
                                                                        {groundingResult.sources?.map((source, i) => (
                                                                            source.web && <a key={i} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="block truncate underline hover:text-gray-200" title={source.web.uri}>{source.web.title || source.web.uri}</a>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {(groundingResult.legalCitations?.length ?? 0) === 0 && (groundingResult.newsArticles?.length ?? 0) === 0 && (
                                                                <p className="text-sm text-gray-500 italic">{t('grounding_not_found')}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : redFlags && <p className="text-gray-500 italic">{t('report_none_identified')}</p>}
            </Section>

            <Section 
                icon={<HandshakeIcon className="w-6 h-6" />} 
                title={t('report_negotiate_title')} 
                isLoading={!negotiationPoints} 
                error={findError('negotiationPoints')} 
                onRetry={() => onRetry('negotiationPoints')}
                onPlay={negotiationPoints && negotiationPoints.length > 0 ? () => handlePlayAudio('negotiationPoints', negotiationPoints.map(p => `${p.point}. ${p.explanation}`).join('\n\n')) : undefined}
                isPlaying={playingSection.id === 'negotiationPoints' && !playingSection.isLoading}
                isPlayLoading={playingSection.id === 'negotiationPoints' && playingSection.isLoading}
            >
                 {negotiationPoints && negotiationPoints.length > 0 ? (
                    <ul className="space-y-4">
                        {negotiationPoints.map((point, index) => (
                            <li key={index} className="p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-r-md">
                                <div className="flex items-start"><HandshakeIcon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0"/>
                                    <div className="ml-3">
                                        <h4 className="font-bold text-blue-300">{point.point}</h4>
                                        <p className="mt-1 text-gray-300 whitespace-pre-wrap"><JargonExplainer text={point.explanation} glossary={jargonGlossary} /></p>
                                        {point.example && <p className="mt-2 text-blue-200/90 whitespace-pre-wrap font-bold italic">{t('report_example_prefix')} {point.example}</p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : negotiationPoints && <p className="text-gray-500 italic">{t('report_none_identified_negotiate')}</p>}
            </Section>
        </div>
    );
};
