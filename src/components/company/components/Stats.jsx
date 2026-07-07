'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/Stats.module.css';

const STATS = [
  { value: '50+', label: 'Years of experience in innovations!' },
  { value: '20+', label: 'System already built and running' },
  { value: '90+', label: 'Scalable Fleet Deployment' },
];

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.row}>
        {STATS.map(({ value, label }) => (
          <StatCard key={value} value={value} label={label} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ value, label }) {
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
    <div ref={ref} className={styles.card}>
      <p className="headin-3">{count}{suffix}</p>
      <p className="label-1">{label}</p>
    </div>
  );
}
