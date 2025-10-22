import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, useTranslations } from '../hooks/useTranslations';
import type { Message } from '../types';
import { getChatResponse } from '../services/geminiService';
import { XMarkIcon, SparklesIcon, UserIcon, PaperAirplaneIcon, SpinnerIcon } from './Icons';

interface ChatProps {
    isOpen: boolean;
    onClose: () => void;
    documentText: string;
    chatHistory: Message[];
    setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose, documentText, chatHistory, setChatHistory }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();
    const [userInput, setUserInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isThinking) return;

        const newHistory: Message[] = [...chatHistory, { role: 'user', text: trimmedInput }];
        setChatHistory(newHistory);
        setUserInput('');
        setIsThinking(true);

        try {
            const modelResponse = await getChatResponse(documentText, newHistory, trimmedInput, language);
            setChatHistory(prev => [...prev, { role: 'model', text: modelResponse }]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = (error as Error).message || "Sorry, I couldn't get a response. Please try again.";
            setChatHistory(prev => [...prev, { role: 'model', text: `Error: ${errorMessage}` }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>
            <div className={`relative w-full max-w-2xl h-[90%] max-h-[700px] flex flex-col bg-brand-card shadow-2xl rounded-lg border border-gray-700 transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-lg font-bold text-brand-light">{t('chat_modal_title')}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="p-4 bg-brand-dark/50 rounded-lg text-center">
                        <p className="text-base text-gray-300">{t('chat_welcome_message')}</p>
                    </div>
                    {chatHistory.map((msg, index) => (
                         <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-brand-gold" /></div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-brand-gold text-brand-dark rounded-br-none' : 'bg-gray-700 text-brand-light rounded-bl-none'}`}>
                                <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                            </div>
                            {msg.role === 'user' && (
                                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-400" /></div>
                            )}
                        </div>
                    ))}
                    {isThinking && (
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-brand-gold" /></div>
                            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-700 text-brand-light rounded-bl-none flex items-center">
                                <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold"></div>
                                <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s] mx-1"></div>
                                <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-4 border-t border-gray-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={isThinking ? t('chat_thinking') : t('chat_input_placeholder')}
                            disabled={isThinking}
                            className="flex-1 block w-full rounded-md border-0 bg-gray-800 py-2.5 pl-4 pr-10 text-brand-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-gold sm:text-sm sm:leading-6"
                        />
                        <button
                            type="submit"
                            disabled={!userInput.trim() || isThinking}
                            className="p-2.5 rounded-full text-brand-dark bg-brand-gold hover:bg-yellow-300 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-gold"
                            aria-label="Send message"
                        >
                            {isThinking ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : <PaperAirplaneIcon className="h-5 w-5" />}
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};