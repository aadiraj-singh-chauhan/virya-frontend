import Image from 'next/image';
import styles from './Capabilities.module.css';

const FEATURES = [
  {
    image: '/assets/seamless-ndoor–outdoor.webp',
    title: 'Seamless Indoor–Outdoor Navigation',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/360-environmental-awareness.webp',
    title: '360° Environmental Awareness',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/flexible-seating.webp',
    title: 'Flexible Seating and Luggage Configurations',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
  {
    image: '/assets/autonomous-manual-modes.webp',
    title: 'Autonomous and Manual Modes',
    body: 'Lorem ipsum dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard.',
  },
];

export default function Capabilities() {
  return (
    <section className={styles.section} data-header-theme="light">
      <h2 className={`heading-2 ${styles.heading}`}>
        Not just another solution<br />
        built to outperform at every level
      </h2>
      <div className={`container ${styles.grid}`}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.card}>
            <div className={styles.iconAndTitle}>
              <Image src={f.image} alt="" width={96} height={96} className={styles.icon} aria-hidden="true" />
              <p className="lable-3">{f.title}</p>
            </div>
            <p className="body-1">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
