import Button from '@/components/ui/Button';
import CtaPatternBg from './CtaPatternBg';
import styles from '../css/CustomSolutionsCTA.module.css';

export default function CustomSolutionsCTA() {
  return (
    <section className={styles.section} data-header-theme="light">
      <CtaPatternBg className={styles.pattern} />
      <div className={styles.backdrop} aria-hidden="true" />

      <div className="container">
        <div className={styles.content}>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Create what your business actually needs</h2>
          <Button property1="Default" size="Button-2" href="/contact">Get custom solutions</Button>
        </div>
      </div>
    </section>
  );
}
