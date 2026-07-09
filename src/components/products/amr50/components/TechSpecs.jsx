import Image from 'next/image';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from '../css/TechSpecs.module.css';

const SPECS = [
  { label: 'Max Speed',                 value: '3 m/s (11km/hr)' },
  { label: 'Dimensions',                value: '1570 x 1000 x 1900 mm' },
  { label: 'Gradient',                  value: 'Upto 8%' },
  { label: 'Max Towing Capacity',       value: '5000 kg incl. payload attachment' },
  { label: 'Battery Capacity (Li-Ion)', value: 'Upto 360 Ah' },
  { label: 'Runtime',                   value: '—' },
];

export default function TechSpecs() {
  return (
    <section className={styles.section} data-header-theme="light">

      <h2 className={`heading-2 heading-2-md ${styles.title}`}>Product Specifications</h2>

      <div className={styles.blueprint}>
        {/* Desktop */}
        <Image
          src="/assets/amr50-blueprint.svg"
          alt="AMR50 product blueprint showing front, side and rear views with dimensions"
          width={1372}
          height={497}
          className={`${styles.blueprintImage} ${styles.blueprintDesktop}`}
        />

        {/* Mobile */}
        <Image
          src="/assets/product-specification-amr50-mob.svg"
          alt="AMR50 product blueprint"
          width={274}
          height={669}
          className={`${styles.blueprintImage} ${styles.blueprintMobile}`}
        />
      </div>

      {/* Spec cards */}
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
