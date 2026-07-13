'use client';

import { useState } from 'react';
import Image from 'next/image';
import NavButtons from './NavButtons';
import styles from '../css/FutureBuilders.module.css';

const VALUES = [
  {
    title: 'Innovative Thinking',
    desc: 'We seek individuals who challenge conventional approaches and develop creative solutions to advance autonomous mobility technologies.',
  },
  {
    title: 'Collaborative Spirit',
    desc: 'Great autonomy is built by great teams. We look for people who share ideas openly and solve hard problems together.',
  },
  {
    title: 'Ownership & Impact',
    desc: 'We value people who take ownership end-to-end and care about the real-world impact of what they ship.',
  },
];

export default function FutureBuilders() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const value = VALUES[active];

  const go = (delta) => {
    setDirection(delta);
    setActive((i) => (i + delta + VALUES.length) % VALUES.length);
  };

  return (
    <section className={styles.section} data-header-theme="dark">
      <Image
        src="/assets/careers/careers-future-builders.png"
        alt="Engineers reviewing robotics hardware in a lab"
        fill
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.gradient} aria-hidden="true" />

      <h2 className={styles.heading}>Looking for Those Who Can Build the Future</h2>

      <div className={styles.card}>
        <div className={styles.cardTextWrap}>
          <div key={active} className={styles.cardText} style={{ '--dir': direction }}>
            <p className={`title-1 ${styles.cardTitle}`}>{value.title}</p>
            <p className={`body-1 ${styles.cardDesc}`}>{value.desc}</p>
          </div>
        </div>
        <div className={styles.footer}>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.navWrap}>
            <NavButtons
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              prevLabel="Previous value"
              nextLabel="Next value"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
