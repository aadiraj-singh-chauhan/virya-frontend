import { useEffect, useRef, useState } from 'react';

const PIN_STYLE = {
  before: { position: 'absolute', top: 0, left: 0, right: 0 },
  after: { position: 'absolute', bottom: 0, left: 0, right: 0 },
};

// Minimum time (ms) the active step holds before advancing to the next one —
// keeps a hard/fast scroll from jumping straight to the target step and
// skipping the ones in between. Kept short so the catch-up still tracks
// scroll fluidly instead of visibly stalling between steps.
const STEP_SCRUB_MS = 180;

// Drives a scroll-jacked "pinned panel with advancing steps" effect: while
// the tall track element is scrolled through, the panel stays pinned (via
// position: fixed, since position: sticky breaks under the site's
// overflow-x: hidden on html/body) and `active` advances with scroll
// progress, one step at a time. Shared by Ecosystem (material-mobility) and
// Resources/Service's step panels — same mechanic, different visuals.
export function useScrollSteps(stepCount) {
  const [active, setActive] = useState(0);
  const [pinStyle, setPinStyle] = useState(PIN_STYLE.before);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const targetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let raf = null;

    const update = () => {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 0;
      // Measure the pinned panel's real (content-driven) height rather than
      // assuming it always fills the viewport — otherwise a shorter panel
      // (e.g. mobile's more compact accordion) desyncs the pin/unpin math
      // and leaves a visible gap of empty space before it unpins.
      const stickyHeight = stickyRef.current
        ? stickyRef.current.getBoundingClientRect().height
        : window.innerHeight - headerHeight;
      const rect = track.getBoundingClientRect();
      const total = rect.height - stickyHeight;

      if (total <= 0 || rect.top > headerHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.before ? prev : PIN_STYLE.before));
        targetRef.current = 0;
        return;
      }

      if (rect.bottom < headerHeight + stickyHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.after ? prev : PIN_STYLE.after));
        targetRef.current = stepCount - 1;
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
      const progress = Math.min(1, Math.max(0, (headerHeight - rect.top) / total));
      targetRef.current = Math.min(stepCount - 1, Math.floor(progress * stepCount));
    };

    // Listeners stay attached for the section's whole lifetime — an earlier
    // attempt to gate them behind an IntersectionObserver (detaching once
    // the track left an extended margin) could leave the pinned panel
    // permanently stuck at position: fixed if the observer fired before the
    // pin state had settled, blocking the rest of the page until a refresh.
    // A cheap getBoundingClientRect() per scroll frame is worth paying to avoid that.
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
  }, [stepCount]);

  // Walks `active` toward the scroll-computed target one step at a time,
  // instead of snapping straight to it — so every point gets its own scroll.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => {
        const target = targetRef.current;
        if (current === target) return current;
        return current + Math.sign(target - current);
      });
    }, STEP_SCRUB_MS);
    return () => clearInterval(id);
  }, []);

  return { active, setActive, pinStyle, trackRef, stickyRef };
}
