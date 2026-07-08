import Image from 'next/image';
import styles from '../css/ClosingBanner.module.css';

export default function ClosingBanner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.imageWrap}>
        <Image
          src="/assets/rd-platforms-closing.webp"
          alt="Automated warehouse floor with autonomous vehicles moving racks and containers"
          fill
          sizes="100vw"
          className={styles.image}
          loading="eager"
        />
      </div>

      <div className={styles.panel}>
        <h2 className="heading-2 heading-2-md">The future of autonomous mobility in industry</h2>
        <p className={`body-1 body-1-md ${styles.desc}`}>
          Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero. Tincidunt risus in sapien urna donec morbi aliquam ac. Tempus sed id sem mi nullam. A placerat posuere vulputate lacinia quis morbi
        </p>
      </div>
    </section>
  );
}
