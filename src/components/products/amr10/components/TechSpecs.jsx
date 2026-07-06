'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './TechSpecs.module.css';

const FEATURES = [
  {
    id: '360-perception',
    title: '360° Perception',
    icon: '/assets/360-perception.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
  {
    id: 'obstacle-avoidance',
    title: 'Obstacle Avoidance & Detection',
    icon: '/assets/obstacle-avoidance.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
  {
    id: 'driving-modes',
    title: 'Manual & Autonomous Driving Modes',
    icon: '/assets/manual-autonomous.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
  {
    id: 'productivity',
    title: 'Increased Productivity',
    icon: '/assets/amr10-icon-productivity.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
  {
    id: 'compact-footprint',
    title: 'Compact Footprint',
    icon: '/assets/amr10-icon-compact-footprint.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
  {
    id: 'indoor-outdoor',
    title: 'Indoor & Outdoor Operational Capability',
    icon: '/assets/amr10-icon-indoor-outdoor.svg',
    description: 'Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget. Neque cras eget quis sapien cursus.',
  },
];

export default function TechSpecs() {
  const [activeId, setActiveId] = useState(FEATURES[0].id); // first one open by default, matches screenshot

  const toggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id)); // click again to collapse
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.grid}>
        {FEATURES.map((f) => {
          const isActive = activeId === f.id;
          return (
            <button
              key={f.id}
              className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
              onClick={() => toggle(f.id)}
              aria-expanded={isActive}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  <Image src={f.icon} alt="" width={50} height={50} />
                </div>
                <p className={styles.cardTitle}>{f.title}</p>
              </div>

              <div className={styles.expandable}>
                <div className={styles.expandableInner}>
                  <p className={`body-1 ${styles.cardDesc}`}>{f.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}