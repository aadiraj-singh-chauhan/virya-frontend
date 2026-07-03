'use client';

import { useRef, useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Industries.module.css';

const SLIDES = [
  {
    src: '/assets/manufacturing-&-industrial-facilities.webp',
    label: 'Manufacturing &\nIndustrial Facilities',
  },
  {
    src: '/assets/warehousing-&-logistics.webp',
    label: 'Warehousing &\nLogistics',
  },
  {
    src: '/assets/intralogistics-&-supply-chain-operations.webp',
    label: 'Intralogistics & Supply\nChain Operations',
  },
];

const CTAS = [
  {
    eyebrow: 'Connect with us',
    heading: 'Curious about how our solutions can transform your factory?',
    cta: 'Contact us',
    href: '/contact',
  },
  {
    eyebrow: 'Join our team',
    heading: 'Passionate about impactful tech? Join our team',
    cta: 'Explore careers',
    href: '/careers',
  },
];

const CARD_WIDTH = 517;
const GAP = 20;
const SPACER = 50; // matches .track::before, the left-indent spacer

export default function Industries() {
  const items = [...SLIDES, ...SLIDES, ...SLIDES];
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const moveByRef = useRef(() => {});
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const scrollNext = () => {
    moveByRef.current(CARD_WIDTH + GAP);
  };

  const handleMouseMove = (e) => {
    const bounds = wrapperRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  // The track renders SLIDES tripled; we sit in the middle copy and silently
  // snap back by one copy-width whenever the eased scroll drifts into a buffer
  // copy, so the three sets read as one endless loop in either direction.
  // Wheel and click both drive this same loop so only one thing ever writes
  // to scrollLeft — avoids fighting with a separately-driven native scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = SLIDES.length * (CARD_WIDTH + GAP);
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
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault();
      moveBy(delta);
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <section className={styles.section} data-header-theme="light">
        <h2 className={`heading-2 ${styles.heading}`}>Industries we cater to</h2>

        <div
          className={styles.sliderWrapper}
          ref={wrapperRef}
          role="button"
          tabIndex={0}
          aria-label="Next industry"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={scrollNext}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollNext()}
        >
          <div className={styles.track} ref={trackRef}>
            {items.map((item, i) => (
              <div key={i} className={styles.card}>
                <Image
                  src={item.src}
                  alt={item.label.replace('\n', ' ')}
                  fill
                  sizes="(max-width: 768px) 100vw, 517px"
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.labelWrap}>
                  <p className="label-1">{item.label}</p>
                </div>
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
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
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

      <section className={styles.cta} data-header-theme="light">
        <div className={styles.ctaContainer}>
          {CTAS.map(({ eyebrow, heading, cta, href }, i) => (
            <Fragment key={href}>
              {i > 0 && <div className={styles.ctaDivider} aria-hidden="true" />}
              <div className={styles.ctaBlock}>
                <p className="label-2">{eyebrow}</p>
                <p className={`title-1 ${styles.ctaTitle}`}>{heading}</p>
                <Button href={href} property1="Default" size="Button-2">{cta}</Button>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
