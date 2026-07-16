'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Capabilities.module.css';

const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 568;

const FEATURES = [
  {
    id: '2d-lidar',
    label: '2D LiDAR',
    description: 'Lorem ipsum dolor sit amet consectetur. Praesent duis congue elementum sapien. Nullam gravida netus cras volutpat feugiat. Et pulvinar augue sed nec cras at aenean.',
    image: '/assets/amr50.webp',
    dot: { left: 374, top: 476 },
  },
  {
    id: '3d-lidar',
    label: '3D LiDAR',
    description: 'Lorem ipsum dolor sit amet consectetur. Praesent duis congue elementum sapien. Nullam gravida netus cras volutpat feugiat.',
    image: '/assets/amr50.webp',
    dot: { left: 476, top: 368 },
  },
  {
    id: 'wheelbase',
    label: 'Wheelbase',
    description: 'Lorem ipsum dolor sit amet consectetur. Praesent duis congue elementum sapien. Nullam gravida netus cras volutpat.',
    image: '/assets/amr50.webp',
    dot: { left: 90, top: 302 },
  },
  {
    id: 'axis-imu',
    label: 'Axis-IMU',
    description: 'Lorem ipsum dolor sit amet consectetur. Praesent duis congue elementum sapien.',
    image: '/assets/amr50.webp',
    dot: { left: 189, top: 140 },
  },
];

const VIEWS = [
  { id: 'diagram', label: 'AMR 50', thumb: '/assets/product-amr50.webp', image: '/assets/amr50-intelligent.png', showDots: true },
  { id: 'fleet', label: 'AMR 51', thumb: '/assets/amr50-fleet-view.png', image: '/assets/amr50-fleet-view.png', showDots: false },
];

const TECH_CARDS = [
  { id: '360-perception', title: '360° Perception', icon: '/assets/360-perception.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'obstacle-avoidance', title: 'Obstacle Avoidance & Detection', icon: '/assets/obstacle-avoidance.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'driving-modes', title: 'Manual & Autonomous Driving Modes', icon: '/assets/manual-autonomous.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'productivity', title: 'Increased Productivity', icon: '/assets/amr10-icon-productivity.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'compact-footprint', title: 'Compact Footprint', icon: '/assets/amr10-icon-compact-footprint.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'indoor-outdoor', title: 'Indoor & Outdoor Operational Capability', icon: '/assets/amr10-icon-indoor-outdoor.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
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
      <div className={styles.imageExpandable}>
        <div className={styles.imageExpandableInner}>
          <div className={styles.detailImage}>
            <Image
              src={feature.image}
              alt={feature.label}
              fill
              sizes="328px"
              className={styles.detailImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.labelRow}>
        <p className={`${styles.featureLabel} title-2 title-2-md`}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
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
  const [activeView, setActiveView] = useState(0);
  const activeFeature = FEATURES[active];
  const view = VIEWS[activeView];

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Built on an Intelligent Core</h2>
        <p className={`body-1 body-1-md ${styles.subtitle}`}>
          Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget.
          Neque cras eget quis sapien cursus. Lorem ultrices neque sed sapien mattis.
        </p>
      </div>

      {/* ── Content row ── */}
      <div className={styles.contentRow}>

        <div className={styles.thumbnailPanel}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              className={`${styles.thumbCard} ${activeView === i ? styles.thumbCardActive : ''}`}
              onClick={() => setActiveView(i)}
            >
              <div className={styles.thumbImageWrap}>
                <Image src={v.thumb} alt={v.label} fill sizes="73px" className={styles.thumbImage} />
              </div>
              <p className={`label-2 label-1-md ${styles.thumbLabel}`}>{v.label}</p>
            </button>
          ))}
        </div>

        <div className={styles.mobileTabs}>
          <div className={styles.tabBar}>
            {VIEWS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.tab} ${activeView === i ? styles.tabActive : ''}`}
                onClick={() => setActiveView(i)}
              >
                <span className="label-2">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            <Image
              src={view.image}
              alt={view.showDots ? 'AMR50 intelligent systems diagram' : 'AMR50 fleet'}
              fill
              sizes="600px"
              className={styles.robotImage}
            />
          </div>

          {view.showDots && FEATURES.map((f, i) => (
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

          {view.showDots && (
          <div
            className={styles.pill}
            style={{
              left: `${((activeFeature.dot.left + 55) / IMAGE_WIDTH) * 100}%`,
              top: `${((activeFeature.dot.top + 5) / IMAGE_HEIGHT) * 100}%`,
            }}
          >
            <span className="label-2">{activeFeature.label}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="1"/>
            </svg>
          </div>
          )}
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
        {TECH_CARDS.map((card) => (
          <div key={card.id} className={styles.techCard}>
            <div className={styles.techCardHeader}>
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
            </div>

            <p className={`body-1 body-1-md ${styles.techCardDesc}`}>
              {card.description}
            </p>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
