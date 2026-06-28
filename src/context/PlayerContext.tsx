import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  src: string;
  colour: string;
  wip?: boolean;
}

export const TRACKS: Track[] = [
  {
    id: 'midnight-geometry',
    title: 'Midnight Geometry',
    artist: 'Angat Shah',
    artwork: '/audio/midnight-geometry-artwork.jpg',
    src: '/audio/midnight-geometry.mp3',
    colour: '#181A20',
    wip: false,
  },
];

interface PlayerContextType {
  tracks: Track[];
  currentTrack: Track;
  trackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  expanded: boolean;
  togglePlay: () => void;
  startPlaying: () => void;
  stopPlaying: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  setExpanded: (v: boolean) => void;
  formatTime: (seconds: number) => string;
  seek: (seconds: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const currentTrack = TRACKS[trackIndex] || TRACKS[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Playback prevented:', err));
      }
    }
  }, [isPlaying]);

  const selectTrack = useCallback((index: number) => {
    const validIdx = (index + TRACKS.length) % TRACKS.length;
    setTrackIndex(validIdx);
    setCurrentTime(0);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = TRACKS[validIdx].src;
      audio.load();
      if (isPlaying) {
        audio.play().catch((err) => {
          if (err?.name !== 'AbortError') console.warn('Play error:', err);
        });
      }
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    selectTrack(trackIndex + 1);
  }, [trackIndex, selectTrack]);

  const prevTrack = useCallback(() => {
    selectTrack(trackIndex - 1);
  }, [trackIndex, selectTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.src) {
      audio.src = currentTrack.src;
      audio.load();
    }

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((e) => {
          if (e?.name !== 'AbortError') console.warn(e);
        });
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrack.src]);

  const startPlaying = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src || !audio.src.includes(currentTrack.src)) {
      audio.src = currentTrack.src;
    }
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Playback prevented:', err));
    }
  }, [currentTrack.src]);

  const stopPlaying = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        tracks: TRACKS,
        currentTrack,
        trackIndex,
        isPlaying,
        currentTime,
        duration,
        expanded,
        togglePlay,
        startPlaying,
        stopPlaying,
        nextTrack,
        prevTrack,
        selectTrack,
        setExpanded,
        formatTime,
        seek,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentTrack.src} preload="none" loop />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
