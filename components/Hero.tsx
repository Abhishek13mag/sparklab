

import React from 'react';

const Hero: React.FC = () => {
  const scrollToRisks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#risks')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative bg-white dark:bg-slate-800 pt-20 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          Building a Safer Tomorrow, <span className="text-sky-600 dark:text-sky-400">Together</span>.
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
          Your comprehensive guide to disaster preparedness. Stay informed, get prepared, and protect what matters most.
        </p>
        <a
          href="#risks"
          onClick={scrollToRisks}
          className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-sky-700 transform hover:scale-105 transition-all shadow-lg"
        >
          Get Prepared
        </a>
      </div>
    </section>
  );
};

export default Hero;