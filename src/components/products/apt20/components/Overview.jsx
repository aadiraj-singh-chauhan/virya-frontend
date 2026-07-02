import Image from 'next/image';
import styles from '../css/Overview.module.css';

const STATS = [
  { label: 'Max Lifting Capacity', value: '2000 kg.', sub: '(Includes payload attachment)' },
  { label: 'Max Speed', value: '2 m/s' },
  { label: 'Motor Capacity', value: '3 kW' },
  { label: 'Tyres', value: 'Solid Rubber', sub: '(Indoor & Outdoor)' },
];

export default function Overview() {
  return (
    <section className={styles.section} data-header-theme="light">

      <div className={styles.topPart}>
        <Image src="/assets/cta-pattern.svg" alt="" width={1512} height={603} aria-hidden="true" className={styles.pattern} />
        <div className={styles.contentBg} aria-hidden="true" />

        <p className={`title-1 ${styles.heading}`}>
          <span className={styles.accent}>APT 20 </span>
          is an autonomous pallet truck designed for 2-ton lifting capacity,
          offering seamless manual and autonomous hybrid operation modes.
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

      <div className={styles.imagePart}>
        <Image
          src="/assets/apt20.webp"
          alt="APT20 in operation"
          fill
          className={styles.image}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

    </section>
  );
}
