'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ProductOverview.module.css';

export default function ProductOverview() {
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.play().catch(() => {});

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === video);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  };

  return (
    <section className={styles.section} data-header-theme="light">
      {/* Decorative grid pattern */}
      <Image
        src="/assets/pm-pattern.svg"
        alt=""
        width={1512}
        height={885}
        className={styles.pattern}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className="heading-2">
            Autonomous Mobility Built for Real Industrial Environments
          </h2>
          <p className={`body-1 ${styles.desc}`}>
            {"Virya's Autonomous People Mobility Platform (APM) is designed specifically for "
              + 'factories, research campuses, and logistics facilities — delivering safe, continuous '
              + 'autonomous transport across complex real-world environments.'}
          </p>
        </div>

        <div className={styles.imageFrame}>
          <div className={styles.imageWrap}>
            <video
              ref={videoRef}
              src="/assets/pm-apm-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={isFullscreen}
              aria-label="Autonomous People Mobility vehicle in operation"
              className={styles.image}
            />
            <div className={styles.overlay} />
          </div>

          {/* Center play button — click to view fullscreen */}
          <button
            type="button"
            className={styles.playCenter}
            onClick={handlePlay}
            aria-label="Play video fullscreen"
          >
            <svg width="19" height="18" viewBox="0 0 18.7683 18.1908" fill="none" aria-hidden="true">
              <path d="M12.7979 0.852912H17.9154V5.97039" stroke="white" strokeWidth="1.70582" strokeLinecap="square" />
              <path d="M5.97039 17.3379H0.852912V12.2204" stroke="white" strokeWidth="1.70582" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
