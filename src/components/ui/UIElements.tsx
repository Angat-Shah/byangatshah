import React from 'react';

export const IconSquircleImage: React.FC<{
  src: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, className = '', children }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[23%] shadow-[0_10px_22px_-6px_rgba(0,0,0,0.55)] ring-1 ring-white/10 ${className}`}
    >
      <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
      {children}
    </div>
  );
};

export const IconSquircleGradient: React.FC<{
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}> = ({ children, gradient, className = '' }) => {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-[23%] shadow-[0_10px_22px_-6px_rgba(0,0,0,0.55)] ring-1 ring-white/10 ${className}`}
      style={{ backgroundImage: gradient }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white/12 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[23%] ring-1 ring-inset ring-white/10" />
      <span className="relative z-10 grid h-full w-full place-items-center">{children}</span>
    </div>
  );
};

export const MaskIcon: React.FC<{
  src: string;
  className?: string;
  color?: string;
}> = ({ src, className = 'h-[46%] w-[46%]', color = 'bg-white' }) => {
  return (
    <span
      className={`block ${className} ${color}`}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
      aria-hidden={true}
    />
  );
};

export const DotGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
  const rects = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 5; col++) {
      rects.push(
        <rect key={`${col}-${row}`} x={3 * col} y={3 * row} width={1.7} height={1.7} />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 13.7 4.7"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.2em] text-clay-soft ${className}`}
    >
      <DotGrid className="h-[0.58rem] w-auto" />
      <span>{children}</span>
    </div>
  );
};

export const CornerBracket: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute h-2.5 w-2.5 border-white/20 ${className}`}
  />
);

export const ContentContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`relative px-7 py-8 sm:px-9 ${className}`}>
      <CornerBracket className="left-3 top-3 border-l border-t" />
      <CornerBracket className="right-3 top-3 border-r border-t" />
      <div className="stagger">{children}</div>
    </div>
  );
};

export const CardBox: React.FC<{
  label?: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, footer, children, className = '' }) => {
  return (
    <div
      className={`overflow-hidden border border-white/10 bg-[#0b0c0f] transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {label && (
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/55">
          {label}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="flex items-center gap-2.5 border-t border-white/10 px-5 py-3 text-[0.74rem] leading-snug text-white/45">
          <span aria-hidden="true" className="h-[7px] w-[7px] flex-none bg-clay" />
          <span>{footer}</span>
        </div>
      )}
    </div>
  );
};

export const PointTimeline: React.FC<{ items: string[]; className?: string }> = ({ items, className = '' }) => {
  return (
    <ol className={`stagger-list relative ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className="relative flex gap-3.5 pb-5 last:pb-0">
          {idx < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-[6.5px] top-4 w-px bg-white/15"
            />
          )}
          <span
            className={`relative z-10 mt-0.5 grid h-3.5 w-3.5 flex-none place-items-center rounded-full border border-white/25 bg-[#101116] ${
              idx === 0 ? 'node-live' : ''
            }`}
          >
            <span className="h-[5px] w-[5px] rounded-full bg-clay-soft" />
          </span>
          <span className="text-[0.9rem] leading-snug text-white/75">{item}</span>
        </li>
      ))}
    </ol>
  );
};

export const SquareBulletList: React.FC<{ items: string[]; className?: string }> = ({
  items,
  className = '',
}) => {
  return (
    <ul className={`stagger-list space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 text-[0.94rem] leading-snug text-white/80"
        >
          <span aria-hidden="true" className="mt-[0.45rem] h-[7px] w-[7px] flex-none bg-clay" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const ArrowGridIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  const activeCoordinates = new Set([
    '1,3', '2,3', '3,3', '4,3', '5,3', '3,1', '4,2', '3,5', '4,4',
  ]);
  const circles = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const active = activeCoordinates.has(`${x},${y}`);
      circles.push(
        <circle
          key={`${x}-${y}`}
          cx={2 * x + 1}
          cy={2 * y + 1}
          r={0.78}
          opacity={active ? 1 : 0.22}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 14 14" className={className} fill="currentColor" aria-hidden="true">
      {circles}
    </svg>
  );
};

export const ActionButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  submit?: boolean;
  download?: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, href, submit = false, download, onClick, className: extraClass = '' }) => {
  const inner = (
    <>
      <span className="font-mono">{children}</span>
      <span className="grid h-7 w-7 place-items-center bg-black/10 transition-colors group-hover:bg-white/25">
        <ArrowGridIcon className="h-4 w-4" />
      </span>
    </>
  );
  const baseClassName =
    'group inline-flex items-center gap-3 bg-white py-1.5 pl-5 pr-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-clay hover:text-white';
  const combinedClass = extraClass ? `${baseClassName} ${extraClass}` : baseClassName;

  return submit ? (
      <button type="submit" onClick={onClick} className={combinedClass}>
        {inner}
      </button>
  ) : onClick ? (
      <button type="button" onClick={onClick} className={combinedClass}>
        {inner}
      </button>
  ) : (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      className={combinedClass}
    >
      {inner}
    </a>
  );
};

export const KeyValueField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div>
      <div className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">{label}</div>
      <div className="mt-1 text-[0.95rem] text-white/90">{value}</div>
    </div>
  );
};

export const SectionHeader: React.FC<{
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}> = ({ eyebrow, title, children }) => {
  return (
    <div>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
        {title}
      </h1>
      {children && (
        <div className="mt-4 max-w-2xl text-[0.97rem] leading-relaxed text-white/60">
          {children}
        </div>
      )}
    </div>
  );
};
