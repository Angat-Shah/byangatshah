import React from 'react';

export interface FeaturedProject {
  id: string;
  title: string;
  image: string;
  url: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'atheno',
    title: 'AI Automotive Intelligence',
    image: '/logos/atheno.webp',
    url: 'https://github.com/Angat-Shah/ATHENO',
  },
  {
    id: 'kavach',
    title: 'Citizen Safety & Incident Response',
    image: '/logos/kavach.webp',
    url: 'https://github.com/Angat-Shah/KAVACH',
  },
  {
    id: 'qrng',
    title: 'Quantum Randomness & Validation',
    image: '/logos/qrng.webp',
    url: 'https://github.com/Angat-Shah/QRNG',
  },
  {
    id: 'ciphera',
    title: 'AI-Assisted Secure Code Analysis',
    image: '/logos/ciphera.webp',
    url: 'https://github.com/Angat-Shah/Ciphera',
  },
  {
    id: 'stackit',
    title: 'Developer Knowledge Platform',
    image: '/logos/stackit.webp',
    url: 'https://github.com/Angat-Shah/StackIt',
  },
];

export const VideoThumbnail: React.FC<{ id: string; className?: string }> = ({
  id,
  className = '',
}) => {
  const project = FEATURED_PROJECTS.find((p) => p.id === id) || FEATURED_PROJECTS[0];
  return (
    <img
      src={project.image}
      alt={project.title}
      draggable={false}
      className={className}
    />
  );
};

export interface CarouselWheelProps {
  onSelectProject?: (id: string) => void;
}

export const CarouselWheel: React.FC<CarouselWheelProps> = ({ onSelectProject }) => {
  const items = Array.from({ length: 28 }, (_, t) => ({
    ...FEATURED_PROJECTS[t % FEATURED_PROJECTS.length],
    key: t,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="carousel-wheel" style={{ '--r': '1700px' } as React.CSSProperties}>
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelectProject?.(item.id);
            }}
            className="carousel-card group pointer-events-auto cursor-pointer border-none bg-transparent p-0 text-left outline-none"
            style={{
              width: 320,
              marginLeft: -160,
              marginTop: -100,
              transform: `rotate(${12.857142857142858 * i}deg) translateY(-1700px)`,
            }}
          >
            {/* Apple TV / Safari PiP style rounded rectangle card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/80 shadow-[0_22px_55px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/15 transition-all duration-300 group-hover:scale-[1.04] group-hover:ring-white/35">
              {/* Project Thumbnail Image */}
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Hover Preview Indicator */}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[1px] transition-all duration-200 group-hover:opacity-100">
                <span className="flex scale-90 items-center gap-2 rounded-full bg-black/90 px-4 py-2 text-xs font-normal tracking-wide text-white shadow-2xl transition-transform duration-200 group-hover:scale-100">
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Preview
                </span>
              </div>

              {/* Integrated Lower PiP Gradient Overlay for Centered Subtle Title */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 text-center">
                <p className="w-full truncate text-[0.76rem] font-medium text-white/70 tracking-tight">
                  {item.title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
