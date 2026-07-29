'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Banner.module.css';

export default function Banner() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <video
        ref={videoRef}
        className={styles.bannerVideo}
        src="/assets/material-mobility-bg-video.webm"
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
