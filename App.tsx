import React, { useState, useCallback, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';
import mammoth from 'mammoth';
import { analyzeDocument } from './services/geminiService';
import type { AnalysisResult } from './types';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyLegalMitra } from './components/HowItWorks';
import { MissionVision } from './components/Services';
import { AnalysisReport } from './components/AnalysisReport';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage, useTranslations } from './hooks/useTranslations';
import { TrustAndCredibility } from './components/Chatbot';
import { Testimonials } from './components/Testimonials';
import { UseCases } from './components/UseCases';
import { FAQ } from './components/FAQ';
import { FeedbackButton } from './components/FeedbackButton';
import { ErrorPopup } from './components/ErrorPopup';
import { LanguagePrompt } from './components/LanguagePrompt';
import { BlogContent } from './components/BlogContent';
import { FeaturedOn } from './components/Loader';
import { Chat } from './components/Chat';


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
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [error, setError] = useState<AppError | null>(null);
  const [fileName, setFileName] = useState<string>('');
  
  const handleFile = useCallback(async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setIsParsing(true);
    setError(null);
    setDocumentText('');
    setAnalysisResult(null);

    try {
      let text = '';
      const fileType = file.type;
      const fileNameExt = file.name.split('.').pop()?.toLowerCase();

      if (fileType === 'application/pdf' || fileNameExt === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const pageTexts = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          pageTexts.push(pageText);
        }
        text = pageTexts.join('\n\n');
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
    } catch (e) {
      console.error('Error parsing file:', e);
      setError({
        title: t('error_file_parse_title'),
        message: t('error_file_parse_message')
      });
    } finally {
      setIsParsing(false);
    }
  }, [t]);


  const handleAnalyze = useCallback(async () => {
    if (!documentText.trim()) {
      setError({
        title: t('error_empty_document_title'),
        message: t('error_empty_document_message')
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    // Keep previous analysis result while loading new one for better UX on language change
    // setAnalysisResult(null); 

    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      const result = await analyzeDocument(documentText, language);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError({
        title: t('error_analysis_title'),
        message: t('error_analysis_message')
      });
    } finally {
      setIsLoading(false);
    }
  }, [documentText, language, t]);
  
  useEffect(() => {
    // If we have a document and an analysis, and the user changes the language,
    // re-run the analysis to get a translated version.
    if (documentText && analysisResult) {
      handleAnalyze();
    }
    // This effect should ONLY run when the language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);


  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-brand-light">
      <ErrorPopup error={error} onDismiss={() => setError(null)} />
      <Header />
      <main className="flex-grow">
        <Hero
          documentText={documentText}
          setDocumentText={setDocumentText}
          fileName={fileName}
          setFileName={setFileName}
          isParsing={isParsing}
          isLoading={isLoading}
          handleFile={handleFile}
          handleAnalyze={handleAnalyze}
        />
        
        {/* Results Section */}
        <div id="analysis-results" className="py-10">
             {(isLoading || isParsing) && (
              <div className="flex justify-center items-center p-8">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                    <span className="ml-4 text-lg font-semibold text-gray-300">{isParsing ? t('loader_parsing') : t('loader_analyzing')}</span>
                </div>
              </div>
            )}
            
            {analysisResult && !isLoading && !isParsing && (
                <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
                    <AnalysisReport result={analysisResult} fileName={fileName} setError={setError} />
                </div>
            )}
        </div>
        
        <WhyLegalMitra />
        <UseCases />
        <FAQ />
        <TrustAndCredibility />
        <Testimonials />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <hr className="border-t border-gray-800" />
        </div>

        <MissionVision />

        {!analysisResult && !isLoading && !isParsing && <BlogContent />}

      </main>
      <FeaturedOn />
      <Footer />
      <LanguageSwitcher />
      <FeedbackButton />
      <LanguagePrompt />
      {analysisResult && !isLoading && !isParsing && <Chat documentText={documentText} />}
    </div>
  );
};

export default App;