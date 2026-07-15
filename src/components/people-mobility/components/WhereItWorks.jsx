import ImageSlider from '@/components/shared/components/ImageSlider';
import styles from '../css/WhereItWorks.module.css';

const SLIDES = [
  { src: '/assets/pm-airports.png', label: 'Airports' },
  { src: '/assets/pm-warehousing.png', label: 'Warehousing & Logistics' },
  { src: '/assets/pm-ports.png', label: 'Ports & Shipyards' },
].map((s) => ({ ...s, alt: s.label }));

export default function WhereItWorks() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Where it works</h2>
        <p className="body-1 body-1-md">Designed for Large-Scale Facilities</p>
      </div>

      <ImageSlider
        slides={SLIDES}
        cardAspectRatio="517 / 260"
        arrows="hover"
        mobileCardWidth="82vw"
        mobileCardHeight="420px"
      />
    </section>
  );
}
