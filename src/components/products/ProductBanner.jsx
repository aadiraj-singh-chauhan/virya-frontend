import Image from 'next/image';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from './css/ProductBanner.module.css';

export default function ProductBanner({ name, image, imageAlt, imageWidth, imageHeight }) {
  return (
    <section className={styles.section} data-header-theme="light">

      <h1 className={styles.watermark}>{name}</h1>

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
            sizes={imageWidth || '609px'}
            className={styles.image}
            priority
          />
        </div>

        <DownloadBrochureButton property1="Variant2" size="Button-2" />
      </div>

    </section>
  );
}
