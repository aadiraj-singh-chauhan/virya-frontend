'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/Legacy.module.css';

// Smooth-scrolls only this one in-page jump, scoped to this click — a global
// `scroll-behavior: smooth` was tried here before, but it also made Next.js's
// own scroll-to-top-on-navigation animate, so leaving the bottom of any page
// and clicking a header nav link would visibly scroll back up before the new
// page "started". scrollIntoView() has no such global side effect.
function scrollToGroupCompanies(e) {
  e.preventDefault();
  document.getElementById('group-companies')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Legacy() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>
        <Image
          src="/assets/company/company-legacy-logo.png"
          alt="Maini Group"
          width={278}
          height={278}
          className={styles.logo}
        />
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          A Legacy of Trust
          <br />
          Powering the Future of Mobility
        </h2>
        <p className={`title-1 body-1-md ${styles.description}`}>
          The company specializes in precision engineering, aerospace components, material
          handling systems, and electric mobility solutions. With global operations and
          customers across multiple countries, the group focuses on innovation, quality, and
          advanced manufacturing.
        </p>
        <Button property1="Default" size="Button-2" href="#group-companies" onClick={scrollToGroupCompanies}>
          Learn more
        </Button>
      </div>
    </section>
  );
}
