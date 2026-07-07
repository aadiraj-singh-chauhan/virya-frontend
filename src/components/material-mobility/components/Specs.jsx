'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../css/Specs.module.css';

const dummy = 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the';

const SPECS = [
  { icon: '/assets/360-perception.svg',     title: '360° Perception',                   desc: dummy },
  { icon: '/assets/obstacle-avoidance.svg', title: 'Obstacle Avoidance & Detection',    desc: dummy },
  { icon: '/assets/manual-autonomous.svg',  title: 'Manual & Autonomous Driving Modes', desc: dummy },
  { icon: '/assets/trolley-decoupling.svg', title: 'Autonomous Trolley Decoupling',     desc: dummy },
  { icon: '/assets/flexible-battery.svg',   title: 'Flexible Battery Options',          desc: dummy },
  { icon: '/assets/fleet-management.svg',   title: 'Fleet Management',                  desc: dummy },
];

export default function Specs() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          Built differently,<br />so you can operate differently
        </h2>
        <div className={styles.grid}>
          {SPECS.map((spec, i) => (
            <div
              key={spec.title}
              className={`${styles.card} ${active === i ? styles.cardActive : ''}`}
            >
              <div
                className={styles.cardHeader}
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
              >
                <Image src={spec.icon} alt="" width={50} height={50} className={styles.icon} />
                <p className={`title-2 title-2-md ${styles.cardTitle}`}>{spec.title}</p>
              </div>
              <p className={`body-1 body-1-md ${styles.cardDesc}`}>{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}