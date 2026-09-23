import React, { useState, useRef, useCallback } from 'react';
import { AppId, WindowState } from './types/os';
import { Window } from './components/Window';

export const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  // Autoplay music upon unlock flow completion
  const topZIndexRef = useRef<number>(100);

  const bringToFront = useCallback((id: string) => {
    topZIndexRef.current += 1;
    setWindows(prev => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: { ...win, zIndex: topZIndexRef.current, isMinimized: false }
      };
    });
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0D12] select-none text-white font-sans">
      <main className="relative w-full h-full flex flex-col justify-between">
        <div className="flex-1 relative overflow-hidden" id="desktop-canvas">
          {Object.entries(windows).map(([id, win]) => (
            <Window
              key={id}
              appId={id as AppId}
              windowState={win}
              onFocus={() => bringToFront(id)}
              onClose={() => {}}
              onMinimize={() => {}}
              onZoom={() => {}}
            >
              <div className="p-4">Window Content</div>
            </Window>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

// macOS genie minimize/restore animation state machine
