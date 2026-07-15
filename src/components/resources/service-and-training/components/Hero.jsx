import TestimonialsPatternBg from '@/components/home/components/TestimonialsPatternBg';
import styles from '../css/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <TestimonialsPatternBg className={styles.pattern} />

      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          <span className="label-2">Service & Training</span>
        </div>

        <h1 className={`heading-2 heading-2-md ${styles.heading}`}>From Setup to Scale</h1>

        <p className={`body-1 ${styles.desc}`}>
          Support across deployment, integration, and team training ensuring consistent
          performance in real-world environments.
        </p>
      </div>
    </section>
  );
}
