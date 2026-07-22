'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import VideoPlayToggle from '@/components/products/VideoPlayToggle';
import FullscreenToggle from '@/components/shared/components/FullscreenToggle';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const userPausedRef = useRef(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === video);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">

        <p className={`${styles.heading} heading-2 heading-2-md`}>
          Virya delivers seamless mobility that keeps operations efficient and moving.
        </p>

        <div className={styles.features}>
          <div className={styles.featuresTrack}>
            {FEATURES.map(f => (
              <div key={f} className={styles.featureItem}>
                <span className={styles.bullet} aria-hidden="true" />
                <span className="label-1">{f}</span>
              </div>
            ))}
            {FEATURES.map(f => (
              <div key={`d-${f}`} className={`${styles.featureItem} ${styles.featureItemDuplicate}`} aria-hidden="true">
                <span className={styles.bullet} aria-hidden="true" />
                <span className="label-1">{f}</span>
              </div>
            ))}
          </div>
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
            controls={isFullscreen}
            aria-label="Virya autonomous vehicle in warehouse"
            className={styles.videoFg}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className={styles.controls}>
            <VideoPlayToggle isPlaying={playing} onToggle={togglePlay} className={styles.playBtn} />
            <FullscreenToggle onClick={enterFullscreen} className={styles.fullscreenBtn} />
          </div>
        </div>

      </div>
    </section>
  );
}
