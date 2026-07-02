import Image from 'next/image';
import styles from '../css/Features.module.css';

const CARDS = [
  { id: 'autonomous', image: '/assets/pm-cockpit.webp', label: 'Autonomous', overlay: true },
  { id: 'reliable', image: '/assets/pm-vehicle-front.webp', label: 'Reliable across indoor and outdoor spaces' },
  { id: 'safe', image: '/assets/pm-vehicle-urban.webp', label: 'Safe in dynamic environments', imagePosition: 'bottom' },
];

export default function Features() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2 className="heading-2">Facilities Are Getting Smarter Mobility Should Too</h2>
          <p className={`body-1 ${styles.desc}`}>
            Factories, research campuses, and logistics facilities are adopting automation everywhere
            from production lines to warehouses. To truly optimize operations, mobility must become:
          </p>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                  {...(card.imagePosition && { style: { objectPosition: card.imagePosition } })}
                />
                {card.overlay && <div className={styles.overlay} />}
              </div>
              <Image src="/assets/play-icon.svg" alt="" width={24} height={24} className={styles.play} aria-hidden="true" />
              <div className={styles.cardLabel}>
                <span className="title-2">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
