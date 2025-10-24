import React, { useState } from 'react';
import type { Language } from '../types';
import { MenuIcon, XIcon } from './Icons';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: any;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#dashboard', label: t.header.navDashboard },
        { href: '#risks', label: t.header.navRisks },
        { href: '#kit', label: t.header.navKit },
        { href: '#alerts', label: t.header.navAlerts },
        { href: '#ai-helper', label: t.header.navAIHelper },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                        <h1 className="ml-2 text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
                            {t.header.title}
                        </h1>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <nav className="flex space-x-4">
                           {navLinks.map(link => (
                                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    {link.label}
                                </a>
                           ))}
                        </nav>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            aria-label="Select language"
                            className="bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                            <option value="ta">தமிழ்</option>
                            <option value="te">తెలుగు</option>
                            <option value="kn">ಕನ್ನಡ</option>
                            <option value="ml">മലയാളം</option>
                            <option value="bn">বাংলা</option>
                        </select>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-sky-600">
                            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
             {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-800 shadow-lg">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                     <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700 px-5">
                        <label htmlFor="mobile-lang-select" className="text-sm font-medium text-slate-500 dark:text-slate-400">Language</label>
                        <select
                            id="mobile-lang-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="mt-1 w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                            <option value="ta">தமிழ்</option>
                            <option value="te">తెలుగు</option>
                            <option value="kn">ಕನ್ನಡ</option>
                            <option value="ml">മലയാളം</option>
                            <option value="bn">বাংলা</option>
                        </select>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
