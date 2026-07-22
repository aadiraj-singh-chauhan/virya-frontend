import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import ImageSlider from '@/components/shared/components/ImageSlider';
import styles from '../css/Industries.module.css';

const SLIDES = [
  {
    src: '/assets/manufacturing-&-industrial-facilities.webp',
    label: 'Manufacturing &\nIndustrial Facilities',
  },
  {
    src: '/assets/warehousing-&-logistics.webp',
    label: 'Warehousing &\nLogistics',
  },
  {
    src: '/assets/intralogistics-&-supply-chain-operations.webp',
    label: 'Intralogistics & Supply\nChain Operations',
  },
].map((s) => ({ ...s, alt: s.label.replace('\n', ' ') }));

const CTAS = [
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

export default function Industries() {
  return (
    <>
      <section className={styles.section} data-header-theme="light">
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Industries we cater to</h2>
        <ImageSlider
          slides={SLIDES}
          cardAspectRatio="517 / 288"
          arrows="hover"
          autoplay
          mobileCardWidth="85vw"
          mobileCardHeight="326px"
        />
      </section>

      <section className={styles.cta} data-header-theme="light">
        <div className={styles.ctaContainer}>
          {CTAS.map(({ eyebrow, heading, cta, href }, i) => (
            <Fragment key={href}>
              {i > 0 && <div className={styles.ctaDivider} aria-hidden="true" />}
              <div className={styles.ctaBlock}>
                <div className={styles.ctaHeading}>
                  <p className="label-2 label-2-md">{eyebrow}</p>
                  <p className={`title-1 heading-2-md ${styles.ctaTitle}`}>{heading}</p>
                </div>
                <Button href={href} property1="Default" size="Button-2">{cta}</Button>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
