'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../css/FeatureCardGrid.module.css';

export default function FeatureCardGrid({ heading, cards }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>{heading}</h2>

        <div className={styles.grid}>
          {cards.map((card, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div key={card.image} className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}>
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

                {card.caption && (
                  <>
                    <div className={styles.scrim} aria-hidden="true" />

                    <div className={styles.textWrap}>
                      <div className={styles.captionRow}>
                        <p className={`label-1 label-1-md ${styles.caption}`}>{card.caption}</p>

                        <button
                          type="button"
                          className={styles.expandBtn}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? 'Hide details' : 'Show details'}
                          onClick={() => setExpandedIndex((prev) => (prev === index ? null : index))}
                        >
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <rect width="30" height="30" rx="15" fill="#F43D00" />
                            <rect width="1" height="1" transform="translate(14.5 14.5)" fill="white" />
                            <rect width="7" height="1" transform="translate(16.5 14.5)" fill="white" />
                            <rect width="7" height="1" transform="translate(6.5 14.5)" fill="white" />
                            <rect width="1" height="7" transform="translate(14.5 6.5)" fill="white" />
                            <rect width="1" height="7" transform="translate(14.5 16.5)" fill="white" />
                          </svg>
                        </button>
                      </div>
                      {card.desc && <p className={`body-2 ${styles.desc}`}>{card.desc}</p>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
