import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  type MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type GameItem, GAMES_DATA } from '../../data/gamesData';
import { SquiggleDivider } from '../ui/SquiggleDivider';
import { Eyebrow } from '../ui/UIElements';
import { AllTimeFavoriteCard } from './AllTimeFavoriteCard';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  if (range === 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}

const POSITION_SPRING = {
  mass: 0.24,
  stiffness: 110,
  damping: 24,
};

const VELOCITY_SPRING = {
  mass: 0.16,
  stiffness: 85,
  damping: 30,
};

interface GameScrollerProps {
  games: GameItem[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
}

function GameScroller({
  games,
  cardWidth = 114,
  cardHeight = 162,
  gap = 20,
}: GameScrollerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartValueRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredGame, setHoveredGame] = useState<GameItem | null>(null);

  const targetX = useMotionValue(0);
  const x = useSpring(targetX, POSITION_SPRING);

  const safeGames = useMemo(() => (games.length ? games : GAMES_DATA), [games]);
  const itemStep = cardWidth + gap;
  const loopWidth = safeGames.length * itemStep;

  const loopX = useTransform(x, (latest) => wrap(-loopWidth, 0, latest));
  const velocity = useVelocity(x);
  const smoothVelocity = useSpring(velocity, VELOCITY_SPRING);

  const bend = useTransform(smoothVelocity, (latest) => clamp(latest / 70, -75, 75));

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const updateSize = () => setContainerWidth(node.clientWidth);
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Subtle auto-scroll when not dragging or hovering
  useAnimationFrame((_, delta) => {
    if (isDraggingRef.current || isHovered) return;
    const autoSpeed = 18; // px per second
    targetX.set(targetX.get() - autoSpeed * (delta / 1000));
  });

  // Wheel handling
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const handleWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      targetX.set(targetX.get() - delta * 1.1);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, [targetX]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartValueRef.current = targetX.get();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const distance = event.clientX - dragStartXRef.current;
      if (Math.abs(distance) > 4) {
        hasDraggedRef.current = true;
      }
      targetX.set(dragStartValueRef.current + distance * 1.15);
      return;
    }

    // Check if cursor is over any game card or empty gap/background
    const target = event.target as HTMLElement | null;
    const cardEl = target?.closest('article[aria-label]');
    if (!cardEl) {
      setHoveredGame(null);
    }
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignored
    }
  };

  const stepScroll = (direction: 'left' | 'right') => {
    const delta = (cardWidth + gap) * 2.5;
    targetX.set(targetX.get() + (direction === 'left' ? delta : -delta));
  };

  return (
    <div className="relative w-full select-none">
      {/* Main Scroller Stage */}
      <div
        ref={rootRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredGame(null);
        }}
        className={`relative flex h-[208px] w-full items-center overflow-hidden bg-black/25 px-2 backdrop-blur-sm ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: 1300 }}
      >
        {/* Left Progressive Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-gradient-to-r from-[#121316] via-[#121316]/70 to-transparent" />

        {/* Sliced Motion Ribbon (Rendered across 3 infinite loops) */}
        <motion.div
          style={{
            x: loopX,
            display: 'flex',
            alignItems: 'center',
            gap,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {[0, 1, 2].map((copyIndex) =>
            safeGames.map((game, index) => {
              const absoluteIndex = copyIndex * safeGames.length + index;
              return (
                <GamePosterCard
                  key={`${copyIndex}-${game.id}`}
                  game={game}
                  absoluteIndex={absoluteIndex}
                  loopX={loopX}
                  bend={bend}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  itemStep={itemStep}
                  containerWidth={containerWidth}
                  isHoveredCard={hoveredGame?.id === game.id}
                  onHover={() => setHoveredGame(game)}
                />
              );
            }),
          )}
        </motion.div>

        {/* Right Progressive Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-gradient-to-l from-[#121316] via-[#121316]/70 to-transparent" />
      </div>

      {/* Controls Bar below carousel: Game Title on Hover & Step Buttons */}
      <div className="mt-5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          <span className="font-mono text-[0.72rem] tracking-wide text-white/70">
            {hoveredGame ? (
              <span className="text-white font-medium drop-shadow-sm">{hoveredGame.title}</span>
            ) : (
              <span className="text-white/40">Drag or swipe to browse collection</span>
            )}
          </span>
        </div>

        {/* Step buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => stepScroll('left')}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95"
            aria-label="Previous games"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => stepScroll('right')}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95"
            aria-label="Next games"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface GamePosterCardProps {
  game: GameItem;
  absoluteIndex: number;
  loopX: MotionValue<number>;
  bend: MotionValue<number>;
  cardWidth: number;
  cardHeight: number;
  itemStep: number;
  containerWidth: number;
  isHoveredCard: boolean;
  onHover: () => void;
}

function GamePosterCard({
  game,
  absoluteIndex,
  loopX,
  bend,
  cardWidth,
  cardHeight,
  itemStep,
  containerWidth,
  isHoveredCard,
  onHover,
}: GamePosterCardProps) {
  const cardCenter = useTransform(loopX, (latestX) => latestX + absoluteIndex * itemStep + cardWidth / 2);

  const rotateY = useTransform(cardCenter, (center) => {
    if (!containerWidth) return 0;
    const viewportCenter = containerWidth / 2;
    const distance = (center - viewportCenter) / viewportCenter;
    return clamp(distance * -45, -55, 55);
  });

  const scale = useTransform(cardCenter, (center) => {
    if (!containerWidth) return 1;
    const viewportCenter = containerWidth / 2;
    const distance = Math.abs(center - viewportCenter) / viewportCenter;
    return clamp(1 - distance * 0.12, 0.86, 1);
  });

  const opacity = useTransform(cardCenter, (center) => {
    if (!containerWidth) return 1;
    const viewportCenter = containerWidth / 2;
    const distance = Math.abs(center - viewportCenter) / viewportCenter;
    return clamp(1 - distance * 0.35, 0.55, 1);
  });

  const y = useTransform(cardCenter, (center) => {
    if (!containerWidth) return 0;
    const viewportCenter = containerWidth / 2;
    const distance = Math.abs(center - viewportCenter) / viewportCenter;
    return clamp(distance * 18, 0, 26);
  });

  const rotateZ = useTransform(bend, (latest) => latest * 0.05);

  return (
    <motion.article
      aria-label={game.title}
      onPointerEnter={onHover}
      onPointerOver={onHover}
      onPointerMove={onHover}
      style={{
        width: cardWidth,
        height: cardHeight,
        flex: '0 0 auto',
        y,
        opacity,
        zIndex: isHoveredCard ? 30 : 1,
      }}
      className="group relative select-none cursor-pointer"
    >
      {/* 3D Transform Layer (Isolated from hit testing to ensure 100% solid, full-corner 2D hit area) */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateY,
          rotateZ,
          scale,
          transformPerspective: 1200,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="pointer-events-none h-full w-full"
      >
        {/* Solid Continuous Poster Surface (Zero Cuts or Slices) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 8,
            boxShadow: '0 10px 28px -6px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
          className="relative bg-zinc-900 transition-all duration-300 group-hover:ring-2 group-hover:ring-white/40"
        >
          <img
            src={game.cover}
            alt={game.title}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />

          {/* Plastic Case Sheen overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.12]" />
        </div>
      </motion.div>
    </motion.article>
  );
}

export const GamingArchive: React.FC = () => {
  return (
    <section className="mt-4 sm:mt-14">
      {/* Hand-drawn organic squiggle line breaker */}
      <SquiggleDivider className="mb-3 opacity-100" />

      {/* Eyebrow & Main Section Header */}
      <div className="flex flex-col">
        <Eyebrow>THE OTHER NAME I ANSWER TO</Eyebrow>
        <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
          SPIDER
        </h1>

        {/* The Two Bio Intro Paragraphs (Verbatim, cleanly formatted) */}
        <div className="mt-5 space-y-4 text-[0.95rem] leading-[1.65] text-white/70">
          <p>
            There is another name people know me by. Spider. It started as a gaming tag, but after enough years, enough games, and enough people attached to it, it became more than a username. It is the name my friends and teammates look for when a match starts.
          </p>
          <p>
            I have played a lot of games over the years, but the part that stayed with me was never just the games themselves. It was the competition, the people, the small improvements, the ridiculous wins, the frustrating losses, and that feeling of wanting to be better the next time I played.
          </p>
        </div>
      </div>

      {/* Label for Carousel */}
      <div className="mt-8 mb-2.5 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">
          GAMES THAT STUCK WITH ME
        </span>
        <span className="rounded bg-clay/10 font-mono text-xs font-semibold text-clay-soft">
          {GAMES_DATA.length}
        </span>
      </div>

      {/* Sliced 3D Scroller (Clean, borderless cards, accurate hover) */}
      <div>
        <GameScroller games={GAMES_DATA} />
      </div>

      {/* Label for Gaming Profile Card */}
      <div className="mt-7 mb-3.5 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">
          THE ONE I KEEP COMING BACK TO
        </span>
      </div>

      {/* Reusable All-Time Favorite BGMI Player Profile Card */}
      <div className="mt-2 w-full">
        <AllTimeFavoriteCard />
      </div>
    </section>
  );
};
