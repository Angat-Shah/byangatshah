import React, { useEffect, useState } from 'react';

interface LockscreenProps {
  unlocking: boolean;
  onUnlock: () => void;
}

export const Lockscreen: React.FC<LockscreenProps> = ({ unlocking, onUnlock }) => {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -8) onUnlock();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'Enter', ' '].includes(e.key)) {
        onUnlock();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUnlock]);

  const timeString = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Unlock desktop screen"
      onPointerDown={onUnlock}
      onClick={onUnlock}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onUnlock();
        }
      }}
      className={`fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-between bg-black/35 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${unlocking ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
    >
      <div className="mt-[14vh] flex flex-col items-center">
        <svg
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
          className="text-white/90 transition-all duration-300"
          aria-hidden="true"
        >
          <rect x="3" y="13" width="20" height="15" rx="4" fill="currentColor" />
          {unlocking ? (
            <path
              d="M7 10v-3a6 6 0 0 1 12 0"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              className="transition-transform duration-300 ease-out"
            />
          ) : (
            <path
              d="M7 13v-4a6 6 0 0 1 12 0v4"
              stroke="currentColor"
              strokeWidth="2.4"
              fill="none"
            />
          )}
        </svg>
        <div className="boot mt-6 text-[6rem] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[8rem]">
          {timeString}
        </div>
        <div
          className="boot mt-1 text-lg font-medium text-white/80"
          style={{ animationDelay: '0.1s' }}
        >
          {dateString}
        </div>
      </div>
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-bounce text-white/70">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
        <span className="text-sm text-white/70">
          Swipe up · click · or press ↑ to enter
        </span>
        <div className="mt-2 h-1 w-32 rounded-full bg-white/40" />
      </div>
    </div>
  );
};
