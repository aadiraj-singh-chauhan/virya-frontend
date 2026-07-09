'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Capabilities.module.css';

// Dot coordinates below are pixel positions on the 879x579 desktop imageArea;
// converted to percentages at render time so they track the image correctly
// as imageArea shrinks (flex-shrink) on smaller viewports.
const IMAGE_WIDTH = 879;
const IMAGE_HEIGHT = 579;

const FEATURES = [
  {
    id: 'fork-mechanism',
    label: 'Fork Mechanism',
    description: 'Precision-engineered lifting forks designed for stable 2-ton payload handling across uneven surfaces and ramp transitions.',
    image: '/assets/product-apt20.webp',
    dot: { left: 569, top: 439 },
  },
  {
    id: '3d-lidar',
    label: '3D LiDAR',
    description: 'High-resolution 3D point-cloud sensing for full spatial awareness during lift-and-carry operations in dynamic warehouse environments.',
    image: '/assets/product-apt20.webp',
    dot: { left: 348, top: 35 },
  },
  {
    id: 'navigation',
    label: 'Navigation System',
    description: 'SLAM-based autonomous navigation with centimetre-level accuracy, enabling pallet pick-up and drop-off without fixed infrastructure.',
    image: '/assets/product-apt20.webp',
    dot: { left: 238, top: 315 },
  },
  {
    id: 'axis-imu',
    label: 'Axis-IMU',
    description: '6-axis inertial measurement unit for real-time stability monitoring and load-tilt compensation during elevated transport.',
    image: '/assets/product-apt20.webp',
    dot: { left: 382, top: 286 },
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
        <p className={`${styles.featureLabel} title-2 title-2-md`}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
          <div className={styles.detailImage}>
            <Image src={feature.image} alt={feature.label} fill sizes="328px" className={styles.detailImg} />
          </div>
          <div className={styles.detailContent}>
            <p className={`body-2 body-1-md ${styles.featureDesc}`}>{feature.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [activeTech, setActiveTech] = useState(-1);
  const activeFeature = FEATURES[active];
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>

      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Built on an Intelligent Core</h2>
        <p className={`body-1 body-1-md ${styles.subtitle}`}>
          Precision autonomy meets heavy-duty lifting. The APT20 combines
          advanced sensing with a robust fork mechanism for reliable pallet handling.
        </p>
      </div>

      <div className={styles.contentRow}>

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            <Image
              src="/assets/apt20-capabilities-hero.webp"
              alt="APT20 intelligent systems diagram"
              fill
              sizes="879px"
              className={styles.robotImage}
            />
          </div>

          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
              style={{ left: `${(f.dot.left / IMAGE_WIDTH) * 100}%`, top: `${(f.dot.top / IMAGE_HEIGHT) * 100}%` }}
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
            style={{
              left: `${((activeFeature.dot.left + 55) / IMAGE_WIDTH) * 100}%`,
              top: `${((activeFeature.dot.top + 5) / IMAGE_HEIGHT) * 100}%`,
            }}
          >
            <span className="label-2 label-2-md">{activeFeature.label}</span>
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
  {TECH_CARDS.map((card, index) => (
    <div
      key={card.id}
      className={`${styles.techCard} ${
        activeTech === index ? styles.techCardActive : ""
      }`}
    >
      <button
        type="button"
        className={styles.techCardHeader}
        onClick={() =>
          setActiveTech(activeTech === index ? -1 : index)
        }
      >
        <div className={styles.techIconWrap}>
          <Image
            src={card.icon}
            alt=""
            width={50}
            height={50}
          />
        </div>

        <p className={`${styles.techCardTitle} title-2 title-2-md`}>
          {card.title}
        </p>

        <span className={styles.techArrow}>
          {activeTech === index ? "−" : "+"}
        </span>
      </button>

      <div
        className={`${styles.techContent} ${
          activeTech === index
            ? styles.techContentOpen
            : ""
        }`}
      >
        <p className={`body-1 body-1-md ${styles.techCardDesc}`}>
          {card.description}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
