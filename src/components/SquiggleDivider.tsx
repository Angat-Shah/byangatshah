import React from 'react';

export const SquiggleDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full my-6 py-2 overflow-hidden select-none pointer-events-none flex justify-center ${className}`}>
      <svg
        className="w-full max-w-3xl h-6"
        viewBox="0 0 700 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,12 Q 15,-1 30,12 T 60,12 T 90,12 T 120,12 C 145,12 165,12 700,12"
          stroke="url(#squiggle-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="squiggle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#c73e1d" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#5c1b2b" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#140b22" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0a0812" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};