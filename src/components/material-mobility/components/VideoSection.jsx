'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import styles from '../css/VideoSection.module.css';

const FEATURES = [
  'Indoor and outdoor operations',
  'Adapts instantly',
  'Safety first',
  'Towing up to 5,000kg',
  'Infrastructure ready',
];

export default function VideoSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const userPausedRef = useRef(false);

  // Pause while scrolled out of view — otherwise this and Banner's video both
  // decode at full res for the whole session regardless of scroll position,
  // competing for the main thread/GPU during scroll. Respect an explicit
  // manual pause (below) so scrolling back into view doesn't override it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">

        <p className={`${styles.heading} heading-2 heading-2-md`}>
          Virya delivers seamless mobility that keeps operations efficient and moving.
        </p>

        <div className={styles.features}>
          {FEATURES.map(f => (
            <div key={f} className={styles.featureItem}>
              <span className={styles.bullet} aria-hidden="true" />
              <span className="label-1">{f}</span>
            </div>
          ))}
        </div>

        <div className={styles.videoWrap}>
          {/* <Image src="/assets/mm-video-bg.webp" alt="" fill sizes="1030px" className={styles.videoBg} /> */}
          {/* <div className={styles.videoOverlay} aria-hidden="true" /> */}
          <video
            ref={videoRef}
            src="/assets/amr50-overview.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Virya autonomous vehicle in warehouse"
            className={styles.videoFg}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <VideoPlayToggle isPlaying={playing} onToggle={togglePlay} className={styles.playBtn} />
        </div>

      </div>
    </section>
  );
}
