import React from 'react';
import type { AppDefinition, AppId } from '../../types/os';
import { IconSquircleImage, IconSquircleGradient } from '../ui/UIElements';
import { playSound } from '../../utils/sounds';
import { triggerHaptic } from '../../utils/haptics';

interface DesktopIconsProps {
  apps: AppDefinition[];
  onOpen: (id: AppId) => void;
}

export const SoonBadge: React.FC = () => (
  <span className="absolute inset-0 grid place-items-center bg-black/65 text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-[1px]">
    Soon
  </span>
);

export const DesktopIconButton: React.FC<{
  app: AppDefinition;
  onOpen: () => void;
}> = ({ app, onOpen }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        playSound('click');
        triggerHaptic('selection');
        onOpen();
      }}
      className="group flex w-[88px] flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none"
    >
      <span className="rounded-[20%] p-1">
        {app.iconSrc ? (
          <IconSquircleImage
            src={app.iconSrc}
            className="h-14 w-14 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-[60px] sm:w-[60px]"
          >
            {app.comingSoon && <SoonBadge />}
          </IconSquircleImage>
        ) : (
          <IconSquircleGradient
            gradient={app.gradient}
            className="h-14 w-14 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-[60px] sm:w-[60px]"
          >
            {app.glyph}
            {app.comingSoon && <SoonBadge />}
          </IconSquircleGradient>
        )}
      </span>
      <span className="icon-label w-full text-center text-[0.72rem] leading-tight text-white/90 font-medium">
        {app.label}
      </span>
    </button>
  );
};

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ apps, onOpen }) => {
  return (
    <div className="boot absolute right-3 top-7 flex max-h-[calc(100vh-150px)] flex-col flex-wrap content-start gap-y-5">
      {apps.map((app) => (
        <DesktopIconButton key={app.id} app={app} onOpen={() => onOpen(app.id)} />
      ))}
    </div>
  );
};

interface MobileIconsGridProps {
  apps: Record<AppId, AppDefinition>;
  onOpen: (id: AppId) => void;
  className?: string;
}

const MOBILE_APP_IDS: AppId[] = ['research', 'notesncode', 'skills', 'gallery'];

const MOBILE_SOCIAL_LINKS = [
  {
    label: 'Resume',
    href: '/AngatShah_Resume.pdf',
    iconSrc: '/logos/resume-mac.webp',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Angat-Shah',
    iconSrc: '/logos/github-mac.webp',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angat-shah',
    iconSrc: '/logos/linkedin-mac.webp',
  },
  {
    label: 'Monkeytype',
    href: 'https://monkeytype.com/profile/xSPIDERx',
    iconSrc: '/logos/monkeytype-mac.webp',
  },
];

const SCATTER_OFFSETS = [
  { y: 10, r: -5 },
  { y: -14, r: 5 },
  { y: 8, r: -3 },
  { y: -6, r: 7 },
  { y: 14, r: -6 },
  { y: -10, r: 4 },
  { y: 6, r: -4 },
  { y: -12, r: 3 },
];

export const MobileIconsGrid: React.FC<MobileIconsGridProps> = ({
  apps,
  onOpen,
  className = '',
}) => {
  let scatterIdx = 0;

  return (
    <div
      className={`flex flex-wrap items-start justify-center gap-x-4 gap-y-7 px-4 ${className}`}
    >
      {MOBILE_APP_IDS.map((id) => {
        const app = apps[id];
        if (!app) return null;
        const scatter = SCATTER_OFFSETS[scatterIdx++ % SCATTER_OFFSETS.length];
        return (
          <div
            key={id}
            style={{
              transform: `translateY(${scatter.y}px) rotate(${scatter.r}deg)`,
            }}
          >
            <DesktopIconButton app={app} onOpen={() => onOpen(id)} />
          </div>
        );
      })}

      {MOBILE_SOCIAL_LINKS.map((item) => {
        const scatter = SCATTER_OFFSETS[scatterIdx++ % SCATTER_OFFSETS.length];
        const isResume = item.label === 'Resume';

        const innerContent = (
          <>
            <span className="rounded-[20%] p-1">
              {item.iconSrc ? (
                <IconSquircleImage
                  src={item.iconSrc}
                  className="h-14 w-14 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <IconSquircleGradient className="h-14 w-14">
                  <span />
                </IconSquircleGradient>
              )}
            </span>
            <span className="icon-label w-full text-center text-[0.72rem] text-white/90">
              {item.label}
            </span>
          </>
        );

        return isResume ? (
          <button
            key={item.label}
            type="button"
            onClick={() => onOpen('resume')}
            style={{
              transform: `translateY(${scatter.y}px) rotate(${scatter.r}deg)`,
            }}
            className="group flex w-[88px] flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none"
          >
            {innerContent}
          </button>
        ) : (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transform: `translateY(${scatter.y}px) rotate(${scatter.r}deg)`,
            }}
            className="group flex w-[88px] flex-col items-center gap-1.5"
          >
            {innerContent}
          </a>
        );
      })}
    </div>
  );
};
