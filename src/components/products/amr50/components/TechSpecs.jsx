'use client';
import { useState } from 'react';
import Image from 'next/image';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from '../css/TechSpecs.module.css';

const TABS = ['AMR 50', 'AMR 51'];

const SPECS = [
  { label: 'Max Speed',                 value: '3 m/s (11km/hr)' },
  { label: 'Dimensions',                value: '1570 x 1000 x 1900 mm' },
  { label: 'Gradient',                  value: 'Upto 8%' },
  { label: 'Max Towing Capacity',       value: '5000 kg incl. payload attachment' },
  { label: 'Battery Capacity (Li-Ion)', value: 'Upto 360 Ah' },
  { label: 'Runtime',                   value: '—' },
];

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={styles.section} data-header-theme="light">

      <h2 className={`heading-2 ${styles.title}`}>Product Specifications</h2>

      {/* Tab switcher */}
      <div className={styles.tabBar}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="label-2">{tab}</span>
          </button>
        ))}
      </div>

      {/* Blueprint diagram */}
      <div className={styles.blueprint}>
        <Image
          src="/assets/amr50-blueprint.svg"
          alt="AMR50 product blueprint showing front, side and rear views with dimensions"
          width={1372}
          height={497}
          className={styles.blueprintImage}
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
