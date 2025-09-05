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


const PDF_WORKER_URL = 'https://aistudiocdn.com/pdfjs-dist@^4.4.170/build/pdf.worker.min.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

const App: React.FC = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const [documentText, setDocumentText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
      setError(t('error_file_parse'));
    } finally {
      setIsParsing(false);
    }
  }, [t]);


  const handleAnalyze = useCallback(async () => {
    if (!documentText.trim()) {
      setError(t('error_empty_document'));
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
      setError(err instanceof Error ? err.message : t('error_analysis'));
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
            {error && (
                <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center gap-3 max-w-4xl mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                <p>{error}</p>
                </div>
            )}
            {analysisResult && !isLoading && !isParsing && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnalysisReport result={analysisResult} />
                </div>
            )}
        </div>

        <WhyLegalMitra />
        <UseCases />
        <FAQ />
        <TrustAndCredibility />
        <Testimonials />
        <MissionVision />

      </main>
      <Footer />
      <LanguageSwitcher />
    </div>
  );
};

export default App;
