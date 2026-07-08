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

export default function Industries() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Industries we cater to</h2>
      </div>
      <ImageSlider slides={SLIDES} cardAspectRatio="517 / 288" />
    </section>
  );
}
