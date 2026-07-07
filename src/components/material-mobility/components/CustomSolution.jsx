import Button from '@/components/ui/Button';
import CustomSolutionPatternBg from './CustomSolutionPatternBg';
import styles from '../css/CustomSolution.module.css';

export default function CustomSolution() {
  return (
    <section className={styles.section} data-header-theme="light">
      <CustomSolutionPatternBg className={styles.pattern} />
      <div className={styles.content}>
        <h2 className="heading-2 heading-2-md">Create what your business actually needs</h2>
        <Button property1="Default" href="/contact">Get custom solutions</Button>
      </div>
    </section>
  );
}
