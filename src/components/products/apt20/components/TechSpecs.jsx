'use client';
import { useState } from 'react';
import Image from 'next/image';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from '../css/TechSpecs.module.css';

const TABS = ['APT 20', 'APT 21'];

const SPECS = [
  { label: 'Max Speed',                  value: '2 m/s (7 km/hr)' },
  { label: 'Dimensions',                 value: '1830 x 840 x 1550 mm' },
  { label: 'Gradient',                   value: 'Upto 5%' },
  { label: 'Max Lifting Capacity',       value: '2000 kg incl. payload attachment' },
  { label: 'Battery Capacity (Li-Ion)',  value: 'Upto 200 Ah' },
  { label: 'Runtime',                    value: '—' },
];

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">

      <h2 className={`heading-2 heading-2-md ${styles.title}`}>Product Specifications</h2>

      <div className={styles.tabBar}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="label-2 label-1-md">{tab}</span>
          </button>
        ))}
      </div>

      <div className={styles.blueprint}>
        {/* Desktop */}
        <Image
          src="/assets/apt20-blueprint.svg"
          alt="APT20 product blueprint showing front, side and rear views with dimensions"
          width={1372}
          height={497}
          className={`${styles.blueprintImage} ${styles.blueprintDesktop}`}
        />

        {/* Mobile */}
        <Image
          src="/assets/product-specification-apt20-mob.svg"
          alt="APT20 product blueprint"
          width={290}
          height={557}
          className={`${styles.blueprintImage} ${styles.blueprintMobile}`}
        />
      </div>

      <div className={styles.grid}>
        {SPECS.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <p className={`${styles.cardLabel} title-2 title-2-md `}>{s.label}</p>
            <p className={`${styles.cardValue} body-1 body-1-md`}>{s.value}</p>
          </div>
        ))}
      </div>

      <DownloadBrochureButton property1="Variant2" size="Button-2" />

    </section>
  );
}
