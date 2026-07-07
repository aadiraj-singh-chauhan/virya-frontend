import Image from 'next/image';
import styles from '../css/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <span className={styles.tagDot} aria-hidden="true" />
            <span className="label-2">Contact us</span>
          </div>

          <h1 className={`heading-1 ${styles.heading}`}>
            Got plans? Let&rsquo;s turn them into something real
          </h1>

          <p className={`title-1 ${styles.subheading}`}>Tell us whats on your mind</p>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/assets/contact/contact-banner-bg.webp"
          alt="Autonomous forklifts and trucks operating in a warehouse yard"
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          className={styles.image}
        />
      </div>
    </section>
  );
}
