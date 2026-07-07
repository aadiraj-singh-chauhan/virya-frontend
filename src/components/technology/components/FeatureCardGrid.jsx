import Image from 'next/image';
import styles from '../css/FeatureCardGrid.module.css';

export default function FeatureCardGrid({ heading, cards }) {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>{heading}</h2>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.caption} className={styles.card}>
            <Image
              src={card.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
              className={styles.image}
            />
            {card.overlayImage && (
              <Image
                src={card.overlayImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={card.overlayObjectPosition ? { objectPosition: card.overlayObjectPosition } : undefined}
                className={styles.image}
              />
            )}

            <div className={`${styles.scrim} ${card.desc ? styles.scrimTall : ''}`} aria-hidden="true" />

            <div className={`${styles.textWrap} ${card.desc ? styles.textWrapRaised : ''}`}>
              <p className="label-1">{card.caption}</p>
              {card.desc && <p className="body-2">{card.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
