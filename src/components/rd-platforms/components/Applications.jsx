import BannerPatternBg from './BannerPatternBg';
import styles from '../css/Applications.module.css';

const FEATURE_COLUMNS = [
  ['Software-Defined Vehicles', 'Fleet Intelligence', 'Production-Grade Autonomy'],
  ['Heavy-Duty Mobility Concepts', 'Autonomous Navigation', 'Application X'],
];

export default function Applications() {
  return (
    <section className={styles.section} data-header-theme="light">
      <BannerPatternBg className={styles.patternBg} />
      <div className={styles.fadeTop} aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <h2 className={`heading-2 heading-2-md ${styles.title}`}>
          Applications across autonomy and robotics research
        </h2>

        <div className={styles.columns}>
          {FEATURE_COLUMNS.map((items, i) => (
            <div key={i} className={styles.column}>
              {items.map((label) => (
                <div key={label} className={styles.pill}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className="title-2 label-1-md">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
