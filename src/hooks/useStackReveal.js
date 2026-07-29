import { useEffect, useRef } from 'react';

// Below this width the fixed-position stack mechanic is disabled and panels
// render in normal static flow instead (mirrors useScrollSteps' mobile cutoff).
const DISABLE_BELOW_WIDTH = 767;

// Extra scroll runway per panel, as a multiple of one panel's own height.
// 1 = the cover transition finishes in exactly one panel-height of scroll
// (fast/abrupt). Values above 1 add a hold before the next panel starts
// sliding up, and stretch the slide itself over more scroll — i.e. a slower
// scrub. Must match the multiplier baked into the wrapper's CSS height
// (`--panel-count` in ServiceSteps.jsx) or the pin math desyncs partway
// through the stack.
export const STACK_SCRUB_MULTIPLIER = 1.8;

// Total wrapper height, as a multiple of one panel's height. Only the holds
// *between* panels get the slower scrub. The last panel gets a flat
// panel-height to hold (nothing slides over it to cover it, unlike every
// other panel) *plus* another panel-height of dedicated runway to slide
// itself away afterward — without that second panel-height, the hold phase
// ends exactly when the wrapper's scroll room runs out, so the last panel
// is still fully pinned (not yet slid away) right as whatever follows in
// the document (e.g. a footer/section) starts entering, and it's left
// floating over that content instead of clearing out of the way. Keep in
// sync with the pin math below.
export function getStackWrapperMultiplier(count) {
  return (count - 1) * STACK_SCRUB_MULTIPLIER + 2;
}

// Drives a "sticky card stack" reveal — each panel pins to the top of the
// viewport for a stretch of scroll, then the next panel (still in normal
// flow, not yet pinned) slides up from the bottom and covers it, taking
// over the pin itself once it reaches the top. This is the same visual
// result native `position: sticky` gives when siblings share equal height,
// built with `position: fixed` instead because the site's
// `overflow-x: hidden` on html/body breaks sticky pinning (notably in
// Safari) — see useScrollSteps for the same workaround on a single panel.
//
// Positions are written straight to each panel's DOM node inside the scroll
// handler instead of going through React state. Driving this via
// setState + re-render works at low scroll speeds, but under fast/momentum
// scrolling React's render commit can fall behind the actual scroll
// position — the panels then visibly lag and "catch up" in a jump once the
// deferred render finally lands. Direct style writes have no such backlog:
// every rAF tick paints the exact position for the current scroll offset.
export function useStackReveal(count) {
  const wrapperRef = useRef(null);
  const panelRefs = useRef([]);

  const setPanelRef = (index) => (el) => {
    panelRefs.current[index] = el;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    let raf = null;

    const clearInlineStyles = () => {
      panelRefs.current.forEach((el) => {
        if (!el) return;
        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.width = '';
        el.style.height = '';
        el.style.transform = '';
        el.style.zIndex = '';
      });
    };

    const update = () => {
      if (window.innerWidth <= DISABLE_BELOW_WIDTH) {
        clearInlineStyles();
        return;
      }

      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 0;
      const panelHeight = window.innerHeight - headerHeight;
      const segmentHeight = panelHeight * STACK_SCRUB_MULTIPLIER;
      const rect = wrapper.getBoundingClientRect();
      const local = headerHeight - rect.top;

      panelRefs.current.forEach((el, i) => {
        if (!el) return;

        const isLast = i === count - 1;
        const segTop = i * segmentHeight;
        const duration = isLast ? panelHeight : segmentHeight;

        let offset;
        if (local < segTop) {
          offset = segTop - local; // hasn't arrived yet — sits below, slides up
        } else if (local < segTop + duration) {
          offset = 0; // pinned
        } else {
          offset = segTop + duration - local; // released — continues sliding up and away
        }

        el.style.position = 'fixed';
        el.style.top = '0'; // relative to .stackStage, which already sits at headerHeight
        el.style.left = `${rect.left}px`;
        el.style.width = `${rect.width}px`;
        el.style.height = `${panelHeight}px`;
        el.style.transform = `translateY(${offset}px)`;
        el.style.zIndex = i + 1;
      });
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
  }, [count]);

  return { wrapperRef, setPanelRef };
}
