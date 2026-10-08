import React from 'react';
import {
  ContentContainer,
  Eyebrow,
  CardBox,
  PointTimeline,
  ActionButton,
  KeyValueField,
} from '../ui/UIElements';

export interface ProjectProfile {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  domain: string;
  tech: string[];
  bannerImage: string;
  repoUrl: string;
  demoUrl?: string;
  role: string;
  timeline: string;
  status: string;
  executiveSummary: string;
  computationalChallenge: string;
  coreCapabilities: string[];
  metrics?: { label: string; value: string }[];
}

export const PROJECTS_PROFILES: Record<string, ProjectProfile> = {
  atheno: {
    id: 'atheno',
    name: 'Atheno',
    badge: 'AI Automotive Intelligence',
    tagline: 'Data-driven car selection and resale valuation with explainable machine learning.',
    domain: 'AI & Applied Machine Learning',
    tech: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'XGBoost',
      'SHAP',
      'PostgreSQL',
    ],
    bannerImage: '/logos/atheno.png',
    repoUrl: 'https://github.com/Angat-Shah/ATHENO',
    role: 'ML & Full-Stack Engineer',
    timeline: '2026',
    status: 'In Development',
    executiveSummary:
      'Atheno is an AI-powered automotive intelligence platform that combines personalized car recommendation with data-driven resale valuation. It combines hard constraints, preference-weighted decision scoring, content-based similarity, and machine-learning regression with SHAP-based explanations to help users understand not only which car fits them, but why a vehicle is worth its predicted value.',
    computationalChallenge:
      'The central challenge is turning heterogeneous automotive data and subjective buyer priorities into decisions that remain both useful and explainable. Atheno separates deterministic eligibility rules from weighted recommendation logic and learned similarity, while its resale engine compares regression approaches before using XGBoost as the primary model, with feature-level SHAP explanations and documented data augmentation to expose the factors influencing each valuation.',
    coreCapabilities: [
      'Ranks suitable vehicles through hard constraints, weighted preferences, and content-based similarity.',
      'Predicts resale value using engineered vehicle attributes and XGBoost regression.',
      'Compares baseline and ensemble models while exposing valuation drivers through SHAP.',
      'Combines structured automotive data with documented regional and market-oriented augmentation.',
    ],
  },

  'qrng': {
    id: 'qrng',
    name: 'QRNG',
    badge: 'Quantum Randomness & Validation',
    tagline: 'Single-qubit quantum measurements evaluated through reproducible statistical tests of randomness.',
    domain: 'Quantum Computing & Statistical Analysis',
    tech: ['Python', 'Qiskit', 'Qiskit Aer', 'NumPy', 'SciPy', 'Streamlit'],
    bannerImage: '/logos/qrng.png',
    repoUrl: 'https://github.com/Angat-Shah/QRNG',
    role: 'Research Engineer',
    timeline: '2025',
    status: 'Completed Study',
    executiveSummary:
      'QRNG implements a single-qubit quantum random-bit pipeline using Qiskit Aer, then evaluates generated bitstreams against a classical PRNG baseline using statistical tests. The project combines quantum-circuit simulation, reproducible data generation, hypothesis testing, and interactive visualization while explicitly separating simulated randomness from physical quantum entropy.',
    computationalChallenge:
      'The non-trivial challenge was preserving meaningful sequential measurement semantics while evaluating whether simulated quantum bitstreams exhibit expected statistical properties. The implementation therefore uses one-shot measurements with fresh single-qubit circuits, stores reproducible quantum and classical datasets, and applies independent statistical checks for frequency, entropy, distributional fit, and serial correlation while explicitly accounting for the limitations of classical quantum simulation.',
    coreCapabilities: [
      'Implemented fresh-circuit, single-shot Hadamard measurements through Qiskit Aer.',
      'Built a comparative pipeline for 10,000-bit quantum and classical datasets.',
      'Implemented entropy, frequency, χ², autocorrelation, and runs-test analysis.',
      'Added automated verification, reproducible artifacts, and Streamlit statistical telemetry.',
    ],
  },

  kavach: {
    id: 'kavach',
    name: 'Kavach',
    badge: 'Citizen Safety & Incident Response',
    tagline: 'Incident reporting and emergency response coordinated through mobile, geospatial, and cloud workflows.',
    domain: 'GovTech & Mobile Systems',
    tech: ['Dart', 'Flutter', 'Firebase', 'Google Maps', 'Dialogflow', 'OpenRouter'],
    bannerImage: '/logos/kavach.png',
    repoUrl: 'https://github.com/Angat-Shah/KAVACH',
    role: 'Team Lead & Core Developer',
    timeline: '2025',
    status: 'Completed Prototype',
    executiveSummary:
      'Kavach is a Flutter-based citizen safety application for incident reporting, evidence capture, emergency assistance, and geospatial situational awareness. Built as a hackathon prototype, it integrates Firebase-backed authentication and data services, Google Maps and device location, AI-assisted chat services, and dedicated administrative workflows for managing reports and incidents.',
    computationalChallenge:
      'The main challenge was integrating many safety-critical interaction flows within a short hackathon window without fragmenting the mobile architecture. The team split functionality across reporting, authentication, location/maps, media capture, AI services, and administrative views, while the application centralized these workflows through Firebase-backed services and reusable Flutter screens.',
    coreCapabilities: [
      'Structured the Flutter application across feature screens, services, and admin workflows.',
      'Integrated Firebase authentication, storage/data services, and location-aware application flows.',
      'Implemented incident reporting, media capture, geospatial maps, and live-report interfaces.',
      'Integrated Dialogflow/OpenRouter services for the SafetyBuddy conversational workflow.',
    ],
  },

  ciphera: {
    id: 'ciphera',
    name: 'Ciphera',
    badge: 'AI-Assisted Secure Code Analysis',
    tagline: 'Real-time vulnerability scanning and remediation assistance directly inside VS Code.',
    domain: 'Application Security & DevSecOps',
    tech: ['TypeScript', 'VS Code API', 'Python', 'Bandit', 'Semgrep', 'OpenRouter'],
    bannerImage: '/logos/ciphera.png',
    repoUrl: 'https://github.com/Angat-Shah/Ciphera',
    role: 'Security Engineer',
    timeline: '2025',
    status: 'Completed Prototype',
    executiveSummary:
      'Ciphera is a VS Code security extension that performs real-time vulnerability scanning across Python, JavaScript, and TypeScript using Bandit, pattern-based checks, optional Semgrep, and dependency analysis. It also provides LLM-assisted fix suggestions, exposing findings and remediation guidance directly within the developer workflow.',
    computationalChallenge:
      'The challenge was integrating heterogeneous security checks into a responsive IDE workflow without making analysis block the editor. Ciphera uses debounced document-change handling, invokes external analyzers through a controlled Python bridge, converts their findings into VS Code diagnostics, and separates deterministic scanning from optional LLM-based remediation suggestions.',
    coreCapabilities: [
      'Built debounced real-time scanning and surfaced findings through VS Code diagnostics.',
      'Integrated Bandit, regex-based JS/TS checks, Semgrep, and dependency scanning.',
      'Implemented quick-fix actions linking common findings to OWASP remediation guidance.',
      'Added an LLM-backed secure-fix workflow using configurable API providers and models.',
    ],
  },

  stackit: {
    id: 'stackit',
    name: 'StackIt',
    badge: 'Developer Knowledge Platform',
    tagline: 'A focused technical Q&A platform built around structured knowledge and collaborative validation.',
    domain: 'Web Platforms & Developer Tools',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Socket.io'],
    bannerImage: '/logos/stackit.png',
    repoUrl: 'https://github.com/Angat-Shah/StackIt',
    role: 'Team Lead & Lead Full-Stack Engineer',
    timeline: '2025',
    status: 'Completed Prototype',
    executiveSummary:
      'StackIt is a full-stack technical Q&A platform built for the Odoo Hackathon 2025 EdTech track, combining a React and TypeScript client with an Express API, MongoDB persistence, Firebase authentication, and Socket.io event delivery. Its architecture supports structured questions and answers, tagging, voting, solution acceptance, user reputation, notifications, and administrative moderation.',
    computationalChallenge:
      'The main challenge was coordinating a multi-user knowledge platform across authentication, structured content, community validation, moderation, and real-time events while keeping the client and API layers cleanly separated. The implementation therefore uses modular React components, dedicated Express routes and middleware, structured document models, indexed queries, and Socket.io notification channels.',
    coreCapabilities: [
      'Led full-stack architecture and integration across React, Express, MongoDB, and Firebase.',
      'Implemented structured questions, answers, tags, voting, acceptance, reputation, and pagination.',
      'Built Socket.io notification flows for answers, mentions, votes, and accepted resolutions.',
      'Developed authenticated administrative workflows for moderation, reporting, roles, and platform analytics.',
    ],
  },

  chronosched: {
    id: 'chronosched',
    name: 'ChronoSched',
    badge: 'CPU Process Scheduling Simulator',
    tagline: 'Discrete-event simulation of preemptive and non-preemptive CPU scheduling with interactive Gantt visualization.',
    domain: 'Systems & Operating Systems',
    tech: ['Java', 'Object-Oriented Design', 'Discrete-Event Simulation', 'Java Swing', 'Gantt Visualization'],
    bannerImage: '/logos/chronosched.png',
    repoUrl: 'https://github.com/Angat-Shah/ChronoSched',
    role: 'Systems Engineer',
    timeline: '2025',
    status: 'Completed Study',
    executiveSummary:
      'ChronoSched is a Java-based CPU scheduling simulator that models six classical preemptive and non-preemptive scheduling algorithms through discrete execution events. It couples an object-oriented simulation engine with a Swing visualization layer and terminal workbench to expose scheduling timelines, waiting time, turnaround time, and comparative workload behavior.',
    computationalChallenge:
      'The main challenge was representing changing ready-queue state and interrupted execution consistently across algorithms with different dispatch rules. ChronoSched separates process entities, timeline events, scheduler abstractions, and presentation layers, then derives contiguous execution intervals and scheduling metrics from the resulting simulated state.',
    coreCapabilities: [
      'Implemented FCFS, SJF, SRTF, non-preemptive priority, preemptive priority, and Round Robin scheduling.',
      'Modeled process state and execution intervals through reusable scheduler and event abstractions.',
      'Generated Gantt timelines and calculated per-process and aggregate scheduling metrics.',
      'Built interactive Swing and terminal interfaces for configurable workload experimentation and comparison.',
    ],
  },

  staffi: {
    id: 'staffi',
    name: 'STAFFI',
    badge: 'Web3 Workforce Management Platform',
    tagline: 'Hybrid HR infrastructure combining verifiable credentials, on-chain auditability, and workforce intelligence.',
    domain: 'Blockchain & Web3 Infrastructure',
    tech: ['React', 'TypeScript', 'Solidity', 'Hardhat', 'Ethers.js', 'PostgreSQL', 'OpenAI'],
    bannerImage: '/logos/staffi.png',
    repoUrl: 'https://github.com/Angat-Shah/STAFFI',
    role: 'Web3 & Full-Stack Engineer',
    timeline: '2025',
    status: 'Completed Prototype',
    executiveSummary:
      'STAFFI is a hybrid HR management platform that combines traditional workforce workflows with EVM-backed audit trails, ERC-721 competency credentials, and AI-assisted workforce analytics. Its architecture connects React and Express portals to PostgreSQL persistence, blockchain transaction relayers, and OpenAI-powered retention analysis.',
    computationalChallenge:
      'The central challenge was coordinating mutable application workflows with immutable blockchain records without forcing every HR operation into a purely on-chain model. STAFFI therefore separates business persistence and authentication from blockchain attestations, while exposing employee lifecycle, leave, payroll, credential, and workforce analytics workflows through dedicated service layers.',
    coreCapabilities: [
      'Integrated EVM smart contracts for employee records, leave approvals, payroll proofs, and credentials.',
      'Connected React portals to Express APIs and PostgreSQL workforce persistence.',
      'Implemented ERC-721 competency certificates linked to employee records and metadata.',
      'Added GPT-4o workforce risk analysis with persistent longitudinal assessment records.',
    ],
  },

  studio: {
    id: 'studio',
    name: 'STUDIO',
    badge: 'Forensic Secure Video Player',
    tagline: 'Dynamic session watermarking and platform-level capture mitigation for sensitive media.',
    domain: 'Media Security & Digital Rights',
    tech: ['Dart', 'Flutter', 'Video Playback', 'Platform Channels', 'Android/iOS Security', 'SharedPreferences'],
    bannerImage: '/logos/studio.png',
    repoUrl: 'https://github.com/Angat-Shah/STUDIO',
    role: 'Security Engineer',
    timeline: '2025',
    status: 'Completed Prototype',
    executiveSummary:
      'STUDIO is a Flutter-based secure video player that explores forensic traceability and capture mitigation for sensitive media. It combines dynamically refreshed viewer-and-timestamp watermarks, Android and iOS native security hooks, screenshot event auditing, and bounded playback controls within a cross-platform mobile application.',
    computationalChallenge:
      'The central challenge was extending a cross-platform Flutter player across platform-specific capture and window-security boundaries without losing a coherent playback model. STUDIO separates watermarking, screenshot monitoring, video playback, and persistent audit state into dedicated services while bridging native Android and iOS controls through platform-specific mechanisms.',
    coreCapabilities: [
      'Implemented 30-second dynamic viewer-and-timestamp watermark updates with configurable placement and opacity.',
      'Integrated Android FLAG_SECURE and iOS native screenshot detection through platform channels.',
      'Built persistent screenshot-attempt auditing with timestamped playback-session metadata.',
      'Bound playback behavior through configurable seek intervals and a 2.0× speed ceiling.',
    ],
  },
};

interface ProjectDetailViewProps {
  projectId: string;
  onClose?: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId }) => {
  const normalizedId = projectId.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const project = PROJECTS_PROFILES[normalizedId] || PROJECTS_PROFILES['atheno'];

  return (
    <ContentContainer>
      {/* Banner Card Preview */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-black/60 ring-1 ring-white/10 sm:aspect-[24/9]">
        <picture>
          <source srcSet={project.bannerImage.replace(/\.(png|jpg)$/, '.webp')} type="image/webp" />
          <img
            src={project.bannerImage}
            alt={project.name}
            className="h-full w-full object-cover object-center brightness-90 transition-transform duration-500 hover:scale-105"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="rounded bg-clay/90 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {project.badge}
            </span>
            <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h1>
            <p className="text-xs text-white/75 sm:text-sm">{project.tagline}</p>
          </div>
        </div>
      </div>

      {/* Quick Metadata Bar */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4 sm:grid-cols-4">
        <KeyValueField label="Role" value={project.role} />
        <KeyValueField label="Status" value={project.status} />
        <KeyValueField label="Timeline" value={project.timeline} />
        <KeyValueField label="Domain" value={project.domain} />
      </div>

      {/* Tech Stack Pills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="tech-pill">
            {t}
          </span>
        ))}
      </div>

      {/* Admissions & Recruiter Briefing */}
      <div className="mt-6 rounded-xl border-l-2 border-clay bg-black/40 p-5 ring-1 ring-white/10">
        <div className="flex items-center font-mono text-xs uppercase tracking-wider text-clay-soft">
          <span className="h-2 w-2 rounded-full bg-clay" />
          TECHNICAL OVERVIEW
        </div>
        <p className="mt-1 text-sm font-normal italic leading-relaxed text-white/95">
          {project.executiveSummary}
        </p>
      </div>

      {/* Main Narrative & Architecture Grid */}
      <div className="mt-7 flex flex-wrap gap-x-8 gap-y-7">
        <div className="stagger min-w-[280px] flex-1">
          <Eyebrow>Engineering Challenge</Eyebrow>
          <h2 className="font-display mt-2 text-xl font-normal text-white sm:text-2xl">
            Beyond High-Level Abstractions
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">
            {project.computationalChallenge}
          </p>
          <div className="mt-5">
            <ActionButton href={project.repoUrl}>
              Inspect Code on GitHub
            </ActionButton>
          </div>
        </div>

        <div className="min-w-[260px] flex-1">
          <CardBox label="Engineering Highlights" footer={`${project.name} · System Features`}>
            <PointTimeline items={project.coreCapabilities} />
          </CardBox>
        </div>
      </div>
    </ContentContainer>
  );
};

