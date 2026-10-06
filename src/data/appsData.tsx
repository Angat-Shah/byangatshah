import React, { Suspense, lazy } from 'react';
import type { AppDefinition } from '../types/os';
import {
  ContentContainer,
  Eyebrow,
  SectionHeader,
  CardBox,
  PointTimeline,
  ActionButton,
  KeyValueField,
} from '../components/ui/UIElements';
import { PolaroidGallery, PolaroidSingle } from '../components/views/PolaroidGallery';
import { MacSkillsFolder } from '../components/views/MacSkillsFolder';
import { GamingArchive } from '../components/views/GamingArchive';

const BIO_STATS = [
  { value: '10+', label: 'Projects Built' },
  { value: '3', label: 'Internships' },
  { value: '9.78', label: 'CGPA' },
  { value: '180+', label: 'Volunteers Led' },
];

const BIO_PARAGRAPHS = [
  "I like building things that make me think.",

  "I have a habit of taking an idea a little further than necessary just to see where it leads. Sometimes that becomes a product, sometimes a technical experiment, sometimes a repository full of things I learned along the way. I like the point where curiosity stops being a thought and becomes something I can actually interact with, break, question, and rebuild.",

  "Over time, that has taken me across rather different kinds of work. I have built software, explored machine learning, organized four years of coursework into something other people could use, led teams through hackathons and university events, and even tried running a small business. The projects look different on the surface, but the reason I keep starting them is usually the same: there is something I want to understand, and building is how I tend to find out.",

  "That curiosity is also changing what I want to build next. I started with software because I wanted to make things work; now I am increasingly interested in what makes intelligent systems work underneath: the algorithms, data, decisions, and principles behind them. I am still figuring out where that takes me, which is probably part of the appeal.",
];

// ── Research App View (Selected Work & Investigations) ─────────────
export interface ResearchViewProps {
  onOpenProject?: (id: string) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ onOpenProject: _onOpenProject }) => {
  return (
    <ContentContainer>
      <div className="flex flex-wrap gap-x-8 gap-y-7">
        <div className="stagger min-w-[280px] flex-1">
          <Eyebrow>TECHNICAL STUDIES</Eyebrow>
          <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
            Questions Worth Investigating.
          </h1>
          <p className="mt-4 max-w-md text-[0.97rem] leading-relaxed text-white/70">
            I explore technical questions by building systems, testing assumptions, and turning observations into documented evidence. The goal is not only to build something that works, but to understand why it works, where it falls short, and what the evidence suggests.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-3">
            <KeyValueField label="Focus" value="AI / ML" />
            <KeyValueField label="Artifacts" value="3" />
            <KeyValueField label="Timeline" value="2025 – Present" />
          </div>
        </div>
        <div className="stagger min-w-[280px] flex-1">
          <CardBox label="Study Record" footer="Questions become artifacts.">
            <PointTimeline
              items={[
                'Questions: Define a technical problem or observation worth examining beyond the obvious answer.',
                'Experiments: Build systems, experiments, or implementations that give the question something concrete to test.',
                'Analysis: Examine results, assumptions, limitations, and patterns rather than treating the first result as the conclusion.',
                'Documentation: Preserve the work through code, reports, manuscripts, and supporting artifacts.'
              ]}
            />
          </CardBox>
        </div>
      </div>

      {/* ── Documented Investigations (Sections without cards) ── */}
      <div className="mt-12 space-y-12">

        {/* APPLIED ML */}
        <div className="mt-7">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">
            APPLIED ML STUDY
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Atheno
            </h2>
            <span className="rounded bg-clay/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-clay-soft">
              2026
            </span>
          </div>

          {/* Study Areas */}
          <div className="mt-1 flex flex-wrap gap-1.5">
            {['Machine Learning', 'Explainability', 'TreeSHAP'].map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          {/* INQUIRY Callout Box */}
          <div className="mt-6 rounded-xl border-l-2 border-clay bg-black/40 px-4 py-3 ring-1 ring-white/10">
            <div className="font-mono text-[0.62rem] uppercase tracking-wider text-clay-soft font-medium">
              INQUIRY
            </div>
            <p
              className="mt-1 text-sm font-normal italic leading-relaxed text-white/95"
              style={{ fontStyle: 'italic' }}
            >
              "Can a vehicle valuation model provide useful predictions while also making the factors behind those predictions understandable?"
            </p>
          </div>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
            Atheno explores used-vehicle resale valuation with machine learning, combining an XGBoost prediction model with SHAP-based explanations. The system uses vehicle attributes to estimate resale value and examines which factors contribute most to each prediction, connecting a numerical estimate with an interpretable explanation. The work sits at the intersection of applied machine learning, prediction, and explainability.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ActionButton href="https://github.com/Angat-Shah/ATHENO">
              View Study
            </ActionButton>
            <ActionButton href="https://github.com/Angat-Shah/ATHENO">
              View Code
            </ActionButton>
          </div>
        </div>

        {/* INDEPENDENT STUDY */}
        <div className="mt-7 border-t border-white/10 pt-6">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">
            INDEPENDENT STUDY
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Agreement Without Faithfulness
            </h2>
            <span className="rounded bg-clay/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-clay-soft">
              2025 – 2026
            </span>
          </div>

          {/* Study Areas */}
          <div className="mt-1 flex flex-wrap gap-1.5">
            {['XAI', 'Model Interpretability', 'Feature Attribution'].map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          {/* INQUIRY Callout Box */}
          <div className="mt-6 rounded-xl border-l-2 border-clay bg-black/40 px-4 py-3 ring-1 ring-white/10">
            <div className="font-mono text-[0.62rem] uppercase tracking-wider text-clay-soft font-medium">
              INQUIRY
            </div>
            <p
              className="mt-1 text-sm font-normal italic leading-relaxed text-white/95"
              style={{ fontStyle: 'italic' }}
            >
              "Does pairwise agreement between Explainable AI attribution methods reliably indicate explanation faithfulness?"
            </p>
          </div>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
            This study evaluates whether consensus between post-hoc feature attribution methods implies faithfulness to a model's decision process. Using TreeSHAP, LIME, and Permutation Sensitivity with an XGBoost classifier, it compares pairwise attribution agreement against comprehensiveness and sufficiency. The results show negligible-to-small relationships between agreement and faithfulness, suggesting that agreement alone is not sufficient evidence that an explanation reflects how a model actually makes its predictions.
          </p>

          {/* Action button */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ActionButton href="https://github.com/Angat-Shah/xai-agreement-without-faithfulness/blob/main/paper/manuscript.pdf">
              View Study
            </ActionButton>
            <ActionButton href="https://github.com/Angat-Shah/xai-agreement-without-faithfulness">
              View Code
            </ActionButton>
          </div>
        </div>

        {/* TECHNICAL STUDY */}
        <div className="mt-7 border-t border-white/10 pt-6">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-soft">
            TECHNICAL STUDY
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Quantum Random Number Generator
            </h2>
            <span className="rounded bg-clay/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-clay-soft">
              2025
            </span>
          </div>

          {/* Study Areas */}
          <div className="mt-0.5 flex flex-wrap gap-1.5">
            {['Quantum Computing', 'Randomness', 'Qiskit'].map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          {/* INQUIRY Callout Box */}
          <div className="mt-6 rounded-xl border-l-2 border-clay bg-black/40 px-4 py-3 ring-1 ring-white/10">
            <div className="font-mono text-[0.62rem] uppercase tracking-wider text-clay-soft font-medium">
              INQUIRY
            </div>
            <p
              className="mt-1 text-sm font-normal italic leading-relaxed text-white/95"
              style={{ fontStyle: 'italic' }}
            >
              "Can simulated quantum measurement produce bitstreams with the statistical characteristics expected of an ideal random source?"
            </p>
          </div>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
            This work develops a single-qubit quantum random number generation pipeline using Qiskit and evaluates its output against a classical pseudorandom baseline. A dataset of 10,000 generated bits is analyzed through frequency balance, Shannon entropy, Pearson's χ² goodness-of-fit, and lag-1 autocorrelation. The results closely match the expected uniform distribution, while the report also examines the important boundary between quantum simulation and randomness generated by physical quantum hardware.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ActionButton
              href="https://github.com/Angat-Shah/QRNG/blob/main/docs/RESEARCH_REPORT.md"
            >
              View Study
            </ActionButton>

            <ActionButton
              href="https://github.com/Angat-Shah/QRNG"
            >
              View Code
            </ActionButton>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};


// ── notesNcode App View ──────────────────────────────────────────
export const NotesNCodeView: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex flex-wrap gap-x-8 gap-y-7">
        <div className="stagger min-w-[280px] flex-1">
          {/* Small notesNcode logo at the start
          <div className="mb-4 flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-xl bg-black/40 p-1.5 ring-1 ring-white/20">
              <img
                src="/logos/notesncode-mac.png"
                alt="notesNcode"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/50">
              Academic Repository
            </span>
          </div> */}

          <Eyebrow>Coursework & Knowledge Hub</Eyebrow>
          <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
            notesNcode
          </h1>
          <p className="mt-4 max-w-md text-[0.97rem] leading-relaxed text-white/70">
            A public academic repository documenting four years of B.Tech Computer Science and Engineering coursework, laboratory exercises, notes, and practical implementations.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-3">
            <KeyValueField label="Focus" value="Computer Science Education" />
            <KeyValueField label="Status" value="Active & Maintained" />
            <KeyValueField label="Timeline" value="Launched 2025" />
          </div>
        </div>

        <div className="stagger min-w-[280px] flex-1">
          <CardBox label="Key Highlights" footer="notesNcode · Open Source">
            <PointTimeline
              items={[
                'Structured academic material spanning all 8 semesters of B.Tech CSE.',
                'Practical implementations across DSA, Operating Systems, and core CS subjects.',
                'Used as a reference by students across multiple semesters.',
                'Open-source and continuously updated.',
              ]}
            />
          </CardBox>
        </div>
      </div>

      <div className="mt-8">
        <p className="mt-3 max-w-2xl text-[0.97rem] leading-relaxed text-white/75">
          What started as a personal coursework repository became a structured, reusable knowledge base for learning, revision, and experimentation.
        </p>
        <blockquote className="mt-3">
          <p className="font-display text-lg font-light italic text-white/90">
            "Academic knowledge should be organized, practical, and reusable."
          </p>
        </blockquote>
        <div className="mt-6">
          <ActionButton href="https://angat-shah.github.io/notesNcode/">
            Visit notesNcode
          </ActionButton>
        </div>
      </div>
    </ContentContainer>
  );
};

// ── Eikone App View ──────────────────────────────────────────────
export const EikoneView: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex flex-wrap gap-x-8 gap-y-7">
        <div className="stagger min-w-[280px] flex-1">
          {/* Small notesNcode logo at the start
          <div className="mb-4 flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-xl bg-black/40 p-1.5 ring-1 ring-white/20">
              <img
                src="/logos/eikone-mac.png"
                alt="notesNcode"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/50">
              Photography & Visual Stories
            </span>
          </div> */}

          <Eyebrow>Visual Storytelling Platform</Eyebrow>
          <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
            Eikone
          </h1>
          <p className="mt-1 font-mono text-[0.72rem] tracking-wide text-white/40">
            /eɪˈkoʊn.i/
          </p>
          <p className="mt-4 max-w-md text-[0.97rem] leading-relaxed text-white/70">
            A minimalist visual storytelling platform designed for photographers and visual artists to share narratives behind their work, completely free from social vanity metrics.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <KeyValueField label="Role" value="Founder & Lead Architect" />
            <KeyValueField label="Status" value="In Development" />
            <KeyValueField label="Model" value="Community-Driven" />
            <KeyValueField label="Timeline" value="Coming Soon" />
          </div>
        </div>

        <div className="min-w-[250px] flex-1">
          <CardBox label="The Eikone Experience" footer="Eikone · Creator-First Platform">
            <PointTimeline
              items={[
                'Discover: Curated photographs organized through geography, mood, and narrative context.',
                'Context: Discover who captured the image, where and when it was taken, and the story behind the frame.',
                'Explore: Interactive geospatial discovery connecting visual stories across locations.',
                'Preserve: Present photographs with high visual fidelity while keeping their original context intact.',
                'Remember: Stories remain tied to the people, places, and moments that created them.',
              ]}
            />
          </CardBox>
        </div>
      </div>

      <div className="mt-8">
        <p className="mt-3 max-w-2xl text-[0.97rem] leading-relaxed text-white/75">
          Eikone treats photographs as records of human perspective. Beyond the image itself, it preserves the person, place, and moment behind the frame. There are no follower counts competing for attention and no algorithmic feed deciding what deserves to be seen; only photographs, their stories, and the freedom to explore them intentionally.
        </p>

        {/* Polaroid Gallery Grid (All 9 Photos) */}
        <div className="mt-8">
          <PolaroidGallery />
        </div>

        <blockquote className="mt-8 border-t border-white/10 pt-6">
          <p className="font-display text-lg font-light italic text-white/90">
            "Seeing what other people see, discovering who saw it, and understanding the moment behind the image."
          </p>
        </blockquote>
      </div>
    </ContentContainer>
  );
};

// ── Experience Section (3 Internships) ─────────────────────────
export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  location: string;
  timeline: string;
  desc: string;
  bullets: string[];
  tech: string[];
}

export const INTERNSHIPS: InternshipItem[] = [
  {
    id: 'capabl',
    role: 'Full-Stack Developer Intern',
    company: 'Capabl India',
    location: 'Bengaluru, Karnataka, India · Remote',
    timeline: 'Sep 2025 – Present',
    desc: 'Engineered the frontend and product integration across three cross-platform EdTech products, supporting learning workflows for 160+ active students.',
    bullets: [
      'Owned frontend development across the mobile EdTech application, administrative LMS, and client-facing web platform using React Native, Expo, and React/TypeScript.',
      'Implemented five native Android security controls covering root detection, screen-capture blocking, and anti-tampering measures.',
      'Built a 10-module administrative LMS with reusable UI components and Amplitude Analytics, integrating backend services and tracking end-to-end user conversion funnels.',
    ],
    tech: ['React Native', 'Expo', 'React', 'TypeScript', 'AWS', 'Amplitude'],
  },
  {
    id: 'popway',
    role: 'Software Developer Intern',
    company: 'Popway Software',
    location: 'Surat, Gujarat, India · Hybrid',
    timeline: 'Jul 2024 – Apr 2025',
    desc: 'Architected commercial billing and inventory software while building mobile sales interfaces and integrating real-time transaction workflows.',
    bullets: [
      'Architected enterprise billing and inventory software using .NET and SQL, automating invoicing and stock reconciliations to boost client operational efficiency by 20%.',
      'Developed in-store catalog and sales-tracking interfaces in Flutter, eliminating 60% of manual register overhead and cutting reported UI latency by 30%.',
      'Integrated asynchronous REST APIs and real-time database synchronizations, stabilizing transaction throughput across multi-device commercial deployments.',
    ],
    tech: ['.NET', 'SQL', 'Flutter', 'REST APIs', 'Git'],
  },
  {
    id: 'soomuch',
    role: 'Full-Stack Developer Intern',
    company: 'Soomuch Smart Solutions',
    location: 'Hyderabad, Telangana, India · Remote',
    timeline: 'Jan 2024 – May 2024',
    desc: 'Spearheaded the end-to-end UX redesign and frontend build for Soomuch AI across mobile and web platforms.',
    bullets: [
      'Designed 30+ interactive design-system components in Figma, accelerating engineering handoff cycles and cutting frontend UI integration discrepancies by 40%.',
      'Built responsive mobile and web interfaces with reusable components across the Soomuch AI product experience.',
      'Integrated Python backend services and optimized REST API endpoints, improving API response times by around 25% across core conversational and search features.',
    ],
    tech: ['Figma', 'React', 'JavaScript', 'Python', 'REST APIs'],
  },
];

export const ExperienceView: React.FC = () => {
  return (
    <ContentContainer>
      <SectionHeader eyebrow="Professional Experience" title="Engineering in Practice">
        Hands-on experience building production software across mobile, web, backend systems, and cloud infrastructure.
      </SectionHeader>

      <div className="mt-7 space-y-5">
        {INTERNSHIPS.map((item) => (
          <div
            key={item.id}
            className="mt-7 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.company}</h3>
                <div className="text-sm font-medium text-clay-soft">
                  {item.role} <span className="text-white/40">· {item.location}</span>
                </div>
              </div>
              <span className="font-mono font-semibold text-xs text-clay-soft">{item.timeline}</span>
            </div>

            <p className="mt-3 text-sm text-white/75">{item.desc}</p>

            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-white/65">
              {item.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-clay" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="mt-4 tech-pill"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <ActionButton href="https://www.linkedin.com/in/angat-shah">
          View LinkedIn Profile
        </ActionButton>
      </div>
    </ContentContainer>
  );
};

// ── Skills Section ──────────────────────────────────────────────
export const SkillsView: React.FC = () => {
  return (
    <ContentContainer>
      <SectionHeader eyebrow="Technical Stack" title="Core Capabilities">
        A focused stack of languages, frameworks, and tools I use to design, build, and ship working systems.
      </SectionHeader>

      <div className="mt-6">
        <MacSkillsFolder />
      </div>
    </ContentContainer>
  );
};


// ── Community Section ───────────
export interface CommunityItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  isVertical?: boolean;
  desc: string;
}

export const COMMUNITY_ITEMS: CommunityItem[] = [
  {
    id: 'amazon-ml',
    title: 'AMAZON ML SUMMER SCHOOL',
    subtitle: 'Machine Learning Program · Amazon India',
    year: 'Aug 2025',
    image: '/media/amazon-ml-summer-school.png',
    isVertical: true,
    desc: 'Selected through a competitive national process for Amazon India’s Machine Learning Summer School, covering modern ML, deep learning, generative AI, LLMs, and causal inference.'
  },

  {
    id: 'ssip',
    title: 'SSIP IDEA HUNT 2023',
    subtitle: 'Student Startup & Innovation Policy · Govt. of Gujarat',
    year: 'Oct 2023',
    image: '/media/idea-hunt.png',
    desc: 'Developed and pitched an electro-hydrodynamic laptop cooling concept with a five-member team, securing ₹30,000 in funding to support future prototype development.'
  },

  {
    id: 'swirl-twirl',
    title: 'SWIRL & TWIRL MICRO-VENTURE',
    subtitle: 'Live Venture · University Festival',
    year: 'Feb – Mar 2025',
    image: '/media/swirl-twirl-menu.png',
    isVertical: true,
    desc: 'Operated a four-day food stall at UTU’s university-wide 9th Uth Festival, competing alongside 19+ departments and generating ₹56,850 in sales while managing procurement, pricing, inventory, marketing, and live operations.'
  },

  {
    id: 'nss',
    title: 'NSS CORE LEADERSHIP',
    subtitle: 'Leadership · National Service Scheme',
    year: 'Jun 2023 – Jun 2025',
    image: '/media/nss-certificate.png',
    desc: 'Served two consecutive years on the NSS departmental core team, coordinating activities and a 180–200 member volunteer unit across health drives, competitions, and community programs.'
  },

  {
    id: 'pravaah',
    title: 'PRAVAAH FUNZONE · TREASURE HUNT',
    subtitle: 'Event Leadership · Engineer’s Day',
    year: 'Sep 2023',
    image: '/media/pravaah-2023.png',
    desc: 'Led the design and execution of a multi-stage departmental technical challenge, coordinating participants, 10 QR-based clues, physical navigation, and a custom C programming puzzle.'
  },
];

const FIGURE_RE = /(₹[\d,]+|\d+[–—-]\d+)/g;
const isFigure = (part: string) => /^(₹[\d,]+|\d+[–—-]\d+)$/.test(part);

/** Renders amounts and headcounts in timeline clay so figures read first. */
const renderDescWithFigures = (desc: string) =>
  desc.split(FIGURE_RE).map((part, i) =>
    isFigure(part) ? (
      <span key={i} className="font-semibold text-clay-soft">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );

export const CommunityView: React.FC = () => {
  return (
    <ContentContainer>
      <SectionHeader eyebrow="Distinctions & Leadership" title="Built Beyond the Classroom">
        Selected recognitions, technical initiatives, leadership roles, and real-world ventures that shaped how I build, lead, and solve problems.
      </SectionHeader>

      <div className="mt-7 space-y-6">
        {COMMUNITY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="mt-7 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
          >
            {/* Top row: Left Title + Subtitle, Right Year badge */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs font-semibold tracking-wide text-white/50">
                  {item.subtitle}
                </p>
              </div>
              <span className="flex-none rounded  bg-clay/10 px-2.5 py-1 font-mono text-xs font-semibold text-clay-soft">
                {item.year}
              </span>
            </div>

            {/* Middle: Polaroid Frame Certificate Preview (Clean frame, no duplicate text) */}
            <div className="mt-4 flex items-center">
              <PolaroidSingle
                title={item.title}
                src={item.image}
                isVertical={item.isVertical}
              />
            </div>

            {/* Bottom: Divider + 1-2 line description */}
            <hr className="mt-4 my-4 border-white/10" />
            <p className="mt-4 text-xs sm:text-[0.88rem] leading-relaxed font-normal text-white/80">
              {renderDescWithFigures(item.desc)}
            </p>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

// ── Projects List & View ─────────────────────────────────────────
export const PROJECTS_LIST = [
  {
    id: 'atheno',
    name: 'Atheno',
    subtitle: 'AI Automotive Intelligence',
    tech: 'Python · XGBoost · SHAP · Streamlit',
    image: '/logos/atheno.png',
    url: 'https://github.com/Angat-Shah/ATHENO',
  },
  {
    id: 'kavach',
    name: 'KAVACH',
    subtitle: 'Citizen Safety & Incident Response',
    tech: 'Dart · Flutter · Firebase · Geospatial',
    image: '/logos/kavach.png',
    url: 'https://github.com/Angat-Shah/KAVACH',
  },
  {
    id: 'ciphera',
    name: 'Ciphera',
    subtitle: 'AI-Assisted Secure Code Analysis',
    tech: 'TypeScript · AST · Security · OWASP',
    image: '/logos/ciphera.png',
    url: 'https://github.com/Angat-Shah/Ciphera',
  },
  {
    id: 'qrng',
    name: 'QRNG',
    subtitle: 'Quantum Randomness & Validation',
    tech: 'Quantum · C++ · Algorithms · Cryptography',
    image: '/logos/qrng.png',
    url: 'https://github.com/Angat-Shah/QRNG',
  },
  {
    id: 'stackit',
    name: 'StackIt',
    subtitle: 'Developer Knowledge Platform',
    tech: 'React · TypeScript · Tailwind · REST',
    image: '/logos/stackit.png',
    url: 'https://github.com/Angat-Shah/StackIt',
  },
  {
    id: 'chronosched',
    name: 'ChronoSched',
    subtitle: 'CPU Process Scheduling Simulator',
    tech: 'C++ · OS Algorithms · Visualization',
    image: '/logos/chronosched.png',
    url: 'https://github.com/Angat-Shah/ChronoSched',
  },
  {
    id: 'staffi',
    name: 'STAFFI',
    subtitle: 'Web3 Workforce Management Platform',
    tech: 'TypeScript · Web3 · Smart Contracts · Analytics',
    image: '/logos/staffi.png',
    url: 'https://github.com/Angat-Shah/STAFFI',
  },
  {
    id: 'studio',
    name: 'STUDIO',
    subtitle: 'Forensic Secure Video Player',
    tech: 'Dart · Flutter · Video Security · DRM',
    image: '/logos/studio.png',
    url: 'https://github.com/Angat-Shah/STUDIO',
  },
];

export interface ProjectsViewProps {
  onOpenProject?: (id: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenProject }) => {
  return (
    <ContentContainer>
      <SectionHeader eyebrow="Engineering Portfolio" title="Ideas Worth Building">
        Full-stack platforms, machine learning pipelines, and security tooling engineered for resilience, explainability, and scale.
      </SectionHeader>
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PROJECTS_LIST.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onOpenProject?.(proj.id)}
            className="group block cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10">
              <picture>
                <source srcSet={proj.image.replace(/\.(png|jpg)$/, '.webp')} type="image/webp" />
                <img
                  src={proj.image}
                  alt={proj.name}
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </picture>
              <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white/90 backdrop-blur-md">
                {proj.tech}
              </div>
              <div className="absolute top-2 right-2 rounded bg-clay/90 px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-wider text-black opacity-0 transition-opacity group-hover:opacity-100">
                Inspect ↗
              </div>
            </div>
            {/* Centered subtitle matching CarouselWheel style, project name removed */}
            <div className="px-1 py-2.5 text-center">
              <p className="truncate text-center text-[0.76rem] font-medium tracking-tight text-white/70 transition-colors group-hover:text-white">
                {proj.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ActionButton
          href="https://github.com/Angat-Shah?tab=repositories"
          className="w-full justify-between"
        >
          View All Projects on GitHub
        </ActionButton>
      </div>
    </ContentContainer>
  );
};

const CONTACT_EMAIL = 'angatshah1411@gmail.com';

const ContactView: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex flex-wrap gap-x-8 gap-y-7">
        <div className="stagger min-w-[280px] flex-1">
          <Eyebrow>Contact & Collaboration</Eyebrow>
          <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
            Get In Touch.
          </h1>
          <p className="mt-4 max-w-md text-[0.97rem] leading-relaxed text-white/60">
            Open to engineering opportunities, technical collaborations, and interesting problems worth solving.
          </p>
          <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
            <KeyValueField label="Email" value={CONTACT_EMAIL} />
            <KeyValueField label="Location" value="Gujarat, India (IST / UTC+5:30)" />
            <KeyValueField label="Focus" value="Software Engineering · AI/ML" />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionButton href={`mailto:${CONTACT_EMAIL}`}>
              Send Email
            </ActionButton>
            <ActionButton href="https://www.linkedin.com/in/angat-shah">
              Connect on LinkedIn
            </ActionButton>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

const LazyResumeView = lazy(() => import('../components/views/ResumeView'));

export const ResumeView: React.FC = () => (
  <Suspense
    fallback={
      <div className="flex h-full min-h-[400px] w-full items-center justify-center font-mono text-sm text-white/40">
        Loading Document...
      </div>
    }
  >
    <LazyResumeView />
  </Suspense>
);

export const createAppsData = (onOpenProject?: (id: string) => void): AppDefinition[] => [
  // Resume App
  {
    id: 'resume',
    label: 'Resume',
    iconSrc: '/logos/resume-mac.png',
    gradient: 'linear-gradient(145deg,#23252c,#111215)',
    size: { w: 840, h: 720 },
    content: <ResumeView />,
  },
  // 1. About Angat
  {
    id: 'about',
    label: 'About Angat',
    glyph: (
      <span className="font-display grid h-full w-full place-items-center text-lg font-bold text-white">
        AS
      </span>
    ),
    gradient: 'linear-gradient(145deg,#3a3f4b,#16181d)',
    iconSrc: '/angat-shah-icon.png',
    size: { w: 720, h: 620 },
    content: (
      <ContentContainer>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="w-40 flex-none overflow-hidden rounded-xl ring-1 ring-white/10 sm:w-44">
            <picture>
              <source srcSet="/media/angat-portrait.webp" type="image/webp" />
              <img
                src="/media/angat-portrait.png"
                alt="Angat Shah"
                className="aspect-[4/5] w-full object-cover"
                draggable={false}
              />
            </picture>
          </div>
          <div>
            <img
              src="/angat-shah-icon.png"
              alt="Angat Shah Icon"
              className="mb-4 h-11 w-11 rounded-[24%] ring-1 ring-white/10"
              draggable={false}
            />
            <Eyebrow>Developer · Gamer · Builder</Eyebrow>
            <h1 className="font-display mt-3 text-[2.75rem] font-normal leading-[1.02] tracking-tight text-white sm:text-6xl">
              Angat Shah
            </h1>
            <p className="mt-3 text-sm text-white/55">
              Gujarat, India · B.Tech CSE (AMTICS, UTU · Class of 2026)
            </p>
          </div>
        </div>

        <div className="stagger-list mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BIO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-clay-soft">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-[0.97rem] leading-relaxed text-white/70">
          <p className="text-[1.08rem] font-medium tracking-tight text-clay-soft sm:text-[1.14rem]">
            {BIO_PARAGRAPHS[0]}
          </p>
          {BIO_PARAGRAPHS.slice(1).map((para, idx) => (
            <p key={idx}>
              {para}
            </p>
          ))}
        </div>

        <blockquote className="mt-8 border-t border-white/10 pt-7">
          <p className="font-display text-2xl font-light leading-snug text-white">
            “The difference between who you are and who you want to be is what you do.”
            <span className="ml-3 inline-block font-sans text-xs font-normal tracking-wide text-white/75 whitespace-nowrap italic">
              — Bill Phillips
            </span>
          </p>
        </blockquote>

        <GamingArchive />
      </ContentContainer>
    ),
  },

  // 2. Projects (Primary Dock App)
  {
    id: 'projects',
    label: 'Projects',
    iconSrc: '/logos/toolkit-icon.svg',
    gradient: 'linear-gradient(145deg,#202227,#121316)',
    size: { w: 760, h: 640 },
    content: <ProjectsView onOpenProject={onOpenProject} />,
  },

  // 3. Experience (Primary Dock App)
  {
    id: 'experience',
    label: 'Experience',
    iconSrc: '/logos/experience-mac.png',
    gradient: 'linear-gradient(145deg,#23262d,#121417)',
    size: { w: 700, h: 640 },
    content: <ExperienceView />,
  },

  // 4. Community (Primary Dock App)
  {
    id: 'community',
    label: 'Community',
    iconSrc: '/logos/community-mac.png',
    gradient: 'linear-gradient(145deg,#27242a,#141217)',
    size: { w: 700, h: 640 },
    content: <CommunityView />,
  },

  // 5. Contact (Primary Dock App)
  {
    id: 'contact',
    label: 'Contact',
    iconSrc: '/logos/ios-mail.png',
    gradient: 'linear-gradient(145deg,#2a9bf6,#0a63e6)',
    size: { w: 640, h: 620 },
    content: <ContactView />,
  },

  // 6. Studies (Desktop Icon 1)
  {
    id: 'research',
    label: 'Studies',
    iconSrc: '/logos/research-mac.png',
    gradient: 'linear-gradient(145deg,#222530,#11131a)',
    size: { w: 760, h: 650 },
    content: <ResearchView onOpenProject={onOpenProject} />,
  },

  // 7. notesNcode (Desktop Icon 2)
  {
    id: 'notesncode',
    label: 'notesNcode',
    iconSrc: '/logos/notesncode-mac.png',
    gradient: 'linear-gradient(145deg,#222328,#121316)',
    size: { w: 700, h: 620 },
    content: <NotesNCodeView />,
  },

  // 8. Skills (Desktop Icon 3)
  {
    id: 'skills',
    label: 'Skills',
    iconSrc: '/logos/skills-mac.png',
    gradient: 'linear-gradient(145deg,#222226,#101012)',
    size: { w: 680, h: 600 },
    content: <SkillsView />,
  },

  // 9. Eikone (Desktop Icon 4: Passion Project)
  {
    id: 'gallery',
    label: 'Eikone',
    iconSrc: '/logos/eikone-mac.png',
    gradient: 'linear-gradient(145deg,#202126,#101114)',
    size: { w: 720, h: 640 },
    content: <EikoneView />,
  },
  {
    id: 'eikone',
    label: 'Eikone',
    iconSrc: '/logos/eikone-mac.png',
    gradient: 'linear-gradient(145deg,#202126,#101114)',
    size: { w: 720, h: 640 },
    content: <EikoneView />,
  },
];

export const APPS_DATA = createAppsData();
    