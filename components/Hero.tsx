import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { 
    UploadIcon, 
    DocumentTextIcon, 
    SpinnerIcon,
    SearchIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    XMarkIcon
} from './Icons';

interface HeroProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  isParsing: boolean;
  isLoading: boolean;
  handleFile: (file: File) => void;
  handleAnalyze: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  documentText,
  setDocumentText,
  fileName,
  setFileName,
  isParsing,
  isLoading,
  handleFile,
  handleAnalyze,
}) => {
  const { t } = useTranslations();
  const [isDragging, setIsDragging] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  useEffect(() => {
    if (searchTerm.trim() && documentText) {
      const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedSearchTerm, 'gi');
      const matches: number[] = [];
      let match;
      while ((match = regex.exec(documentText)) !== null) {
        matches.push(match.index);
      }
      setSearchMatches(matches);
      setCurrentMatchIndex(matches.length > 0 ? 0 : -1);
    } else {
      setSearchMatches([]);
      setCurrentMatchIndex(-1);
    }
  }, [searchTerm, documentText]);

  useEffect(() => {
    if (currentMatchIndex !== -1 && textAreaRef.current && searchMatches.length > 0) {
      const matchStartIndex = searchMatches[currentMatchIndex];
      const matchLength = searchTerm.length;
      const element = textAreaRef.current;
      
      element.focus();
      element.setSelectionRange(matchStartIndex, matchStartIndex + matchLength);
    }
  }, [currentMatchIndex, searchMatches, searchTerm.length]);

  const handleNextMatch = () => {
    if (searchMatches.length === 0) return;
    setCurrentMatchIndex((prevIndex) => (prevIndex + 1) % searchMatches.length);
  };

  const handlePrevMatch = () => {
    if (searchMatches.length === 0) return;
    setCurrentMatchIndex((prevIndex) => (prevIndex - 1 + searchMatches.length) % searchMatches.length);
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    if (textAreaRef.current) {
        textAreaRef.current.blur();
    }
  };


  return (
     <section id="upload" className="py-12 sm:py-20 relative overflow-hidden bg-brand-dark">
        <div 
            aria-hidden="true" 
            className="absolute inset-0 bg-gradient-to-br from-brand-dark via-gray-900 to-black opacity-80"
        ></div>
        <div
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/legal-pad.png')] opacity-5"
        ></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-light tracking-tight">{t('hero_title')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-300">{t('hero_subtitle')}</p>
            
            <div className="mt-10 max-w-2xl mx-auto bg-brand-card/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-2xl border border-gray-800">
              <div 
                className={`relative block w-full border-2 ${isDragging ? 'border-brand-gold' : 'border-gray-600'} border-dashed rounded-lg p-6 sm:p-12 text-center transition-colors bg-brand-dark/50`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input id="file-upload" type="file" className="sr-only" accept=".txt,.pdf,.docx,.rtf" onChange={handleFileChange} disabled={isParsing || isLoading}/>
                <label htmlFor="file-upload" className={isParsing ? "cursor-wait" : "cursor-pointer"}>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold/10">
                      {isParsing ? (
                        <SpinnerIcon className="h-6 w-6 text-brand-gold animate-spin" />
                      ) : (
                        <UploadIcon className="h-6 w-6 text-brand-gold" />
                      )}
                    </div>
                    <span className="mt-4 block text-base font-semibold text-brand-light">
                        {isParsing ? t('loader_parsing') : t('upload_cta')}
                    </span>
                    <span className="mt-1 block text-sm text-gray-400">
                        {/* Use a non-breaking space to maintain height during parsing */}
                        {isParsing ? '\u00A0' : t('upload_supported_files')}
                    </span>
                </label>
              </div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-brand-card text-sm text-gray-400 rounded-full">{t('upload_or_paste')}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <textarea
                  ref={textAreaRef}
                  rows={10}
                  className="shadow-sm focus:ring-brand-gold focus:border-brand-gold block w-full sm:text-sm border border-gray-700 rounded-md p-4 bg-brand-dark text-brand-light placeholder-gray-500"
                  placeholder={t('upload_placeholder')}
                  value={documentText}
                  onChange={(e) => {
                    setDocumentText(e.target.value);
                    setFileName('');
                  }}
                  disabled={isParsing || isLoading}
                />
                <p className="mt-2 text-sm text-gray-400 text-left flex items-center gap-2">
                  <DocumentTextIcon className='h-4 w-4 text-gray-500' />
                  <span>{documentText.length} {t('upload_characters')}</span>
                  {fileName && <span className="ml-auto font-medium text-gray-300">{t('upload_file')}: {fileName}</span>}
                </p>
              </div>

              {documentText && !isParsing && !isLoading && (
                <div className="mt-4 p-2 bg-brand-dark/60 rounded-lg flex items-center gap-2 sm:gap-4 border border-gray-700">
                    <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 bg-gray-700/50 py-1.5 pl-10 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm sm:leading-6"
                            placeholder="Find in document..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {searchTerm && (
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <span className="text-sm text-gray-400 min-w-[6rem] text-center">
                        {searchMatches.length > 0 
                            ? `${currentMatchIndex + 1} / ${searchMatches.length}`
                            : 'No matches'}
                        </span>
                        <button
                          type="button"
                          onClick={handlePrevMatch}
                          disabled={searchMatches.length < 2}
                          className="p-1 rounded-md text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          aria-label="Previous match"
                        >
                        <ChevronUpIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMatch}
                          disabled={searchMatches.length < 2}
                          className="p-1 rounded-md text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          aria-label="Next match"
                        >
                        <ChevronDownIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="p-1 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                          aria-label="Clear search"
                        >
                        <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                    )}
                </div>
              )}
              
              <div className="mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={isParsing || isLoading || !documentText.trim()}
                  className="w-full inline-flex items-center justify-center px-6 py-3 sm:py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-dark bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isLoading ? (
                    <SpinnerIcon className="h-5 w-5 mr-3 animate-spin" />
                  ) : (
                    <DocumentTextIcon className="h-5 w-5 mr-3" />
                  )}
                  {isParsing ? t('loader_parsing') : (isLoading ? t('loader_analyzing') : t('upload_analyze_button'))}
                </button>
              </div>
            </div>
          </div>
        </section>
  );
};