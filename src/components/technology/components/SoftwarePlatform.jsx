import Image from 'next/image';
import styles from '../css/SoftwarePlatform.module.css';

const FEATURES = [
  'Real-time fleet monitoring',
  'Dynamic task allocation',
  'Multi-robot traffic coordination',
  'Live system diagnostics',
  'Automated recovery workflows',
];

export default function SoftwarePlatform() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.visual}>
        <Image
          src="/assets/ftech-software.webp"
          alt="Fleet management dashboard shown on a wall monitor and tablet in a warehouse"
          fill
          sizes="(max-width: 768px) 100vw, 629px"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          <span className="label-2">Software</span>
        </div>

        <h2 className={`heading-2 ${styles.heading}`}>
          Intelligent fleet orchestration and autonomous operations platform
        </h2>

        <div className={styles.features}>
          {FEATURES.map((item) => (
            <div key={item} className={styles.featureItem}>
              <span className={styles.featureDot} aria-hidden="true" />
              <span className="label-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
