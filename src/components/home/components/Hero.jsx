'use client';

import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import styles from '../css/Hero.module.css';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className={styles.section} data-header-theme="dark">
      <video
        ref={videoRef}
        className={styles.banner}
        poster="/assets/homepage-banner.webp"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Virya homepage banner"
      >
        <source src="/assets/hp-banner.webm" type="video/webm" />
        <source src="/assets/hp-banner.mp4" type="video/mp4" />
      </video>

      <div className={styles.content}>
        <div className="container">
          <h1 className={`heading-1 heading-1-md ${styles.heading}`}>
            Autonomous
            <br />
            mobility for
            <br />
            smarter
            <br />
            operations
          </h1>
        </div>

        <div className={`container ${styles.bottom}`}>
          <div className={styles.scrollHint}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                opacity="0.6"
                d="M13.5 2.25H10.5C7.60051 2.25 5.25 4.60051 5.25 7.5V16.5C5.25 19.3995 7.60051 21.75 10.5 21.75H13.5C16.3995 21.75 18.75 19.3995 18.75 16.5V7.5C18.75 4.60051 16.3995 2.25 13.5 2.25Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.scrollWheel}
                d="M12 10.5V6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={`label-1 label-1-md ${styles.cta}`}>
            <Button href="/material-mobility" property1="Variant3" size="Button-2">
              Explore material mobility
            </Button>
            <Button href="/people-mobility" property1="Variant3" size="Button-2">
              Explore people mobility
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
