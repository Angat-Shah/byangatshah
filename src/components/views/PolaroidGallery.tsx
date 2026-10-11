import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PolaroidPhoto {
  id: string;
  title: string;
  caption?: string;
  src: string;
  thumbSrc?: string;
}

export const EIKONE_POLAROIDS: PolaroidPhoto[] = [
  {
    id: '01',
    title: 'Victoria Falls',
    caption: 'Standing where the Zambezi falls into thin air.',
    src: '/eikone/photo-01.webp',
    thumbSrc: '/eikone/photo-01-thumb.webp',
  },
  {
    id: '02',
    title: 'Departure',
    caption: 'Cutting through cloud over Shanghai roofs.',
    src: '/eikone/photo-02.webp',
    thumbSrc: '/eikone/photo-02-thumb.webp',
  },
  {
    id: '03',
    title: 'Dusk on Zambezi',
    caption: 'Three fishermen drifting into evening light.',
    src: '/eikone/photo-03.webp',
    thumbSrc: '/eikone/photo-03-thumb.webp',
  },
  {
    id: '04',
    title: 'Rising Mist',
    caption: 'Dwarfed by spray at the canyon rim.',
    src: '/eikone/photo-04.webp',
    thumbSrc: '/eikone/photo-04-thumb.webp',
  },
  {
    id: '05',
    title: 'Savannah Rest',
    caption: 'Two young lions resting in midday shade.',
    src: '/eikone/photo-05.webp',
    thumbSrc: '/eikone/photo-05-thumb.webp',
  },
  {
    id: '06',
    title: 'Dinner Under Glass',
    caption: 'Warm lamps and rain on the conservatory roof.',
    src: '/eikone/photo-06.webp',
    thumbSrc: '/eikone/photo-06-thumb.webp',
  },
  {
    id: '07',
    title: 'China Pavilion',
    caption: 'Crimson brackets above an empty track.',
    src: '/eikone/photo-07.webp',
    thumbSrc: '/eikone/photo-07-thumb.webp',
  },
  {
    id: '08',
    title: 'Midnight Water',
    caption: 'Unbroken silence under a starry sky.',
    src: '/eikone/photo-08.webp',
    thumbSrc: '/eikone/photo-08-thumb.webp',
  },
  {
    id: '09',
    title: 'City from Above',
    caption: 'Towers stretching to the river horizon.',
    src: '/eikone/photo-09.webp',
    thumbSrc: '/eikone/photo-09-thumb.webp',
  }
];

interface PolaroidGalleryProps {
  photos?: PolaroidPhoto[];
}

/** Full gallery grid for Eikone view */
export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({
  photos = EIKONE_POLAROIDS,
}) => {
  const [selected, setSelected] = useState<PolaroidPhoto | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const currentIndex = selected ? photos.findIndex((p) => p.id === selected.id) : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1 || photos.length <= 1) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    setSelected(photos[prevIdx]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1 || photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    setSelected(photos[nextIdx]);
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelected(null);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (currentIndex !== -1 && photos.length > 1) {
          const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
          setSelected(photos[prevIdx]);
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (currentIndex !== -1 && photos.length > 1) {
          const nextIdx = (currentIndex + 1) % photos.length;
          setSelected(photos[nextIdx]);
        }
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const triggerEl = triggerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerEl?.focus();
    };
  }, [selected, currentIndex, photos]);

  return (
    <div className="polaroid-gallery-wrapper">
      <div className="polaroid-gallery-grid">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className="polaroid-card group cursor-pointer border-none p-0 text-left outline-none"
            aria-label={`View ${photo.title} fullscreen`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelected(photo);
            }}
          >
            <span className="polaroid-image-container">
              <img
                src={photo.thumbSrc || photo.src}
                alt={photo.title}
                width={1024}
                height={1024}
                loading={index < 3 ? 'eager' : 'lazy'}
                className="polaroid-img"
              />
            </span>
            <span className="polaroid-caption">
              <span className="polaroid-caption-text">
                <strong className="polaroid-title">{photo.title}</strong>
                {photo.caption && <small className="polaroid-sub">{photo.caption}</small>}
              </span>
              <em className="polaroid-num">{photo.id}</em>
            </span>
          </button>
        ))}
      </div>

      {selected &&
        createPortal(
          <div
            className="polaroid-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            onClick={() => setSelected(null)}
          >
            <button
              ref={closeRef}
              type="button"
              className="polaroid-close"
              aria-label="Close preview"
              onClick={() => setSelected(null)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="polaroid-nav-btn polaroid-nav-btn--prev"
                  aria-label="Previous photograph"
                  title="Previous (Left arrow)"
                  onClick={handlePrev}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="polaroid-nav-btn polaroid-nav-btn--next"
                  aria-label="Next photograph"
                  title="Next (Right arrow)"
                  onClick={handleNext}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            <figure onClick={(e) => e.stopPropagation()}>
              <img src={selected.src} alt={selected.title} />
              <figcaption>
                <span className="polaroid-caption-text">
                  <strong className="polaroid-title">{selected.title}</strong>
                  {selected.caption && (
                    <small className="polaroid-sub">{selected.caption}</small>
                  )}
                </span>
                <em className="polaroid-num">{selected.id}</em>
              </figcaption>
            </figure>
          </div>,
          document.body
        )}
    </div>
  );
};

/** Individual Polaroid Frame for Certificates & Single Displays */
export const PolaroidSingle: React.FC<{
  title: string;
  subtitle?: string;
  idBadge?: string;
  src: string;
  isVertical?: boolean;
  showCaption?: boolean;
}> = ({
  title,
  subtitle,
  idBadge,
  src,
  isVertical = false,
  showCaption = false,
}) => {
  const [selected, setSelected] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelected(false);
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const triggerEl = triggerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerEl?.focus();
    };
  }, [selected]);

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelected(true);
          }
        }}
        onClick={() => setSelected(true)}
        className={`polaroid-card group cursor-pointer ${!showCaption ? 'polaroid-frame-only' : ''}`}
        style={{
          maxWidth: isVertical ? '230px' : '310px',
          ...(showCaption ? {} : { padding: isVertical ? '10px 10px 10px' : '10px 10px 10px' }),
        }}
        aria-label={`View ${title} fullscreen`}
      >
        <span
          className="polaroid-image-container"
          style={{
            aspectRatio: isVertical ? '3/4' : '4/3',
            background: '#0d0e12',
          }}
        >
          <img
            src={src}
            alt={title}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="polaroid-img object-contain pointer-events-none select-none no-save-image"
          />
        </span>
        {showCaption && (
          <span className="polaroid-caption">
            <span className="polaroid-caption-text">
              <strong className="polaroid-title truncate">{title}</strong>
              {subtitle && <small className="polaroid-sub truncate">{subtitle}</small>}
            </span>
            {idBadge && <em className="polaroid-num">{idBadge}</em>}
          </span>
        )}
      </div>

      {selected &&
        createPortal(
          <div
            className="polaroid-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            onClick={() => setSelected(false)}
          >
            <button
              ref={closeRef}
              type="button"
              className="polaroid-close"
              aria-label="Close preview"
              onClick={() => setSelected(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <figure onClick={(e) => e.stopPropagation()}>
              <img
                src={src}
                alt={title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="object-contain pointer-events-none select-none no-save-image"
                style={{ borderRadius: showCaption ? '4px 4px 0 0' : '4px' }}
              />
              {showCaption && (
                <figcaption>
                  <span className="polaroid-caption-text">
                    <strong className="polaroid-title">{title}</strong>
                    {subtitle && <small className="polaroid-sub">{subtitle}</small>}
                  </span>
                  {idBadge && <em className="polaroid-num">{idBadge}</em>}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body
        )}
    </>
  );
};

