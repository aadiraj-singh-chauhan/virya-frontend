import Button from '@/components/ui/Button';
import { HeroPatternLeft, HeroPatternRight } from './HeroPattern';
import styles from '../css/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <HeroPatternLeft className={styles.vectorLeft} />
      <HeroPatternRight className={styles.vectorRight} />

      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          <span className="label-2">Partners</span>
        </div>

        <h1 className={`heading-2 ${styles.heading}`}>
          Our Network
          <br />
          of Trusted Partners
        </h1>

        <p className={`body-2 ${styles.desc}`}>
          Collaborating across technology, infrastructure, and research to build reliable,
          scalable systems.
        </p>

        <span className={styles.targetDot} aria-hidden="true" />

        <Button property1="Default" size="Button-2" href="#become-a-partner" className={styles.button}>
          Be a partner
        </Button>
      </div>
    </section>
  );
}
