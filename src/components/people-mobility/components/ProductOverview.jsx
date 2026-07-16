'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FullscreenToggle from '@/components/shared/components/FullscreenToggle';
import styles from '../css/ProductOverview.module.css';

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
      <Image
        src="/assets/pm-pattern.svg"
        alt=""
        width={1512}
        height={885}
        className={styles.pattern}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className="heading-2 heading-2-md">
            Autonomous Mobility Built for Real Industrial Environments
          </h2>
          <p className={`body-1 body-1-md ${styles.desc}`}>
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

          <FullscreenToggle onClick={handlePlay} className={styles.playCenter} />
        </div>
      </div>
    </section>
  );
}
