'use client';

import { useRef, useState } from 'react';
import OverviewPatternBg from '@/components/products/OverviewPatternBg';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import styles from '../css/Overview.module.css';

const STATS = [
  { label: 'Max Towing Capacity', value: '5000 kg.', sub: '(Includes payload attachment)' },
  { label: 'Max Speed', value: '3 m/s' },
  { label: 'Motor Capacity', value: '4 kW' },
  { label: 'Tyres', value: 'Solid Rubber', sub: '(Indoor & Outdoor)' },
];

export default function Overview() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

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

      {/* ── Top: description + stats ── */}
      <div className={styles.topPart}>
        <OverviewPatternBg className={styles.pattern} />
        <div className={styles.contentBg} aria-hidden="true" />

        <p className={`title-1 ${styles.heading}`}>
          <span className={styles.accent}>AMR 10 </span>
          is a compact and powerful autonomous mobile robot, designed to tow payloads upto 1000kg.
          With its compact footprint, AMR 10 optimises space in confined manufacturing environments.
        </p>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <p className="label-2">{s.label}</p>
              <p className={styles.statValue}>{s.value}</p>
              {s.sub && <p className={styles.statSub}>{s.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom: product-in-action video ── */}
      <div className={styles.imagePart}>
        <video
          ref={videoRef}
          src="/assets/amr10-overview.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="AMR10 in operation"
          className={styles.image}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <VideoPlayToggle isPlaying={isPlaying} onToggle={togglePlay} />
      </div>

    </section>
  );
}
