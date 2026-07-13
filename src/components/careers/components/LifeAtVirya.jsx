import TestimonialsPatternBg from '@/components/home/components/TestimonialsPatternBg';
import styles from '../css/LifeAtVirya.module.css';

export default function LifeAtVirya() {
  return (
    <section className={styles.section} data-header-theme="light">
      <TestimonialsPatternBg className={styles.pattern} />

      <div className={styles.card}>
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Life at VIRYA</h2>
        <p className={styles.quote}>
          &ldquo;dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore
          et dolore magna aliqua. Sed ut perspiciatis unde omnis iste natus error sit voluptatem,
          totam&rdquo;
        </p>
      </div>
    </section>
  );
}
