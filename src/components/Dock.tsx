// Dock refactored onto shared UIElements primitives
import React, { useRef } from 'react';
import type { AppId, SocialLink } from '../../types/os';
import { IconSquircleImage, IconSquircleGradient } from '../ui/UIElements';
import { playSound } from '../../utils/sounds';
import { triggerHaptic } from '../../utils/haptics';

interface DockProps {
  onOpen: (id: AppId) => void;
  openIds: Set<AppId>;
  apps: Record<string, { label: string; iconSrc?: string; gradient?: string; glyph?: React.ReactNode }>;
  className?: string;
}

const DOCK_APP_IDS: AppId[] = ['about', 'projects', 'experience', 'community', 'contact'];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Resume',
    href: '/resume.pdf',
    iconSrc: '/logos/resume-mac.png',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Angat-Shah',
    iconSrc: '/logos/github-mac.png',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angat-shah',
    iconSrc: '/logos/linkedin-mac.png',
  },
  {
    label: 'Monkeytype',
    href: 'https://monkeytype.com/profile/xSPIDERx',
    iconSrc: '/logos/monkeytype-mac.png',
  },
];

export const Dock: React.FC<DockProps> = ({ onOpen, openIds, apps, className = '' }) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  let refIdx = 0;
  const getNextRefIndex = () => refIdx++;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const mouseX = e.clientX;

    itemRefs.current.forEach((el) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = mouseX - centerX;

      const scale = 1 + 0.6 * Math.exp(-(dist * dist) / 9800);

      el.style.transform = `translateY(${-(26 * (scale - 1))}px) scale(${scale})`;
      el.style.setProperty('--dock-scale', scale.toString());
    });
  };

  const handlePointerLeave = () => {
    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.setProperty('--dock-scale', '1');
        el.style.transform = 'translateY(0) scale(1)';
      }
    });
  };

  return (
    <div className={`fixed bottom-2.5 left-1/2 max-md:z-30 md:z-[150] ${className ? className : '-translate-x-1/2'}`}>
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="glass-light flex items-end gap-1.5 rounded-2xl px-2.5 py-2 ring-1 ring-white/15"
      >
        {DOCK_APP_IDS.map((id) => {
          const app = apps[id];
          if (!app) return null;

          const idx = getNextRefIndex();

          return (
            <DockButton
              key={id}
              label={app.label}
              running={openIds.has(id)}
              onClick={() => onOpen(id)}
              innerRef={(el) => {
                itemRefs.current[idx] = el;
              }}
            >
              {app.iconSrc ? (
                <IconSquircleImage src={app.iconSrc} className="h-full w-full" />
              ) : (
                <IconSquircleGradient gradient={app.gradient} className="h-full w-full">
                  {app.glyph}
                </IconSquircleGradient>
              )}
            </DockButton>
          );
        })}

        <div className="hidden items-end gap-1.5 min-[560px]:flex">
          <div className="mx-1 h-11 w-px self-center bg-white/15" />

          {SOCIAL_LINKS.map((link) => {
            const idx = getNextRefIndex();
            const isResume = link.label === 'Resume';

            return (
              <DockButton
                key={link.label}
                label={link.label}
                href={isResume ? undefined : link.href}
                onClick={isResume ? () => onOpen('resume') : undefined}
                running={isResume ? openIds.has('resume') : false}
                innerRef={(el) => {
                  itemRefs.current[idx] = el;
                }}
              >
                {link.iconSrc ? (
                  <IconSquircleImage src={link.iconSrc} className="h-full w-full" />
                ) : (
                  <IconSquircleGradient gradient={link.gradient} className="h-full w-full">
                    {link.glyph}
                  </IconSquircleGradient>
                )}
              </DockButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface DockButtonProps {
  children: React.ReactNode;
  label: string;
  running?: boolean;
  onClick?: () => void;
  href?: string;
  innerRef: (el: HTMLDivElement | null) => void;
}

const DockButton: React.FC<DockButtonProps> = ({
  children,
  label,
  running = false,
  onClick,
  href,
  innerRef,
}) => {
  const content = (
    <>
      <div
        ref={innerRef}
        className="relative origin-bottom transition-transform duration-200 ease-out will-change-transform"
        style={{ height: 46, width: 46 }}
      >
        <span
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[0.7rem] text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100"
          style={{
            transform: 'translateX(-50%) translateY(10px) scale(calc(1 / var(--dock-scale, 1)))',
          }}
        >
          {label}
        </span>

        {children}
      </div>

      <span
        className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80 transition-opacity ${running ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid place-items-end"
    >
      {content}
    </a>
  ) : (
    <button
      onClick={() => {
        playSound('click');
        triggerHaptic('selection');
        if (onClick) onClick();
      }}
      className="group relative grid place-items-end"
    >
      {content}
    </button>
  );
};