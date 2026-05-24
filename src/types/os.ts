import React from 'react';

export type AppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'community'
  | 'contact'
  | 'resume'
  | 'research'
  | 'notesncode'
  | 'skills'
  | 'gallery'
  | 'eikone'
  | 'project-detail';

export interface WindowState {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  maximized: boolean;
  minimized: boolean;
}

export interface AppDefinition {
  id: AppId;
  label: string;
  glyph?: React.ReactNode;
  gradient?: string;
  iconSrc?: string;
  size: { w: number; h: number };
  content: React.ReactNode;
  comingSoon?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  iconSrc?: string;
  glyph?: React.ReactNode;
  gradient?: string;
}
