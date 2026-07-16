'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Autonomous.module.css';

// Smooth-scrolls only this one in-page jump, scoped to this click — a global
// `scroll-behavior: smooth` also animates Next.js's own scroll-to-top-on-
// navigation (see home/components/Legacy.jsx). scrollIntoView() has no such
// global side effect.
function scrollToLegacy(e) {
  e.preventDefault();
  document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Autonomous() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image
        src="/assets/autonomous-system.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.gradientTop} />
      <div className={styles.gradientBottom} />

      <div className={styles.content}>
        <p className="lable-3 label-1-md">Virya platforms are</p>
        <h2 className="heading-2 heading-2-md">
          Autonomous systems that fit the way your factory actually runs
        </h2>
        <Button href="#legacy" onClick={scrollToLegacy} property1="Default" size="Button-2">
          Explore our solutions
        </Button>
      </div>
    </section>
  );
}
