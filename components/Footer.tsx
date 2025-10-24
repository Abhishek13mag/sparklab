import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-slate-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <ShieldCheckIcon className="h-8 w-8 text-sky-500" />
          <span className="ml-2 text-xl font-bold">Disaster Resilience Hub</span>
        </div>
        <p className="text-sm text-slate-400">
          Stay Safe. Stay Prepared. Stay Informed.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Resilience Hub. All Rights Reserved. This is a conceptual application for demonstration purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;