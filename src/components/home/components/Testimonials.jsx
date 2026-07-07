import Image from 'next/image';
import TestimonialsPatternBg from './TestimonialsPatternBg';
import styles from '../css/Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section} data-header-theme="light">
      <TestimonialsPatternBg className={styles.patternBg} />

      <div className={styles.inner}>
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          Results speak it better
        </h2>

        <div className={styles.card}>
          <div className={styles.quoteWrap}>
            <p className={`title-1 ${styles.quote}`}>
              {'"Client testimonial dolor sit amet, consectetur adipiscing elit, '
                + 'sed do tempor incididunt ut labore et dolore magna aliqua. Sed ut '
                + 'perspiciatis unde omnis iste natus error sit voluptatem, totam"'}
            </p>
          </div>

          <div className={styles.profile}>
            <Image
              src="/assets/logoIpsum-asset.webp"
              alt="LogoIpsum"
              width={356}
              height={200}
              className={`${styles.profileLogo} ${styles.profileLogoDesktop}`}
            />
            <Image
              src="/assets/LogoIpsum Asset.png"
              alt="LogoIpsum"
              width={356}
              height={200}
              className={`${styles.profileLogo} ${styles.profileLogoMobile}`}
            />
            <span className={styles.separator} aria-hidden="true" />
            <div className={styles.profileText}>
              <p className="label-2 label-2-md">Joey Samual</p>
              <p className="label-2 label-2-md">Senior supervisor, Logoipsum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}