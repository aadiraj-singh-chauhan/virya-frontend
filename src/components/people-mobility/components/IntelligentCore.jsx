import Image from 'next/image';
import styles from './IntelligentCore.module.css';

const ITEMS = [
  {
    id: 'localization',
    title: 'High-Precision Localization',
    description:
      'Centimetre-level accuracy using multi-sensor fusion — LiDAR, IMU, and visual odometry — so the vehicle always knows exactly where it is.',
    image: '/assets/pm-indoor-operation.png',
  },
  {
    id: 'path-planning',
    title: 'Real-Time Path Planning',
    description:
      'Dynamic route computation that reacts to obstacles, traffic, and changing layouts without stopping or waiting for a remote update.',
    image: '/assets/pm-indoor-operation.png',
  },
  {
    id: 'indoor-outdoor',
    title: 'Indoor–Outdoor Operation',
    description:
      'Lorem ipsum dolor sit amet consectetur. Viverra suscipit ut aliquet eu vestibulum mattis amet. In fermentum lobortis sed risus nibh erat arcu.',
    image: '/assets/pm-indoor-operation.png',
  },
  {
    id: 'navigation',
    title: 'Environment-Aware Navigation',
    description:
      'Continuous perception of people, vehicles, and infrastructure lets the system make safe, context-aware decisions at every moment.',
    image: '/assets/pm-indoor-operation.png',
  },
  {
    id: 'fleet',
    title: 'Fleet Coordination',
    description:
      'Centralised orchestration assigns tasks, resolves conflicts, and optimises throughput across an entire fleet from a single interface.',
    image: '/assets/pm-indoor-operation.png',
  },
  {
    id: 'control',
    title: 'Hybrid Control Modes',
    description:
      'Seamlessly switch between fully autonomous, semi-autonomous, and manual operation to match the needs of any environment or workflow.',
    image: '/assets/pm-indoor-operation.png',
  },
];

export default function IntelligentCore() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>Built on an Intelligent Core</h2>
      <div className={styles.rows}>
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`${styles.row} ${i === 0 ? styles.rowBorderTop : ''}`}
          >
            <div className={`container ${styles.rowInner}`}>
              <p className="title-1">{item.title}</p>
              <p className={`body-1 ${styles.rowDesc}`}>{item.description}</p>
              {item.image && (
                <div className={styles.rowImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="560px"
                    className={styles.image}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
