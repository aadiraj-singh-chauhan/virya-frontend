'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import MuteToggle from '@/components/shared/components/MuteToggle';
import FullscreenToggle from '@/components/shared/components/FullscreenToggle';
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
        <MuteToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
        <FullscreenToggle />
      </div>
    </section>
  );
}
