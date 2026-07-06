'use client';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
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

function Step({ title, active }) {
  const { display, play, reset } = useScramble(title);

  useEffect(() => {
    if (active) play();
    else reset();
  }, [active, play, reset]);

  return (
    <div className={`title-1-md title-1 ${styles.stepTitle} ${active ? styles.stepActive : styles.stepDim}`}>
      <span className={`body-1 ${styles.textOriginal}`}>{title}</span>
      <span className={styles.textDisplay} aria-hidden="true">{display || title}</span>
    </div>
  );
}

const PIN_STYLE = {
  before: { position: 'absolute', top: 0, left: 0, right: 0 },
  after: { position: 'absolute', bottom: 0, left: 0, right: 0 },
};

// Minimum time (ms) the active step holds before advancing to the next one —
// keeps a hard/fast scroll from jumping straight to the target step and
// skipping the ones in between.
const STEP_SCRUB_MS = 550;

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const [pinStyle, setPinStyle] = useState(PIN_STYLE.before);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const targetRef = useRef(0);

  // Drive the active step from scroll progress through the tall .scrollTrack.
  // position: sticky can't be used here — html/body has overflow-x: hidden,
  // which breaks sticky descendants in Chromium/WebKit — so the "pinned"
  // state is replicated manually with position: fixed instead.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let raf = null;

    const update = () => {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 0;
      const stickyHeight = window.innerHeight - headerHeight;
      const rect = track.getBoundingClientRect();
      const total = rect.height - stickyHeight;

      if (total <= 0 || rect.top > headerHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.before ? prev : PIN_STYLE.before));
        targetRef.current = 0;
        return;
      }

      if (rect.bottom < headerHeight + stickyHeight) {
        setPinStyle((prev) => (prev === PIN_STYLE.after ? prev : PIN_STYLE.after));
        targetRef.current = STEPS.length - 1;
        return;
      }

      setPinStyle((prev) => {
        if (
          prev.position === 'fixed'
          && prev.top === headerHeight
          && prev.left === rect.left
          && prev.width === rect.width
        ) {
          return prev;
        }
        return { position: 'fixed', top: headerHeight, left: rect.left, width: rect.width };
      });
      const progress = Math.min(1, Math.max(0, (headerHeight - rect.top) / total));
      targetRef.current = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    };

    // Listeners stay attached for the section's whole lifetime — an earlier
    // attempt to gate them behind an IntersectionObserver (detaching once
    // the track left an extended margin) could leave .sticky permanently
    // stuck at position: fixed if the observer fired before the pin state
    // had settled, blocking the rest of the page until a refresh. A cheap
    // getBoundingClientRect() per scroll frame is worth paying to avoid that.
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Walks `active` toward the scroll-computed target one step at a time,
  // instead of snapping straight to it — so every point gets its own scroll.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => {
        const target = targetRef.current;
        if (current === target) return current;
        return current + Math.sign(target - current);
      });
    }, STEP_SCRUB_MS);
    return () => clearInterval(id);
  }, []);

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
        <div className={styles.sticky} style={pinStyle}>
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
  
              {/* Right Image */}
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