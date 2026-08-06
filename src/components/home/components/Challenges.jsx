'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Challenges.module.css';

export default function Challenges() {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    [videoRef, mobileVideoRef].forEach((ref) => {
      if (ref.current) {
        ref.current.muted = true;
        ref.current.play().catch(() => {});
      }
    });
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.titleSection}>
        <h2 className="heading-2 heading-2-md">Every Operation Has Different Challenges!</h2>
        <p className={`body-1 body-1-md ${styles.subtitle}`}>
          Factories, warehouses, and industrial campuses all have unique logistics problems
        </p>
      </div>

      <div className={styles.diagram}>
        <video
          ref={videoRef}
          className={`${styles.video} ${styles.videoDesktop}`}
          src="/assets/hp-warehouses-logistics.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <video
          ref={mobileVideoRef}
          className={`${styles.video} ${styles.videoMobile}`}
          src="/assets/warehouses-logistics-rwd.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
