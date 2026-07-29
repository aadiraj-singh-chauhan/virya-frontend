import Lenis from 'lenis';

// Single Lenis instance shared by the whole app. Created lazily and
// idempotently — whichever consumer's effect runs first constructs it, so
// there's no dependency on mount order between <LenisProvider> and the
// scroll-driven hooks that subscribe to it (React fires child effects before
// parent effects on initial mount, so the provider can't be relied on to
// "win the race").
let instance = null;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function getLenis() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null;
  if (!instance) {
    instance = new Lenis({ autoRaf: true });
  }
  return instance;
}

// Subscribes to Lenis's own scroll tick when available (guarantees the
// callback runs in lockstep with Lenis's easing RAF, instead of racing it
// via a second, independently-scheduled native "scroll" listener) and falls
// back to the native event when Lenis is off (SSR guard / reduced motion).
export function subscribeScroll(callback) {
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', callback);
    return () => lenis.off('scroll', callback);
  }
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}
