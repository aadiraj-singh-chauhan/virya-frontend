import styles from './Overview.module.css';

const HIGHLIGHTS = [
  'Real-world validation',
  'Manual + autonomous control',
  'Integrated hardware–software stack',
];

export default function Overview() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.title}`}>
        The research platform built for real-world experimentation
      </h2>

      <p className={`body-1 ${styles.desc}`}>
        Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero. Tincidunt risus in sapien urna donec morbi aliquam ac.
      </p>

      <div className={styles.pills}>
        {HIGHLIGHTS.map((label) => (
          <div key={label} className={styles.pill}>
            <span className={styles.dot} aria-hidden="true" />
            <span className="label-1">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
