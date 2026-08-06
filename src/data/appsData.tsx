import React from 'react';
import { AppDefinition } from '../types/os';

export const createAppsData = (): AppDefinition[] => [
  {
    id: 'music',
    title: 'Music Player',
    icon: '/logos/toolkit-icon.svg',
    defaultWidth: 420,
    defaultHeight: 520,
    component: () => <div className="p-4 text-white">Music Player Shell</div>
  }
];

export const APPS_DATA = createAppsData();

// About Angat profile view added

// Studies view: Atheno, XAI agreement, QRNG inquiries

// Skills folders categorized stacks
