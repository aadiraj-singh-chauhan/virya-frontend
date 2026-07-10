'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../css/ImageSlider.module.css';

const CARD_WIDTH = 517;
const GAP = 12;
const SPACER = 58; // matches .track::before, the left-indent spacer

// Shared infinite-loop image slider — same drag/wheel/cursor-follow-button
// mechanics used by the homepage's Industries slider and People Mobility's
// "Where it works" slider.
export default function ImageSlider({ slides, cardAspectRatio = '517 / 288' }) {
  const items = [...slides, ...slides, ...slides];
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const moveByRef = useRef(() => {});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLeftSide, setIsLeftSide] = useState(false);

  const scrollNext = () => {
    moveByRef.current(CARD_WIDTH + GAP);
  };

  const scrollPrev = () => {
    moveByRef.current(-(CARD_WIDTH + GAP));
  };

  const handleSliderClick = () => {
    if (isLeftSide) scrollPrev();
    else scrollNext();
  };

  const handleMouseMove = (e) => {
    const bounds = wrapperRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    setIsLeftSide(e.clientX - bounds.left < bounds.width / 2);
  };

  // The track renders `slides` tripled; we sit in the middle copy and silently
  // snap back by one copy-width whenever the eased scroll drifts into a buffer
  // copy, so the three sets read as one endless loop in either direction.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = slides.length * (CARD_WIDTH + GAP);
    const lowerBound = SPACER + setWidth;
    const upperBound = SPACER + setWidth * 2;
    track.scrollLeft = lowerBound;

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

    const handleWheel = (e) => {
      // Only hijack genuinely horizontal gestures (trackpad two-finger swipe).
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      moveBy(e.deltaX);
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [slides]);

  return (
    <div
      className={styles.sliderWrapper}
      ref={wrapperRef}
      role="button"
      tabIndex={0}
      aria-label={isLeftSide ? 'Previous' : 'Next'}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={handleSliderClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSliderClick()}
    >
      <div className={styles.track} ref={trackRef}>
        {items.map((item, i) => (
          <div key={i} className={styles.card} style={{ aspectRatio: cardAspectRatio }}>
            <Image
              src={item.src}
              alt={item.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 517px"
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay} aria-hidden="true" />
            {item.label && (
              <div className={styles.labelWrap}>
                <p className="label-1">{item.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className={styles.nextBtn}
        aria-hidden="true"
        style={{
          opacity: isHovering ? 1 : 0,
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1 : 0.4})`,
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
  );
}
