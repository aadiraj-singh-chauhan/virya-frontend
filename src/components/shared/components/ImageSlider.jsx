'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';
import styles from '../css/ImageSlider.module.css';

const SPRING = { type: 'spring', stiffness: 300, damping: 30 };
const AUTOPLAY_INTERVAL = 3000;
// How much of the release velocity to project forward before picking the
// nearest card — this is what gives the "keeps momentum, then snaps"
// feel instead of always snapping to whatever card is nearest at the
// instant your finger/cursor lifts.
const VELOCITY_PROJECTION = 0.15;

function ArrowIcon({ flipped = false }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      aria-hidden="true"
      style={{ transform: flipped ? 'rotate(180deg)' : 'none' }}
    >
      <path
        d="M0.5 6H13.5M13.5 6L8 1M13.5 6L8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Shared drag/spring image slider — same mechanics used by the homepage's
// Industries slider, amr10's Industries slider, and careers' TeamGallery.
// `autoplay` and `arrows` default to a plain arrow-driven slider; careers'
// TeamGallery opts into autoplay with the arrows hidden instead.
export default function ImageSlider({ slides, cardAspectRatio = '517 / 288', autoplay = false, arrows = true }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardStepRef = useRef(0);
  const indexRef = useRef(0);
  const x = useMotionValue(0);

  const [index, setIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  indexRef.current = index;

  const goTo = (nextIndex) => {
    const clamped = Math.max(0, Math.min(nextIndex, slides.length - 1));
    const rawTarget = -clamped * cardStepRef.current;
    const target = Math.max(-maxScroll, Math.min(0, rawTarget));
    setIndex(clamped);
    animate(x, target, SPRING);
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

      const nextMaxScroll = Math.max(0, track.scrollWidth - viewport.getBoundingClientRect().width);
      setMaxScroll(nextMaxScroll);

      // Re-settle at the current index's position so a resize (e.g.
      // desktop → mobile card width) doesn't leave the track misaligned.
      const target = Math.max(-nextMaxScroll, Math.min(0, -indexRef.current * cardStepRef.current));
      x.set(target);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [slides, x]);

  useEffect(() => {
    if (!autoplay || isDragging || isHovering) return undefined;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % slides.length;
        const target = Math.max(-maxScroll, Math.min(0, -next * cardStepRef.current));
        animate(x, target, SPRING);
        return next;
      });
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, isDragging, isHovering, maxScroll, slides.length, x]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const step = cardStepRef.current || 1;
    const projected = x.get() + info.velocity.x * VELOCITY_PROJECTION;
    goTo(Math.round(-projected / step));
  };

  return (
    <div
      className={styles.sliderWrapper}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.viewport} ref={viewportRef}>
        <motion.div
          className={styles.track}
          ref={trackRef}
          style={{ x, touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {slides.map((item, i) => (
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
      </div>

      {arrows && (
        <div className={styles.navPair}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(index - 1)}
            disabled={index <= 0}
            aria-label="Previous"
          >
            <ArrowIcon flipped />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(index + 1)}
            disabled={index >= slides.length - 1}
            aria-label="Next"
          >
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}
