import React from 'react';
import { XMarkIcon } from './Icons';

interface AboutUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-us-title"
        >
            <div 
                className="relative w-full max-w-3xl bg-brand-card shadow-2xl rounded-lg border border-gray-700 flex flex-col m-4" 
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 id="about-us-title" className="text-lg font-bold text-brand-light">About Us</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                <main className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto no-scrollbar text-gray-300 leading-relaxed">
                    <div className="bg-brand-dark/50 p-6 rounded-xl border border-gray-700 shadow-inner">
                        <header className="mb-5 text-left">
                            <p className="text-base font-semibold text-brand-gold">
                                <strong className="font-bold">Small idea. Big heart. Real impact.</strong>
                            </p>
                        </header>
                        
                        <div className="space-y-4 text-base">
                            <p><strong>Hi, we’re Vipul and Ravi.</strong> Two ordinary people with an extraordinary dream.</p>

                            <p>We don’t come from a technical background. But we believe technology should solve real problems — the kind that touch everyday lives.</p>

                            <p><strong>Legal documents are hard to read.</strong> They are often written in complex English and full of confusing terms. Millions of people struggle to understand their rights.</p>

                            <p><strong>We wanted to change that.</strong> We built an AI Legal Consultant that can analyze, explain, and talk about legal documents in simple words.</p>

                            <p>Using AI, Google Cloud tools, and Vibe Coding powered by Gemini, we created this application ourselves.</p>

                            <p><strong>It speaks your local language.</strong> It reads scanned papers, explains clauses, and even talks — so anyone can get help without reading or knowing English.</p>

                            <p>This project is not just technology to us. It is a way to bring legal knowledge to people who need it most.</p>

                            <p><strong>We started with small courage and a big heart.</strong> We believe small steps can create a huge impact.</p>

                            <p><em className="text-brand-gold/90 not-italic">Our goal is simple:</em> empower people across India with clear legal help — one voice, one language, one person at a time.</p>

                            <footer className="mt-6 pt-4 border-t border-dashed border-gray-700">
                                <p><strong>— Vipul Singh</strong></p>
                            </footer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
