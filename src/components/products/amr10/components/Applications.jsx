import Image from 'next/image';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from '../css/Applications.module.css';

const SPECS = [
  { label: 'Max Speed',            value: '2.3 m/s (8km/hr)' },
  { label: 'Dimensions',           value: '1170 x 760 x 960 mm' },
  { label: 'Gradient',             value: 'Upto 8%' },
  { label: 'Max Towing Capacity',  value: '1000 kg incl. payload attachment' },
  { label: 'Battery Capacity (Li-Ion)', value: 'Upto 300 Ah' },
  { label: 'Runtime',              value: '—' },
];

export default function Applications() {
  return (
    <section className={styles.section} data-header-theme="light">

      <h2 className={`heading-2 ${styles.title}`}>Product Specifications</h2>

      {/* Blueprint diagram */}
      <div className={styles.blueprint}>
        {/* Desktop */}
        <Image
          src="/assets/amr10-blueprint.svg"
          alt="AMR10 product blueprint showing front, side and rear views with dimensions"
          width={1370}
          height={405}
          className={`${styles.blueprintImage} ${styles.blueprintDesktop}`}
        />

        {/* Mobile */}
        <Image
          src="/assets/product-specification.png"
          alt="AMR10 product blueprint"
          width={390}
          height={700}
          className={`${styles.blueprintImage} ${styles.blueprintMobile}`}
        />
      </div>

      {/* Spec cards */}
      <div className={styles.grid}>
        {SPECS.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.cardLabel}>{s.label}</p>
            <p className={styles.cardValue}>{s.value}</p>
          </div>
        ))}
      </div>

      <DownloadBrochureButton property1="Variant2" size="Button-2" />

    </section>
  );
}
