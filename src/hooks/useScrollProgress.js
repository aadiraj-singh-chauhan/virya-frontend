import { useEffect, useRef, useState } from 'react';

const PIN_STYLE = {
  before: { position: 'absolute', top: 0, left: 0, right: 0 },
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

      // Anchor progress to how far the page has actually been scrolled, not
      // to rect.top vs headerHeight directly — a track flush against the
      // very top of the document (e.g. the page's first section) has
      // rect.top <= headerHeight from the initial, unscrolled paint, which
      // would otherwise read as "already partway pinned" and start the
      // reveal with a jump before the user has scrolled at all.
      //
      // `deficit` is how much of the normal "scroll up until the track top
      // meets the header" runway doesn't exist because the track starts
      // too close to (or at) the very top of the document. That missing
      // runway is subtracted from `total` (so progress still hits exactly
      // 0→1 across the scroll the user can actually perform) and added
      // back into the 'after' resting position (so unpinning lines up with
      // the fixed panel's on-screen position instead of snapping).
      const trackAbsoluteTop = rect.top + window.scrollY;
      const deficit = Math.max(0, headerHeight - trackAbsoluteTop);
      const total = rect.height - stickyHeight - deficit;
      const pinStartScrollY = Math.max(0, trackAbsoluteTop - headerHeight);
      const pinEndScrollY = pinStartScrollY + total;

      if (total <= 0 || (deficit === 0 && window.scrollY <= pinStartScrollY)) {
        setPinStyle((prev) => (prev === PIN_STYLE.before ? prev : PIN_STYLE.before));
        setProgress(0);
        return;
      }

      if (window.scrollY >= pinEndScrollY) {
        setPinStyle((prev) => {
          const top = total + deficit;
          if (prev.position === 'absolute' && prev.top === top) return prev;
          return { position: 'absolute', top, left: 0, right: 0 };
        });
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
      setProgress(Math.min(1, Math.max(0, (window.scrollY - pinStartScrollY) / total)));
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
