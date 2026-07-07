import Image from 'next/image';
import styles from '../css/CoreValues.module.css';

const VALUES = [
  {
    title: 'Industrial Credibility',
    body: 'Leveraging the Maini Group’s engineering legacy to deliver trusted, global-standard industrial solutions',
  },
  {
    title: 'AI-Driven Intelligence',
    body: 'Integrating AI and Lidar technology for precise, autonomous movement in complex manufacturing environments',
  },
  {
    title: 'Solving Real-World Pains',
    body: 'Solving labour shortages and safety risks with automated systems designed for high ROI',
  },
  {
    title: 'Adaptability Across Frontiers',
    body: 'Lorem ipsum dolor sit amet consectetur. Risus tristique tellus ullamcorper arcu nec convallis libero.',
  },
];

export default function CoreValues() {
  return (
    <section className={styles.section} data-header-theme="dark">
      <Image
        src="/assets/company/company-core-values-bg.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className={styles.bg}
      />

      <div className={styles.content}>
        <h2 className={`heading-2 ${styles.heading}`}>Our Core Values</h2>
        <div className={styles.grid}>
          {VALUES.map((v) => (
            <div key={v.title} className={styles.card}>
              <p className="title-1">{v.title}</p>
              <p className="body-1">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
