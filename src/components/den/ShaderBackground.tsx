import React, { useState, useEffect} from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import { getActiveTheme } from '../../theme/themeConfig';

export const ShaderBackground: React.FC = () => {
  const [webglSupported] = useState(() => {
    try {
      const testCanvas = document.createElement('canvas');
      return !!testCanvas.getContext('webgl2');
    } catch {
      return false;
    }
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const theme = getActiveTheme();

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: theme.shader.colorBack }}
    >
      {webglSupported ? (
        <GrainGradient
          className="absolute inset-0 h-full w-full"
          style={{ transform: 'scaleY(-1)' }}
          /* ═══════════════════════════════════════════════════════════════════
             🎨 SHADER PALETTE
             Current Active: Apple VisionOS Spatial Obsidian & Ice Cyan
             Deep space obsidian, electric aero-cyan waves, and diamond frost mist.
             ═══════════════════════════════════════════════════════════════════ */
          colors={theme.shader.colors}
          colorBack={theme.shader.colorBack}
          shape="wave"
          softness={theme.shader.softness}
          intensity={theme.shader.intensity}
          noise={theme.shader.noise}
          speed={prefersReducedMotion ? 0 : theme.shader.speed}
          scale={1}

        /* ── [ORIGINAL] Portfolio Colors (Preserved): ──
        colors={['#13235f', '#2b54d6', '#8fa8e8', '#eef2fc']}
        colorBack="#04060f"
        intensity={0.5}
        speed={1.4}
        */

        /* ── [ALTERNATIVE] macOS / iOS 27 Golden Gate Twilight: ──
        colors={['#140b22', '#5c1b2b', '#c73e1d', '#fca34d']}
        colorBack="#0a0812"
        intensity={0.52}
        speed={1.35}
        */

        /* ── [ALTERNATIVE] Batman Beyond / Stark Arc HUD: ──
        colors={['#0f0204', '#42060e', '#a30b1c', '#ff3b4e']}
        colorBack="#050507"
        intensity={0.55}
        speed={1.4}
        */
        />
      ) : (
        <div className="aurora">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="grain-overlay" />
        </div>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${theme.shader.colorBack}8c 0%, transparent 16%, transparent 42%, ${theme.shader.colorBack}d9 100%)`,
        }}
      />
    </div>
  );
};

