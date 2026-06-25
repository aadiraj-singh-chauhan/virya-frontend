import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/CustomSolution.module.css';

export default function CustomSolution() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image
        src="/assets/cta-pattern.svg"
        alt=""
        fill
        className={styles.pattern}
        aria-hidden="true"
      />
      <div className={styles.content}>
        <h2 className="heading-2">Create what your business actually needs</h2>
        <Button property1="Default" href="/contact">Get custom solutions</Button>
      </div>
    </section>
  );
}
