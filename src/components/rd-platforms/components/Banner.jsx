'use client';

import Image from 'next/image';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import BannerPatternBg from './BannerPatternBg';
import styles from '../css/Banner.module.css';

export default function Banner() {
  const { progress, pinStyle, trackRef, stickyRef } = useScrollProgress();

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.scrollTrack} ref={trackRef}>
        <div className={styles.sticky} style={pinStyle} ref={stickyRef}>
          <BannerPatternBg className={styles.patternBg} animate={false} />

          <div className={styles.content}>
            <h1 className="heading-2 heading-2-md">Simulation to real-world autonomy</h1>
            <p className={`body-1 ${styles.desc}`}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text
            </p>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src="/assets/rd-platform-background.webp"
              alt="Virya R&D autonomous vehicle lineup"
              fill
              sizes="100vw"
              className={styles.image}
              priority
            />
          </div>

          <div
            className={`${styles.imageWrap} ${styles.illustrationWrap}`}
            style={{ clipPath: `inset(0 0 ${progress * 100}% 0)` }}
          >
            <Image
              src="/assets/rd-platform-illustration.webp"
              alt=""
              fill
              sizes="100vw"
              className={styles.image}
              aria-hidden="true"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
