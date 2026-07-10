import Image from 'next/image';
import styles from '../css/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image
        src="/assets/technology-banner-bg.jpg"
        alt="Virya autonomous mobile robot pulling a cart of goods in a warehouse"
        fill
        sizes="100vw"
        priority
        className={styles.bg}
      />
      <div className={styles.content}>
        <h1 className={`heading-2 ${styles.heading}`}>The Intelligence Behind Every Move</h1>

        <p className={`body-1 ${styles.desc}`}>
          Virya Autonomous Technologies builds full-stack autonomous systems engineered for the
          complexity of real-world operations. Every capability from sensing to decision-making
          is designed to perform reliably in the environments where it matters most.
        </p>
      </div>
    </section>
  );
}
