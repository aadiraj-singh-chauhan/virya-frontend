import Image from 'next/image';
import styles from '../css/Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="dark">
      <Image
        src="/assets/company/company-banner-hero.png"
        alt="Virya engineer working on precision manufacturing equipment"
        fill
        sizes="100vw"
        priority
        className={styles.image}
      />
      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.content}>
        <div className={`container ${styles.inner}`}>
          <h1 className={`heading-2 heading-2-md ${styles.tagline}`}>
            Zero defects, Zero inefficiencies, Zero tolerance for compromise
          </h1>
          <span className={styles.muteIcon} aria-hidden="true">
            <MuteIcon />
          </span>
        </div>
      </div>
    </section>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 19.6445 19.6445" fill="none" aria-hidden="true">
      <path d="M15.3438 7.97656V11.6599" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M17.8047 6.75V12.8889" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M4.29678 3.07053L16.5746 16.5761" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M9.21875 4.83119L12.2767 2.45312V8.19531" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path
        d="M12.2754 12.2449V17.1862L6.75037 12.8889H3.06702C2.9042 12.8889 2.74806 12.8242 2.63293 12.7091C2.5178 12.594 2.45312 12.4378 2.45312 12.275V7.36389C2.45312 7.20108 2.5178 7.04493 2.63293 6.9298C2.74806 6.81468 2.9042 6.75 3.06702 6.75L7.0859 6.75"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  );
}
