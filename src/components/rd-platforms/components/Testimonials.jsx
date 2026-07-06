import Image from 'next/image';
import styles from './Testimonials.module.css';

const LOGOS = [
  '/assets/testimonial-logo-5.svg',
  '/assets/testimonial-logo-3.svg',
  '/assets/testimonial-logo-2.svg',
  '/assets/testimonial-logo-1.svg',
  '/assets/testimonial-logo-4.svg',
  '/assets/testimonial-logo-6.svg',
];

export default function Testimonials() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>
        Results speak it better
      </h2>

      <div className={styles.card}>
        <p className={`title-1 ${styles.quote}`}>
          {'"Client testimonial dolor sit amet, consectetur adipiscing elit, '
            + 'sed do tempor incididunt ut labore et dolore magna aliqua. Sed ut '
            + 'perspiciatis unde omnis iste natus error sit voluptatem, totam"'}
        </p>

        <div className={styles.profile}>
          <Image
            src="/assets/logoIpsum-asset.webp"
            alt="LogoIpsum"
            width={356}
            height={200}
            className={styles.profileLogo}
          />
          <span className={styles.separator} aria-hidden="true" />
          <div className={styles.profileText}>
            <p className="label-2">Joey Samual</p>
            <p className="label-2">Senior supervisor, Logoipsum</p>
          </div>
        </div>
      </div>

      <div className={styles.logos}>
        {LOGOS.map((src, i) => (
          <div key={src} className={styles.logoWrap}>
            <Image
              src={src}
              alt={`Client logo ${i + 1}`}
              fill
              sizes="150px"
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
