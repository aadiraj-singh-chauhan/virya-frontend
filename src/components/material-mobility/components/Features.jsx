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

function Tab({ label, active, onClick }) {
  const { display, play, reset } = useScramble(label);

  return (
    <button
      className={`${styles.tabTitle} ${
        active ? styles.tabActive : styles.tabDim
      }`}
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

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            <h2 className="heading-2">
              Designed for How Materials Move
            </h2>

            <div className={styles.tabs}>

              {TABS.map((tab, index) => (
                <div key={tab.label} className={styles.tabItem}>

                  <div className={styles.tabRow}>

                    <Tab
                      label={tab.label}
                      active={active === index}
                      onClick={() => setActive(index)}
                    />

                    <a
                      href={tab.href}
                      className={`${styles.arrow} ${
                        active === index
                          ? styles.arrowVisible
                          : ''
                      }`}
                    >
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 12.5 10.056"
                        fill="none"
                      >
                        <path
                          d="M0 5.028L12.5 5.028"
                          stroke="currentColor"
                        />
                        <path
                          d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056"
                          stroke="currentColor"
                        />
                      </svg>
                    </a>

                  </div>

                  {/* Desktop description */}
                  <p
                    className={`body-1 ${styles.tabDesc} ${
                      active === index
                        ? styles.tabDescVisible
                        : ''
                    }`}
                  >
                    {tab.desc}
                  </p>

                  {/* Mobile */}
                  {active === index && (
                    <div className={styles.mobileContent}>

                      <p className={`body-1 ${styles.mobileDesc}`}>
                        {tab.desc}
                      </p>

                      <div className={styles.mobileLabels}>
                        {tab.labels.map((item) => (
                          <div
                            key={item}
                            className={styles.mobileLabel}
                          >
                            <span className={styles.labelDot} />
                            <span className="label-2">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

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
                  )}

                </div>
              ))}

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
                <div
                  key={item}
                  className={styles.labelItem}
                >
                  <span className={styles.labelDot} />
                  <span className="label-2">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}