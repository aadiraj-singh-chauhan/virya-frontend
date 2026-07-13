import ImageSlider from '@/components/shared/components/ImageSlider';
import styles from '../css/TeamGallery.module.css';

const SLIDES = [
  { src: '/assets/careers/careers-three-left.png', alt: 'Team collaborating around a laptop at Virya' },
  { src: '/assets/careers/careers-three-center.png', alt: 'Engineers reviewing autonomous hardware' },
  { src: '/assets/careers/careers-three-right.png', alt: 'Employees celebrating together at Virya' },
];

export default function TeamGallery() {
  return (
    <section className={styles.section} data-header-theme="light">
      <ImageSlider slides={SLIDES} cardAspectRatio="514 / 349" autoplay arrows={false} />
    </section>
  );
}
