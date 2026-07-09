'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/Features.module.css';

const CARDS = [
  { id: 'autonomous', video: '/assets/pm-autonomous.mp4', label: 'Autonomous', overlay: true },
  { id: 'reliable', video: '/assets/pm-Indoor-outdoor.mp4', label: 'Reliable across indoor and outdoor spaces' },
  { id: 'safe', video: '/assets/pm-dynamic-environments.mp4', label: 'Safe in dynamic environments' },
];

export default function Features() {
  const gridRef = useRef(null);

  useEffect(() => {
    gridRef.current?.querySelectorAll('video').forEach((v) => v.play().catch(() => {}));
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2 className="heading-2 heading-2-md">Facilities Are Getting Smarter Mobility<br />Should Too</h2>
          <p className={`body-1 body-1-md ${styles.desc}`}>
            Factories, research campuses, and logistics facilities are adopting automation everywhere
            from production lines to warehouses. To truly optimize operations, mobility must become:
          </p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={card.label}
                  className={styles.image}
                />
                {card.overlay && <div className={styles.overlay} />}
              </div>
              <div className={styles.cardLabel}>
                <span className="title-2 label-3-md">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
