import styles from '../css/Applications.module.css';

const FEATURE_COLUMNS = [
  ['Software-Defined Vehicles', 'Fleet Intelligence', 'Production-Grade Autonomy'],
  ['Heavy-Duty Mobility Concepts', 'Autonomous Navigation', 'Application X'],
];

export default function Applications() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.title}`}>
        Applications across autonomy and robotics research
      </h2>

      <div className={styles.columns}>
        {FEATURE_COLUMNS.map((items, i) => (
          <div key={i} className={styles.column}>
            {items.map((label) => (
              <div key={label} className={styles.pill}>
                <span className={styles.dot} aria-hidden="true" />
                <span className="title-2">{label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
