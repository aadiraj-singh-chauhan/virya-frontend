'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LogoSlider from './LogoSlider';
import styles from '../css/Legacy.module.css';

const CARDS = [
  {
    id: 'material',
    label: 'Material mobility',
    title: 'Autonomous movement for materials',
    cta: 'Explore material mobility',
    href: '/solutions/material-mobility',
    image: '/assets/material-mobility.webp',
  },
  {
    id: 'people',
    label: 'People mobility',
    title: 'Smart mobility for people',
    cta: 'Explore people mobility',
    href: '/solutions/people-mobility',
    image: '/assets/people-mobility.webp',
  },
  {
    id: 'rnd',
    label: 'R&D Platforms',
    title: 'Platforms that drive innovation',
    cta: 'Explore R&D Platforms',
    href: '/solutions/rnd-platforms',
    image: '/assets/r-d-platforms.webp',
  },
];

const METRICS = [
  { value: '50+', label: 'Years of experience in innovations!' },
  { value: '20+', label: 'System already built and running' },
  { value: '90+', label: 'Scalable Fleet Deployment' },
];

export default function Legacy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.section}>
      <Image
        src="/assets/legacy-performs-bg.webp"
        alt=""
        width={1920}
        height={1200}
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.bgOverlay} aria-hidden="true" />
      <div className={styles.gradientTop} aria-hidden="true" />

      <div className={`container ${styles.container}`}>
        <div className={styles.cards} data-header-theme="light">
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              className={`${styles.card} ${i === activeIndex ? styles.cardExpanded : styles.cardCollapsed}`}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.cardImage}
                aria-hidden="true"
              />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <div className={styles.cardHeader}>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span className="label-2">{card.label}</span>
                  </div>
                  <h3 className="title-1">{card.title}</h3>
                </div>
                <Button href={card.href} property1="Default" size="Button-2">
                  {card.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.contentSection} data-header-theme="dark">
          <div className={styles.taglineSection}>
            <h2 className={`heading-2 ${styles.taglineHeading}`}>
              Proven legacy. Real-world scale. Trusted performance.
            </h2>
            <div className={styles.metricsRow}>
              {METRICS.map(({ value, label }) => (
                <MetricCard key={value} value={value} label={label} />
              ))}
            </div>
          </div>
          <div className={styles.trustedBy}>
            <LogoSlider />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, label }) {
  const num = parseInt(value, 10);
  const suffix = value.slice(String(num).length);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;

        const duration = 1500;
        let startTime = null;

        const tick = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * num));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(num);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className={styles.metricCard}>
      <p className="headin-3">{count}{suffix}</p>
      <p className="label-1">{label}</p>
    </div>
  );
}
