import Image from 'next/image';
import styles from './Banner.module.css';

const BULLETS = [
  'Indoor + Outdoor Autonomous Navigation',
  'Automotive-Grade Safety Systems',
  'Built for Industrial Environments',
];

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="light">
      {/* Large watermark text — sits behind the vehicle image */}
      <h1 className={styles.bgText}>
        <span className={styles.bgPeople}>PEOPLE</span>
        <span className={styles.bgMobility}>MOBILITY</span>
      </h1>

      {/* Vehicle image — layered on top of watermark text */}
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

      {/* Gradient fade at bottom */}
      <div className={styles.gradient} aria-hidden="true" />

      {/* Bullets + description */}
      <div className={styles.content}>
        <div className={styles.bullets}>
          {BULLETS.map((item) => (
            <div key={item} className={styles.bullet}>
              <span className={styles.dot} />
              <span className="label-1">{item}</span>
            </div>
          ))}
        </div>
        <p className={`body-1 ${styles.desc}`}>
          An intelligent autonomous system for continuous, real-world mobility
          across industrial and campus environments.
        </p>
      </div>
    </section>
  );
}
