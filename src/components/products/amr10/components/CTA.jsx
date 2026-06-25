import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/CTA.module.css';

const PRODUCTS = [
  {
    id: 'amr50',
    name: 'AMR50',
    image: '/assets/mm-amr50.png',
    description: 'Autonomous mobile robot engineered for heavy-duty indoor and outdoor towing of payloads up to 5-ton',
    watermark: styles.watermarkOrange,
  },
  {
    id: 'apt20',
    name: 'APT20',
    image: '/assets/mm-apt20.png',
    description: 'Autonomous pallet truck designed for 2-ton lifting capacity, offering seamless manual and autonomous hybrid modes',
    watermark: styles.watermarkDim,
  },
];

export default function CTA() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 ${styles.heading}`}>Explore other products</h2>

        <div className={styles.row}>
          {PRODUCTS.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.gradient} aria-hidden="true" />
              <p className={p.watermark} aria-hidden="true">{p.name}</p>
              <div className={styles.robotWrap}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className={styles.robotImage}
                />
              </div>
              <div className={styles.bottom}>
                <p className={`body-1 ${styles.desc}`}>{p.description}</p>
                <div className={styles.explore}>
                  <Button property1="Default" size="Button-1" href={`/products/${p.id}`}>
                    Explore {p.name}
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
