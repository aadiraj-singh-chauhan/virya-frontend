'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import Button from '@/components/ui/Button';
import styles from '../css/CapabilityTabs.module.css';

function TabRow({ label, active, expanded, onClick }) {
  const { display, play, reset } = useScramble(label);

  return (
    <button
      type="button"
      className={styles.tabRow}
      aria-expanded={expanded}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <span
        className={`title-1 title-1-md ${styles.tabTitle} ${
          active ? styles.tabActive : styles.tabDim
        }`}
      >
        <span className={styles.textOriginal}>{label}</span>
        <span className={styles.textDisplay}>{display || label}</span>
      </span>

      <span
        className={`${styles.arrow} ${active ? styles.arrowVisible : ''}`}
        aria-hidden="true"
      >
        <svg width="20" height="16" viewBox="0 0 12.5 10.056" fill="none">
          <path d="M0 5.028L12.5 5.028" stroke="currentColor" />
          <path d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056" stroke="currentColor" />
        </svg>
      </span>

      <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`} aria-hidden="true">
        <svg width="19" height="19" viewBox="0 0 19.28 18.91" fill="none">
          <path d="M9.64 0V7.42" stroke="currentColor" strokeWidth="1.112" />
          <path d="M9.64 11.49V18.91" stroke="currentColor" strokeWidth="1.112" />
          <path d="M0 9.46H7.42" stroke="currentColor" strokeWidth="1.112" />
          <path d="M11.86 9.46H19.28" stroke="currentColor" strokeWidth="1.112" />
        </svg>
      </span>
    </button>
  );
}

export default function CapabilityTabs({ heading, intro, tag, tabs, centered = false }) {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(null);

  const handleTabClick = (index) => {
    setActive(index);
    setMobileActive((prev) => (prev === index ? null : index));
  };

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
            <h2 className="heading-2 heading-2-md">{heading}</h2>
          </div>
        )}

        <div className={styles.inner}>

          <div className={styles.textCol}>
            {!centered && <h2 className="heading-2 heading-2-md">{heading}</h2>}

            {intro && <p className={`body-1 ${styles.intro}`}>{intro}</p>}

            <div className={styles.tabs}>

              {tabs.map((tab, index) => {
                const isOpen = mobileActive === index;

                return (
                  <div key={tab.label} className={styles.tabItem}>

                    <TabRow
                      label={tab.label}
                      active={active === index}
                      expanded={isOpen}
                      onClick={() => handleTabClick(index)}
                    />

                    <p
                      className={`body-1 ${styles.tabDesc} ${
                        active === index
                          ? styles.tabDescVisible
                          : ''
                      }`}
                    >
                      {tab.desc}
                    </p>

                    {tab.ctas && (
                      <div
                        className={`${styles.ctas} ${
                          active === index ? styles.ctasVisible : ''
                        }`}
                      >
                        {tab.ctas.map((cta) => (
                          <Button
                            key={cta.label}
                            href={cta.href}
                            property1="Variant2"
                            size="Button-2"
                          >
                            {cta.label}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`${styles.mobileContent} ${isOpen ? styles.mobileContentOpen : ''}`}
                      aria-hidden={!isOpen}
                    >

                      <p className={`body-1-md ${styles.mobileDesc}`}>
                        {tab.desc}
                      </p>

                      {tab.ctas && (
                        <div className={styles.mobileCtas}>
                          {tab.ctas.map((cta) => (
                            <Button
                              key={cta.label}
                              href={cta.href}
                              property1="Variant2"
                              size="Button-2"
                            >
                              {cta.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className={styles.mobileLabels}>
                        {tab.labels.map((item) => (
                          <div
                            key={item}
                            className={styles.mobileLabel}
                          >
                            <span className={styles.labelDot} />
                            <span className="label-2-md">
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

                  </div>
                );
              })}

            </div>
          </div>

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
