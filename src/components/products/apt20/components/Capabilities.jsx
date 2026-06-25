'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Capabilities.module.css';

const FEATURES = [
  {
    id: 'fork-mechanism',
    label: 'Fork Mechanism',
    description: 'Precision-engineered lifting forks designed for stable 2-ton payload handling across uneven surfaces and ramp transitions.',
    image: '/assets/product-apt20.webp',
    dot: { left: 374, top: 476 },
  },
  {
    id: '3d-lidar',
    label: '3D LiDAR',
    description: 'High-resolution 3D point-cloud sensing for full spatial awareness during lift-and-carry operations in dynamic warehouse environments.',
    image: '/assets/product-apt20.webp',
    dot: { left: 476, top: 368 },
  },
  {
    id: 'navigation',
    label: 'Navigation System',
    description: 'SLAM-based autonomous navigation with centimetre-level accuracy, enabling pallet pick-up and drop-off without fixed infrastructure.',
    image: '/assets/product-apt20.webp',
    dot: { left: 90, top: 302 },
  },
  {
    id: 'axis-imu',
    label: 'Axis-IMU',
    description: '6-axis inertial measurement unit for real-time stability monitoring and load-tilt compensation during elevated transport.',
    image: '/assets/product-apt20.webp',
    dot: { left: 189, top: 140 },
  },
];

const TECH_CARDS = [
  { id: '360-perception',    title: '360° Perception',                      icon: '/assets/360-perception.svg',              description: 'Full-surround sensing coverage ensures safe operation in crowded warehouse aisles and loading bays.' },
  { id: 'obstacle-avoid',    title: 'Obstacle Avoidance & Detection',        icon: '/assets/obstacle-avoidance.svg',          description: 'Real-time detection and dynamic re-routing keeps operations running without human intervention.' },
  { id: 'driving-modes',     title: 'Manual & Autonomous Driving Modes',     icon: '/assets/manual-autonomous.svg',           description: 'Seamless transition between manual joystick control and full autonomy for flexible deployment.' },
  { id: 'productivity',      title: 'Increased Productivity',                icon: '/assets/amr10-icon-productivity.svg',     description: 'Continuous 24/7 operation with rapid charge cycles reduces idle time and boosts throughput.' },
  { id: 'compact-footprint', title: 'Compact Footprint',                     icon: '/assets/amr10-icon-compact-footprint.svg',description: 'Slim profile navigates standard pallet racking aisles without facility modifications.' },
  { id: 'indoor-outdoor',    title: 'Indoor & Outdoor Operational Capability',icon: '/assets/amr10-icon-indoor-outdoor.svg',  description: 'Solid rubber tyres and sealed electronics support operation across indoor floors and outdoor yard surfaces.' },
];

function FeatureItem({ feature, active, onClick }) {
  const { display, play, reset } = useScramble(feature.label);
  return (
    <button
      className={`${styles.featureItem} ${active ? styles.featureItemActive : ''}`}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <div className={styles.labelRow}>
        <p className={styles.featureLabel}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
          <div className={styles.detailImage}>
            <Image src={feature.image} alt={feature.label} fill className={styles.detailImg} />
          </div>
          <div className={styles.detailContent}>
            <p className={`body-2 ${styles.featureDesc}`}>{feature.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const activeFeature = FEATURES[active];

  return (
    <section className={styles.section} data-header-theme="light">

      <div className={styles.header}>
        <h2 className="heading-2">Built on an Intelligent Core</h2>
        <p className={`body-1 ${styles.subtitle}`}>
          Precision autonomy meets heavy-duty lifting. The APT20 combines
          advanced sensing with a robust fork mechanism for reliable pallet handling.
        </p>
      </div>

      <div className={styles.contentRow}>

        <div className={styles.thumbnailPanel}>
          <div className={`${styles.thumbCard} ${styles.thumbCardActive}`}>
            <div className={styles.thumbImageWrap}>
              <Image src="/assets/product-apt20.webp" alt="APT20" fill className={styles.thumbImage} />
            </div>
            <p className={`label-2 ${styles.thumbLabel}`}>APT 20</p>
          </div>
          <div className={styles.thumbCard}>
            <div className={styles.thumbImageWrap}>
              <Image src="/assets/product-apt20.webp" alt="APT20" fill className={styles.thumbImage} />
            </div>
            <p className={`label-2 ${styles.thumbLabel}`}>APT 20</p>
          </div>
        </div>

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            <Image
              src="/assets/product-apt20.webp"
              alt="APT20 intelligent systems diagram"
              fill
              className={styles.robotImage}
            />
          </div>

          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
              style={{ left: f.dot.left, top: f.dot.top }}
              onClick={() => setActive(i)}
              aria-label={`View ${f.label}`}
            >
              <span className={styles.dotOuter} />
              <span className={styles.dotMiddle} />
              <span className={styles.dotInner} />
            </button>
          ))}

          <div
            className={styles.pill}
            style={{ left: activeFeature.dot.left + 55, top: activeFeature.dot.top + 5 }}
          >
            <span className="label-2">{activeFeature.label}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        <div className={styles.panel}>
          {FEATURES.map((f, i) => (
            <FeatureItem
              key={f.id}
              feature={f}
              active={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

      </div>

      <div className={styles.techGrid}>
        {TECH_CARDS.map((c) => (
          <div key={c.id} className={styles.techCard}>
            <div className={styles.techCardHeader}>
              <div className={styles.techIconWrap}>
                <Image src={c.icon} alt="" width={50} height={50} />
              </div>
              <p className={styles.techCardTitle}>{c.title}</p>
            </div>
            <p className={`body-1 ${styles.techCardDesc}`}>{c.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
