'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/Stats.module.css';

const STATS = [
  { value: '50+', label: 'Years of experience in innovations!' },
  { value: '20+', label: 'System already built and running' },
  { value: '90+', label: 'Scalable Fleet Deployment' },
];

const LOOPED = [...STATS, ...STATS, ...STATS, ...STATS];

export default function Stats() {
  const [counting, setCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.row}>
          {STATS.map(({ value, label }) => (
            <StatCard key={value} value={value} label={label} counting={counting} />
          ))}
        </div>
      </div>

      <div className={styles.slider}>
        <div className={styles.track}>
          {LOOPED.map(({ value, label }, i) => (
            <StatCard key={i} value={value} label={label} className={styles.mobileCard} counting={counting} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, className, counting }) {
  const num = parseInt(value, 10);
  const suffix = value.slice(String(num).length);
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!counting || animated.current) return;
    animated.current = true;

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
  }, [counting, num]);

  return (
    <div className={className ?? styles.card}>
      <p className="headin-3 headin-3-md">{count}{suffix}</p>
      <p className="label-1 label-1-md">{label}</p>
    </div>
  );
}
