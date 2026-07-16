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

      <h2 className={`heading-2 heading-2-md ${styles.title}`}>Product Specifications</h2>

      <div className={styles.blueprint}>
        <Image
          src="/assets/amr10-blueprint.svg"
          alt="AMR10 product blueprint showing front, side and rear views with dimensions"
          width={1370}
          height={405}
          className={`${styles.blueprintImage} ${styles.blueprintDesktop}`}
        />

        <Image
          src="/assets/product-specification-mob.svg"
          alt="AMR10 product blueprint"
          width={228}
          height={361}
          className={`${styles.blueprintImage} ${styles.blueprintMobile}`}
        />
      </div>

      <div className={styles.grid}>
        {SPECS.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <p className={`${styles.cardLabel} title-2 title-2-md`}>{s.label}</p>
            <p className={`${styles.cardValue} body-1 body-1-md`}>{s.value}</p>
          </div>
        ))}
      </div>

      <DownloadBrochureButton property1="Variant2" size="Button-2" />

    </section>
  );
}
