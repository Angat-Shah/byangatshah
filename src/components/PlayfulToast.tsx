import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { playSound } from '../../utils/sounds';
import { triggerHaptic } from '../../utils/haptics';

const COPY_MESSAGES = [
  "Ctrl+C detected. We saw that. We're flattered.",
  "Copied! Just remember who said it first.",
  "Copied! Are you saving this or roasting it in the group chat?",
  "Ping me when you paste this somewhere cool.",
  "Hope you're pasting this into an offer letter.",
  "Copying this to Slack to sound smart in your 2 PM meeting?",
  "Text acquired. Your clipboard just gained 5 years of senior experience.",
  "Senior-level copying detected. Carry on, legend.",
  "Text extracted. 0% AI hallucination, 100% handcrafted.",
  "Copied! Don't worry, no citation needed unless it's for an A+ grade.",
  "Putting a pin in this... copied to your clipboard.",
  "Adding this to the agenda: successful copy event.",
  "Action item completed: clipboard populated.",
  "Quick sync: text copied successfully.",
  "Your clipboard has been upgraded.",
  "Text successfully acquired.",
  "Copy successful. No semicolons were harmed.",
  "Copied. Proceed accordingly.",
  "Copied! May this text bring high ROI to your document.",
  "Stealing my words? At least star the GitHub repo first 😉",
];

export const PlayfulToast: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCopyIdx = useRef<number>(-1);

  const showCopyToast = useCallback(() => {
    let nextIdx = Math.floor(Math.random() * COPY_MESSAGES.length);
    if (nextIdx === lastCopyIdx.current && COPY_MESSAGES.length > 1) {
      nextIdx = (nextIdx + 1) % COPY_MESSAGES.length;
    }
    lastCopyIdx.current = nextIdx;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    setMessage(COPY_MESSAGES[nextIdx]);
    setVisible(true);

    playSound('toggle');
    triggerHaptic('light');

    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setMessage(null), 300);
    }, 5000);
  }, []);

  useEffect(() => {
    // Only listen for copy events; user's clipboard remains 100% intact
    const handleCopy = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.trim().length > 0) {
        showCopyToast();
      }
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [showCopyToast]);

  if (!message) return null;

  return (
    <aside
      aria-label="Clipboard Notification"
      className="pointer-events-none fixed inset-x-0 top-3 z-[9999] flex justify-center px-4"
    >
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex max-w-lg items-center gap-3 rounded-full border border-white/20 bg-[#121319]/90 px-4 py-2 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-6 scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col pr-1">
          <p className="text-xs font-medium text-white/95 sm:text-[0.82rem] leading-snug">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="ml-1 flex h-5 w-5 flex-none items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </aside>
  );
};
