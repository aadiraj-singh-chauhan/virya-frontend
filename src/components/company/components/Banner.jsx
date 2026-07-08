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
        <h1 className={`heading-2 heading-2-md ${styles.tagline}`}>
          Zero defects, Zero inefficiencies, Zero tolerance for compromise
        </h1>
        <span className={styles.muteIcon} aria-hidden="true">
          <MuteIcon />
        </span>
      </div>
    </section>
  );
}

function MuteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 6.5L4 8.5H1.5V11.5H4L7.5 13.5V6.5Z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
      <path d="M12 5.5L18 14.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 5.5L12 14.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
