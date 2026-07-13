import Image from 'next/image';
import styles from '../css/TrajectoryAdaptation.module.css';

const CHECKLIST = [
  'Real-time path planning with dynamic obstacle avoidance',
  'Predictable, pedestrian-aware robot behavior',
  'Configurable speed zones for safer operations',
  'Redundant safety systems with fail-safe protection logic',
];

export default function TrajectoryAdaptation() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.textCol}>
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Intelligent Trajectory Adaptation in Live Environments</h2>
        <p className={`body-1 ${styles.desc}`}>
          Virya&rsquo;s motion systems dynamically compute and adapt robot trajectories in real
          time, ensuring smooth and safe movement across active industrial environments. With
          intelligent obstacle response, pedestrian-aware behavior, and layered safety systems,
          robots operate predictably while maintaining productivity on the floor.
        </p>
      </div>

      <div className={styles.diagram}>
        <div className={styles.diagramImageWrap}>
          <Image
            src="/assets/technology/tech-trajectory-bg.png"
            alt="Diagram of an autonomous robot adapting its trajectory around obstacles"
            fill
            sizes="(max-width: 768px) 100vw, 1300px"
            className={styles.diagramImage}
          />

          <div className={styles.fadeTop} aria-hidden="true" />
          <div className={styles.fadeBottom} aria-hidden="true" />
        </div>

        <div className={styles.checklist}>
          {CHECKLIST.map((item) => (
            <div key={item} className={styles.checklistItem}>
              <span className={styles.checklistDot} aria-hidden="true" />
              <span className="label-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
