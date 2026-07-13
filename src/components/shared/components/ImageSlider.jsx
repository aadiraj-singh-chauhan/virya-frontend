'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';
import styles from '../css/ImageSlider.module.css';

const SPRING = { type: 'spring', stiffness: 300, damping: 30 };
const AUTOPLAY_SPEED = 60; // px/sec — continuous marquee scroll rate
// Loop mode renders this many copies of the slides, resting in the middle
// one so there's duplicate buffer on both sides. A rebase (see rebaseHome)
// only ever runs after a step's spring has actually settled, so repeated
// rapid clicks can outrun it for a while — this many copies is enough
// buffer for that without visibly running out of rendered content.
const LOOP_COPIES = 7;
const LOOP_HOME_COPY = Math.floor(LOOP_COPIES / 2);
// How much of the release velocity to project forward before picking the
// nearest card — this is what gives the "keeps momentum, then snaps"
// feel instead of always snapping to whatever card is nearest at the
// instant your finger/cursor lifts.
const VELOCITY_PROJECTION = 0.15;

// Matches the square NavButtons arrow used elsewhere on the site (careers
// Voices/FutureBuilders) so every prev/next control looks the same.
function ArrowIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 13.81 11.109" fill="none" aria-hidden="true">
      <path d="M0 5.554L13.81 5.554" stroke="currentColor" />
      <path d="M6.6 0L8.8 0L13.81 5.554L8.8 11.109L6.6 11.109" stroke="currentColor" />
    </svg>
  );
}

// Shared drag/spring image slider — same mechanics used by the homepage's
// Industries slider, amr10's Industries slider, and careers' TeamGallery.
// `arrows` accepts true (a fixed prev/next pair below the track), false
// (hidden), or 'hover' (a single arrow that follows the cursor over the
// track, flips to point the other way over the left half, and shows/hides
// with hover — used by TeamGallery and the homepage Industries slider).
export default function ImageSlider({ slides, cardAspectRatio = '517 / 288', autoplay = false, arrows = true }) {
  const fixedArrows = arrows === true;
  const cursorArrows = arrows === 'hover';

  // With fewer than 4 slides, the real scrollable range is often shorter
  // than one card's width, so clamped index-based targets collapse onto the
  // same position and prev/next looks like it stalls at the end. Tripling
  // the rendered slides and navigating on a wrapped, unclamped position
  // (see advance/nudge below) keeps it moving in a real loop instead.
  const shouldLoop = autoplay || slides.length < 4;
  const renderSlides = shouldLoop ? Array(LOOP_COPIES).fill(slides).flat() : slides;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardStepRef = useRef(0);
  // The track's leading indent (::before + gap) only exists once, before
  // the very first rendered card — every card's true offsetLeft is this
  // plus i*cardStep, not just i*cardStep. Loop mode's absolute positioning
  // (unlike the relative stepBy/rebaseHome math) needs to account for it
  // or the resting position lands ~70px short, peeking the previous card.
  const baseOffsetRef = useRef(0);
  const x = useMotionValue(0);

  const [index, setIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, side: 'next', visible: false });
  const draggedRef = useRef(false);

  // The authoritative current index, updated synchronously on every step —
  // unlike the `index` state (display-only, for disabled/arrow bookkeeping),
  // this never goes stale between a click and the next render. Reading
  // React state instead here was the actual bug: two clicks fired faster
  // than a spring settles would both compute their step against the same
  // not-yet-updated `index`, so the second one moved by the wrong amount
  // and visibly reversed direction.
  const logicalIndexRef = useRef(0);
  // Guards a rebase from an animation that's since been superseded by a
  // newer step — without this, a stale rebase's x.set() can land after a
  // later animate() has already taken over the value, corrupting it
  // (verified: calling x.set()/.stop() on a spring mid-flight, rather than
  // waiting for it to actually finish, produced wildly wrong positions
  // under rapid clicking, not just a visually-ignored no-op).
  const navGenRef = useRef(0);

  // Loop mode keeps the resting position anchored in the *middle* copy of
  // the rendered slides (a "home band" one loopWidth wide) instead of the
  // first copy, so there's a full duplicate buffer to animate into on
  // either side before silently (invisibly, since the content repeats)
  // rebasing back into the band once the animation has actually settled.
  const rebaseHome = (loopWidth) => {
    const bandTop = -LOOP_HOME_COPY * loopWidth;
    const bandBottom = -(LOOP_HOME_COPY + 1) * loopWidth;
    let v = x.get();
    while (v > bandTop) v -= loopWidth;
    while (v <= bandBottom) v += loopWidth;
    x.set(v);
  };

  // Moves by `deltaCards` (any integer, +/-) relative to wherever x
  // currently is — never an absolute position — so it's always correct
  // regardless of whether an earlier step has finished settling yet.
  const stepBy = (deltaCards, loopWidth) => {
    const gen = ++navGenRef.current;
    const rawTarget = x.get() - deltaCards * cardStepRef.current;
    return animate(x, rawTarget, SPRING).then(() => {
      // Only the step that's still current gets to rebase — if a newer
      // one has already started, its own settle will rebase in turn.
      if (navGenRef.current === gen) rebaseHome(loopWidth);
    });
  };

  // Single-step prev/next for the fixed and cursor-following arrows.
  const advance = (direction) => {
    if (shouldLoop) {
      const loopWidth = slides.length * cardStepRef.current;
      const nextLogical = ((logicalIndexRef.current + direction) % slides.length + slides.length) % slides.length;
      logicalIndexRef.current = nextLogical;
      setIndex(nextLogical);
      stepBy(direction, loopWidth);
      return;
    }
    const clamped = Math.max(0, Math.min(logicalIndexRef.current + direction, slides.length - 1));
    logicalIndexRef.current = clamped;
    const rawTarget = -clamped * cardStepRef.current;
    const target = Math.max(-maxScroll, Math.min(0, rawTarget));
    setIndex(clamped);
    animate(x, target, SPRING);
  };

  // Manual prev/next while autoplay is running — there's no fixed index to
  // clamp to (it's an infinite loop), so this just steps the current
  // position by one card in its real direction, then rebases home the same
  // way advance does, and briefly pauses the marquee so the two motions
  // don't fight over the same frame.
  const nudge = async (direction) => {
    setIsNudging(true);
    const loopWidth = slides.length * cardStepRef.current;
    await stepBy(direction, loopWidth);
    setIsNudging(false);
  };

  // Card width/gap and the track's total scrollable distance both change
  // across breakpoints (1 card visible on mobile, ~3 on desktop) purely
  // via CSS, so this measures the real DOM instead of hardcoding numbers
  // per breakpoint.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const measure = () => {
      const firstCard = track.children[0];
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const trackStyles = getComputedStyle(track);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;
      cardStepRef.current = cardWidth + gap;
      baseOffsetRef.current = firstCard.offsetLeft;

      const nextMaxScroll = Math.max(0, track.scrollWidth - viewport.getBoundingClientRect().width);
      setMaxScroll(nextMaxScroll);

      // Re-settle at the current index's position so a resize (e.g.
      // desktop → mobile card width) doesn't leave the track misaligned.
      // Loop mode anchors to the home band (see advance/nudge above) instead
      // of the first copy, so there's duplicate buffer on both sides.
      const target = shouldLoop
        ? -(baseOffsetRef.current + LOOP_HOME_COPY * slides.length * cardStepRef.current + logicalIndexRef.current * cardStepRef.current)
        : Math.max(-nextMaxScroll, Math.min(0, -logicalIndexRef.current * cardStepRef.current));
      x.set(target);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [slides, shouldLoop, x]);

  // Continuous marquee scroll — advances every frame rather than snapping
  // card-by-card, wrapping seamlessly once a full lap through the
  // (tripled) slides completes.
  useEffect(() => {
    if (!autoplay || isDragging || isNudging) return undefined;
    let rafId;
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const loopWidth = slides.length * cardStepRef.current;

      if (loopWidth > 0) {
        // Same home band as advance/nudge (see rebaseHome) — wraps at the
        // band's far edge so a manual nudge and the automatic scroll never
        // disagree about where "home" is.
        const bandBottom = -(LOOP_HOME_COPY + 1) * loopWidth;
        let next = x.get() - AUTOPLAY_SPEED * dt;
        if (next <= bandBottom) next += loopWidth;
        x.set(next);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [autoplay, isDragging, isNudging, slides.length, x]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    // Swallow the click that follows a drag release so releasing a drag
    // over the cursor-following arrow doesn't also fire a nudge/advance.
    setTimeout(() => {
      draggedRef.current = false;
    }, 0);
    // Marquee mode has no discrete "index" to snap to — just let the
    // continuous scroll pick back up from wherever the drag released.
    if (autoplay) return;
    const step = cardStepRef.current || 1;
    const projected = x.get() + info.velocity.x * VELOCITY_PROJECTION;

    if (shouldLoop) {
      // Snap by however many cards separate "here" from the projected
      // landing spot — relative to x's current value, same as stepBy,
      // rather than an absolute index that could be stale.
      const loopWidth = slides.length * step;
      const deltaCards = Math.round((x.get() - projected) / step);
      const nextLogical = ((logicalIndexRef.current + deltaCards) % slides.length + slides.length) % slides.length;
      logicalIndexRef.current = nextLogical;
      setIndex(nextLogical);
      stepBy(deltaCards, loopWidth);
      return;
    }

    const clamped = Math.max(0, Math.min(Math.round(-projected / step), slides.length - 1));
    logicalIndexRef.current = clamped;
    const rawTarget = -clamped * step;
    const target = Math.max(-maxScroll, Math.min(0, rawTarget));
    setIndex(clamped);
    animate(x, target, SPRING);
  };

  // Cursor-following single arrow: tracks the pointer within the viewport,
  // pointing "prev" over the left half and "next" over the right half.
  const handlePointerMove = (e) => {
    const rect = viewportRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setCursor({ x: px, y: py, side: px < rect.width / 2 ? 'prev' : 'next', visible: true });
  };

  const handlePointerLeave = () => setCursor((c) => ({ ...c, visible: false }));

  const handleViewportClick = () => {
    if (draggedRef.current) return;
    const direction = cursor.side === 'prev' ? -1 : 1;
    if (autoplay) nudge(direction);
    else advance(direction);
  };

  const cursorDisabled = !shouldLoop && ((cursor.side === 'prev' && index <= 0) || (cursor.side === 'next' && index >= slides.length - 1));

  return (
    <div className={`${styles.sliderWrapper} ${cursorArrows ? styles.cursorArrowsMode : ''}`}>
      <div
        className={styles.viewport}
        ref={viewportRef}
        onMouseMove={cursorArrows ? handlePointerMove : undefined}
        onMouseLeave={cursorArrows ? handlePointerLeave : undefined}
        onClick={cursorArrows ? handleViewportClick : undefined}
      >
        <motion.div
          className={styles.track}
          ref={trackRef}
          style={{ x, touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            setIsDragging(true);
            draggedRef.current = true;
          }}
          onDragEnd={handleDragEnd}
        >
          {renderSlides.map((item, i) => (
            <div key={i} className={styles.card} style={{ aspectRatio: cardAspectRatio }}>
              <Image
                src={item.src}
                alt={item.alt || ''}
                fill
                sizes="(max-width: 768px) 100vw, 517px"
                className={styles.cardImage}
                draggable={false}
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
              {item.label && (
                <div className={styles.labelWrap}>
                  <p className="label-1">{item.label}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {cursorArrows && (
          <div
            className={`${styles.cursorArrow} ${cursor.visible ? styles.cursorArrowVisible : ''} ${cursorDisabled ? styles.cursorArrowDisabled : ''}`}
            style={{ left: cursor.x, top: cursor.y }}
            aria-hidden="true"
          >
            {cursor.side === 'prev' ? (
              <span className={styles.iconFlip}>
                <ArrowIcon />
              </span>
            ) : (
              <ArrowIcon />
            )}
          </div>
        )}
      </div>

      {fixedArrows && (
        <div className={styles.navPair}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => advance(-1)}
            disabled={!shouldLoop && index <= 0}
            aria-label="Previous"
          >
            <span className={styles.iconFlip}>
              <ArrowIcon />
            </span>
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => advance(1)}
            disabled={!shouldLoop && index >= slides.length - 1}
            aria-label="Next"
          >
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}
