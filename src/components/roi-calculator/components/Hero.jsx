import HeroPatternBg from './HeroPatternBg';
import styles from '../css/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <HeroPatternBg className={styles.pattern} />
      <div className={styles.backdrop} aria-hidden="true" />

      <div className="container">
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            <p className="label-2 label-1-md">ROI calculator</p>
          </div>
          <h1 className={`heading-2 heading-2-md ${styles.heading}`}>Calculate Your Automation ROI</h1>
        </div>
      </div>
    </section>
  );
}
