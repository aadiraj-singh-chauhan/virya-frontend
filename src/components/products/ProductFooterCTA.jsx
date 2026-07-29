import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import ProductFooterCTAPatternBg from './ProductFooterCTAPatternBg';
import styles from './css/ProductFooterCTA.module.css';

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

export default function ProductFooterCTA({ pattern = true, onlyConnect = false }) {
  const blocks = onlyConnect ? BLOCKS.slice(0, 1) : BLOCKS;

  return (
    <section className={`${styles.section} ${pattern ? '' : styles.noPattern}`} data-header-theme="light">
      {pattern && <ProductFooterCTAPatternBg className={styles.pattern} />}

      <div className={styles.container}>
        {blocks.map((b, i) => (
          <Fragment key={b.href}>
            {i > 0 && <span className={styles.divider} aria-hidden="true" />}
            <div className={styles.block}>
              <p className="label-2 label-1-md">{b.eyebrow}</p>
              <p className={`title-1 heading-2-md ${styles.heading}`}>{b.heading}</p>
              <Button property1="Default" size="Button-2" href={b.href}>{b.cta}</Button>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
