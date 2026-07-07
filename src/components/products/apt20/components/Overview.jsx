'use client';

import { useEffect, useRef, useState } from 'react';
import OverviewPatternBg from '@/components/products/OverviewPatternBg';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import styles from '../css/Overview.module.css';

const STATS = [
  { label: 'Max Payload Capacity', value: '2000 kg.' },
  { label: 'Max Speed', value: '1.5 m/s' },
  { label: 'Lifting Speed', value: '40mm/s' },
  { label: 'Lowering Speed', value: '30mm/s' },
  { label: 'Motor Capacity', value: '2 kW' },
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
          A versatile autonomous pallet truck designed for 2-ton lifting capacity, offering
          seamless manual and autonomous hybrid modes to ensure uninterrupted productivity in
          industrial environments
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
