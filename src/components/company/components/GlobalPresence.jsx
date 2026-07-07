'use client';

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../css/GlobalPresence.module.css';

// Marker coordinates lifted from the Figma map artwork (1127 × 615 box)
const MAP_W = 1127;
const MAP_H = 615;

const MARKERS = [
  { name: 'Canada', x: 261, y: 138.945 },
  { name: 'USA', x: 277, y: 190.945 },
  { name: 'Mexico', x: 273, y: 228.945 },
  { name: 'Brazil', x: 385, y: 342.945 },
  { name: 'France', x: 522, y: 177.945 },
  { name: 'Switzerland', x: 528, y: 190.945 },
  { name: 'Belgium', x: 530, y: 159.945 },
  { name: 'UK', x: 522, y: 126.945 },
  { name: 'Germany', x: 547, y: 155.945 },
  { name: 'Czech Republic', x: 573, y: 156.945 },
  { name: 'Slovakia', x: 590, y: 159.945 },
  { name: 'Poland', x: 560, y: 138.945 },
  { name: 'Sweden', x: 571, y: 88.9453 },
  { name: 'Russia', x: 763, y: 93.9453 },
  { name: 'China', x: 744, y: 196.945 },
  { name: 'Japan', x: 886, y: 190.945 },
  { name: 'South Korea', x: 853, y: 200.945 },
  { name: 'Oman', x: 670, y: 250.945 },
  { name: 'Sri Lanka', x: 736, y: 284.945 },
  { name: 'Mauritius', x: 670, y: 363.945 },
  { name: 'Nepal', x: 743, y: 234.945 },
  { name: 'Bhutan', x: 762, y: 236.945 },
  { name: 'Thailand', x: 793, y: 266.945 },
  { name: 'Greece', x: 585, y: 184.945 },
  { name: 'Italy', x: 564, y: 180.945 },
  { name: 'India', x: 725, y: 250.945 },
];

const STATS = [
  { value: '27+', label: 'Countries served' },
  { value: '200+', label: 'Global customers' },
  { value: '25+', label: 'Network of countries' },
  { value: '75%', label: 'Export intensity internationally' },
];

function pct(value, total) {
  return `${(value / total) * 100}%`;
}

export default function GlobalPresence() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>Global presence</h2>

      <WorldMap />

      <div className={styles.stats}>
        {STATS.map(({ value, label }) => (
          <StatCard key={value} value={value} label={label} />
        ))}
      </div>
    </section>
  );
}

// Isolated so its own 2s interval re-render never touches the stats subtree.
function WorldMap() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % MARKERS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.mapWrap}>
      <div className={styles.map}>
        <Image
          src="/assets/company/company-world-map.svg"
          alt="Map of Virya's global presence"
          fill
          sizes="(max-width: 1024px) 100vw, 1127px"
          className={styles.mapImage}
        />
        {MARKERS.map((m, i) => (
          <div
            key={m.name}
            className={`${styles.marker} ${i === activeIndex ? styles.active : ''}`}
            style={{ left: pct(m.x, MAP_W), top: pct(m.y, MAP_H) }}
          >
            <span className={styles.markerDot} aria-hidden="true" />
            <span className={styles.tooltip}>
              <span className={styles.tooltipDot} aria-hidden="true" />
              <span className={styles.tooltipLabel}>{m.name}</span>
            </span>
          </div>
        ))}
      </div>
      <div className={styles.mapFade} aria-hidden="true" />
    </div>
  );
}

const StatCard = memo(function StatCard({ value, label }) {
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

        const duration = 1800;
        let startTime = null;
        let raf;

        const tick = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(eased * num));
          if (progress < 1) raf = requestAnimationFrame(tick);
          else setCount(num);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className={styles.stat}>
      <p className="headin-3">{count}{suffix}</p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
});
