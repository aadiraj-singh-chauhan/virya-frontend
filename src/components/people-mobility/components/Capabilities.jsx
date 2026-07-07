'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../css/Capabilities.module.css';

const FEATURES = [
  {
    image: '/assets/seamless-ndoor–outdoor.webp',
    title: 'Seamless Indoor–Outdoor Navigation',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/360-environmental-awareness.webp',
    title: '360° Environmental Awareness',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/flexible-seating.webp',
    title: 'Flexible Seating and Luggage Configurations',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/autonomous-manual-modes.webp',
    title: 'Autonomous and Manual Modes',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
        Not just another solution<br />
        built to outperform at every level
      </h2>
      <div className={`container ${styles.grid}`}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`${styles.card} ${i === activeIndex ? styles.cardActive : ''}`}
          >
            <div
              className={styles.iconAndTitle}
              onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
            >
              <Image src={f.image} alt="" width={96} height={96} className={styles.icon} aria-hidden="true" />
              <p className="label-3 label-3-md">{f.title}</p>
            </div>
            <p className="body-1 body-1-md">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
