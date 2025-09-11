import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat as GeminiChat } from '@google/genai';
import { useLanguage, useTranslations } from '../hooks/useTranslations';
import type { Language } from '../translations';
import { 
    ChatBubbleOvalLeftEllipsisIcon,
    XMarkIcon, 
    PaperAirplaneIcon, 
    SparklesIcon, 
    UserIcon 
} from './Icons';

interface ChatProps {
    documentText: string;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const Chat: React.FC<ChatProps> = ({ documentText }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chat = useRef<GeminiChat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isChatOpen && documentText) {
            if (!process.env.API_KEY) {
                console.error("API_KEY not set");
                setMessages([{ role: 'model', text: "Configuration error: API Key is missing." }]);
                return;
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = `You are a helpful AI assistant named LegalIQ.app. You are having a conversation with a user about a legal document they have provided. Your goal is to answer their follow-up questions clearly and concisely.

- **Your most important rule is to match the user's language.** You MUST detect the language of the user's query and respond in the EXACT same language and writing style.
- For example, if the user asks in English "What is the time period of this contract?", you MUST respond in English.
- If the user asks in a mixed language like 'Hinglish' (e.g., "Is contract ka time period kya hai?"), you MUST respond in Hinglish.
- Keep your answers short, crisp, and to the point. Avoid long paragraphs. Use bullet points if it helps with clarity.
- Maintain the same tone and style as the user's query.
- Base your answers STRICTLY on the content of the document provided below. Do not invent information or provide external legal advice. If the answer is not in the document, state that the information is not available in the provided text, but do so in the user's language.
- Never suggest that you are a lawyer or that your answers constitute legal advice.

HERE IS THE DOCUMENT:
---
${documentText}
---
`;

            try {
                chat.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: systemInstruction,
                        temperature: 0.3,
                    }
                });
                setMessages([]);
            } catch (error) {
                console.error("Error initializing chat:", error);
                setMessages([{ role: 'model', text: "Failed to initialize the chat session." }]);
            }
        }
    }, [isChatOpen, documentText]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isLoading || !chat.current) return;

        const newUserMessage: Message = { role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.current.sendMessage({ message: trimmedInput });
            const modelResponse: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelResponse]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'model', text: t('error_analysis_message') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 sm:bottom-20 sm:left-auto sm:right-5 sm:translate-x-0 z-40 transition-all duration-300 ${!isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center gap-3 px-4 py-3 bg-brand-gold text-brand-dark rounded-full shadow-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-transform transform hover:scale-105"
                    aria-label={t('chat_button_label')}
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                    <span className="font-semibold">{t('chat_button_label')}</span>
                </button>
            </div>

            {/* Chat Popup */}
            <div className={`fixed inset-0 z-50 flex items-end justify-center sm:justify-end sm:items-end p-0 sm:p-4 transition-all duration-300 ${isChatOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <div onClick={() => setIsChatOpen(false)} className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
                 <div className={`relative w-full h-[80vh] sm:h-auto sm:max-w-lg sm:max-h-[70vh] flex flex-col bg-brand-card border border-gray-700 rounded-t-2xl sm:rounded-2xl shadow-2xl transition-transform duration-300 ${isChatOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    {/* Header */}
                    <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                        <div className="flex items-center gap-2">
                             <SparklesIcon className="h-6 w-6 text-brand-gold" />
                             <h2 className="text-lg font-bold text-brand-light">LegalIQ.app Chat</h2>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </header>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        {/* Welcome Message */}
                        <div className="p-3 bg-brand-dark/50 rounded-lg text-center">
                            <p className="text-base text-gray-300">{t('chat_welcome_message')}</p>
                            <p className="mt-2 text-xs text-gray-500">{t('chat_disclaimer')}</p>
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                                        <SparklesIcon className="w-5 h-5 text-brand-gold" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-brand-gold text-brand-dark rounded-br-none' : 'bg-gray-700 text-brand-light rounded-bl-none'}`}>
                                    <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.role === 'user' && (
                                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                                    <SparklesIcon className="w-5 h-5 text-brand-gold" />
                                </div>
                                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-700 text-brand-light rounded-bl-none flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold"></div>
                                     <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold [animation-delay:0.2s]"></div>
                                     <div className="w-2 h-2 rounded-full animate-pulse bg-brand-gold [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-700 flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder={t('chat_input_placeholder')}
                                disabled={isLoading}
                                className="flex-1 block w-full bg-brand-dark border-gray-600 rounded-full py-2 px-4 text-brand-light placeholder-gray-500 focus:ring-brand-gold focus:border-brand-gold"
                            />
                            <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2 bg-brand-gold text-brand-dark rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold">
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                 </div>
            </div>
        </>
    );
};