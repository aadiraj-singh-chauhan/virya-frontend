import Image from 'next/image';
import styles from '../css/Banner.module.css';

const TICKS = [
  { x: 90.15, y: 55.34, axis: 'h' },
  { x: 21.30, y: 47.02, axis: 'v' },
  { x: 7.94,  y: 55.62, axis: 'h', flip: true },
  { x: 37.00, y: 86.20, axis: 'v' },
  { x: 79.23, y: 91.75, axis: 'v' },
  { x: 19.84, y: 11.51, axis: 'h', flip: true },
  { x: 84.52, y: 27.74, axis: 'v' },
];

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.grid} aria-hidden="true" />

      {TICKS.map((tick, i) => (
        <span
          key={i}
          className={`${styles.tick} ${tick.axis === 'h' ? styles.tickH : styles.tickV} ${tick.flip ? styles.tickFlip : ''}`}
          style={{ left: `${tick.x}%`, top: `${tick.y}%` }}
          aria-hidden="true"
        />
      ))}

      <div className={styles.wireframeWrap} aria-hidden="true">
        <Image src="/assets/rd-platforms-wireframe.webp" alt="" fill className={styles.wireframe} />
      </div>

      <div className={styles.content}>
        <h1 className="heading-2">Simulation to real-world autonomy</h1>
        <p className={`body-1 ${styles.desc}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        </p>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/assets/rd-platforms-vehicles.webp"
          alt="Virya R&D autonomous vehicle lineup"
          fill
          sizes="1040px"
          className={styles.image}
          priority
        />
        <div className={styles.imageFade} aria-hidden="true" />
      </div>
    </section>
  );
}
