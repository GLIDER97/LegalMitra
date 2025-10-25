import React from 'react';
import { XMarkIcon } from './Icons';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FORM_URL = "https://forms.gle/a3oSYzemXVRnJnvW7";

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div 
                className="relative w-full max-w-2xl h-[90vh] max-h-[700px] bg-brand-card shadow-2xl rounded-lg border border-gray-700 flex flex-col m-4" 
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 id="contact-modal-title" className="text-lg font-bold text-brand-light">Contact Us</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                <main className="flex-grow overflow-hidden">
                    <iframe
                        src={FORM_URL}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Contact Form"
                        className="w-full h-full"
                    >
                        Loading…
                    </iframe>
                </main>
            </div>
        </div>
    );
};
