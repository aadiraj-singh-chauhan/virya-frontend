'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../css/ServiceSteps.module.css';

const STEPS = [
  {
    title: 'Deployment & Integration',
    desc: 'Getting systems up and running within your existing operations.',
    image: '/assets/resources/service-panel-1.jpg',
    bullets: [
      'Site assessment & workflow mapping',
      'System configuration based on use case',
      'Integration with existing processes',
    ],
  },
  {
    title: 'System Setup & Commissioning',
    desc: 'Ensuring everything works as intended from day one.',
    image: '/assets/resources/service-panel-2.png',
    bullets: [
      'On-site installation',
      'Testing across real operating conditions',
      'Performance validation',
    ],
  },
  {
    title: 'Operator Training',
    desc: 'Preparing teams to work alongside system-driven mobility.',
    image: '/assets/resources/service-panel-3.png',
    bullets: [
      'Operator onboarding',
      'Safety protocols',
      'Basic system handling & monitoring',
    ],
  },
  {
    title: 'Ongoing Support',
    desc: 'Keeping operations consistent over time.',
    image: '/assets/resources/service-panel-4.png',
    bullets: [
      'Remote monitoring & assistance',
      'System updates & optimization',
      'Issue resolution support',
    ],
  },
];

// Matches the .5s grid-template-rows transition on .bulletsWrap/.imageWrap
// below — the scroll lock holds for exactly as long as that animation
// takes to play out.
const TRANSITION_MS = 550;

// All four steps stay stacked and visible; only the one currently crossing
// the vertical center of the viewport expands to show its image + bullets,
// while the rest collapse down to just title + description. Scrolling
// briefly locks each time a new step becomes active, so its expand/collapse
// animation gets to finish playing before the user can scroll past it.
export default function ServiceSteps() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef([]);
  const lockedRef = useRef(false);
  const prevActiveRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = panelRefs.current.indexOf(entry.target);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (active === prevActiveRef.current) return undefined;
    prevActiveRef.current = active;

    lockedRef.current = true;
    const timer = setTimeout(() => { lockedRef.current = false; }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const blockWhileLocked = (e) => {
      if (lockedRef.current) e.preventDefault();
    };
    window.addEventListener('wheel', blockWhileLocked, { passive: false });
    window.addEventListener('touchmove', blockWhileLocked, { passive: false });
    return () => {
      window.removeEventListener('wheel', blockWhileLocked);
      window.removeEventListener('touchmove', blockWhileLocked);
    };
  }, []);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        {STEPS.map((step, i) => {
          const isActive = i === active;
          return (
            <div
              key={step.title}
              ref={(el) => { panelRefs.current[i] = el; }}
              className={styles.panel}
            >
              <div className={styles.textCol}>
                <h3 className={`title-1 ${styles.title}`}>{step.title}</h3>
                <p className={`body-1 ${styles.desc}`}>{step.desc}</p>

                <div className={`${styles.bulletsWrap} ${isActive ? styles.bulletsWrapActive : ''}`}>
                  <div className={styles.bulletsInner}>
                    <div className={styles.bullets}>
                      {step.bullets.map((b) => (
                        <div key={b} className={styles.bullet}>
                          <Image
                            src="/assets/technology/tech-check-icon.svg"
                            alt=""
                            width={13}
                            height={13}
                            aria-hidden="true"
                          />
                          <span className="label-2">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.imageWrap} ${isActive ? styles.imageWrapActive : ''}`}>
                <div className={styles.imageInner}>
                  <div className={styles.imageBox}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="672px"
                      loading="eager"
                      priority={i === 0}
                      className={styles.image}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
