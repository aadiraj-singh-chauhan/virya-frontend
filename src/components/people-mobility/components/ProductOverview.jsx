import Image from 'next/image';
import styles from '../css/ProductOverview.module.css';

export default function ProductOverview() {
  return (
    <section className={styles.section} data-header-theme="light">
      {/* Decorative grid pattern */}
      <img
        src="/assets/pm-pattern.svg"
        alt=""
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
            Virya's Autonomous People Mobility Platform (APM) is designed specifically for
            factories, research campuses, and logistics facilities — delivering safe, continuous
            autonomous transport across complex real-world environments.
          </p>
        </div>

        <div className={styles.imageFrame}>
          <div className={styles.imageWrap}>
            <Image
              src="/assets/pm-apm-vehicle.png"
              alt="Autonomous People Mobility vehicle"
              fill
              className={styles.image}
            />
            <div className={styles.overlay} />
          </div>

          {/* Center play button */}
          <div className={styles.playCenter} aria-label="Play video">
            <img src="/assets/pm-play-arrow.svg" alt="" width={17} height={17} />
          </div>

          {/* Corner play icon */}
          <img
            src="/assets/play-icon.svg"
            alt=""
            className={styles.playCorner}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
