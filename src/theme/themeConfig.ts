/**
 * ════════════════════════════════════════════════════════════════════════════
 * THEME CONFIGURATION
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Curated luxury palette for Angat Shah:
 * Aesthetic: Apple Industrial Design × Future Billionaire × Tech Genius × Quiet Luxury.
 *
 * HOW TO SWITCH THEMES:
 * Change `ACTIVE_THEME_ID` below to any of the preset keys:
 *
 * ACTIVE PRESET:
 *   • 'golden-gate'       -> macOS / iOS 27 Golden Gate Twilight
 * ════════════════════════════════════════════════════════════════════════════
 */

export type ThemeId = 'golden-gate';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  shader: {
    colors: [string, string, string, string];
    colorBack: string;
    intensity: number;
    speed: number;
    softness: number;
    noise: number;
  };
  cssVars: {
    '--color-clay': string;
    '--color-clay-soft': string;
    '--aurora-1': string;
    '--aurora-2': string;
    '--aurora-3': string;
    '--aurora-4': string;
    '--glass-bg': string;
    '--glass-light-bg': string;
    '--glass-window-bg': string;
  };
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  // ── macOS / iOS 27 Golden Gate Sunset Twilight ─────────────────────────
  'golden-gate': {
    id: 'golden-gate',
    name: 'macOS / iOS 27 Golden Gate Twilight',
    tagline: 'Warm ember twilight & Golden Gate international orange',
    shader: {
      colors: ['#140b22', '#5c1b2b', '#c73e1d', '#fca34d'],
      colorBack: '#0a0812',
      intensity: 0.52,
      speed: 1.35,
      softness: 0.92,
      noise: 0.32,
    },
    cssVars: {
      '--color-clay': '#f97316',
      '--color-clay-soft': '#fb923c',
      '--aurora-1': '#c73e1d',
      '--aurora-2': '#fca34d',
      '--aurora-3': '#2b143d',
      '--aurora-4': '#ff6b35',
      '--glass-bg': '#16101ec7',
      '--glass-light-bg': '#2a1a2e8c',
      '--glass-window-bg': '#100a16f2',
    },
  },
};

/**
 * ════════════════════════════════════════════════════════════════════════════
 * CURRENT ACTIVE THEME
 * Change this string to test any of the themes:
 * 'golden-gate'
 * ════════════════════════════════════════════════════════════════════════════
 */
export const ACTIVE_THEME_ID: ThemeId = 'golden-gate';

export function getActiveTheme(): ThemeDefinition {
  return THEMES[ACTIVE_THEME_ID] || THEMES['golden-gate'];
}

export function applyThemeCssVars(theme: ThemeDefinition) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// Auto-apply variables on module initialization
if (typeof document !== 'undefined') {
  applyThemeCssVars(getActiveTheme());
}
