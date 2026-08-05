'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../css/IntelligentCore.module.css';

const ITEMS = [
  {
    id: 'fleet',
    title: 'Fleet Coordination',
    titleLines: ['Fleet', 'Coordination'],
    description:
      'Centralised orchestration assigns tasks, resolves conflicts, and optimises throughput across an entire fleet from a single interface.',
    image: '/assets/fleet-coordination.png',
  },
  {
    id: 'control',
    title: 'Hybrid Control Modes',
    titleLines: ['Hybrid Control', 'Modes'],
    description:
      'Seamlessly switch between fully autonomous, semi-autonomous, and manual operation to match the needs of any environment or workflow.',
    image: '/assets/hybrid-control-modes.png',
  },
  {
    id: 'ride-hail',
    title: 'Integrated Ride-Hail Platform',
    titleLines: ['Integrated Ride-Hail', 'Platform'],
    description:
      'Lorem ipsum dolor sit amet consectetur. Viverra suscipit ut aliquet eu vestibulum mattis amet. In fermentum lobortis sed risus nibh erat arcu.',
    image: '/assets/hail-platform.png',
  },
  {
    id: 'localization',
    title: 'Multi-Sensor Localization Architecture',
    titleLines: ['Multi-Sensor Localization', 'Architecture'],
    description:
      'Centimetre-level accuracy using multi-sensor fusion — LiDAR, IMU, and visual odometry — so the vehicle always knows exactly where it is.',
    image: '/assets/multi-sensor-localization.png',
  },
  {
    id: 'path-planning',
    title: 'Real-Time Path Planning',
    titleLines: ['Real-Time Path', 'Planning'],
    description:
      'Dynamic route computation that reacts to obstacles, traffic, and changing layouts without stopping or waiting for a remote update.',
    image: '/assets/real-time-path.png',
  },
];

export default function IntelligentCore() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.headingWrap}>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Built on an Intelligent Core</h2>
        </div>
        <div className={styles.rows}>
          {ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.row} ${i === 0 ? styles.rowBorderTop : ''} ${activeId === item.id ? styles.rowOpen : ''}`}
              onClick={() => setActiveId(prev => prev === item.id ? null : item.id)}
            >
              <div className={styles.rowInner}>
                <div className={styles.rowHeader}>
                  <p className={`title-1 title-1-md ${styles.rowTitle}`}>
                    {item.titleLines[0]}
                    <br className={styles.titleBreak} /> {item.titleLines[1]}
                  </p>
                  <span className={`${styles.rowIcon} ${activeId === item.id ? styles.rowIconOpen : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                      <rect x="11.8633" y="10.0095" width="1.11238" height="7.41587" transform="rotate(-90 11.8633 10.0095)" fill="#F43D00"/>
                      <rect y="10.0095" width="1.11238" height="7.41587" transform="rotate(-90 0 10.0095)" fill="#F43D00"/>
                      <rect x="10.3828" y="18.908" width="1.11238" height="7.41587" transform="rotate(180 10.3828 18.908)" fill="#F43D00"/>
                      <rect x="10.3828" y="10.0095" width="1.11238" height="1.11238" transform="rotate(180 10.3828 10.0095)" fill="#F43D00"/>
                      <rect x="10.3828" y="7.41577" width="1.11238" height="7.41587" transform="rotate(180 10.3828 7.41577)" fill="#F43D00"/>
                    </svg>
                  </span>
                </div>
                <p className={`body-1 body-1-md ${styles.rowDesc}`}>{item.description}</p>
                {item.image && (
                  <div className={styles.rowImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 560px"
                      className={styles.image}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
