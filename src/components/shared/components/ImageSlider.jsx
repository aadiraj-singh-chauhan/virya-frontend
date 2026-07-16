'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css/core';
import styles from '../css/ImageSlider.module.css';

const AUTO_SCROLL_SPEED = 1; // px/frame

const CLICK_DRAG_TOLERANCE = 10; // px

function ArrowIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 13.81 11.109" fill="none" aria-hidden="true">
      <path d="M0 5.554L13.81 5.554" stroke="currentColor" />
      <path d="M6.6 0L8.8 0L13.81 5.554L8.8 11.109L6.6 11.109" stroke="currentColor" />
    </svg>
  );
}

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

  const shouldLoop = autoplay || slides.length < 4;

  const splideRef = useRef(null);
  const arrowRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState('next');
  const [visible, setVisible] = useState(false);
  const downPosRef = useRef(null);

  const options = {
    type: shouldLoop ? 'loop' : 'slide',
    clones: shouldLoop ? slides.length * 4 : undefined,
    speed: 600,
    easing: 'cubic-bezier(0.45, 0, 0.15, 1)',
    autoWidth: true,
    gap: '12px',
    padding: { left: '58px', right: 0 },
    arrows: false,
    pagination: false,
    drag: true,
    keyboard: 'focused',
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
