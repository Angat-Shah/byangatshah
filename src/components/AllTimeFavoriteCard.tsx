import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Crown,
  Gamepad2,
  Crosshair,
  Star,
  Calendar,
  Clipboard,
  ClipboardCheck,
  Send,
} from 'lucide-react';
import { ActionButton } from '../ui/UIElements';
import { FuseButton } from '../ui/FuseButton';

/* ─────────────────────────────────────────────────────────────
   SUBCOMPONENTS
   ───────────────────────────────────────────────────────────── */

/** 1. Top Capsule: ALL-TIME FAVORITE with crown icon */
export const FavoriteBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`spider-card__pill ${className}`}>
      <Crown className="spider-card__pill-crown" />
      <span className="spider-card__pill-text">ALL-TIME FAVORITE</span>
    </div>
  );
};

/** 2. Block A: BGMI App Logo + Title & Full Form */
export const GameIdentity: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`spider-card__block-game ${className}`}>
      <div className="spider-card__app-icon">
        <img
          src="/games/bgmi.jpg"
          alt="BGMI App"
          className="spider-card__app-icon-img"
          draggable={false}
        />
      </div>
      <div className="spider-card__app-text">
        <span className="spider-card__app-title">BGMI</span>
        <span className="spider-card__app-subtitle">
          BATTLEGROUNDS MOBILE INDIA
        </span>
      </div>
    </div>
  );
};

/** 3. Block B: Player Avatar + Actual Gamertag 亗SPłĐ£尺亗 + Player ID */
export const PlayerIdentity: React.FC<{
  onCopy?: () => void;
  copied?: boolean;
  className?: string;
}> = ({ onCopy, copied = false, className = '' }) => {
  return (
    <div className={`spider-card__block-player ${className}`}>
      <div className="spider-card__avatar-box">
        <picture>
          <source srcSet="/games/spider-rank-avatar.webp" type="image/webp" />
          <img
            src="/games/spider-rank-avatar.png"
            alt="Spider Avatar"
            className="spider-card__avatar-img"
            draggable={false}
          />
        </picture>
      </div>
      <div className="spider-card__player-info">
        <div className="spider-card__name-line">
          <span
            className="spider-card__player-name"
            title="亗SPłĐ£尺亗"
            aria-label="亗SPłĐ£尺亗"
          >
            亗SPłĐ£尺亗
          </span>
          <img
            src="/games/golden-spider-icon.png"
            alt=""
            className="spider-card__spider-icon"
            draggable={false}
          />
        </div>
        <div className="spider-card__id-line">
          <span>Player ID</span>
          <span className="spider-card__id-val">5757511838</span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? 'Player ID Copied' : 'Copy Player ID'}
            title={copied ? 'Copied!' : 'Copy Player ID'}
            className="spider-card__copy-btn"
          >
            {copied ? (
              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
            ) : (
              <Clipboard className="w-3.5 h-3.5" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/** 4. Block C: Right Action Button: Let's Play */
export const SquadUpButton: React.FC<{
  onClick?: () => void;
  className?: string;
}> = ({ onClick, className = '' }) => {
  return (
    <div className={`spider-card__block-cta ${className}`}>
      <ActionButton
        onClick={onClick}
        className="rounded-lg py-1 pl-3.5 pr-1 text-[0.72rem] tracking-wider transition-transform active:scale-95"
      >
        Let's Play
      </ActionButton>
    </div>
  );
};

/** 5. Single Stat Item inside the dock */
export interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  icon,
  value,
  label,
  className = '',
}) => {
  return (
    <div className={`spider-card__stat-item ${className}`}>
      <div className="spider-card__stat-icon-wrap">{icon}</div>
      <div className="spider-card__stat-info">
        <span className="spider-card__stat-val">{value}</span>
        <span className="spider-card__stat-lbl">{label}</span>
      </div>
    </div>
  );
};

/** 6. Lower Statistics Dock: 4 items (Matches, KD, Points, 7 Years in 1 line) */
export const PlayerStats: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`spider-card__stats-dock ${className}`}>
      <StatItem
        icon={<Gamepad2 className="spider-card__stat-icon" />}
        value="5,100"
        label="Matches Played"
      />
      <StatItem
        icon={<Crosshair className="spider-card__stat-icon" />}
        value="8.10"
        label="All-time High KD"
      />
      <StatItem
        icon={<Star className="spider-card__stat-icon" fill="currentColor" />}
        value="6,810"
        label="Achievement Points"
      />
      <StatItem
        icon={<Calendar className="spider-card__stat-icon" />}
        value="7 Years"
        label="Playing for"
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   macOS STYLE SQUAD UP MODAL (Portal-rendered, Zero-Backend, Anti-Spam)
   ───────────────────────────────────────────────────────────── */

const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
const COOLDOWN_KEY = 'bgmi_squadup_cooldown_ts';
const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours local anti-spam cooldown

export interface SquadUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SquadUpModal: React.FC<SquadUpModalProps> = ({ isOpen, onClose }) => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorUid, setVisitorUid] = useState('');
  const [visitorNote, setVisitorNote] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot hidden trap
  const [copiedUid, setCopiedUid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [fuseKey, setFuseKey] = useState(0);

  // Safe cooldown checker with invalid timestamp recovery & security error guards
  const getCooldownRemainingMs = (): number => {
    try {
      const lastSentStr = localStorage.getItem(COOLDOWN_KEY);
      if (!lastSentStr) return 0;
      const lastSent = parseInt(lastSentStr, 10);
      if (Number.isNaN(lastSent) || lastSent <= 0 || lastSent > Date.now()) {
        localStorage.removeItem(COOLDOWN_KEY);
        return 0;
      }
      const elapsed = Date.now() - lastSent;
      return elapsed < COOLDOWN_MS ? COOLDOWN_MS - elapsed : 0;
    } catch {
      return 0;
    }
  };

  const [cooldownRemainingMs] = useState(() => getCooldownRemainingMs());

  // Derive active cooldown notice directly from initialized cooldown state
  const cooldownNotice =
    cooldownRemainingMs > 0
      ? (() => {
          const remainingMinutes = Math.ceil(cooldownRemainingMs / (60 * 1000));
          const remainingHours = Math.ceil(remainingMinutes / 60);
          const timeDisplay = remainingHours > 1 ? `${remainingHours}h` : `${remainingMinutes}m`;
          return `Request cooldown active. Please wait ${timeDisplay} before retrying.`;
        })()
      : '';
  const displayError = errorMsg || cooldownNotice;

  // Lock body scroll and handle Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    // Squad-up modal with FuseButton submit;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Copy Angat's UID for instant in-game friendship
  const handleCopyAngatUid = () => {
    navigator.clipboard.writeText('5757511838');
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  // Anti-spam & validation check
  const checkValidation = (): boolean => {
    if (honeypot.trim().length > 0) return false; // Bot trap triggered

    const trimmedName = visitorName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter a valid name (at least 2 characters).');
      return false;
    }
    if (trimmedName.length > 25) {
      setErrorMsg('Name must be 25 characters or fewer.');
      return false;
    }

    const trimmedUid = visitorUid.trim();
    // BGMI Player ID is strictly 9 to 12 digits
    if (!/^\d{9,12}$/.test(trimmedUid)) {
      setErrorMsg('Please enter a valid BGMI Player ID (9 to 12 digits).');
      return false;
    }

    const remainingMs = getCooldownRemainingMs();
    if (remainingMs > 0) {
      const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
      const remainingHours = Math.ceil(remainingMinutes / 60);
      const timeDisplay = remainingHours > 1 ? `${remainingHours}h` : `${remainingMinutes}m`;
      setErrorMsg(`Request cooldown active. Please wait ${timeDisplay} before retrying.`);
      return false;
    }
    return true;
  };

  // Submit Request via Web3Forms (Silent Background Dispatch)
  const executeSubmission = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!WEB3FORMS_ACCESS_KEY) {
      setErrorMsg('Contact service is not configured. Please copy Angat’s UID directly.');
      setFuseKey((k) => k + 1);
      return;
    }

    if (!checkValidation()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Let's Play] ${visitorName.trim()} · BGMI UID ${visitorUid.trim()}`,
          from_name: `${visitorName.trim()} · Portfolio`,
          name: visitorName.trim(),
          bgmi_player_id: visitorUid.trim(),
          message: visitorNote.trim() || 'No message. Just here to play.',
          botcheck: honeypot, // Web3Forms built-in honeypot
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Cooldown starts ONLY on successful delivery
        try {
          localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        } catch {
          // Gracefully ignore storage quota / security exceptions
        }
        setSuccessMsg('Request sent! Challenge received — check game lobby soon.');
        setVisitorName('');
        setVisitorUid('');
        setVisitorNote('');
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 1800);
      } else {
        console.warn('Web3Forms returned non-success:', result);
        setErrorMsg(result.message || 'Submission failed. Please check details and retry.');
        setFuseKey((k) => k + 1);
      }
    } catch (err) {
      console.error('Web3Forms background fetch failed:', err);
      setErrorMsg('Network error. Could not send request — please retry.');
      setFuseKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValidation()) {
      executeSubmission();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="squad-modal-backdrop"
      style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Let's Play BGMI"
    >
      <div
        className="squad-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS Window Titlebar: ONLY Window.tsx red close button with hover cross */}
        <div className="squad-modal-header group">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff5f57] text-[8px] text-black/50 ring-1 ring-black/10 transition-transform active:scale-90"
              title="Close"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
            </button>
          </div>
          <span id="squad-modal-title" className="squad-modal-title">
            Let's Play · BGMI Lobby
          </span>
          <div className="w-4" />
        </div>

        {/* Modal Content */}
        <div className="squad-modal-body">
          {/* Angat's In-Game Profile Card with Quick Add UID */}
          <div className="squad-modal-profile">
            <div className="squad-modal-profile-left">
              <picture>
                <source srcSet="/games/spider-rank-avatar.webp" type="image/webp" />
                <img
                  src="/games/spider-rank-avatar.png"
                  alt="SPIDER"
                  className="squad-modal-profile-img"
                />
              </picture>
              <div className="squad-modal-profile-info">
                <div className="squad-modal-profile-name-row">
                  <span className="squad-modal-profile-name">亗SPłĐ£尺亗</span>
                  <span className="squad-modal-profile-badge">Lv.74</span>
                </div>
                <div className="squad-modal-profile-uid">
                  UID: <strong>5757511838</strong>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyAngatUid}
              className="squad-modal-uid-btn"
              title="Copy Angat's UID to add directly in BGMI"
            >
              {copiedUid ? (
                <>
                  <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Copy UID</span>
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            {/* Honeypot field (hidden from real users to trap spam bots) */}
            <input
              type="text"
              name="bot_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* 2 Required Fields: Your Name & BGMI Player ID */}
            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
              <div className="squad-modal-field">
                <label className="squad-modal-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Angat / Snax"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="squad-modal-input"
                  minLength={2}
                  maxLength={25}
                  disabled={isSubmitting}
                />
              </div>

              <div className="squad-modal-field">
                <label className="squad-modal-label">BGMI Player ID *</label>
                <input
                  type="text"
                  required
                  placeholder="9-12 digits"
                  value={visitorUid}
                  onChange={(e) => setVisitorUid(e.target.value.replace(/\D/g, ''))}
                  className="squad-modal-input"
                  minLength={9}
                  maxLength={12}
                  pattern="[0-9]{8,12}"
                  title="BGMI Player ID must be 9 to 12 numeric digits"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Optional Field: Message or Note */}
            <div className="squad-modal-field mb-1">
              <label className="squad-modal-label">Message / Note (Optional)</label>
              <input
                type="text"
                placeholder="e.g. 1v1, squad, or just saying hi..."
                value={visitorNote}
                onChange={(e) => setVisitorNote(e.target.value)}
                className="squad-modal-input"
                maxLength={120}
                disabled={isSubmitting}
              />
            </div>

            {/* Action Section: FuseButton + Minimal Playful Toast Notification directly below */}
            <div className="mt-3.5 flex flex-col items-center">
              <FuseButton
                key={fuseKey}
                label="Send Request"
                undoLabel="Sending Request... (Cancel)"
                doneLabel="Request Sent!"
                icon={<Send className="w-3.5 h-3.5" />}
                fuse="outline"
                fuseColor="#f97316"
                background="#ffffff"
                color="#000000"
                radius={8}
                fuseThickness={2}
                undoWindow={5000}
                commitOn="fuseEnd"
                settle="stay"
                disabled={isSubmitting}
                onBeforeArm={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  if (!WEB3FORMS_ACCESS_KEY) {
                    setErrorMsg('Contact service is not configured. Please copy Angat’s UID directly.');
                    return false;
                  }
                  return checkValidation();
                }}
                onCommit={() => {
                  executeSubmission();
                }}
                className="w-full shadow-lg border-0 font-medium"
              />

              {/* Minimal Playful Toast Notification below button (no icons, minimal, small) */}
              <div className="mt-3 min-h-[24px] flex items-center justify-center">
                {displayError && (
                  <div role="alert" className="squad-modal-toast squad-modal-toast--error">
                    {displayError}
                  </div>
                )}
                {successMsg && (
                  <div role="status" className="squad-modal-toast squad-modal-toast--success">
                    {successMsg}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT: AllTimeFavoriteCard
   ───────────────────────────────────────────────────────────── */
export interface AllTimeFavoriteCardProps {
  className?: string;
  onSquadUp?: () => void;
}

export const AllTimeFavoriteCard: React.FC<AllTimeFavoriteCardProps> = ({
  className = '',
  onSquadUp,
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText('5757511838');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleSquadUpClick = onSquadUp || (() => setIsModalOpen(true));

  return (
    <>
      <article
        aria-label="All-Time Favorite Player Profile: SPIDER"
        className={`spider-card ${className}`}
      >
        {/* ── ATMOSPHERIC AMBIENT GLOWS (Golden Gate Twilight theme) ── */}
        <div className="spider-card__glow-top-left" aria-hidden="true" />
        <div className="spider-card__glow-bottom-left" aria-hidden="true" />
        <div className="spider-card__glow-bottom-right" aria-hidden="true" />

        {/* ── CINEMATIC SOLDIER BACKGROUND (CRISP & VISIBLE IN TOP-RIGHT 25-30%) ── */}
        <div className="spider-card__soldier-bg" aria-hidden="true">
          <picture>
            <source srcSet="/games/bgmi-soldier-bg.webp" type="image/webp" />
            <img
              src="/games/bgmi-soldier-bg.jpg"
              alt=""
              className="spider-card__soldier-img"
              draggable={false}
            />
          </picture>
          <div className="spider-card__soldier-fade-left" />
          <div className="spider-card__soldier-fade-bottom" />
        </div>

        {/* ── TOP HEADER: ALL-TIME FAVORITE CAPSULE ── */}
        <div className="spider-card__header">
          <FavoriteBadge />
        </div>

        {/* ── FIRST ROW: BGMI APP | PLAYER PROFILE | LET'S PLAY ── */}
        <div className="spider-card__row1">
          {/* Block A: BGMI App Logo + Full Form */}
          <GameIdentity />

          {/* Divider 1 */}
          <div className="spider-card__v-divider" />

          {/* Block B: Player Avatar + Actual 亗SPłĐ£尺亗 Gamertag + Player ID */}
          <PlayerIdentity onCopy={handleCopyId} copied={copied} />

          {/* Divider 2 */}
          <div className="spider-card__v-divider" />

          {/* Block C: Let's Play ActionButton */}
          <SquadUpButton onClick={handleSquadUpClick} />
        </div>

        {/* ── SECOND ROW: LOWER STATS DOCK (4 STATS WITH 7 YEARS IN 1 LINE) ── */}
        <PlayerStats />
      </article>

      {/* ── macOS SQUAD UP INTERACTIVE MODAL (Rendered in document.body via Portal) ── */}
      {isModalOpen && (
        <SquadUpModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
