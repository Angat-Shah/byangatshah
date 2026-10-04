import React, { useRef, useEffect, useCallback } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { NowPlayingBar } from '../ui/now-playing-bar';
import { playSound } from '../../utils/sounds';

export const MusicCard: React.FC = () => {
  const {
    tracks,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    expanded,
    togglePlay,
    nextTrack,
    prevTrack,
    setExpanded,
    seek,
  } = usePlayer();

  const panelRef = useRef<HTMLDivElement>(null);

  const handleExpand = useCallback(() => {
    playSound('click');
    setExpanded(true);
  }, [setExpanded]);

  const handleClose = useCallback(() => {
    playSound('toggle');
    setExpanded(false);
  }, [setExpanded]);

  // Close when clicking outside the expanded player
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (expanded && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [expanded, handleClose]
  );

  useEffect(() => {
    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded, handleClickOutside]);

  // Support closing via Escape key
  useEffect(() => {
    if (!expanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expanded, handleClose]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={panelRef}
      className={`music-card-wrapper ${expanded ? 'music-card-wrapper--expanded' : ''}`}
    >
      {/* ── Continuous Shared-Element / Matched-Geometry Music Card & Audio Player ── */}
      <NowPlayingBar
        title={currentTrack.title}
        artist={currentTrack.artist}
        artwork={currentTrack.artwork}
        playing={isPlaying}
        progress={progressPercent}
        expanded={expanded}
        showSkipControls={tracks.length > 1}
        onExpand={handleExpand}
        onTogglePlay={togglePlay}
        onPrev={prevTrack}
        onNext={nextTrack}
        onClose={handleClose}
        onSeek={(pct) => seek((pct / 100) * (duration || 0))}
      />
    </div>
  );
};
