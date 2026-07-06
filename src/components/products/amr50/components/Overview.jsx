'use client';

import { useEffect, useRef, useState } from 'react';
import OverviewPatternBg from '@/components/products/OverviewPatternBg';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import styles from './Overview.module.css';

const STATS = [
  { label: 'Max Towing Capacity', value: '5000 kg.', sub: '(Includes payload attachment)' },
  { label: 'Max Speed', value: '3 m/s' },
  { label: 'Motor Capacity', value: '4 kW' },
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

      {/* ── Top: description + stats ── */}
      <div className={styles.topPart}>
        <OverviewPatternBg className={styles.pattern} />
        <div className={styles.contentBg} aria-hidden="true" />

        <p className={`title-1 ${styles.heading}`}>
          <span className={styles.accent}>AMR 50 </span>
          is a rugged and powerful autonomous mobile robot, designed to tow payloads upto 5000kg.
          It&apos;s a versatile hybrid platform that operates autonomously and manually.
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
          src="/assets/amr50-overview.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="AMR50 in operation"
          className={styles.image}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <VideoPlayToggle isPlaying={isPlaying} onToggle={togglePlay} />
      </div>

    </section>
  );
}
