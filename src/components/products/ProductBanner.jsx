import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './ProductBanner.module.css';

export default function ProductBanner({ name, image, imageAlt, imageWidth, imageHeight }) {
  return (
    <section className={styles.section} data-header-theme="light">

      <p className={styles.watermark} aria-hidden="true">{name}</p>

      <div className={styles.contentCol}>
        <div className={styles.categoryTag}>
          <span className={styles.categoryDot} aria-hidden="true" />
          <span className="label-2">Material Mobility</span>
        </div>

        <div
          className={styles.imageWrap}
          style={{ '--image-w': imageWidth, '--image-h': imageHeight }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
            priority
          />
        </div>

        <Button property1="Variant2" size="Button-2" href="#">
          Download Brochure
        </Button>
      </div>

    </section>
  );
}
