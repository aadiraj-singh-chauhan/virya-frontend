'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Banner.module.css';

export default function Banner() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    return () => {
      video.pause();
    };
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <video
        ref={videoRef}
        className={styles.bannerVideo}
        src="/assets/vat-mm-banner-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Material Mobility autonomous vehicles in operation"
      />

      <div className={styles.inner}>
        <p className={styles.textMaterial} aria-hidden="true">Material</p>
        <p className={styles.textMobility} aria-hidden="true">Mobility</p>
        <h1 className={`${styles.subtitle} label-1-md`}>Smart mobility powering better Material operations</h1>
      </div>

      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}
