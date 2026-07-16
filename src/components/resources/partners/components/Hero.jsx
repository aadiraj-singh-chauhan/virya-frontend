'use client';

import Button from '@/components/ui/Button';
import HeroPattern from './HeroPattern';
import styles from '../css/Hero.module.css';

// Smooth-scrolls only this one in-page jump, scoped to this click — a global
// `scroll-behavior: smooth` breaks Next.js's own scroll-to-top-on-navigation
// (see company/components/Legacy.jsx). scrollIntoView() has no such side effect.
function scrollToBecomePartner(e) {
  e.preventDefault();
  document.getElementById('become-a-partner')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <HeroPattern className={styles.pattern} />

      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          <span className="label-2">Partners</span>
        </div>

        <h1 className={`heading-2 heading-2-md ${styles.heading}`}>
          Our Network
          <br />
          of Trusted Partners
        </h1>

        <p className={`body-2 ${styles.desc}`}>
          Collaborating across technology, infrastructure, and research to build reliable,
          scalable systems.
        </p>

        <Button property1="Default" size="Button-2" href="#become-a-partner" onClick={scrollToBecomePartner} className={styles.button}>
          Be a partner
        </Button>
      </div>
    </section>
  );
}
