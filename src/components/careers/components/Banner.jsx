'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Banner.module.css';

export default function Banner() {
  const [muted, setMuted] = useState(true);

  return (
    <section className={styles.section} data-header-theme="dark">
      <Image
        src="/assets/careers/careers-banner.jpg"
        alt="Team at Virya collaborating in the office"
        fill
        sizes="100vw"
        priority
        className={styles.image}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.heading}>
          Build the Future of
          <br />
          Autonomous Mobility
        </h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec
          convallis libero.
        </p>
        <Button property1="Variant3" href="#open-roles">Explore Open Roles</Button>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          <MuteIcon muted={muted} />
        </button>
        <button type="button" className={styles.controlBtn} aria-label="View fullscreen">
          <FullscreenIcon />
        </button>
      </div>
    </section>
  );
}

function MuteIcon({ muted }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 6.5L4 8.5H1.5V11.5H4L7.5 13.5V6.5Z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
      {muted && (
        <>
          <path d="M12 5.5L18 14.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M18 5.5L12 14.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </>
      )}
      {!muted && (
        <path d="M11.5 7.5C12.5 8.3 13 9.1 13 10C13 10.9 12.5 11.7 11.5 12.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      )}
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="17" height="16" viewBox="0 0 17.058 16.49" fill="none" aria-hidden="true">
      <path d="M1 6V1H6" stroke="white" strokeWidth="1" strokeLinecap="square" />
      <path d="M16.058 6V1H11.058" stroke="white" strokeWidth="1" strokeLinecap="square" />
      <path d="M1 10.49V15.49H6" stroke="white" strokeWidth="1" strokeLinecap="square" />
      <path d="M16.058 10.49V15.49H11.058" stroke="white" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
