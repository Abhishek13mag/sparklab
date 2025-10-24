

import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { AlertLevel } from '../types';
import { AlertTriangleIcon, BellIcon, InfoIcon } from './Icons';

const alertStyles = {
  [AlertLevel.Warning]: {
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    borderColor: 'border-red-500',
    textColor: 'text-red-800 dark:text-red-200',
    icon: <AlertTriangleIcon className="w-6 h-6 text-red-500" />,
  },
  [AlertLevel.Watch]: {
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    icon: <BellIcon className="w-6 h-6 text-yellow-500" />,
  },
  [AlertLevel.Advisory]: {
    bgColor: 'bg-slate-100 dark:bg-slate-700/30',
    borderColor: 'border-slate-500',
    textColor: 'text-slate-800 dark:text-slate-200',
    icon: <InfoIcon className="w-6 h-6 text-slate-500" />,
  },
};

const LocalAlerts: React.FC = () => {
  return (
    <section id="alerts" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Local Alerts</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Stay updated with the latest advisories in your area (mock data).</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {MOCK_ALERTS.map((alert, index) => {
            const styles = alertStyles[alert.level];
            return (
              <div
                key={index}
                className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded-r-lg shadow-sm`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">{styles.icon}</div>
                  <div className="ml-3">
                    <p className={`text-sm font-bold ${styles.textColor}`}>
                      {alert.level.toUpperCase()}: {alert.title}
                    </p>
                    <p className={`mt-1 text-sm ${styles.textColor}`}>
                      <strong>Area:</strong> {alert.area}
                    </p>
                     <p className={`mt-1 text-xs ${styles.textColor} opacity-75`}>
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocalAlerts;