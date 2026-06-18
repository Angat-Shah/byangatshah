/**
 * Sound Effects Utility (Web Audio API)
 * Inspired by unseen.co and premium hardware acoustics.
 * Synthesizes organic, soothing, high-fidelity tactile UI sounds using
 * filtered sine/triangle waves, soft resonant harmonics, and smooth gain envelopes.
 */

type SoundName = 'success-chime' | 'click' | 'maximize' | 'switch' | 'toggle';

let audioCtx: AudioContext | null = null;
const lastPlayed = new Map<SoundName, number>();
const DEBOUNCE_MS = 60;

function getContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => { });
  }
  return audioCtx;
}

// ── Soothing Sound Synthesizers (unseen.co inspired) ─────────────

/**
 * Celestial Unlock Chime (Ascending 3-note warm harmonic chord)
 */
function playSuccessChime(ctx: AudioContext) {
  const now = ctx.currentTime;
  const chord = [739.99, 932.33, 1108.73]; // F#5, A#5, C#6

  chord.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);

    const startTime = now + i * 0.08;
    gain.gain.setValueAtTime(0, now);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.32, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.48);
  });

  // Delicate ethereal shimmer
  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmer.type = 'sine';
  shimmer.frequency.setValueAtTime(2217.46, now + 0.18); // C#7
  shimmerGain.gain.setValueAtTime(0, now);
  shimmerGain.gain.setValueAtTime(0, now + 0.18);
  shimmerGain.gain.linearRampToValueAtTime(0.12, now + 0.22);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

  shimmer.connect(shimmerGain).connect(ctx.destination);
  shimmer.start(now + 0.18);
  shimmer.stop(now + 0.7);
}

/**
 * Organic Ceramic / Glass Tap (Dock & Desktop Icon Click)
 * Crisp, modern, soothing transient that cuts through smoothly.
 */
function playClick(ctx: AudioContext) {
  const now = ctx.currentTime;

  // 1. High tactile impulse (ceramic snap)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3800, now);

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(2400, now);
  osc1.frequency.exponentialRampToValueAtTime(950, now + 0.025);

  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.32, now + 0.003);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc1.connect(filter).connect(gain1).connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.04);

  // 2. Warm body resonance
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(820, now);

  gain2.gain.setValueAtTime(0, now);
  gain2.gain.linearRampToValueAtTime(0.16, now + 0.004);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.05);
}

/**
 * Soothing Glass Chime (Window Open / Maximize)
 * Elegant, uplifting dual-tone with rich harmonic clarity.
 */
function playMaximize(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [1046.5, 1318.51]; // C6 → E6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4200, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.05);

    const startTime = now + i * 0.05;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.38, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  });

  // Soft sparkle overtone
  const sparkle = ctx.createOscillator();
  const sGain = ctx.createGain();
  sparkle.type = 'sine';
  sparkle.frequency.setValueAtTime(2093, now + 0.06); // C7
  sGain.gain.setValueAtTime(0, now + 0.06);
  sGain.gain.linearRampToValueAtTime(0.14, now + 0.08);
  sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  sparkle.connect(sGain).connect(ctx.destination);
  sparkle.start(now + 0.06);
  sparkle.stop(now + 0.36);
}

/**
 * Satisfying Droplet / Bubble Pop (Window Close / Dismiss)
 * Clearly audible, organic, soothing descending droplet.
 */
function playSwitch(ctx: AudioContext) {
  const now = ctx.currentTime;

  // 1. Descending water/glass droplet
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3200, now);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1550, now);
  osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.42, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.13);

  // 2. Soft tactile settling pop
  const pop = ctx.createOscillator();
  const popGain = ctx.createGain();
  pop.type = 'triangle';
  pop.frequency.setValueAtTime(680, now + 0.015);
  popGain.gain.setValueAtTime(0, now + 0.015);
  popGain.gain.linearRampToValueAtTime(0.22, now + 0.02);
  popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  pop.connect(popGain).connect(ctx.destination);
  pop.start(now + 0.015);
  pop.stop(now + 0.1);
}

/**
 * Snappy Dual-Tone Micro Switch (Toggle / Minimize)
 */
function playToggle(ctx: AudioContext) {
  const now = ctx.currentTime;
  const tones = [1350, 980];

  tones.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.045;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.35, startTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.06);

    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.07);
  });
}

// ── Public API ──────────────────────────────────────────

const SYNTHS: Record<SoundName, (ctx: AudioContext) => void> = {
  'success-chime': playSuccessChime,
  click: playClick,
  maximize: playMaximize,
  switch: playSwitch,
  toggle: playToggle,
};

const SOUND_DEBOUNCE_MS: Partial<Record<SoundName, number>> = {
  maximize: 250,
  switch: 200,
  'success-chime': 400,
};

export function playSound(name: SoundName): void {
  const now = Date.now();
  const last = lastPlayed.get(name) ?? 0;
  const minInterval = SOUND_DEBOUNCE_MS[name] ?? DEBOUNCE_MS;
  if (now - last < minInterval) return;
  lastPlayed.set(name, now);

  try {
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(() => {
          SYNTHS[name](ctx);
        })
        .catch(() => {
          SYNTHS[name](ctx);
        });
    } else {
      SYNTHS[name](ctx);
    }
  } catch {
    // Silently fail: sound is optional UX
  }
}

// Pre-warm and unlock Web Audio on mobile touch/pointer interaction
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    try {
      const ctx = getContext();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Instant silent buffer source ensures iOS WebKit activates audio hardware
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Audio autoplay restrictions
    }
  };

  const unlockEvents = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'];
  const handleInteraction = () => {
    unlockAudio();
    unlockEvents.forEach((evt) => window.removeEventListener(evt, handleInteraction, true));
  };

  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleInteraction, { capture: true, once: true, passive: true });
  });
}
