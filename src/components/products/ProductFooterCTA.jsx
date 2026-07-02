import { Fragment } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './ProductFooterCTA.module.css';

const BLOCKS = [
  {
    eyebrow: 'Connect with us',
    heading: 'Curious about how our solutions can transform your factory?',
    cta: 'Contact us',
    href: '/contact',
  },
  {
    eyebrow: 'Join our team',
    heading: 'Passionate about impactful tech? Join our team',
    cta: 'Explore careers',
    href: '/careers',
  },
];

export default function ProductFooterCTA() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image src="/assets/cta-pattern.svg" alt="" fill sizes="100vw" aria-hidden="true" className={styles.pattern} />

      <div className={styles.container}>
        {BLOCKS.map((b, i) => (
          <Fragment key={b.href}>
            {i > 0 && <div className={styles.divider} aria-hidden="true" />}
            <div className={styles.block}>
              <p className="label-2">{b.eyebrow}</p>
              <p className={`title-1 ${styles.heading}`}>{b.heading}</p>
              <Button property1="Default" size="Button-2" href={b.href}>{b.cta}</Button>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
