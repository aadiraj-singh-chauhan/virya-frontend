import Image from 'next/image';
import styles from '../css/Banner.module.css';

const BULLETS = [
  'Indoor + Outdoor Autonomous Navigation',
  'Automotive-Grade Safety Systems',
  'Built for Industrial Environments',
];

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h1 className={styles.bgText}>
        <span className={styles.bgPeople}>PEOPLE</span>
        <span className={styles.bgMobility}>MOBILITY</span>
      </h1>

      <div className={styles.imageWrap}>
        <Image
          src="/assets/people-mobility-banner-img.webp"
          alt="People Mobility autonomous vehicles"
          fill
          sizes="100vw"
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.bullets}>
          <div className={styles.bulletsTrack}>
            {BULLETS.map((item) => (
              <div key={item} className={styles.bullet}>
                <span className={styles.dot} />
                <span className="label-1 label-1-md">{item}</span>
              </div>
            ))}
            {BULLETS.map((item) => (
              <div key={`d-${item}`} className={`${styles.bullet} ${styles.bulletDuplicate}`} aria-hidden="true">
                <span className={styles.dot} />
                <span className="label-1 label-1-md">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className={`body-1 body-1-md ${styles.desc}`}>
          An intelligent autonomous system for continuous, real-world mobility
          across industrial and campus environments.
        </p>
      </div>
    </section>
  );
}
