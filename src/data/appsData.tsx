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

// Experience view: Capabl, Popway, Soomuch

// Community batch 1: Amazon ML, SSIP Idea Hunt, Swirl & Twirl

// Community batch 2: NSS leadership, Pravaah coordination

// Contact view with direct email & LinkedIn actions

// Eikone gallery view wired with 9 photographs

// Resume preview view wired

// Projects grid and 3D cylindrical carousel

// Gaming archive ribbon wired

// Media paths consolidated under /media/
