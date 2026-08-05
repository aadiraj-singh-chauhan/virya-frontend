'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Legacy.module.css';

export default function Legacy() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>
        <Image
          src="/assets/company/company-legacy-logo.png"
          alt="Maini Group"
          width={230}
          height={230}
          className={styles.logo}
        />
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          A Legacy of Trust
          <br />
          Powering the Future of Mobility
        </h2>
        <p className={`label-3 label-3-md ${styles.description}`}>
          The company specializes in precision engineering, aerospace components, material
          handling systems, and electric mobility solutions. With global operations and
          customers across multiple countries, the group focuses on innovation, quality, and
          advanced manufacturing.
        </p>
        <Button property1="Default" size="Button-2" href="https://www.mainigroup.com/" target="_blank">
          Learn more
        </Button>
      </div>
    </section>
  );
}
