
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import type { Language } from './types';
import { translations } from './translations';
import Hero from './components/Hero';
import DisasterInfo from './components/DisasterInfo';
import PreparednessKit from './components/PreparednessKit';
import LocalAlerts from './components/LocalAlerts';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import AegisDashboard from './components/AegisDashboard';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');

    // Basic fallback for missing translations
    const t = {
        ...translations.en,
        ...(translations[language] || {})
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 font-sans">
            <Header language={language} setLanguage={setLanguage} t={t}/>
            <main>
                <Hero />
                <section id="dashboard" className="py-20 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <Dashboard language={language} t={t} />
                    </div>
                </section>
                <DisasterInfo />
                <PreparednessKit />
                <LocalAlerts />
                <AIAssistant />
                <AegisDashboard />
            </main>
            <Footer />
        </div>
    );
};

export default App;
