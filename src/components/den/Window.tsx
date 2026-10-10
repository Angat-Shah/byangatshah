import React, { useRef, useState } from 'react';
import type { AppDefinition, WindowState } from '../../types/os';

interface WindowProps {
  app: AppDefinition;
  win: WindowState;
  focused: boolean;
  isMobile: boolean;
  genieClass?: string;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
}

export const Window: React.FC<WindowProps> = ({
  app,
  win,
  focused,
  isMobile,
  genieClass = '',
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
}) => {
  const dragOffsetRef = useRef<{ dx: number; dy: number } | null>(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  // Mobile swipe-to-dismiss states
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const touchStartYRef = useRef<number | null>(null);

  const handleMobileClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 260);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const dy = e.touches[0].clientY - touchStartYRef.current;
    if (dy > 0) {
      setDragY(dy);
    } else {
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
    setIsDragging(false);
    if (dragY > 80) {
      handleMobileClose();
    } else {
      setDragY(0);
    }
  };

  if (isMobile) {
    const sheetAnimClass = isClosing ? 'sheet-out' : 'sheet-in';
    return (
      <div
        className={`${sheetAnimClass} glass-window fixed inset-x-0 bottom-0 top-3 z-40 flex flex-col rounded-t-2xl ring-1 ring-white/15`}
        style={{
          zIndex: 100 + win.z,
          transform: dragY > 0 && !isClosing ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(.16, 1, .3, 1), opacity 0.25s ease',
          opacity: dragY > 0 && !isClosing ? Math.max(0.3, 1 - dragY / 320) : undefined,
        }}
        onPointerDown={onFocus}
      >
        {/* Swipe down handle */}
        <div
          className="flex w-full cursor-grab touch-none flex-col items-center pb-1 active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span className="h-1.5 w-10 rounded-full bg-white/25 transition-colors" />
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <WindowTitleBar
            app={app}
            focused={true}
            onClose={handleMobileClose}
            onMinimize={handleMobileClose}
            onToggleMax={onToggleMax}
            mobile={true}
          />
        </div>
        <div className="win-scroll selectable flex-1 overflow-y-auto overscroll-contain">
          {app.content}
        </div>
      </div>
    );
  }

  const style: React.CSSProperties = win.maximized
    ? {
      left: 12,
      top: 14,
      width: 'calc(100vw - 24px)',
      height: 'calc(100vh - 108px)',
      zIndex: 100 + win.z,
    }
    : {
      left: win.x,
      top: win.y,
      width: win.w,
      height: win.h,
      zIndex: 100 + win.z,
    };

  const animClass = genieClass || (hasAnimatedIn ? '' : 'win-in');

  return (
    <div
      className={`${animClass} glass-window fixed flex flex-col overflow-hidden rounded-xl ring-1 transition-shadow ${focused
        ? 'ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]'
        : 'ring-white/10 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]'
        }`}
      style={style}
      onPointerDown={onFocus}
      onAnimationEnd={() => setHasAnimatedIn(true)}
    >
      <div
        onPointerDown={(e) => {
          if (!isMobile && !win.maximized) {
            onFocus();
            dragOffsetRef.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }
        }}
        onPointerMove={(e) => {
          if (!dragOffsetRef.current) return;
          const maxX = window.innerWidth - 120;
          const maxY = window.innerHeight - 80;
          onMove(
            Math.min(Math.max(e.clientX - dragOffsetRef.current.dx, -(win.w - 120)), maxX),
            Math.min(Math.max(e.clientY - dragOffsetRef.current.dy, 12), maxY)
          );
        }}
        onPointerUp={(e) => {
          dragOffsetRef.current = null;
          try {
            (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
          } catch { }
        }}
        onDoubleClick={onToggleMax}
        className="cursor-default"
      >
        <WindowTitleBar
          app={app}
          focused={focused}
          onClose={onClose}
          onMinimize={onMinimize}
          onToggleMax={onToggleMax}
        />
      </div>
      <div className="win-scroll selectable flex-1 overflow-y-auto">
        {app.content}
      </div>
    </div>
  );
};

interface WindowTitleBarProps {
  app: AppDefinition;
  focused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  mobile?: boolean;
}

const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  app,
  focused,
  onClose,
  onMinimize,
  onToggleMax,
  mobile = false,
}) => {
  return (
    <div
      className={`group flex h-11 flex-none items-center gap-3 border-b border-white/10 px-4 ${focused ? 'bg-white/[0.06]' : 'bg-white/[0.02]'
        }`}
    >
      <div className="flex items-center gap-2">
        <button
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] text-[8px] text-black/50 ring-1 ring-black/10 transition-transform active:scale-90"
        >
          <span className="opacity-0 group-hover:opacity-100">✕</span>
        </button>
        <button
          aria-label="Minimize"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#febc2e] text-[8px] text-black/50 ring-1 ring-black/10 transition-transform active:scale-90"
        >
          <span className="opacity-0 group-hover:opacity-100">–</span>
        </button>
        <button
          aria-label="Zoom"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMax();
          }}
          className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#28c840] text-[7px] text-black/50 ring-1 ring-black/10 transition-transform active:scale-90"
        >
          <span className="opacity-0 group-hover:opacity-100">+</span>
        </button>
      </div>
      <div className="pointer-events-none flex flex-1 items-center justify-center gap-2">
        <span className="text-[0.8rem] font-medium text-white/70">{app.label}</span>
      </div>
      <div className="w-[52px]">{mobile && <span />}</div>
    </div>
  );
};
