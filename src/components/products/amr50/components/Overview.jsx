import Image from 'next/image';
import styles from '../css/Overview.module.css';

const STATS = [
  { label: 'Max Towing Capacity', value: '5000 kg.', sub: '(Includes payload attachment)' },
  { label: 'Max Speed', value: '3 m/s' },
  { label: 'Motor Capacity', value: '4 kW' },
  { label: 'Tyres', value: 'Solid Rubber', sub: '(Indoor & Outdoor)' },
];

export default function Overview() {
  return (
    <section className={styles.section} data-header-theme="light">

      {/* ── Top: description + stats ── */}
      <div className={styles.topPart}>
        <Image src="/assets/cta-pattern.svg" alt="" width={1512} height={603} aria-hidden="true" className={styles.pattern} />
        <div className={styles.contentBg} aria-hidden="true" />

        <p className={`title-1 ${styles.heading}`}>
          <span className={styles.accent}>AMR 50 </span>
          is a rugged and powerful autonomous mobile robot, designed to tow payloads upto 5000kg.
          It&apos;s a versatile hybrid platform that operates autonomously and manually.
        </p>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <p className="label-2">{s.label}</p>
              <p className={styles.statValue}>{s.value}</p>
              {s.sub && <p className={styles.statSub}>{s.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom: product-in-action image ── */}
      <div className={styles.imagePart}>
        <Image
          src="/assets/amr50.webp"
          alt="AMR50 in operation"
          fill
          className={styles.image}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

    </section>
  );
}
