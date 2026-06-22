import Image from 'next/image';
import styles from '../css/Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section} data-header-theme="light">

      <div className={styles.inner}>
        <h2 className={`heading-2 ${styles.heading}`}>
          Results speak it better
        </h2>

        <div className={styles.card}>
          <div className={styles.quoteWrap}>
            <p className={`title-1 ${styles.quote}`}>
              "Client testimonial dolor sit amet, consectetur adipiscing elit,
              sed do tempor incididunt ut labore et dolore magna aliqua. Sed ut
              perspiciatis unde omnis iste natus error sit voluptatem, totam"
            </p>
          </div>

          <div className={styles.profile}>
            <Image
              src="/assets/logoIpsum-asset.webp"
              alt="LogoIpsum"
              width={200}
              height={41}
              className={styles.profileLogo}
            />
            <span className={styles.separator} aria-hidden="true" />
            <div className={styles.profileText}>
              <p className="label-2">Joey Samual</p>
              <p className="label-2">Senior supervisor, Logoipsum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
