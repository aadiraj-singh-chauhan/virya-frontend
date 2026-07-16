import MissionPatternBg from './MissionPatternBg';
import styles from '../css/Mission.module.css';

export default function Mission() {
  return (
    <section className={styles.section} data-header-theme="light">
      <MissionPatternBg className={styles.pattern} />
      <div className={styles.backdrop} aria-hidden="true" />

      <div className="container">
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            <p className="label-1 label-1-md">Our mission</p>
          </div>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
            Powering seamless motion across every environment
          </h2>
          <p className={styles.quote}>
            &ldquo;dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut
            labore et dolore magna aliqua. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem, totam&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
