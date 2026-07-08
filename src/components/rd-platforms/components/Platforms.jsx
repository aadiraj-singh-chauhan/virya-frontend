'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Platforms.module.css';

const FEATURES = [
  'Multi-Sensor Perception',
  'Autonomous Navigation Testing',
  'SLAM & Mapping',
  'ROS-Compatible Development',
  'Modular Design',
];

const DESCRIPTION = "Lorem ipsum dolor sit amet consectetur. Viverra suscipit ut aliquet eu vestibulum mattis amet. In fermentum";

const PLATFORMS = [
  { title: 'Mini Robot Sensor Platform', expandedTitle: 'Sensor Carts' },
  { title: 'AMR10 Dev Platform',          expandedTitle: 'AMR10 Dev Platform' },
  { title: '4-Seater Skateboard Platform', expandedTitle: '4-Seater Skateboard Platform' },
  { title: 'APM for R&D',                 expandedTitle: 'APM for R&D' },
  { title: 'DBW Buggy for R&D',           expandedTitle: 'DBW Buggy for R&D' },
];

export default function Platforms() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 heading-2-md ${styles.title}`}>Drive By Wire research platform</h2>

      <div className={styles.list}>
        {PLATFORMS.map((platform, i) => (
          <PlatformRow
            key={platform.title}
            platform={platform}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}

function PlatformRow({ platform, open, onToggle }) {
  const { display, play, reset } = useScramble(platform.title.toUpperCase());

  return (
    <div className={`${styles.row} ${open ? styles.rowOpen : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        onMouseEnter={play}
        onMouseLeave={reset}
        aria-expanded={open}
      >
        <span className={`title-1 title-1-md ${styles.rowTitle}`}>
          <span className={styles.rowTitleOriginal}>{platform.title}</span>
          <span className={styles.rowTitleDisplay} aria-hidden="true">{display}</span>
        </span>

        {!open && (
          <>
            <span className={styles.crosshair} aria-hidden="true">
              <CrosshairIcon />
            </span>
            <div className={styles.thumbWrap} aria-hidden="true">
              <Image src="/assets/rd-platforms-dbw-thumb.webp" alt="" fill sizes="310px" className={styles.thumb} />
            </div>
          </>
        )}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelImageWrap}>
            <Image
              src="/assets/rd-platforms-dbw-sensor-carts.webp"
              alt={platform.expandedTitle}
              fill
              sizes="626px"
              className={styles.panelImage}
            />
          </div>

          <h3 className={`title-1 title-1-md ${styles.panelTitle}`}>{platform.expandedTitle}</h3>
          <p className={`body-1 body-1-md ${styles.panelDesc}`}>{DESCRIPTION}</p>

          <div className={styles.features}>
            {FEATURES.map((feature) => (
              <span key={feature} className={styles.feature}>
                <span className={styles.featureDot} aria-hidden="true" />
                <span className="label-1 label-2-md">{feature}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CrosshairIcon() {
  return (
    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" aria-hidden="true">
      <path d="M15 0V12M15 17V29M0 14.5H12M18 14.5H30" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
