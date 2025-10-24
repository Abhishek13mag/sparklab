

import React, { useState } from 'react';
import { PREPAREDNESS_KIT } from '../constants';
import type { KitCategory } from '../types';
import { CheckCircleIcon } from './Icons';

const KitItemComponent: React.FC<{ item: { name: string; description: string } }> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div 
      className={`p-4 rounded-lg flex items-start space-x-4 cursor-pointer transition-all duration-300 ${
        isChecked ? 'bg-slate-200 dark:bg-slate-700 ring-2 ring-slate-500' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className="flex-shrink-0 pt-1">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isChecked ? 'bg-slate-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
          {isChecked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
        </div>
      </div>
      <div>
        <h4 className={`font-semibold ${isChecked ? 'text-slate-800 dark:text-slate-300 line-through' : 'text-slate-800 dark:text-slate-200'}`}>{item.name}</h4>
        <p className={`text-sm ${isChecked ? 'text-slate-700 dark:text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>{item.description}</p>
      </div>
    </div>
  );
};

const PreparednessKit: React.FC = () => {
  return (
    <section id="kit" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Build Your Emergency Kit</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A disaster kit is a collection of basic items your household may need in the event of an emergency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PREPAREDNESS_KIT.map((category) => (
            <div key={category.name} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center">
                <CheckCircleIcon className="w-6 h-6 mr-2" />
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <KitItemComponent key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparednessKit;