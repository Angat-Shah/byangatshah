import { forwardRef, type ComponentPropsWithoutRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

const artworkFallback = '/audio/midnight-geometry-artwork.webp';

export type NowPlayingBarProps = Readonly<
  {
    title?: string;
    artist?: string;
    progress?: number;
    artwork?: string;
    playing?: boolean;
    defaultPlaying?: boolean;
    expanded?: boolean;
    showSkipControls?: boolean;
    onTogglePlay?: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    onClose?: () => void;
    onExpand?: () => void;
    onSeek?: (progressPercent: number) => void;
  } & ComponentPropsWithoutRef<'div'>
>;

/** Compact portfolio-ready player bar adapted from the supplied OpenSourceUI component. */
export const NowPlayingBar = forwardRef<HTMLDivElement, NowPlayingBarProps>(
  (
    {
      className,
      title = 'Midnight Dreams',
      artist = 'The Weekend',
      progress = 60,
      artwork = artworkFallback,
      playing,
      defaultPlaying = true,
      expanded = true,
      showSkipControls = false,
      onTogglePlay,
      onPrev,
      onNext,
      onClose,
      onExpand,
      onSeek,
      ...props
    },
    ref
  ) => {
    const [internalPlaying, setInternalPlaying] = useState(defaultPlaying);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState<number | null>(null);

    const isPlaying = playing !== undefined ? playing : internalPlaying;
    const safeProgress = Math.min(Math.max(progress, 0), 100);
    const activeProgress = isDragging && dragPercent !== null ? dragPercent : safeProgress;

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onTogglePlay) {
        onTogglePlay();
      } else {
        setInternalPlaying((current) => !current);
      }
    };

    const handleCardClick = () => {
      if (!expanded && onExpand) {
        onExpand();
      }
    };

    const handleArtworkClick = (e: React.MouseEvent) => {
      if (expanded && onClose) {
        e.stopPropagation();
        onClose();
      }
    };

    const computePercentFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) return 0;
      const x = e.clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!onSeek) return;
      e.stopPropagation();
      setIsDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const pct = computePercentFromPointer(e);
      setDragPercent(pct);
      onSeek(pct);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !onSeek) return;
      e.stopPropagation();
      const pct = computePercentFromPointer(e);
      setDragPercent(pct);
      onSeek(pct);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.stopPropagation();
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture release ignore
      }
      if (dragPercent !== null && onSeek) {
        onSeek(dragPercent);
      }
      setDragPercent(null);
    };

    return (
      <div
        ref={ref}
        data-slot="now-playing-bar"
        role={expanded ? undefined : 'button'}
        tabIndex={expanded ? undefined : 0}
        aria-label={expanded ? 'Now playing bar' : 'Open music player'}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (!expanded && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onExpand?.();
          }
        }}
        className={cn(
          'now-playing-bar',
          expanded ? 'now-playing-bar--expanded' : 'now-playing-bar--collapsed',
          className
        )}
        {...props}
      >
        {/* ── Hero Shared Artwork (Matched Geometry) ── */}
        <div
          data-slot="now-playing-bar-artwork"
          className="now-playing-artwork"
          onClick={handleArtworkClick}
          title={expanded ? (onClose ? 'Click to collapse player' : undefined) : undefined}
        >
          <img
            src={artwork || artworkFallback}
            alt={title}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none select-none no-save-image"
          />

          {/* Equalizer bars (visible in collapsed state when playing) */}
          <span
            className={cn(
              'music-card__bars',
              'now-playing-bars',
              (!isPlaying || expanded) && 'now-playing-bars--hidden'
            )}
            aria-hidden="true"
          >
            <span className="music-card__bar" />
            <span className="music-card__bar" />
            <span className="music-card__bar" />
          </span>
        </div>

        {/* ── Progressively Revealed Details (Info, Controls, Progress) ── */}
        <div className="now-playing-details">
          <div data-slot="now-playing-bar-info" className="now-playing-info" title={`${title} · ${artist}`}>
            <p>{title}</p>
            <small>{artist}</small>
          </div>

          <div data-slot="now-playing-bar-controls" className="now-playing-controls">
            {showSkipControls && (
              <Button
                variant="bare"
                size="icon"
                aria-label="Previous track"
                className="now-playing-skip"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev?.();
                }}
                tabIndex={expanded ? 0 : -1}
              >
                <SkipBack aria-hidden="true" />
              </Button>
            )}

            <Button
              variant="bare"
              size="icon"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              aria-pressed={isPlaying}
              onClick={handleToggle}
              className="now-playing-toggle"
              tabIndex={expanded ? 0 : -1}
            >
              {isPlaying ? (
                <Pause aria-hidden="true" fill="currentColor" />
              ) : (
                <Play aria-hidden="true" fill="currentColor" />
              )}
            </Button>

            {showSkipControls && (
              <Button
                variant="bare"
                size="icon"
                aria-label="Next track"
                className="now-playing-skip"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                tabIndex={expanded ? 0 : -1}
              >
                <SkipForward aria-hidden="true" />
              </Button>
            )}
          </div>

          <div
            data-slot="now-playing-bar-progress"
            className="now-playing-progress"
            role="progressbar"
            aria-label="Track progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(activeProgress)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            tabIndex={expanded ? 0 : -1}
            title={`Seek: ${Math.round(activeProgress)}%`}
          >
            <div className="now-playing-progress__track">
              <span
                className="now-playing-progress__fill"
                style={{ width: `${activeProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

NowPlayingBar.displayName = 'NowPlayingBar';
