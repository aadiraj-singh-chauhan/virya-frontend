import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/RoutingCTAs.module.css';

const CARDS = [
  {
    id: 'people-mobility',
    title: 'Safe autonomous people mobility',
    image: '/assets/mm-safe-autonomous-pm.webp',
    cta: 'Explore People Mobility',
    href: '/people-mobility',
  },
  {
    id: 'rd-platforms',
    title: 'Platforms that drive innovation',
    image: '/assets/mm-platforms-innovation.webp',
    cta: 'Explore R&D Platforms',
    href: '/rd-platforms',
  },
];

export default function RoutingCTAs() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.info}>
                <h2 className={`title-1 title-1-md ${styles.title}`}>{card.title}</h2>
                <Button property1="Default" href={card.href} disabled={card.disabled}>
                  {card.cta}
                </Button>
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
