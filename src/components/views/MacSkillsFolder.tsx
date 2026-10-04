import React, { useState, useCallback, useEffect } from 'react';
import {
  PythonLogo,
  TypeScriptLogo,
  JavaScriptLogo,
  JavaLogo,
  SQLLogo,
  ReactLogo,
  FastAPILogo,
  NodeLogo,
  FlutterLogo,
  XGBoostLogo,
  SHAPLogo,
  ScikitLearnLogo,
  OpenCVLogo,
  StreamlitLogo,
  MongoDBLogo,
  SupabaseLogo,
  FirebaseLogo,
  PostmanLogo,
  AmplitudeLogo,
} from '../ui/TechLogos';
import { playSound } from '../../utils/sounds';
import { triggerHaptic } from '../../utils/haptics';

export interface TechSkill {
  id: string;
  name: string;
  role: string;
  color: string;
  Logo: React.FC<{ className?: string }>;
}

export interface SkillFolder {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  accent: string;
  glyphIcon: React.ReactNode;
  skills: TechSkill[];
}

export const SKILL_FOLDERS: SkillFolder[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core Syntaxes',
    tagline: 'Computational syntaxes, type safety & system execution',
    color: '#0284c7', // Sky Blue
    accent: '#38bdf8',
    glyphIcon: (
      // Industry standard Code Syntax Terminal < / >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 7 3 12 8 17" />
        <polyline points="16 7 21 12 16 17" />
        <line x1="13" y1="5" x2="11" y2="19" />
      </svg>
    ),
    skills: [
      { id: 'py', name: 'Python', role: 'Data & Systems', color: '#387EB8', Logo: PythonLogo },
      { id: 'java', name: 'Java', role: 'Enterprise OOP', color: '#E76F00', Logo: JavaLogo },
      { id: 'ts', name: 'TypeScript', role: 'Type-Safe Web', color: '#3178C6', Logo: TypeScriptLogo },
      { id: 'sql', name: 'SQL', role: 'Relational Schemas', color: '#0EA5E9', Logo: SQLLogo },
      { id: 'js', name: 'JavaScript', role: 'Async Runtime', color: '#F7DF1E', Logo: JavaScriptLogo },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & AI',
    subtitle: 'ML Toolchains',
    tagline: 'Predictive modeling, gradient boosting & mathematical explainability',
    color: '#059669', // Emerald
    accent: '#34d399',
    glyphIcon: (
      // Industry standard Neural Network / AI Synapse Nodes
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2.5" fill="currentColor" />
        <circle cx="5" cy="18" r="2.5" fill="currentColor" />
        <circle cx="19" cy="6" r="2.5" fill="currentColor" />
        <circle cx="19" cy="18" r="2.5" fill="currentColor" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <line x1="7" y1="7" x2="17" y2="17" />
        <line x1="7" y1="17" x2="17" y2="7" />
        <line x1="5" y1="8.5" x2="5" y2="15.5" />
        <line x1="19" y1="8.5" x2="19" y2="15.5" />
      </svg>
    ),
    skills: [
      { id: 'xgb', name: 'XGBoost', role: 'Gradient Boosting', color: '#10B981', Logo: XGBoostLogo },
      { id: 'shap', name: 'SHAP', role: 'XAI Attribution', color: '#F43F5E', Logo: SHAPLogo },
      { id: 'sklearn', name: 'Scikit-Learn', role: 'ML Pipelines', color: '#F97316', Logo: ScikitLearnLogo },
      { id: 'cv', name: 'OpenCV', role: 'Computer Vision', color: '#3B82F6', Logo: OpenCVLogo },
      { id: 'streamlit', name: 'Streamlit', role: 'Interactive ML UI', color: '#FF4B4B', Logo: StreamlitLogo },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    subtitle: 'App Frameworks',
    tagline: 'Reactive component engines, async microservices & native UI',
    color: '#6366f1', // Indigo
    accent: '#818cf8',
    glyphIcon: (
      // Industry standard Architecture Stack / Component Layers
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    skills: [
      { id: 'react', name: 'React', role: 'Component Engine', color: '#00D8FF', Logo: ReactLogo },
      { id: 'fastapi', name: 'FastAPI', role: 'Async Microservices', color: '#059669', Logo: FastAPILogo },
      { id: 'node', name: 'Node.js', role: 'Server Runtime', color: '#539E43', Logo: NodeLogo },
      { id: 'flutter', name: 'Flutter', role: 'Cross-Platform Native', color: '#42A5F5', Logo: FlutterLogo },
    ],
  },
  {
    id: 'databases-tools',
    title: 'Tools & Data',
    subtitle: 'Toolchains & Cloud',
    tagline: 'Document datastores, reactive backends, Git CI/CD & API tooling',
    color: '#d97706', // Amber/Orange
    accent: '#fbbf24',
    glyphIcon: (
      // Industry standard Database Server Disk Stack
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M21 12v7c0 1.66-4 3-9 3s-9-1.34-9-3v-7" />
      </svg>
    ),
    skills: [
      { id: 'firebase', name: 'Firebase', role: 'Realtime Cloud', color: '#FFA000', Logo: FirebaseLogo },
      { id: 'supabase', name: 'Supabase', role: 'Postgres BaaS', color: '#3ECF8E', Logo: SupabaseLogo },
      { id: 'mongo', name: 'MongoDB', role: 'Document DB', color: '#00ED64', Logo: MongoDBLogo },
      { id: 'amplitude', name: 'Amplitude', role: 'Product Analytics', color: '#1E88E5', Logo: AmplitudeLogo },
      { id: 'postman', name: 'Postman', role: 'API Testing', color: '#FF6C37', Logo: PostmanLogo },
    ],
  },
];

export const MacSkillsFolder: React.FC = () => {
  // Unselected by default so the user chooses any folder in any order
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  // Selected skill id to view project references
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const activeFolderIndex = SKILL_FOLDERS.findIndex((f) => f.id === activeFolderId);
  const activeFolder = activeFolderIndex !== -1 ? SKILL_FOLDERS[activeFolderIndex] : null;

  const handleSelectFolder = useCallback(
    (folderId: string) => {
      playSound('toggle');
      triggerHaptic('selection');
      setActiveFolderId((current) => {
        if (current === folderId) {
          setSelectedSkillId(null);
          return null;
        }
        setSelectedSkillId(null);
        return folderId;
      });
    },
    []
  );

  const handleToggleSkill = (skillId: string) => {
    playSound('click');
    triggerHaptic('light');
    setSelectedSkillId((curr) => (curr === skillId ? null : skillId));
  };

  // Keyboard navigation: 1, 2, 3, 4 to open folders, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '1') handleSelectFolder('languages');
      if (e.key === '2') handleSelectFolder('machine-learning');
      if (e.key === '3') handleSelectFolder('frameworks');
      if (e.key === '4') handleSelectFolder('databases-tools');
      if (e.key === 'Escape') {
        setActiveFolderId(null);
        setSelectedSkillId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectFolder]);


  return (
    <div className="relative w-full select-none py-1">
      {/* ── Top Row: 4 macOS Folders (Clean, borderless) ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {SKILL_FOLDERS.map((folder) => {
          const isActive = activeFolderId === folder.id;
          const previewSkills = folder.skills.slice(0, 3);

          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => handleSelectFolder(folder.id)}
              className="group relative flex flex-col items-center p-2 text-center transition-all duration-300 outline-none"
            >
              {/* macOS Folder Graphic */}
              <div className="relative mb-3 flex items-center justify-center pt-5">
                <div
                  className={`mac-folder transition-all duration-300 ${isActive ? 'mac-folder--open scale-[1.04]' : 'group-hover:-translate-y-1.5'
                    }`}
                  style={
                    {
                      '--folder-tint': folder.color,
                      '--folder-accent': folder.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Folder Back Tab */}
                  <div className="mac-folder__back">
                    <span className="mac-folder__tab" />
                    <span className="mac-folder__inner-glow" />
                  </div>

                  {/* 3 Sneak-Peek Logos Inside Pocket - High visibility fanning */}
                  {!isActive && (
                    <div className="mac-folder__peeking-container">
                      {previewSkills.map((item, idx) => {
                        const ItemLogo = item.Logo;
                        return (
                          <div
                            key={item.id}
                            className={`mac-folder__peek-card mac-folder__peek-card--${idx + 1}`}
                            style={{
                              background: `radial-gradient(circle at 35% 30%, ${item.color}35, rgba(255, 255, 255, 0.05))`,
                            }}
                          >
                            <ItemLogo className="h-4 w-4 drop-shadow-sm" />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Folder Front Flap */}
                  <div className="mac-folder__front">
                    <div className="mac-folder__rim" />
                    {/* Native macOS debossed/embossed stamp engraving */}
                    <div className="mac-folder__glyph-container">
                      {folder.glyphIcon}
                    </div>
                    <div className="mac-folder__dots">
                      <span className="mac-folder__dot" />
                      <span className="mac-folder__dot" />
                      <span className="mac-folder__dot" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title Label */}
              <div className="flex flex-col items-center">
                <h4
                  className={`font-sans text-xs font-semibold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}
                >
                  {folder.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Popped Out Horizontal App Icons Area (Emerging below folder) ── */}
      <div className="mt-7 min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300">
        {activeFolder ? (
          <div className="flex flex-col items-center">
            {/* Folder Header Breadcrumb */}
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeFolder.accent }}
              />
              {/* <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                {activeFolder.title}
              </span>
              <span className="text-white/30">·</span>
              <span className="font-mono text-[0.68rem] text-white/45">
                {activeFolder.tagline}
              </span> */}
            </div>

            {/* Horizontal Line of macOS App Icons with Smooth Emerge Animation */}
            <div className="flex w-full flex-wrap items-center justify-center gap-6 sm:gap-9 py-2">
              {activeFolder.skills.map((skill, sIdx) => {
                const SkillLogo = skill.Logo;
                const isSelected = selectedSkillId === skill.id;

                return (
                  <div
                    key={skill.id}
                    className="mac-app-emerge-item flex flex-col items-center text-center group cursor-pointer"
                    style={{
                      animationDelay: `${sIdx * 50}ms`,
                    }}
                    onClick={() => handleToggleSkill(skill.id)}
                  >
                    {/* macOS App Icon Squircle */}
                    <div
                      className={`mac-app-icon-squircle flex h-14 w-14 sm:h-16 sm:w-16 flex-none items-center justify-center transition-all ${isSelected
                          ? 'ring-2 ring-white/60 scale-105 shadow-[0_14px_28px_rgba(0,0,0,0.8)]'
                          : ''
                        }`}
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${skill.color}35, rgba(255, 255, 255, 0.04))`,
                      }}
                    >
                      <SkillLogo className="h-7 w-7 sm:h-8 sm:w-8 drop-shadow-md transition-transform duration-200 group-hover:scale-110" />
                    </div>

                    {/* App Title */}
                    <span className="mt-2.5 font-sans text-xs font-semibold tracking-tight text-white transition-colors group-hover:text-clay-soft">
                      {skill.name}
                    </span>

                    {/* App Role Subline */}
                    <span className="mt-0.5 font-mono text-[0.62rem] text-white/45 transition-colors group-hover:text-white/75">
                      {skill.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Subtle, minimal prompt matching home screen typography */
          <div className="flex h-16 items-center justify-center text-center">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/35">
              Click a folder to explore, or press 1-4
            </p>
          </div>
        )}
      </div>
    </div>
  );
};