import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Autonomous.module.css';

export default function Autonomous() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image
        src="/assets/autonomous-system.webp"
        alt=""
        width={1920}
        height={914}
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.gradientTop} />
      <div className={styles.gradientBottom} />

      <div className={styles.content}>
        <p className="lable-3">Virya platforms are</p>
        <h2 className="heading-2">
          Autonomous systems that fit the way your factory actually runs
        </h2>
        <Button href="/solutions" property1="Default" size="Button-2">
          Explore our solutions
        </Button>
      </div>
    </section>
  );
}
