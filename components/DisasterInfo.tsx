
import React from 'react';
import { DISASTERS } from '../constants';
import Card from './Card';

const DisasterInfo: React.FC = () => {
  return (
    <section id="risks" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Know Your Risks</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Understanding potential disasters is the first step to being prepared.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DISASTERS.map((disaster, index) => (
            <Card key={index} className="flex flex-col text-center animate-fade-in-up overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`p-6 flex-grow flex flex-col items-center justify-center ${disaster.bgColor}`}>
                <disaster.icon className="h-16 w-16 text-sky-700 dark:text-sky-400 mb-4" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                 <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{disaster.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 flex-grow">{disaster.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisasterInfo;