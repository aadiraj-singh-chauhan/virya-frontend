'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Banner.module.css';

export default function Banner() {
  const videoRef = useRef(null);

  // Pause while scrolled out of view — this and VideoSection's video would
  // otherwise both decode at full res for the whole session regardless of
  // scroll position, competing for the main thread/GPU during scroll.
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
        <h1 className={styles.subtitle}>Smart mobility powering better Material operations</h1>
      </div>

      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}
