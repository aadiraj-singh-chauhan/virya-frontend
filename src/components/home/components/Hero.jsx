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
        <source src="/assets/homepage-banner.mp4" type="video/mp4" />
      </video>

      <div className={styles.content}>
        <div className="container">
          <div className={styles.textBlock}>
            <h1 className={`heading-1 heading-1-md ${styles.heading}`}>
              Autonomous mobility for smarter operations
            </h1>
            <p className={`body-1 body-1-md ${styles.description}`}>
              Lorem ipsum dolor sit amet consectetur. Magna id nascetur laoreet dui sem massa at
              ullamcorper. Amet nunc velit rutrum diam tincidunt sapien. Egestas.
            </p>
            <div className={`label-1 label-1-md ${styles.cta}`}>
              <Button href="/material-mobility" property1="Variant3" size="Button-2">
                Explore material mobility
              </Button>
              <Button href="/people-mobility" property1="Variant3" size="Button-2">
                Explore people mobility
              </Button>
            </div>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <svg width="20" height="24" viewBox="0 0 20.3423 24.2369" fill="none">
              <path
                className={styles.scrollChevronBack}
                d="M0.92 11.1038L0.920003 14.7222L10.12 23.0022L19.4223 14.7222L19.4223 11.0286"
                stroke="currentColor"
                strokeWidth="1.84"
              />
              <path
                className={styles.scrollChevronFront}
                d="M0.92 0.075147L0.920003 3.69358L10.12 11.9736L19.4223 3.69358L19.4223 3.47323e-07"
                stroke="currentColor"
                strokeWidth="1.84"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
