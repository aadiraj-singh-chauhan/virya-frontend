'use client';

import { useScramble } from '@/hooks/useScramble';
import styles from '../css/PartnerCTA.module.css';

export default function PartnerCTA() {
  const label = 'Partner with us';
  const { display, play, reset } = useScramble(label);

  return (
    <section className={styles.section} data-header-theme="light">
      <video
        className={styles.bgVideo}
        poster="/assets/partner-with-us-bg.webp"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/partner-with-us.mp4" type="video/mp4" />
      </video>

      <div className={`container ${styles.inner}`}>
        <p className={`body-2 ${styles.desc}`}>
          Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero.
        </p>

        <a
          href="/contact"
          className={styles.cta}
          onMouseEnter={play}
          onMouseLeave={reset}
        >
          <span className={styles.text}>
            <span className={styles.textOriginal}>{label}</span>
            <span className={styles.textDisplay} aria-hidden="true">{display || label}</span>
          </span>

          <span className={styles.arrowWrap} aria-hidden="true">
            <svg className={styles.arrow} width="71" height="59" viewBox="0 0 70.5967 59.2579" fill="none">
              <path d="M38.2573 2.68L27.7167 2.68001L3.59668 29.48L27.7167 56.5779H38.4762" stroke="currentColor" strokeWidth="5.36" />
              <path d="M3.59668 29.4769H70.5967" stroke="currentColor" strokeWidth="5.36" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
