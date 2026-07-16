'use client';

import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css/core';
import styles from '../css/Features.module.css';

const CARDS = [
  { id: 'autonomous', video: '/assets/pm-autonomous.mp4', label: 'Autonomous', overlay: true },
  { id: 'reliable', video: '/assets/pm-Indoor-outdoor.mp4', label: 'Reliable across indoor and outdoor spaces' },
  { id: 'safe', video: '/assets/pm-dynamic-environments.mp4', label: 'Safe in dynamic environments' },
];

// Matches ImageSlider's marquee speed.
const AUTO_SCROLL_SPEED = 1; // px/frame

function Card({ card }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <video
          src={card.video}
          autoPlay
          loop
          muted
          playsInline
          aria-label={card.label}
          className={styles.image}
        />
        {card.overlay && <div className={styles.overlay} />}
      </div>
      <div className={styles.cardLabel}>
        <span className="title-2 label-3-md">{card.label}</span>
      </div>
    </div>
  );
}

export default function Features() {
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    gridRef.current?.querySelectorAll('video').forEach((v) => v.play().catch(() => {}));
  }, [isMobile]);

  const options = {
    type: 'loop',
    autoWidth: true,
    gap: '24px',
    padding: { left: '20px', right: '20px' },
    arrows: false,
    pagination: false,
    drag: true,
    autoScroll: { speed: AUTO_SCROLL_SPEED, autoStart: true, pauseOnHover: false, pauseOnFocus: false },
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2 className="heading-2 heading-2-md">Facilities Are Getting Smarter Mobility<br />Should Too</h2>
          <p className={`body-1 body-1-md ${styles.desc}`}>
            Factories, research campuses, and logistics facilities are adopting automation everywhere
            from production lines to warehouses. To truly optimize operations, mobility must become:
          </p>
        </div>

        <div ref={gridRef}>
          {isMobile ? (
            <Splide options={options} extensions={{ AutoScroll }} aria-label="Features slider" className={styles.splideWrapper}>
              {CARDS.map((card) => (
                <SplideSlide key={card.id}>
                  <Card card={card} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            <div className={styles.grid}>
              {CARDS.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
