'use client';

import Image from 'next/image';
import { useScrollSteps } from '@/hooks/useScrollSteps';
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

// Desktop: same panel design as before (title/desc/bullets + image,
// unchanged), pinned in one spot while a tall track scrolls underneath —
// only the active step's panel is shown (others display:none via
// .panelInactive), crossfading in as scroll advances. Same scroll-jack
// mechanic as Ecosystem (material-mobility), via the shared useScrollSteps
// hook.
//
// Mobile: static — the pin and scroll-jack are switched off entirely (see
// the max-width:767px rules in ServiceSteps.module.css) and every step's
// panel just renders in normal stacked document flow.
export default function ServiceSteps() {
  const { active, pinStyle, trackRef, stickyRef } = useScrollSteps(STEPS.length);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.scrollTrack} ref={trackRef}>
        <div className={styles.sticky} style={pinStyle} ref={stickyRef}>
          <div className="container">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`${styles.panel} ${i === active ? styles.panelActive : styles.panelInactive}`}
              >
                {/* Mobile-only bordered panel with corner markers, matching
                    the imageBox treatment but around the whole step
                    (heading/desc/image/bullets) — hidden on desktop, where
                    the imageBox keeps its own border/corners instead. */}
                <span className={styles.panelCorner} data-corner="tl" aria-hidden="true" />
                <span className={styles.panelCorner} data-corner="tr" aria-hidden="true" />
                <span className={styles.panelCorner} data-corner="bl" aria-hidden="true" />
                <span className={styles.panelCorner} data-corner="br" aria-hidden="true" />

                <div className={styles.textCol}>
                  <h3 className={`title-1 ${styles.title}`}>{step.title}</h3>
                  <p className={`body-1 ${styles.desc}`}>{step.desc}</p>
                </div>

                <div className={styles.imageWrap}>
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

                <div className={styles.bulletsWrap}>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
