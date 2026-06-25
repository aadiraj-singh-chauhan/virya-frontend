'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from '../css/RelatedProducts.module.css';

const SLIDES = [
  {
    src: '/assets/manufacturing-&-industrial-facilities.webp',
    label: 'Manufacturing & Industrial Facilities',
  },
  {
    src: '/assets/warehousing-&-logistics.webp',
    label: 'Warehousing & Logistics',
  },
  {
    src: '/assets/intralogistics-&-supply-chain-operations.webp',
    label: 'Intralogistics & Supply Chain Operations',
  },
];

const CARD_WIDTH = 517;
const GAP = 20;

export default function RelatedProducts() {
  const items = [...SLIDES, ...SLIDES, ...SLIDES];
  const trackRef = useRef(null);

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: CARD_WIDTH + GAP, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>Industries we cater to</h2>

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

        <button className={styles.nextBtn} onClick={scrollNext} aria-label="Next industry">
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
