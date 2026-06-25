'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from '../css/WhereItWorks.module.css';

const SLIDES = [
  { src: '/assets/pm-airports.png', label: 'Airports' },
  { src: '/assets/pm-warehousing.png', label: 'Warehousing & Logistics' },
  { src: '/assets/pm-ports.png', label: 'Ports & Shipyards' },
];

const CARD_WIDTH = 517;
const GAP = 20;

export default function WhereItWorks() {
  const items = [...SLIDES, ...SLIDES, ...SLIDES];
  const trackRef = useRef(null);

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: CARD_WIDTH + GAP, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.header}>
        <h2 className="heading-2">Where it works</h2>
        <p className="body-1">Designed for Large-Scale Facilities</p>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.track} ref={trackRef}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <Image
                src={item.src}
                alt={item.label}
                fill
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
              <div className={styles.labelWrap}>
                <p className="label-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.nextBtn} onClick={scrollNext} aria-label="Next location">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
            <path
              d="M0.5 6H13.5M13.5 6L8 1M13.5 6L8 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
