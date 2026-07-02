import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Platforms.module.css';

const PLATFORMS = [
  {
    id: 'amr10',
    name: 'AMR10',
    image: '/assets/mm-amr10.png',
    description: 'Compact autonomous mobile robot designed for agile indoor navigation and light-duty material transport',
  },
  {
    id: 'amr50',
    name: 'AMR50',
    image: '/assets/mm-amr50.png',
    description: 'Autonomous mobile robot engineered for heavy-duty indoor and outdoor towing of payloads up to 5-ton',
  },
  {
    id: 'apt20',
    name: 'APT20',
    image: '/assets/mm-apt20.png',
    description: 'Autonomous pallet truck designed for 2-ton lifting capacity, offering seamless manual and autonomous hybrid modes',
  },
];

export default function Platforms() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 ${styles.heading}`}>
          Explore our platforms that can work for your operations
        </h2>
        <div className={styles.grid}>
          {PLATFORMS.map((platform) => (
            <div key={platform.id} className={styles.card}>
              <div className={styles.gradient} />
              <p className={`heading-0 ${styles.name}`}>{platform.name}</p>
              <div className={styles.imageWrap}>
                <Image
                  src={platform.image}
                  alt={platform.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.bottom}>
                <p className={`body-1 ${styles.description}`}>{platform.description}</p>
                <div className={styles.explore}>
                  <Button property1="Default" href={`/products/${platform.id}`}>
                    Explore {platform.name}
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
