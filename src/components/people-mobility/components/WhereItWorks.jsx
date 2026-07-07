'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../css/WhereItWorks.module.css';

const SLIDES = [
  { src: '/assets/pm-airports.png', label: 'Airports' },
  { src: '/assets/pm-warehousing.png', label: 'Warehousing & Logistics' },
  { src: '/assets/pm-ports.png', label: 'Ports & Shipyards' },
];

const GAP = 20;

export default function WhereItWorks() {
  const items = [...SLIDES, ...SLIDES, ...SLIDES];
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const moveByRef = useRef(() => {});
  const cardStepRef = useRef(0);
  const swipedRef = useRef(false);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLeftSide, setIsLeftSide] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);

  const handleSliderClick = () => {
    if (swipedRef.current) return;
    if (isLeftSide) moveByRef.current(-cardStepRef.current);
    else moveByRef.current(cardStepRef.current);
  };

  const handleMouseMove = (e) => {
    const bounds = wrapperRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    setIsLeftSide(e.clientX - bounds.left < bounds.width / 2);
  };

  // React touch handlers — only update arrow position state
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const bounds = wrapperRef.current.getBoundingClientRect();
    const x = touch.clientX - bounds.left;
    const y = touch.clientY - bounds.top;
    setTouchPos({ x, y });
    setIsTouching(true);
    setIsLeftSide(x < bounds.width / 2);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const bounds = wrapperRef.current.getBoundingClientRect();
    setTouchPos({ x: touch.clientX - bounds.left, y: touch.clientY - bounds.top });
    setIsLeftSide(touch.clientX - bounds.left < bounds.width / 2);
  };

  const handleTouchEnd = () => setIsTouching(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure actual rendered card width and spacer — handles responsive CSS
    const firstCard = track.querySelector(`.${styles.card}`);
    if (!firstCard) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = firstCard.getBoundingClientRect();
    const actualCardWidth = cardRect.width;
    const actualSpacer = Math.round(cardRect.left - trackRect.left);

    const setWidth = SLIDES.length * (actualCardWidth + GAP);
    const lowerBound = actualSpacer + setWidth;
    const upperBound = actualSpacer + setWidth * 2;
    track.scrollLeft = lowerBound;
    cardStepRef.current = actualCardWidth + GAP;

    let target = lowerBound;
    let rafId = null;

    const wrapIfNeeded = () => {
      if (track.scrollLeft < lowerBound) {
        track.scrollLeft += setWidth;
        target += setWidth;
      } else if (track.scrollLeft >= upperBound) {
        track.scrollLeft -= setWidth;
        target -= setWidth;
      }
    };

    const ease = () => {
      wrapIfNeeded();
      const current = track.scrollLeft;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        track.scrollLeft = target;
        rafId = null;
        wrapIfNeeded();
        return;
      }
      track.scrollLeft = current + diff * 0.15;
      rafId = requestAnimationFrame(ease);
    };

    const moveBy = (delta) => {
      if (!rafId) target = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      target = Math.min(Math.max(target + delta, 0), max);
      if (!rafId) rafId = requestAnimationFrame(ease);
    };
    moveByRef.current = moveBy;

    // Desktop: wheel
    const handleWheel = (e) => {
      // Only hijack genuinely horizontal gestures (trackpad two-finger swipe).
      // This used to preventDefault() on every wheel event unconditionally,
      // so a normal vertical scroll over this slider silently ate the whole
      // page's scroll input — the page couldn't advance past this section
      // until the cursor moved off it.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      moveBy(e.deltaX);
    };

    // Mobile: JS-driven touch scroll — same easing + infinite loop as desktop
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchX = 0;
    let isHorizontal = null;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lastTouchX = touchStartX;
      isHorizontal = null;
      swipedRef.current = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      target = track.scrollLeft;
    };

    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (isHorizontal === null) isHorizontal = Math.abs(dx) > Math.abs(dy);
      if (!isHorizontal) return;
      e.preventDefault();
      swipedRef.current = true;
      const delta = lastTouchX - e.touches[0].clientX;
      lastTouchX = e.touches[0].clientX;
      moveBy(delta);
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      track.removeEventListener('wheel', handleWheel);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const showBtn = isHovering || isTouching;
  const btnX = isTouching ? touchPos.x : cursorPos.x;
  const btnY = isTouching ? touchPos.y : cursorPos.y;

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Where it works</h2>
        <p className="body-1 body-1-md">Designed for Large-Scale Facilities</p>
      </div>

      <div
        className={styles.sliderWrapper}
        ref={wrapperRef}
        role="button"
        tabIndex={0}
        aria-label={isLeftSide ? 'Previous location' : 'Next location'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={handleSliderClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSliderClick()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.track} ref={trackRef}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 767px) 82vw, 517px"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
              <div className={styles.labelWrap}>
                <p className="label-1 label-1-md">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={styles.nextBtn}
          aria-hidden="true"
          style={{
            opacity: showBtn ? 1 : 0,
            transform: `translate3d(${btnX}px, ${btnY}px, 0) translate(-50%, -50%) scale(${showBtn ? 1 : 0.4})`,
          }}
        >
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            aria-hidden="true"
            style={{ transform: isLeftSide ? 'rotate(180deg)' : 'none' }}
          >
            <path
              d="M0.5 6H13.5M13.5 6L8 1M13.5 6L8 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
