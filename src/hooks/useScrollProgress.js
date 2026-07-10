import { useEffect, useRef, useState } from 'react';

const PIN_STYLE = {
  before: { position: 'absolute', top: 0, left: 0, right: 0 },
  after: { position: 'absolute', bottom: 0, left: 0, right: 0 },
};

// Drives a scroll-jacked "pin until an animation finishes" effect: while the
// tall track element is scrolled through, the panel stays pinned (via
// position: fixed, since position: sticky breaks under the site's
// overflow-x: hidden on html/body) and `progress` advances continuously from
// 0 to 1 with scroll; once it reaches 1 the panel unpins and the page
// continues scrolling normally. Same mechanic as useScrollSteps, but exposes
// raw continuous progress instead of a discrete step index — for effects
// (like a clip-path wipe) that aren't naturally divided into steps.
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [pinStyle, setPinStyle] = useState(PIN_STYLE.before);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let raf = null;

    const update = () => {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 0;
      const stickyHeight = stickyRef.current
        ? stickyRef.current.getBoundingClientRect().height
        : window.innerHeight - headerHeight;
      const rect = track.getBoundingClientRect();
      const total = rect.height - stickyHeight;

      if (total <= 0 || rect.top > headerHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.before ? prev : PIN_STYLE.before));
        setProgress(0);
        return;
      }

      if (rect.bottom < headerHeight + stickyHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.after ? prev : PIN_STYLE.after));
        setProgress(1);
        return;
      }

      setPinStyle((prev) => {
        if (
          prev.position === 'fixed'
          && prev.top === headerHeight
          && prev.left === rect.left
          && prev.width === rect.width
        ) {
          return prev;
        }
        return { position: 'fixed', top: headerHeight, left: rect.left, width: rect.width };
      });
      setProgress(Math.min(1, Math.max(0, (headerHeight - rect.top) / total)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { progress, pinStyle, trackRef, stickyRef };
}
