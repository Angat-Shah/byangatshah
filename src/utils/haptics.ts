/**
 * Lightweight Haptic Feedback Utility
 * Uses navigator.vibrate where supported (Android / Chrome mobile / compatible browsers).
 * Gracefully no-ops on iOS Safari and unsupported desktop platforms without throwing errors.
 */

export type HapticStyle = 'light' | 'selection' | 'medium' | 'success';

export function triggerHaptic(style: HapticStyle = 'light'): void {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (style) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'selection':
        navigator.vibrate(12);
        break;
      case 'medium':
        navigator.vibrate(22);
        break;
      case 'success':
        navigator.vibrate([10, 30, 15]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Silently ignore if blocked by user permissions or browser policies
  }
}
