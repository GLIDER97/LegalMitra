import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
import mammoth from 'mammoth';
import { 
    getSummary,
    getComplexityScore,
    getSwot,
    getRedFlags,
    getNegotiationPoints,
    getJargonGlossary
} from './services/geminiService';
import type { AnalysisResult, SectionError, Message } from './types';
import type { TranslationKeys } from './translations';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyFeatures } from './components/HowItWorks';
import { MissionVision } from './components/Services';
import { AnalysisReport } from './components/AnalysisReport';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage, useTranslations } from './hooks/useTranslations';
import { TrustAndCredibility } from './components/Chatbot';
import { Testimonials } from './components/Testimonials';
import { UseCases } from './components/UseCases';
import { FAQ } from './components/FAQ';
import { ErrorPopup } from './components/ErrorPopup';
import { LanguagePrompt } from './components/LanguagePrompt';
import { BlogContent } from './components/BlogContent';
import { FeaturedOn } from './components/Loader';
import { VaniMitra } from './components/VaniMitra';
import { VaniMitraButton } from './components/VaniMitraButton';
import { Chat } from './components/Chat';
import { ChatButton } from './components/ChatButton';
import { AiLegalSupport } from './components/AiLegalSupport';
import { HowItWorksGuide } from './components/HowItWorksGuide';
import { AiFeatures } from './components/AiFeatures';
import { AboutUsModal } from './components/AboutUsModal';
import { ContactModal } from './components/ContactModal';


// Make Tesseract.js globally available for the component
declare var Tesseract: any;

const PDF_WORKER_URL = 'https://aistudiocdn.com/pdfjs-dist@^4.4.170/build/pdf.worker.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

interface AppError {
  title: string;
  message: string;
}

const App: React.FC = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const [documentText, setDocumentText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGlossaryLoading, setIsGlossaryLoading] = useState<boolean>(false);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [error, setError] = useState<AppError | null>(null);
  const [sectionErrors, setSectionErrors] = useState<SectionError[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [loadingMessageKey, setLoadingMessageKey] = useState<TranslationKeys>('loader_analyzing');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isVaniMitraOpen, setIsVaniMitraOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLegalSupportOpen, setIsLegalSupportOpen] = useState(false);
  const [legalSupportChatHistory, setLegalSupportChatHistory] = useState<Message[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const loadingMessages: TranslationKeys[] = [
    'loader_step_1',
    'loader_step_2',
    'loader_step_3',
    'loader_step_4',
    'loader_step_5'
  ];

  useEffect(() => {
    const isMainLoading = isLoading && (!analysisResult || Object.keys(analysisResult).length === 0);

    if (isMainLoading) {
        let i = 0;
        setLoadingMessageKey(loadingMessages[i]);
        
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        intervalRef.current = window.setInterval(() => {
            i = (i + 1) % loadingMessages.length;
            setLoadingMessageKey(loadingMessages[i]);
        }, 2500);
    } else {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setLoadingMessageKey('loader_analyzing');
    }

    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, analysisResult]);

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setIsParsing(true);
    setError(null);
    setSectionErrors([]);
    setDocumentText('');
    setAnalysisResult(null);
    setOcrStatus('');

    try {
      let text = '';
      const fileType = file.type;
      const fileNameExt = file.name.split('.').pop()?.toLowerCase();

      if (fileType === 'application/pdf' || fileNameExt === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        
        const pageTextContents = [];
        const pagesToOcr = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          pageTextContents.push(pageText);
          // Heuristic: if a page has very few characters and text items, it's likely an image.
          if (pageText.replace(/\s/g, '').length < 100 && textContent.items.length < 10) {
            pagesToOcr.push(i);
          }
        }

        if (pagesToOcr.length > 0) {
          if (typeof Tesseract === 'undefined') {
            console.error("Tesseract.js not loaded.");
            setError({
                title: t('error_ocr_title'),
                message: t('error_ocr_message')
            });
            text = pageTextContents.join('\n\n');
          } else {
            setOcrStatus('Scanned pages detected. Initializing OCR...');
            
            const tesseractLangMap: Record<string, string> = {
                en: 'eng', hi: 'hin', bn: 'ben', mr: 'mar', te: 'tel',
            };
            const ocrLang = tesseractLangMap[language] || 'eng';

            const worker = await Tesseract.createWorker(ocrLang);
            await worker.setParameters({
              // Set Page Segmentation Mode to '4' (Assume a single column of text of variable sizes).
              // This can significantly improve accuracy for scanned documents like contracts,
              // which typically have a single-column layout. The default '3' (auto) can sometimes
              // misinterpret the layout.
              tessedit_pageseg_mode: '4',
              // Preserve interword spaces to better maintain the original document structure.
              preserve_interword_spaces: '1',
            });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Could not get canvas context for OCR');

            for (const pageNum of pagesToOcr) {
                setOcrStatus(`Performing OCR on page ${pageNum} of ${pdf.numPages}...`);
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better accuracy
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: context, viewport }).promise;
                
                const { data: { text: ocrText } } = await worker.recognize(canvas);
                pageTextContents[pageNum - 1] = ocrText;
            }

            await worker.terminate();
            canvas.remove();
            text = pageTextContents.join('\n\n');
          }
        } else {
          text = pageTextContents.join('\n\n');
        }
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileNameExt === 'docx'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (fileType.startsWith('text/') || fileNameExt === 'txt' || fileNameExt === 'rtf') {
        text = await file.text();
      } else {
        throw new Error(`Unsupported file type: ${fileType || fileNameExt}`);
      }
      setDocumentText(text);
    } catch (e: any) {
      console.error('Error parsing file:', e);
      setError({
        title: t('error_file_parse_title'),
        message: e.message || t('error_file_parse_message')
      });
    } finally {
      setIsParsing(false);
      setOcrStatus('');
    }
  }, [t, language]);


  const handleAnalyze = useCallback(async (retrySection?: keyof AnalysisResult) => {
    if (!documentText.trim()) {
        setError({
            title: t('error_empty_document_title'),
            message: t('error_empty_document_message')
        });
        return;
    }

    setIsLoading(true);
    setError(null);

    if (retrySection) {
        setSectionErrors(prev => prev.filter(e => e.section !== retrySection));
    } else {
        setAnalysisResult({} as AnalysisResult); // Reset for new analysis
        setSectionErrors([]);
        setChatMessages([]); // Reset chat history
        const resultsDiv = document.getElementById('analysis-results');
        resultsDiv?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
        const analysisTasks: Promise<any>[] = [];
        const taskMap: (keyof AnalysisResult)[] = [];

        const shouldRun = (section: keyof AnalysisResult) => !retrySection || retrySection === section;

        if (shouldRun('summary')) {
            analysisTasks.push(getSummary(documentText, language));
            taskMap.push('summary'); // Also gets title
        }
        if (shouldRun('complexityScore')) {
            analysisTasks.push(getComplexityScore(documentText, language));
            taskMap.push('complexityScore');
        }
        if (shouldRun('swot')) {
            analysisTasks.push(getSwot(documentText, language));
            taskMap.push('swot');
        }
        if (shouldRun('redFlags')) {
            analysisTasks.push(getRedFlags(documentText, language));
            taskMap.push('redFlags');
        }
        if (shouldRun('negotiationPoints')) {
            analysisTasks.push(getNegotiationPoints(documentText, language));
            taskMap.push('negotiationPoints');
        }

        const results = await Promise.allSettled(analysisTasks);

        const newAnalysisResult: Partial<AnalysisResult> = retrySection ? { ...analysisResult } : {};
        const newSectionErrors: SectionError[] = [];
        let combinedTextForGlossary = '';

        results.forEach((res, index) => {
            const section = taskMap[index];
            if (res.status === 'fulfilled') {
                const data = res.value;
                if (section === 'summary') {
                    newAnalysisResult.summary = data.summary;
                    newAnalysisResult.documentTitle = data.documentTitle;
                } else {
                    Object.assign(newAnalysisResult, data);
                }
                combinedTextForGlossary += JSON.stringify(data) + '\n';
            } else {
                console.error(`Error analyzing section ${section}:`, res.reason);
                newSectionErrors.push({ section, message: (res.reason as Error).message || 'Failed to load this section.' });
            }
        });
        
        setAnalysisResult(prev => ({...prev, ...newAnalysisResult} as AnalysisResult));
        setSectionErrors(prev => [...prev.filter(e => !taskMap.includes(e.section)), ...newSectionErrors]);

        // Jargon glossary runs after everything else, if it's a full analysis
        if (!retrySection && combinedTextForGlossary.trim()) {
            setIsGlossaryLoading(true);
            try {
                const glossaryResult = await getJargonGlossary(combinedTextForGlossary, language);
                setAnalysisResult(prev => ({ ...prev, ...glossaryResult } as AnalysisResult));
            } catch (glossaryError: any) {
                console.error('Error fetching jargon glossary:', glossaryError);
                setSectionErrors(prev => [...prev, { section: 'jargonGlossary', message: glossaryError.message || 'Failed to load glossary.' }]);
            } finally {
                setIsGlossaryLoading(false);
            }
        }
        
    } catch (err) {
        console.error("A critical analysis error occurred:", err);
        setError({ title: t('error_analysis_title'), message: t('error_analysis_message') });
    } finally {
        setIsLoading(false);
    }
}, [documentText, language, t, analysisResult]);
  
  useEffect(() => {
    // Re-run the full analysis on language change if there's already a result.
    if (documentText && analysisResult && Object.keys(analysisResult).length > 0) {
      handleAnalyze();
    }
    // This effect should ONLY run when the language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const isInteractionDisabled = !analysisResult || Object.keys(analysisResult).length === 0 || isLoading || isParsing;


  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-brand-light">
      <ErrorPopup error={error} onDismiss={() => setError(null)} />
      <Header 
        onOpenLegalSupport={() => setIsLegalSupportOpen(true)} 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenAboutUsModal={() => setIsAboutUsModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />
      <main className="flex-grow">
        <Hero
          documentText={documentText}
          setDocumentText={setDocumentText}
          fileName={fileName}
          setFileName={setFileName}
          isParsing={isParsing}
          isLoading={isLoading}
          analysisResult={analysisResult}
          handleFile={handleFile}
          handleAnalyze={() => handleAnalyze()}
          ocrStatus={ocrStatus}
        />
        
        {/* Results Section */}
        <div id="analysis-results" className="py-10">
             {isParsing && !ocrStatus && (
              <div className="flex justify-center items-center p-8">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                    <span className="ml-4 text-lg font-semibold text-gray-300">{t('loader_parsing')}</span>
                </div>
              </div>
            )}
            
            {(isLoading || (analysisResult && Object.keys(analysisResult).length > 0)) && !isParsing && (
                 <div className="w-full lg:w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnalysisReport 
                        result={analysisResult || {} as AnalysisResult} 
                        fileName={fileName}
                        setError={setError}
                        isLoading={isLoading && (!analysisResult || Object.keys(analysisResult).length === 0)}
                        isGlossaryLoading={isGlossaryLoading}
                        loadingMessageKey={loadingMessageKey}
                        sectionErrors={sectionErrors}
                        onRetry={handleAnalyze}
                        chatMessages={chatMessages}
                    />
                </div>
            )}
        </div>
        
        <div id="features"><KeyFeatures /></div>
        <div id="how-to-use"><HowItWorksGuide /></div>
        <div id="ai-legal-team"><AiFeatures /></div>
        <div id="use-cases"><UseCases /></div>
        <div id="faq"><FAQ /></div>
        <div id="trust-and-security"><TrustAndCredibility /></div>
        <div id="testimonials"><Testimonials /></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <hr className="border-t border-gray-800" />
        </div>

        <div id="mission-vision"><MissionVision /></div>

        {!analysisResult && !isLoading && !isParsing && <BlogContent />}

      </main>
      <FeaturedOn />
      <Footer />
      
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col-reverse items-end gap-4">
          <LanguageSwitcher />
          <VaniMitraButton 
            onClick={() => setIsVaniMitraOpen(true)}
            disabled={isInteractionDisabled}
          />
          <ChatButton 
            onClick={() => setIsChatOpen(true)}
            disabled={isInteractionDisabled}
          />
      </div>

      <LanguagePrompt />

      {/* Modals */}
      <AboutUsModal
        isOpen={isAboutUsModalOpen}
        onClose={() => setIsAboutUsModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <AiLegalSupport
        isOpen={isLegalSupportOpen}
        onClose={() => setIsLegalSupportOpen(false)}
        chatHistory={legalSupportChatHistory}
        setChatHistory={setLegalSupportChatHistory}
      />
       {analysisResult && Object.keys(analysisResult).length > 0 && (
        <>
            <VaniMitra 
                isOpen={isVaniMitraOpen}
                onClose={() => setIsVaniMitraOpen(false)}
                documentText={documentText}
                analysisResult={analysisResult}
                chatHistory={chatMessages}
                setChatHistory={setChatMessages}
            />
            <Chat 
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                documentText={documentText}
                analysisResult={analysisResult}
                chatHistory={chatMessages}
                setChatHistory={setChatMessages}
            />
        </>
      )}
    </div>
  );
};

export default App;