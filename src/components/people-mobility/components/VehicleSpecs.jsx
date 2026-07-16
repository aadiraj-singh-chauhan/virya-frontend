import Image from 'next/image';
import styles from '../css/VehicleSpecs.module.css';

const SPECS = [
  { label: 'Max Speed',                value: '15 km/h' },
  { label: 'Dimensions',               value: '4072×1370×1947 mm' },
  { label: 'Gradient',                 value: 'Upto 20%' },
  { label: 'Battery Capacity (Li-Ion)', value: 'Upto 200Ah' },
  { label: 'Runtime',                  value: '—' },
];

export default function VehicleSpecs() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
        Bring autonomous mobility to your facility
      </h2>

      <div className={styles.blueprintWrap}>
        <Image
          src="/assets/people-mobility-blueprint.svg"
          alt="APM vehicle — front, side, and rear views with dimensions"
          width={1251}
          height={312}
          className={`${styles.blueprint} ${styles.blueprintDesktop}`}
        />

        <Image
          src="/assets/autonomous-mobility-mob.svg"
          alt="APM vehicle — front, side, and rear views with dimensions"
          width={292}
          height={351}
          className={`${styles.blueprint} ${styles.blueprintMobile}`}
        />
      </div>

      <div className={`container ${styles.specs}`}>
        {SPECS.map((spec) => (
          <div key={spec.label} className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <p className="title-2 title-2-md">{spec.label}</p>
            <p className="body-1 body-1-md">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
