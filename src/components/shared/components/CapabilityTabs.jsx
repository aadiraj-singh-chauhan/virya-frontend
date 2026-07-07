'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/CapabilityTabs.module.css';

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

// Shared by Material Mobility's "Designed for How Materials Move" and the
// Technology page's "Redundant Localization Across All Facility Layouts" —
// both use the exact same tab labels, descriptions and checklist copy.
//
// `centered` mirrors a layout difference between the two Figma designs:
// Material Mobility's heading sits left-aligned inside the text column,
// while Technology's tag + heading run full-width and centered above both
// columns.
export default function CapabilityTabs({ heading, intro, tag, tabs, centered = false }) {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">

        {centered && (
          <div className={styles.centeredHead}>
            {tag && (
              <div className={styles.centeredTag}>
                <span className={styles.tagDot} aria-hidden="true" />
                <span className="label-2">{tag.label}</span>
              </div>
            )}
            <h2 className="heading-2">{heading}</h2>
          </div>
        )}

        <div className={styles.inner}>

          <div className={styles.textCol}>
            {!centered && <h2 className="heading-2">{heading}</h2>}

            {intro && <p className={`body-1 ${styles.intro}`}>{intro}</p>}

            <div className={styles.tabs}>

              {tabs.map((tab, index) => (
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

            {tag && !centered && (
              <div className={styles.tag}>
                <span className={styles.tagDot} aria-hidden="true" />
                <span className="label-2">{tag.label}</span>
              </div>
            )}

            <Image
              src={tabs[active].image}
              alt=""
              fill
              className={styles.image}
              sizes="676px"
            />

            <div className={styles.imageOverlay} />

            <div className={styles.labels}>
              {tabs[active].labels.map((item) => (
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
