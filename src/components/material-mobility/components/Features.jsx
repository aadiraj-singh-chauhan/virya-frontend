'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Features.module.css';

const TABS = [
  {
    label: 'Tugging',
    desc: 'For continuous, high-volume movement across long distances.',
    image: '/assets/mm-feature-tugging.webp',
    labels: ['Auto hitching and unhitching', 'Long-distance navigation', 'Multi-load handling', 'Fleet-based coordination'],
    href: '/products/amr50',
  },
  {
    label: 'Lifting',
    desc: 'Precise vertical movement for safe and efficient material handling.',
    image: '/assets/mm-feature-tugging.webp',
    labels: ['Variable load capacity', 'Precision lift control', 'Safe vertical transport', 'Automated stacking'],
    href: '/products/apt20',
  },
  {
    label: 'Tunnelling',
    desc: 'Navigating tight spaces and confined environments with ease.',
    image: '/assets/mm-feature-tugging.webp',
    labels: ['Narrow aisle navigation', 'Compact footprint', 'Obstacle detection', 'High maneuverability'],
    href: '/products/amr10',
  },
];

function Tab({ label, active, onClick }) {
  const { display, play, reset } = useScramble(label);
  return (
    <button
      className={`${styles.tabTitle} ${active ? styles.tabActive : styles.tabDim}`}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <span className={styles.textOriginal}>{label}</span>
      <span className={styles.textDisplay} aria-hidden="true">{display || label}</span>
    </button>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            <h2 className="heading-2">Designed for How Materials Move</h2>

            <div className={styles.tabs}>
              {TABS.map((t, i) => (
                <div key={t.label} className={styles.tabItem}>
                  <div className={styles.tabRow}>
                    <Tab
                      label={t.label}
                      active={active === i}
                      onClick={() => setActive(i)}
                    />
                    <a
                      href={t.href}
                      className={`${styles.arrow} ${active === i ? styles.arrowVisible : ''}`}
                      aria-label={`Learn more about ${t.label}`}
                      tabIndex={active === i ? 0 : -1}
                    >
                      <svg width="20" height="16" viewBox="0 0 12.5 10.056" fill="none" aria-hidden="true">
                        <path d="M 0 5.028 L 12.5 5.028" stroke="currentColor" strokeWidth="1" />
                        <path d="M 6 0 L 8 0 L 12.5 5.028 L 8 10.056 L 6 10.056" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </a>
                  </div>
                  <p className={`body-1 ${styles.tabDesc} ${active === i ? styles.tabDescVisible : ''}`}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageCol}>
            <Image key={active} src={tab.image} alt="" fill className={styles.image} />
            <div className={styles.imageOverlay} aria-hidden="true" />
            <div className={styles.labels}>
              {tab.labels.map(l => (
                <div key={l} className={styles.labelItem}>
                  <span className={styles.labelDot} aria-hidden="true" />
                  <span className="label-2">{l}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
