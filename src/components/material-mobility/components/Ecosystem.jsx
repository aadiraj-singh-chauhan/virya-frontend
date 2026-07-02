'use client';
import { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Ecosystem.module.css';

const STEPS = [
  {
    title: 'Understand Your Operations',
    desc: 'We study the workflow and logistics challenges.',
    image: '/assets/mm-ecosystem-operations.webp',
  },
  {
    title: 'Design the Autonomous System',
    desc: 'We design a tailored autonomous system for your site.',
    image: '/assets/mm-ecosystem-operations.webp',
  },
  {
    title: 'Integration and Deployment',
    desc: 'We deploy seamlessly across your existing setup.',
    image: '/assets/mm-ecosystem-operations.webp',
  },
  {
    title: 'Lifecycle Support',
    desc: 'We monitor and optimise throughout the lifecycle.',
    image: '/assets/mm-ecosystem-operations.webp',
  },
];

function Step({ title, active, onClick }) {
  const { display, play, reset } = useScramble(title);
  return (
    <button
      className={`${styles.stepTitle} ${active ? styles.stepActive : styles.stepDim}`}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <span className={styles.textOriginal}>{title}</span>
      <span className={styles.textDisplay} aria-hidden="true">{display || title}</span>
    </button>
  );
}

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const dots = container.querySelectorAll('[data-dot]');
    if (dots.length < 2) return;
    const containerTop = container.getBoundingClientRect().top;
    const center = (el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 - containerTop;
    };
    const firstCenter = center(dots[0]);
    const lastCenter = center(dots[dots.length - 1]);
    const activeCenter = center(dots[active]);
    container.style.setProperty('--track-top', `${firstCenter}px`);
    container.style.setProperty('--track-height', `${lastCenter - firstCenter}px`);
    container.style.setProperty('--fill-height', `${Math.max(0, activeCenter - firstCenter)}px`);
  }, [active]);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.textCol}>
            <p className="label-2">How we implement this ecosystem</p>

            <div className={styles.stepsContainer} ref={containerRef}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
              {STEPS.map((step, i) => (
                <div key={step.title} className={styles.stepItem}>
                  <span data-dot="" className={`${styles.stepDot} ${i <= active ? styles.stepDotActive : ''}`} />
                  <Step title={step.title} active={active === i} onClick={() => setActive(i)} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageBox}>
            <Image src="/assets/mm-ecosystem-pattern.webp" alt="" fill sizes="676px" className={styles.pattern} />
            <Image
              key={active}
              src={STEPS[active].image}
              alt={STEPS[active].title}
              width={490}
              height={427}
              className={styles.image}
            />
            <p className={`body-1 ${styles.desc}`}>{STEPS[active].desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
