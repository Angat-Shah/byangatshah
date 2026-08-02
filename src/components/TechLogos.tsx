import React from 'react';

interface LogoProps {
  className?: string;
}

export const PythonLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path
      fill="url(#py-blue)"
      d="M63.5 12c-27.4 0-25.7 11.9-25.7 11.9l.03 12.3h26.2v3.7H27.3S12 38.1 12 65.6c0 27.5 13.4 26.6 13.4 26.6h8v-11.2s-.4-13.4 13.1-13.4h22.6s12.5.2 12.5-12.2V24.1s1.9-12.1-18.1-12.1zm-14.3 7.8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"
    />
    <path
      fill="url(#py-yellow)"
      d="M64.5 116c27.4 0 25.7-11.9 25.7-11.9l-.03-12.3H63.9v-3.7h36.8s15.3 1.8 15.3-25.7c0-27.5-13.4-26.6-13.4-26.6h-8v11.2s.4 13.4-13.1 13.4H48.9s-12.5-.2-12.5 12.2v31.4s-1.9 12.1 18.1 12.1zm14.3-7.8a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
    />
    <defs>
      <linearGradient id="py-blue" x1="12" y1="12" x2="88" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#387EB8" />
        <stop offset="1" stopColor="#366994" />
      </linearGradient>
      <linearGradient id="py-yellow" x1="40" y1="40" x2="116" y2="116" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE873" />
        <stop offset="1" stopColor="#FFD43B" />
      </linearGradient>
    </defs>
  </svg>
);

export const TypeScriptLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <rect width="128" height="128" rx="24" fill="#3178C6" />
    <path
      fill="#FFFFFF"
      d="M58.5 73.8v7.9c-2.8 1.4-6.4 2.2-10.7 2.2-5.7 0-9.9-1.4-12.5-4.2-2.6-2.8-3.9-7-3.9-12.7 0-5.8 1.4-10.1 4.1-13 2.7-2.9 7-4.4 12.9-4.4 3.9 0 7.2.7 9.8 2.1v8c-2.6-1.6-5.7-2.4-9.3-2.4-3.5 0-6.1.8-7.7 2.5-1.6 1.7-2.4 4.3-2.4 7.8s.8 6.1 2.3 7.7c1.5 1.6 4.1 2.4 7.6 2.4 3.7 0 6.9-.6 9.8-1.9zm17.9-24.1h25.4v7.7H89v26.1H78.8V57.4H66.1v-7.7h10.3z"
    />
  </svg>
);

export const JavaScriptLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <rect width="128" height="128" rx="24" fill="#F7DF1E" />
    <path
      fill="#000000"
      d="M33 93.3v-4.8c1.8 1.2 3.8 2.1 6 2.7 2.2.6 4.2.9 6.1.9 3.5 0 6.2-.8 8.1-2.4 1.9-1.6 2.8-3.9 2.8-7v-35h9.4v35.3c0 5.4-1.8 9.5-5.3 12.2-3.5 2.7-8.5 4.1-15 4.1-3.6 0-7-.5-10.1-1.6-1.2-.4-2-.9-2-1.4zm44.2-.8c2.4 1.4 5.3 2.4 8.7 3.2 3.4.8 6.7 1.1 9.9 1.1 5.4 0 9.5-1.1 12.3-3.4 2.8-2.3 4.2-5.4 4.2-9.4 0-2.8-.7-5.1-2.1-7-1.4-1.9-3.7-3.6-6.9-5.1-3.2-1.5-6.1-2.9-8.7-4.2-2.6-1.3-4.6-2.7-5.9-4.1-1.3-1.4-2-3.2-2-5.4 0-2.6 1-4.7 3-6.2 2-1.5 4.8-2.3 8.4-2.3 2.7 0 5.2.4 7.5 1.1 2.3.7 4.3 1.7 6.1 3v5.1c-2-1.2-4.2-2.1-6.6-2.7-2.4-.6-4.7-.9-7-.9-3.2 0-5.8.7-7.7 2-1.9 1.3-2.9 3.2-2.9 5.7 0 2.2.7 4.1 2.1 5.6 1.4 1.5 3.7 3 6.9 4.4 3.2 1.4 6.2 2.8 9 4.2 2.8 1.4 4.9 3 6.4 4.8 1.5 1.8 2.2 4.1 2.2 6.9 0 4.1-1.5 7.4-4.5 9.9-3 2.5-7.4 3.8-13.2 3.8-4 0-7.8-.5-11.4-1.6-3.6-1.1-6.1-2.5-6.9-3.2v-5.5z"
    />
  </svg>
);

import {
  Java as DeviconJava,
  GitIcon as DeviconGit,
  PostmanIcon as DeviconPostman,
  AmplitudeIcon as DeviconAmplitude,
  GithubActions as DeviconGithubActions,
} from '@dev.icons/react';

export const JavaLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <DeviconJava size="100%" />
  </div>
);


export const SQLLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <ellipse cx="64" cy="30" rx="46" ry="18" fill="url(#sql-blue)" />
    <path
      d="M18 30v34c0 9.9 20.6 18 46 18s46-8.1 46-18V30"
      stroke="url(#sql-cyan)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M18 64v34c0 9.9 20.6 18 46 18s46-8.1 46-18V64"
      stroke="url(#sql-cyan)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <ellipse cx="64" cy="30" rx="46" ry="18" stroke="#38BDF8" strokeWidth="5" />
    <defs>
      <linearGradient id="sql-blue" x1="18" y1="12" x2="110" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="sql-cyan" x1="18" y1="30" x2="110" y2="116" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
  </svg>
);

export const ReactLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <ellipse cx="64" cy="64" rx="14" fill="#00D8FF" />
    <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#00D8FF" strokeWidth="5.5" />
    <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#00D8FF" strokeWidth="5.5" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="54" ry="20" stroke="#00D8FF" strokeWidth="5.5" transform="rotate(120 64 64)" />
  </svg>
);

export const FastAPILogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="58" fill="#059669" />
    <path fill="#FFFFFF" d="M68 22L36 72h26L54 106l42-56H68l12-28z" />
  </svg>
);

export const NodeLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path
      fill="#539E43"
      d="M64 12L18 38.5v51L64 116l46-26.5v-51L64 12zm0 14.8l33.6 19.4v38.8L64 104.4 30.4 85V46.2L64 26.8z"
    />
    <path fill="#FFFFFF" d="M64 42l20 11.5v23L64 88l-20-11.5v-23L64 42z" />
  </svg>
);

export const FlutterLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path fill="#42A5F5" d="M22 68l42-42h32L46 76l-24-8z" />
    <path fill="#02569B" d="M64 114l32-32H64l-16 16 16 16z" />
    <path fill="#0175C2" d="M96 50L64 82h32l16-16-16-16z" />
  </svg>
);

export const XGBoostLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#0F172A" />
    <path d="M24 36l40-20 40 20v56l-40 20-40-20V36z" stroke="#10B981" strokeWidth="6" fill="#064E3B" />
    <path d="M64 16v100M24 64h80M38 42l52 52M90 42L38 94" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const SHAPLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#18181B" />
    <rect x="22" y="32" width="48" height="14" rx="4" fill="#F43F5E" />
    <rect x="22" y="52" width="76" height="14" rx="4" fill="#6366F1" />
    <rect x="22" y="72" width="34" height="14" rx="4" fill="#F43F5E" />
    <rect x="22" y="92" width="58" height="14" rx="4" fill="#6366F1" />
    <circle cx="98" cy="39" r="6" fill="#FB7185" />
    <circle cx="80" cy="79" r="6" fill="#FB7185" />
  </svg>
);

export const ScikitLearnLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#0A0E17" />
    <circle cx="50" cy="54" r="28" fill="#F97316" />
    <circle cx="78" cy="74" r="28" fill="#0284C7" />
    <path
      d="M50 54a28 28 0 0 0 28 28 28 28 0 0 0-28-28z"
      fill="#FB923C"
      opacity="0.8"
    />
  </svg>
);

export const OpenCVLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <circle cx="64" cy="42" r="22" stroke="#EF4444" strokeWidth="10" />
    <circle cx="42" cy="84" r="22" stroke="#3B82F6" strokeWidth="10" />
    <circle cx="86" cy="84" r="22" stroke="#10B981" strokeWidth="10" />
  </svg>
);

export const StreamlitLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path
      d="M64 24L18 96h92L64 24zm-14 36l14-22 14 22H50z"
      fill="#FF4B4B"
    />
    <polygon points="64,48 44,82 84,82" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

export const MongoDBLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path
      fill="#00ED64"
      d="M64 12c-4 28-28 42-28 66 0 18 13 32 28 38 15-6 28-20 28-38 0-24-24-38-28-66z"
    />
    <path
      fill="#00684A"
      d="M64 12v104c15-6 28-20 28-38 0-24-24-38-28-66z"
    />
    <path fill="#A6E3B8" d="M63 116h2V12h-2v104z" />
  </svg>
);

export const SupabaseLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path
      d="M72 16L24 74h40L48 116l56-62H64l16-38z"
      fill="url(#supa-grad)"
    />
    <defs>
      <linearGradient id="supa-grad" x1="24" y1="16" x2="104" y2="116" gradientUnits="userSpaceOnUse">
        <stop stopColor="#24E49F" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
    </defs>
  </svg>
);

export const FirebaseLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path fill="#FFA000" d="M22 92L44 26l18 34L22 92z" />
    <path fill="#F57C00" d="M78 44L62 20 22 92l56-48z" />
    <path fill="#FFCA28" d="M106 92L90 42 22 92l42 24 42-24z" />
  </svg>
);

export const GitLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <DeviconGit size="100%" />
  </div>
);

export const GitHubActionsLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <DeviconGithubActions size="100%" />
  </div>
);

export const PostmanLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <DeviconPostman size="100%" />
  </div>
);

export const AmplitudeLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <DeviconAmplitude size="100%" />
  </div>
);



