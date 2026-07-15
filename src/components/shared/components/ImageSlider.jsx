'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css/core';
import styles from '../css/ImageSlider.module.css';

// Matches the previous hand-rolled marquee's ~60px/sec at 60fps.
const AUTO_SCROLL_SPEED = 1; // px/frame

// How far the pointer may move between mousedown and click before it's
// treated as a drag rather than a click — matches dragMinThreshold.mouse
// below, so our own click/drag call agrees with Splide's.
const CLICK_DRAG_TOLERANCE = 10; // px

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

// Shared slider — built on Splide (drag/swipe, loop, autoplay marquee all
// handled by the library) instead of a hand-rolled drag implementation.
// `arrows` accepts true (a fixed prev/next pair below the track), false
// (hidden), or 'hover' (a single arrow that follows the cursor over the
// track, flips to point the other way over the left half, and shows/hides
// with hover — used by TeamGallery and the homepage Industries slider).
export default function ImageSlider({
  slides,
  cardAspectRatio = '517 / 288',
  autoplay = false,
  arrows = true,
  mobileCardWidth = '400px',
  mobileCardHeight = '320px',
}) {
  const fixedArrows = arrows === true;
  const cursorArrows = arrows === 'hover';

  // With fewer than 4 slides, the real scrollable range is often shorter
  // than the viewport, so a plain 'slide' type has nowhere to go — loop
  // mode keeps prev/next feeling like a real carousel instead of stalling.
  const shouldLoop = autoplay || slides.length < 4;

  const splideRef = useRef(null);
  const arrowRef = useRef(null);
  const [index, setIndex] = useState(0);
  // side/visible change rarely (only on enter/leave or crossing the
  // midpoint), so they're fine as state. Position changes on every pixel
  // of mouse movement — routing that through setState would re-render the
  // whole tree (including <Splide>, a plain React.Component that redoes a
  // DOM query in componentDidUpdate on every render) dozens of times a
  // second, which is exactly what made hover/click feel janky. It's set
  // directly on the DOM via arrowRef instead, bypassing React entirely.
  const [side, setSide] = useState('next');
  const [visible, setVisible] = useState(false);
  // Where the pointer was on mousedown — handleViewportClick compares this
  // against the click's own position to tell a real click from a drag that
  // ended over the arrow. Splide's EVENT_DRAG (which onDrag/onDragged would
  // report) fires unconditionally on the very first pointermove after
  // mousedown regardless of dragMinThreshold, so it can't be used for this;
  // measuring the actual distance ourselves is what lets a real click
  // survive the couple of pixels of natural hand jitter.
  const downPosRef = useRef(null);

  const options = {
    type: shouldLoop ? 'loop' : 'slide',
    autoWidth: true,
    gap: '12px',
    padding: { left: '58px', right: 0 },
    arrows: false,
    pagination: false,
    drag: true,
    // Arrow-key navigation while the slider has focus — the standard,
    // built-in equivalent of the role="button"/onKeyDown Enter-or-Space
    // handling the pre-Splide custom sliders wired up by hand.
    keyboard: 'focused',
    // Splide's default drag threshold is 0px for mouse (10px for touch) —
    // any mouse movement at all during a click, even the couple of pixels
    // of natural hand jitter, gets treated as a drag. Its own click
    // handler then stops the click from ever reaching our onClick (bound
    // higher up on .viewport), so the cursor-arrow click-to-navigate would
    // silently fail on real mouse input almost every time. Matching touch's
    // threshold gives mouse clicks the same forgiveness.
    dragMinThreshold: { mouse: 10, touch: 10 },
    autoScroll: autoplay
      ? { speed: AUTO_SCROLL_SPEED, autoStart: true, pauseOnHover: false, pauseOnFocus: false }
      : undefined,
    breakpoints: {
      768: {
        padding: { left: '4px', right: 0 },
      },
    },
  };

  const go = (control) => splideRef.current?.go(control);

  // Cursor-following single arrow: tracks the pointer within the viewport,
  // pointing "prev" over the left half and "next" over the right half.
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (arrowRef.current) {
      arrowRef.current.style.left = `${px}px`;
      arrowRef.current.style.top = `${py}px`;
    }
    const nextSide = px < rect.width / 2 ? 'prev' : 'next';
    setSide((s) => (s === nextSide ? s : nextSide));
    setVisible((v) => (v ? v : true));
  };

  const handlePointerLeave = () => setVisible(false);

  const handlePointerDown = (e) => {
    downPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleViewportClick = (e) => {
    const down = downPosRef.current;
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > CLICK_DRAG_TOLERANCE) return;
    go(side === 'prev' ? '<' : '>');
  };

  const cursorDisabled = !shouldLoop && ((side === 'prev' && index <= 0) || (side === 'next' && index >= slides.length - 1));

  return (
    <div
      className={`${styles.sliderWrapper} ${cursorArrows ? styles.cursorArrowsMode : ''}`}
      style={{ '--mobile-card-width': mobileCardWidth, '--mobile-card-height': mobileCardHeight }}
    >
      <div
        className={styles.viewport}
        onMouseMove={cursorArrows ? handlePointerMove : undefined}
        onMouseLeave={cursorArrows ? handlePointerLeave : undefined}
        onMouseDown={cursorArrows ? handlePointerDown : undefined}
        onClick={cursorArrows ? handleViewportClick : undefined}
      >
        <Splide
          ref={splideRef}
          options={options}
          extensions={autoplay ? { AutoScroll } : undefined}
          onMoved={(splide, newIndex) => setIndex(newIndex)}
          aria-label="Image slider"
        >
          {slides.map((item, i) => (
            <SplideSlide key={i}>
              <div className={styles.card} style={{ aspectRatio: cardAspectRatio }}>
                <Image
                  src={item.src}
                  alt={item.alt || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 517px"
                  className={styles.cardImage}
                  draggable={false}
                  priority={i === 0}
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                {item.label && (
                  <div className={styles.labelWrap}>
                    <p className="label-1">{item.label}</p>
                  </div>
                )}
              </div>
            </SplideSlide>
          ))}
        </Splide>

        {cursorArrows && (
          <div
            ref={arrowRef}
            className={`${styles.cursorArrow} ${visible ? styles.cursorArrowVisible : ''} ${cursorDisabled ? styles.cursorArrowDisabled : ''}`}
            aria-hidden="true"
          >
            {side === 'prev' ? (
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
            onClick={() => go('<')}
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
            onClick={() => go('>')}
            disabled={!shouldLoop && index >= slides.length - 1}
            aria-label="Next"
          >
            <ArrowIcon />
          </button>
        </div>
      )}

      {/* Touch has no hover, so the cursor-following arrow never appears —
          swap it for a static prev/next pair under the bottom-right of the
          slider on mobile instead (desktop keeps the cursor arrow). */}
      {cursorArrows && (
        <div className={`${styles.navPair} ${styles.navPairMobile}`}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go('<')}
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
            onClick={() => go('>')}
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
