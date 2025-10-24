import React from 'react';
// FIX: Import icon components and types to define mock data.
import { EarthquakeIcon, FloodIcon, WildfireIcon, HeatwaveIcon } from './components/Icons';
import { AlertLevel } from './types';
import type { Alert, Disaster, KitCategory } from './types';

// FIX: Converted JSX to `React.createElement` calls to resolve syntax errors in a .ts file.
export const ICONS: { [key: string]: React.ReactNode } = {
    report: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584M9 18l-3.072-3.072A4.001 4.001 0 013 11.586V6" })
    ),
    locate: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
    ),
    flood: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 15a4 4 0 004 4h9a5 5 0 10-2-9.75V10a3 3 0 00-3-3h-1m-4 5.75c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25S11.31 11 11 11s-1.25.56-1.25 1.25z" })
    ),
    fire: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242z" })
    ),
    cyclone: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })
    ),
    landslide: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-12l-8 8-8-8" })
    ),
    earthquake: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 8h16M4 16h16" })
    ),
    other: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
    ),
};

// FIX: Add missing DISASTERS constant for DisasterInfo component.
export const DISASTERS: Disaster[] = [
  {
    name: 'Earthquakes',
    description: 'Sudden shaking of the ground caused by seismic waves.',
    icon: EarthquakeIcon,
    bgColor: 'bg-orange-100 dark:bg-orange-900/50',
  },
  {
    name: 'Floods',
    description: 'An overflow of water that submerges land that is usually dry.',
    icon: FloodIcon,
    bgColor: 'bg-slate-100 dark:bg-slate-700/50',
  },
  {
    name: 'Wildfires',
    description: 'Large, destructive fires that spread quickly over woodland or brush.',
    icon: WildfireIcon,
    bgColor: 'bg-red-100 dark:bg-red-900/50',
  },
  {
    name: 'Heatwaves',
    description: 'Prolonged periods of excessively hot weather.',
    icon: HeatwaveIcon,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
  },
];

// FIX: Add missing PREPAREDNESS_KIT constant for PreparednessKit component.
export const PREPAREDNESS_KIT: KitCategory[] = [
  {
    name: 'Water & Food',
    items: [
      { name: 'Water', description: 'One gallon per person per day for at least three days.' },
      { name: 'Non-perishable food', description: 'A three-day supply for your entire household.' },
      { name: 'Can opener', description: 'Manual can opener for canned food.' },
    ],
  },
  {
    name: 'Health & Safety',
    items: [
      { name: 'First aid kit', description: 'Bandages, antiseptic wipes, pain relievers, etc.' },
      { name: 'Medications', description: 'A seven-day supply of prescription medications.' },
      { name: 'Dust mask', description: 'To help filter contaminated air.' },
    ],
  },
  {
    name: 'Tools & Supplies',
    items: [
      { name: 'Flashlight', description: 'With extra batteries.' },
      { name: 'Whistle', description: 'To signal for help.' },
      { name: 'Wrench or pliers', description: 'To turn off utilities.' },
    ],
  },
  {
    name: 'Personal Items',
    items: [
      { name: 'Important documents', description: 'Copies of insurance policies, IDs, and bank records.' },
      { name: 'Cash', description: 'In case ATMs are not working.' },
      { name: 'Emergency blankets', description: 'For warmth.' },
    ],
  },
];

// FIX: Add missing MOCK_ALERTS constant for LocalAlerts component.
export const MOCK_ALERTS: Alert[] = [
  {
    level: AlertLevel.Warning,
    title: 'Severe Thunderstorm Warning',
    area: 'Coastal and Inland Areas',
    timestamp: 'Issued: 2 hours ago. Expires: in 4 hours.',
  },
  {
    level: AlertLevel.Watch,
    title: 'Flash Flood Watch',
    area: 'Low-lying and River-adjacent Areas',
    timestamp: 'Issued: 6 hours ago. Expires: tomorrow morning.',
  },
  {
    level: AlertLevel.Advisory,
    title: 'Air Quality Advisory',
    area: 'All metro regions',
    timestamp: 'Effective until further notice.',
  },
];
