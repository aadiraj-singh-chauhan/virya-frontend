import Image from 'next/image';
import styles from '../css/Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.inner}>
        <p className={styles.textMaterial} aria-hidden="true">Material</p>
        <p className={styles.textMobility} aria-hidden="true">Mobility</p>

        <div className={styles.images}>
          <div className={styles.imageLeft}>
            <Image src="/assets/mm-banner-left.webp" alt="Material Mobility autonomous vehicles in operation" width={1235} height={824} className={styles.imageLeftImg} />
          </div>
          <div className={styles.imageCenter}>
            <Image src="/assets/mm-banner-center.webp" alt="" width={828} height={551} className={styles.imageCenterImg} />
          </div>
          <div className={styles.imageRight}>
            <Image src="/assets/mm-banner-right.webp" alt="" width={838} height={559} className={styles.imageRightImg} />
          </div>
        </div>

        <h1 className={styles.subtitle}>Smart mobility powering better Material operations</h1>
      </div>
    </section>
  );
}
