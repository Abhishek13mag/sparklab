import React from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'bn';

export interface CommunityHubData {
  alerts: { title: string; source: string; summary: string; link?: string }[];
  updates: { update: string; location: string; timestamp: string }[];
  resources: { name: string; type: string; address: string }[];
}

export interface ReportedIncident {
    id: string;
    type: string;
    description: string;
    location: string;
    lat: number;
    lon: number;
}
// FIX: Add missing types for DisasterInfo, PreparednessKit, LocalAlerts, and AIAssistant components.
export interface Disaster {
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bgColor: string;
}

export interface KitItem {
    name: string;
    description: string;
}

export interface KitCategory {
    name: string;
    items: KitItem[];
}

export enum AlertLevel {
    Warning = 'Warning',
    Watch = 'Watch',
    Advisory = 'Advisory',
}

export interface Alert {
    level: AlertLevel;
    title: string;
    area: string;
    timestamp: string;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}
