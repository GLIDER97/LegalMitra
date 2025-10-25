import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface NavbarProps {
    onLinkClick: () => void;
    onAboutClick: () => void;
    onContactClick: () => void;
    isMobile?: boolean;
}

const menuItems = [
    { name: 'Features', id: 'features' },
    { name: 'How to Use', id: 'how-to-use' },
    { name: 'AI Legal Team', id: 'ai-legal-team' },
    { name: 'Use Cases', id: 'use-cases' },
    { name: 'Trust & Security', id: 'trust-and-security' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Mission & Vision', id: 'mission-vision' },
];

export const Navbar: React.FC<NavbarProps> = ({ onLinkClick, onAboutClick, onContactClick, isMobile = false }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        onLinkClick();
    };

    const toggleServices = () => {
        if (isMobile) {
            setIsServicesOpen(!isServicesOpen);
        }
    };
    
    if (isMobile) {
        return (
            <nav>
                <ul className="flex flex-col space-y-2">
                    <li>
                        <button
                            onClick={toggleServices}
                            className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-brand-light rounded-md hover:bg-gray-700"
                            aria-expanded={isServicesOpen}
                        >
                            Services
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out ${isServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <ul className="pl-4 mt-2 space-y-2">
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleScroll(item.id);
                                                }}
                                                className="block px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-brand-gold"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                onAboutClick();
                                onLinkClick(); // Close the menu
                            }}
                            className="w-full text-left px-3 py-2 text-base font-medium text-brand-light rounded-md hover:bg-gray-700"
                        >
                            About Us
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                onContactClick();
                                onLinkClick(); // Close the menu
                            }}
                            className="w-full text-left px-3 py-2 text-base font-medium text-brand-light rounded-md hover:bg-gray-700"
                        >
                            Contact
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <nav>
            <ul className="flex items-center space-x-2">
                <li 
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                >
                    <button 
                        aria-haspopup="true"
                        aria-expanded={isServicesOpen}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-light rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold"
                    >
                        Services
                        <ChevronDownIcon className="h-4 w-4" />
                    </button>

                    <div
                        className={`absolute top-full left-0 pt-2 w-48 focus:outline-none transition-opacity duration-200 ${isServicesOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        {isServicesOpen && (
                            <div
                                className="rounded-md shadow-lg bg-brand-card ring-1 ring-black ring-opacity-5 animate-fade-in-down"
                            >
                                <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleScroll(item.id);
                                                    setIsServicesOpen(false);
                                                }}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-brand-gold"
                                                role="menuitem"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </li>
                 <li>
                    <button
                        onClick={onAboutClick}
                        className="px-3 py-2 text-sm font-medium text-brand-light rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold"
                    >
                        About Us
                    </button>
                </li>
                <li>
                    <button
                        onClick={onContactClick}
                        className="px-3 py-2 text-sm font-medium text-brand-light rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-brand-gold"
                    >
                        Contact
                    </button>
                </li>
            </ul>
        </nav>
    );
};