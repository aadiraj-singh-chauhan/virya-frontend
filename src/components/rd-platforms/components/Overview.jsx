import styles from '../css/Overview.module.css';

const HIGHLIGHTS = [
  'Real-world validation',
  'Manual + autonomous control',
  'Integrated hardware–software stack',
];

export default function Overview() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 heading-2-md ${styles.title}`}>
        The research platform built for real-world experimentation
      </h2>

      <p className={`body-1 body-1-md ${styles.desc}`}>
        Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero. Tincidunt risus in sapien urna donec morbi aliquam ac.
      </p>

      <div className={styles.pills}>
        <div className={styles.pillsTrack}>
          {HIGHLIGHTS.map((label) => (
            <div key={label} className={styles.pill}>
              <span className={styles.dot} aria-hidden="true" />
              <span className="label-1 label-1-md">{label}</span>
            </div>
          ))}
          {HIGHLIGHTS.map((label) => (
            <div key={`d-${label}`} className={styles.pill} aria-hidden="true">
              <span className={styles.dot} aria-hidden="true" />
              <span className="label-1 label-1-md">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
