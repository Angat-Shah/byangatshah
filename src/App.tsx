import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { AppId, WindowState, AppDefinition } from './types/os';
import { ShaderBackground } from './components/den/ShaderBackground';
import { Lockscreen } from './components/den/Lockscreen';
import { HelloSignature } from './components/den/HelloSignature';
import { CarouselWheel } from './components/den/CarouselWheel';
import { Dock } from './components/den/Dock';
import { DesktopIcons, MobileIconsGrid } from './components/den/DesktopIcons';
import { Window } from './components/den/Window';
import { MusicCard } from './components/views/MusicCard';
import { usePlayer } from './context/PlayerContext';
import { createAppsData } from './data/appsData';
import { ProjectDetailView, PROJECTS_PROFILES } from './components/views/ProjectDetailView';
import { playSound } from './utils/sounds';
import { triggerHaptic } from './utils/haptics';
import { PlayfulToast } from './components/den/PlayfulToast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const { startPlaying } = usePlayer();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('atheno');
  const [isMobile, setIsMobile] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  // Track windows that are mid-genie-minimize animation
  const [genieMinimizing, setGenieMinimizing] = useState<Set<AppId>>(new Set());
  // Track windows that are mid-genie-restore animation
  const [genieRestoring, setGenieRestoring] = useState<Set<AppId>>(new Set());
  const zCounter = useRef(10);
  const windowsRef = useRef(windows);
  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  const handleOpenProject = useCallback((projectId: string) => {
    const normId = projectId.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setActiveProjectId(normId);
    playSound('maximize');
    triggerHaptic('selection');

    setWindows((prev) => {
      const nextZ = prev.reduce((max, w) => Math.max(max, w.z), 10) + 1;
      const isPresent = prev.find((w) => w.id === 'project-detail');
      if (isPresent) {
        return prev.map((w) =>
          w.id === 'project-detail' ? { ...w, minimized: false, z: nextZ } : w
        );
      }
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const w = Math.min(780, winW - 48);
      const h = Math.min(640, winH - 140);
      return [
        ...prev,
        {
          id: 'project-detail',
          x: Math.max(20, (winW - w) / 2),
          y: Math.max(48, (winH - h) / 2 - 20),
          w,
          h,
          z: nextZ,
          maximized: false,
          minimized: false,
        },
      ];
    });
  }, []);

  const baseApps = useMemo(() => {
    return createAppsData(handleOpenProject);
  }, [handleOpenProject]);

  const appMap = useMemo(() => {
    const map = Object.fromEntries(baseApps.map((app) => [app.id, app])) as Record<AppId, AppDefinition>;
    const activeProj = PROJECTS_PROFILES[activeProjectId] || PROJECTS_PROFILES['atheno'];
    map['project-detail'] = {
      id: 'project-detail',
      label: `${activeProj?.name || 'Project'} · Profile`,
      iconSrc: '/logos/toolkit-icon.svg',
      gradient: 'linear-gradient(145deg,#202227,#121316)',
      size: { w: 780, h: 640 },
      content: <ProjectDetailView projectId={activeProjectId} />,
    };
    return map;
  }, [baseApps, activeProjectId]);

  const unlockingRef = useRef(false);

  const handleUnlock = useCallback(() => {
    if (unlockingRef.current) return;
    unlockingRef.current = true;
    setUnlocking(true);
    playSound('success-chime');
    triggerHaptic('success');
    startPlaying();
    window.setTimeout(() => setIsLocked(false), 650);
  }, [startPlaying]);

  useEffect(() => {
    if (isMobile || isLocked) return;
    const timer = window.setTimeout(() => setCarouselVisible(true), 3400);
    return () => window.clearTimeout(timer);
  }, [isMobile, isLocked]);

  useEffect(() => {
    const m = window.matchMedia('(max-width: 480px)');
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  const handleOpenApp = useCallback(
    (id: AppId) => {
      const def = appMap[id];
      if (!def) return;

      const existing = windowsRef.current.find((w) => w.id === id);
      if (existing) {
        if (existing.minimized) {
          playSound('maximize');
          triggerHaptic('selection');
          setGenieRestoring((s) => new Set(s).add(id));
          window.setTimeout(() => {
            setGenieRestoring((s) => {
              const n = new Set(s);
              n.delete(id);
              return n;
            });
          }, 400);
        } else {
          playSound('click');
          triggerHaptic('light');
        }
      } else {
        playSound('maximize');
        triggerHaptic('selection');
      }

      zCounter.current += 1;
      const nextZ = zCounter.current;

      setWindows((prev) => {
        const isPresent = prev.find((w) => w.id === id);
        if (isPresent) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: nextZ } : w
          );
        }
        const count = prev.length;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const w = Math.min(def.size.w, winW - 48);
        const h = Math.min(def.size.h, winH - 140);
        const offset = (count % 5) * 30;
        return [
          ...prev,
          {
            id,
            x: Math.max(20, (winW - w) / 2 + offset - 60),
            y: Math.max(48, (winH - h) / 2 - 30 + offset),
            w,
            h,
            z: nextZ,
            maximized: false,
            minimized: false,
          },
        ];
      });
    },
    [appMap]
  );

  const handleFocus = useCallback((id: AppId) => {
    zCounter.current += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: zCounter.current } : w))
    );
  }, []);

  const handleClose = useCallback((id: AppId) => {
    playSound('switch');
    triggerHaptic('light');
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const handleMinimize = useCallback((id: AppId) => {
    playSound('toggle');
    triggerHaptic('light');
    // Start genie animation
    setGenieMinimizing((s) => new Set(s).add(id));
    window.setTimeout(() => {
      setGenieMinimizing((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      );
    }, 420);
  }, []);

  const handleToggleMaximize = useCallback((id: AppId) => {
    playSound('toggle');
    triggerHaptic('medium');
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const handleMove = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  // Escape key closes topmost non-minimized window
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWindows((prev) => {
          const visible = prev.filter((w) => !w.minimized);
          if (!visible.length) return prev;
          const top = visible.reduce((a, b) => (a.z > b.z ? a : b));
          return prev.filter((w) => w.id !== top.id);
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const topZ = windows.reduce((max, w) => Math.max(max, w.z), 0);
  const openIds = useMemo(() => new Set(windows.map((w) => w.id)), [windows]);
  // Show windows that are not minimized, OR are mid-genie-minimize animation
  const visibleWindows = useMemo(
    () => windows.filter((w) => !w.minimized || genieMinimizing.has(w.id)),
    [windows, genieMinimizing]
  );

  // Desktop icons (top right): research, notesncode, skills, gallery
  const desktopApps = useMemo(() => {
    const targetDesktop = new Set(['research', 'notesncode', 'skills', 'gallery']);
    return baseApps.filter((app) => targetDesktop.has(app.id));
  }, [baseApps]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <ShaderBackground />

      {isLocked && <Lockscreen unlocking={unlocking} onUnlock={handleUnlock} />}

      {!isMobile && !isLocked && (
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center px-6 pb-[34vh] text-center">
          <HelloSignature
            className="boot h-auto w-[min(78vw,34rem)] max-h-[40vh]"
            delay={0.5}
          />
          <p
            className="boot mt-8 max-w-xl text-xl font-light leading-snug text-white/85 sm:text-2xl"
            style={{ animationDelay: '2.4s' }}
          >
            I'm Angat Shah — developer, gamer, builder.
          </p>
          <p
            className="boot mt-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/35"
            style={{ animationDelay: '2.8s' }}
          >
            Click an icon to explore, or use the dock below
          </p>
        </div>
      )}

      {!isMobile && !isLocked && (
        <div
          className={`transition-opacity duration-[1200ms] ease-out ${carouselVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <CarouselWheel onSelectProject={handleOpenProject} />
        </div>
      )}

      {/* Music card: top left, only after unlock */}
      {!isLocked && <MusicCard />}

      {isMobile ? (
        !isLocked && (
          <div className="absolute inset-x-0 bottom-24 top-5 flex flex-col overflow-y-auto">
            <div className="mb-7 mt-6 flex flex-col items-center text-center">
              <HelloSignature
                className="boot h-[clamp(5rem,26vw,8rem)] w-auto"
                delay={0.4}
              />
              <p
                className="boot mt-4 max-w-sm px-6 text-xl font-medium leading-snug text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
                style={{ animationDelay: '2.4s' }}
              >
                I'm Angat Shah — developer, gamer, builder.
              </p>
            </div>
            <MobileIconsGrid
              apps={appMap}
              onOpen={handleOpenApp}
              className="mobile-grid-entrance"
            />
          </div>
        )
      ) : (
        !isLocked && (
          <div className="icons-entrance">
            <DesktopIcons apps={desktopApps} onOpen={handleOpenApp} />
          </div>
        )
      )}

      {visibleWindows.map((win) => (
        <Window
          key={win.id}
          app={appMap[win.id]}
          win={win}
          focused={win.z === topZ}
          isMobile={isMobile}
          genieClass={
            genieMinimizing.has(win.id)
              ? 'genie-minimizing'
              : genieRestoring.has(win.id)
                ? 'genie-restoring'
                : ''
          }
          onFocus={() => handleFocus(win.id)}
          onClose={() => handleClose(win.id)}
          onMinimize={() => handleMinimize(win.id)}
          onToggleMax={() => handleToggleMaximize(win.id)}
          onMove={(x, y) => handleMove(win.id, x, y)}
        />
      ))}

      {!isLocked && (
        <Dock
          onOpen={handleOpenApp}
          openIds={openIds}
          apps={appMap}
          className="dock-entrance"
        />
      )}

      {!isLocked && <PlayfulToast />}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

