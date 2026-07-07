'use client';

import { useEffect, useRef, useState } from 'react';
import OverviewPatternBg from '@/components/products/OverviewPatternBg';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import styles from '../css/Overview.module.css';

const STATS = [
  { label: 'Max Lifting Capacity', value: '2000 kg.', sub: '(Includes payload attachment)' },
  { label: 'Max Speed', value: '2 m/s' },
  { label: 'Motor Capacity', value: '3 kW' },
  { label: 'Tyres', value: 'Solid Rubber', sub: '(Indoor & Outdoor)' },
];

export default function Overview() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section} data-header-theme="light">

      <div className={styles.topPart}>
        <OverviewPatternBg className={styles.pattern} />
        <div className={styles.contentBg} aria-hidden="true" />

        <p className={`title-1 heading-2-md ${styles.heading}`}>
          <span className={styles.accent}>APT 20 </span>
          is an autonomous pallet truck designed for 2-ton lifting capacity,
          offering seamless manual and autonomous hybrid operation modes.
        </p>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <p className="label-2 label-2-md">{s.label}</p>
              <p className={`${styles.statValue} label-1 heading-2-md`}>{s.value}</p>
              {s.sub && <p className={`${styles.statSub}`}>{s.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.imagePart}>
        <video
          ref={videoRef}
          src="/assets/apt20-overview.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="APT20 in operation"
          className={styles.image}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <VideoPlayToggle isPlaying={isPlaying} onToggle={togglePlay} />
      </div>

    </section>
  );
}
