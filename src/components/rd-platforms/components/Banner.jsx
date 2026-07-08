import Image from 'next/image';
import BannerPatternBg from './BannerPatternBg';
import styles from '../css/Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <BannerPatternBg className={styles.patternBg} />

      <div className={styles.content}>
        <h1 className="heading-2 heading-2-md">Simulation to real-world autonomy</h1>
        <p className={`body-1 ${styles.desc}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        </p>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/assets/rd-platform-bg.webp"
          alt="Virya R&D autonomous vehicle lineup"
          fill
          sizes="100vw"
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}
