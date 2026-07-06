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
    labels: [
      'Auto hitching and unhitching',
      'Long-distance navigation',
      'Multi-load handling',
      'Fleet-based coordination',
    ],
    href: '/products/amr50',
  },
  {
    label: 'Lifting',
    desc: 'Precise vertical movement for safe and efficient material handling.',
    image: '/assets/mm-feature-tugging.webp',
    labels: [
      'Variable load capacity',
      'Precision lift control',
      'Safe vertical transport',
      'Automated stacking',
    ],
    href: '/products/apt20',
  },
  {
    label: 'Tunnelling',
    desc: 'Navigating tight spaces and confined environments with ease.',
    image: '/assets/mm-feature-tugging.webp',
    labels: [
      'Narrow aisle navigation',
      'Compact footprint',
      'Obstacle detection',
      'High maneuverability',
    ],
    href: '/products/amr10',
  },
];

function Tab({ label, active, expanded, onClick }) {
  const { display, play, reset } = useScramble(label);

  return (
    <button
      type="button"
      className={`title-1 title-1-md ${styles.tabTitle} ${
        active ? styles.tabActive : styles.tabDim
      }`}
      aria-expanded={expanded}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <span className={styles.textOriginal}>{label}</span>
      <span className={styles.textDisplay}>{display || label}</span>
    </button>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(null);

  const handleTabClick = (index) => {
    setActive(index);
    setMobileActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            <h2 className="heading-2 heading-2-md">
              Designed for How Materials Move
            </h2>

            <div className={styles.tabs}>

              {TABS.map((tab, index) => {
                const isOpen = mobileActive === index;

                return (
                  <div key={tab.label} className={styles.tabItem}>

                    <div className={styles.tabRow}>

                      <Tab
                        label={tab.label}
                        active={active === index}
                        expanded={isOpen}
                        onClick={() => handleTabClick(index)}
                      />

                      <span
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>

                    </div>

                    {/* Desktop description */}
                    <p
                      className={`body-1 ${styles.tabDesc} ${
                        active === index ? styles.tabDescVisible : ''
                      }`}
                    >
                      {tab.desc}
                    </p>

                    {/* Mobile accordion */}
                    <div
                      className={`${styles.mobileContent} ${isOpen ? styles.mobileContentOpen : ''}`}
                      aria-hidden={!isOpen}
                    >

                      <p className={`body-1-md ${styles.mobileDesc}`}>
                        {tab.desc}
                      </p>

                      <div className={styles.mobileLabels}>
                        {tab.labels.map((item) => (
                          <div key={item} className={styles.mobileLabel}>
                            <span className={styles.labelDot} />
                            <span className="label-2-md">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Image — set path in the TABS array above (tab.image) */}
                      <div className={styles.mobileImage}>
                        <Image
                          src={tab.image}
                          alt=""
                          fill
                          className={styles.image}
                          sizes="100vw"
                        />
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* Desktop Image */}
          <div className={styles.desktopImage}>

            <Image
              src={TABS[active].image}
              alt=""
              fill
              className={styles.image}
              sizes="676px"
            />

            <div className={styles.imageOverlay} />

            <div className={styles.labels}>
              {TABS[active].labels.map((item) => (
                <div key={item} className={styles.labelItem}>
                  <span className={styles.labelDot} />
                  <span className="label-2">{item}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
