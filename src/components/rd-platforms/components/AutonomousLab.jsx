'use client';

import { useRef } from 'react';
import Image from 'next/image';
import FullscreenToggle from '@/components/shared/components/FullscreenToggle';
import styles from '../css/AutonomousLab.module.css';

const FEATURES = [
  'Feature 1 Lorem ipsum dolor sit',
  'Feature 2 Lorem ipsum dolor sit amet',
  'Feature 3 Lorem ipsum dolor amet',
  'Feature 4 Lorem ipsum sit amet',
];

export default function AutonomousLab() {
  const rightRef = useRef(null);

  const handleExpand = () => {
    const el = rightRef.current;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Section on Autonomous Lab</h2>
          <p className={`body-1 body-1-md ${styles.desc}`}>
            Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero. Tincidunt risus in
          </p>
        </div>
      </div>

      <div className={styles.right} ref={rightRef}>
        <Image
          src="/assets/rd-autonomous-lab.png"
          alt="Engineer working on an autonomous lab platform"
          fill
          sizes="(max-width: 767px) 100vw, 66vw"
          className={styles.image}
        />
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.features}>
          {FEATURES.map((label) => (
            <div key={label} className={styles.pill}>
              <span className={styles.dot} aria-hidden="true" />
              <span className="label-1 label-1-md">{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlBtn} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 19.6445 19.6445" fill="none">
              <path d="M15.3438 7.97656V11.6599" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
              <path d="M17.8047 6.75V12.8889" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
              <path d="M4.29678 3.07053L16.5746 16.5761" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
              <path d="M9.21875 4.83119L12.2767 2.45312V8.19531" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
              <path d="M12.2754 12.2449V17.1862L6.75037 12.8889H3.06702C2.9042 12.8889 2.74806 12.8242 2.63293 12.7091C2.5178 12.594 2.45312 12.4378 2.45312 12.275V7.36389C2.45312 7.20108 2.5178 7.04493 2.63293 6.9298C2.74806 6.81468 2.9042 6.75 3.06702 6.75L7.0859 6.75" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
            </svg>
          </div>

          <FullscreenToggle onClick={handleExpand} />
        </div>
      </div>
    </section>
  );
}
