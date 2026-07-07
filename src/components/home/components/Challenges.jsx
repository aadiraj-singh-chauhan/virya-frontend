'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Challenges.module.css';

export default function Challenges() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
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
          className={styles.video}
          src="/assets/warehouses-logistics.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
