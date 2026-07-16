'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import { useScrollSteps } from '@/hooks/useScrollSteps';
import EcosystemPatternBg from './EcosystemPatternBg';
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

  useEffect(() => {
    if (active) play();
    else reset();
  }, [active, play, reset]);

  return (
    <div
      className={`title-1-md title-1 ${styles.stepTitle} ${active ? styles.stepActive : styles.stepDim}`}
      onClick={onClick}
    >
      <span className={styles.textOriginal}>{title}</span>
      <span className={styles.textDisplay} aria-hidden="true">{display || title}</span>
    </div>
  );
}

export default function Ecosystem() {
  const { active, setActive, pinStyle, trackRef, stickyRef } = useScrollSteps(STEPS.length);
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
      <div className={styles.scrollTrack} ref={trackRef}>
        <div className={styles.sticky} style={pinStyle} ref={stickyRef}>
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
                      <div className={styles.stepHead}>
                        <span
                          data-dot=""
                          className={`${styles.stepDot} ${
                            i <= active ? styles.stepDotActive : ""
                          }`}
                        />
  
                        <Step
                          title={step.title}
                          active={active === i}
                          onClick={() => setActive(i)}
                        />
                      </div>
  
                      <p
                        className={`body-1 ${styles.mobileDesc} ${
                          active === i ? styles.mobileDescActive : ""
                        }`}
                      >
                        {step.desc}
                      </p>
  
                      <div
                        className={`${styles.mobileImageWrap} ${
                          active === i ? styles.mobileImageActive : ""
                        }`}
                      >
                        <div className={styles.mobileImageInner}>
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="100vw"
                            className={styles.mobileImage}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className={styles.imageBox}>
                <EcosystemPatternBg className={styles.pattern} />
  
                <Image
                  src={STEPS[active].image}
                  alt={STEPS[active].title}
                  width={490}
                  height={427}
                  className={styles.image}
                />
  
                <p className={`body-1 ${styles.desc}`}>
                  {STEPS[active].desc}
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}