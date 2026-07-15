import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/RelatedProducts.module.css';

const PRODUCTS = [
  {
    id: 'amr10',
    name: 'AMR10',
    bg: '/assets/mm-amr-bg.webp',
    robot: '/assets/mm-amr10.webp',
    description: 'Compact autonomous mobile robot designed for 1-ton towing capacity in confined manufacturing environments',
    watermark: styles.watermarkOrange,
  },
  {
    id: 'amr50',
    name: 'AMR50',
    bg: '/assets/mm-amr-bg.webp',
    robot: '/assets/mm-amr50.webp',
    description: 'Rugged and powerful autonomous mobile robot designed for 5-ton towing capacity with indoor and outdoor capability',
    watermark: styles.watermarkDim,
  },
];

export default function RelatedProducts() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Explore other products</h2>

        <div className={styles.row}>
          {PRODUCTS.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.bgWrap} aria-hidden="true">
                <Image src={p.bg} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.bgImage} />
              </div>

              <div className={styles.gradient} aria-hidden="true" />
              <p className={p.watermark} aria-hidden="true">{p.name}</p>

              <div className={styles.robotWrap}>
                <Image src={p.robot} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.robotImage} />
              </div>

              <div className={styles.bottom}>
                <p className={`body-1 ${styles.desc}`}>{p.description}</p>
                <div className={styles.explore}>
                  <Button property1="Default" size="Button-1" href={`/products/${p.id}`}>
                    {`Explore ${p.name}`}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
