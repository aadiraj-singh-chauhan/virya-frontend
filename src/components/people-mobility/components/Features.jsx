'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../css/Features.module.css';

const CARDS = [
  { id: 'autonomous', video: '/assets/pm-autonomous.mp4', label: 'Autonomous', overlay: true },
  { id: 'reliable', video: '/assets/pm-Indoor-outdoor.mp4', label: 'Reliable across indoor and outdoor spaces' },
  { id: 'safe', video: '/assets/pm-dynamic-environments.mp4', label: 'Safe in dynamic environments' },
];

export default function Features() {
  const gridRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = (index) => {
    const grid = gridRef.current;
    const cards = grid?.querySelectorAll(`.${styles.card}`);
    if (!grid || !cards?.[index]) return;

    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIndex(index);
  };

  useEffect(() => {
    gridRef.current?.querySelectorAll('video').forEach((v) => v.play().catch(() => {}));
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2 className="heading-2 heading-2-md">Facilities Are Getting Smarter Mobility Should Too</h2>
          <p className={`body-1 body-1-md ${styles.desc}`}>
            Factories, research campuses, and logistics facilities are adopting automation everywhere
            from production lines to warehouses. To truly optimize operations, mobility must become:
          </p>
        </div>
        <div
          className={styles.grid}
          ref={gridRef}
          onScroll={(event) => {
            const grid = event.currentTarget;
            const cards = [...grid.querySelectorAll(`.${styles.card}`)];
            const gridCenter = grid.scrollLeft + grid.clientWidth / 2;
            const closestIndex = cards.reduce((closest, card, index) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const closestCenter = cards[closest].offsetLeft + cards[closest].offsetWidth / 2;
              return Math.abs(cardCenter - gridCenter) < Math.abs(closestCenter - gridCenter)
                ? index
                : closest;
            }, 0);
            setActiveIndex(closestIndex);
          }}
        >
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
        <div className={styles.sliderDots} aria-label="Feature slider navigation">
          {CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`${styles.sliderDot} ${activeIndex === index ? styles.sliderDotActive : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Show ${card.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
