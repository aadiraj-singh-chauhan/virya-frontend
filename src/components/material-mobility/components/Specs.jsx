import Image from 'next/image';
import styles from '../css/Specs.module.css';

const dummy = 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the';

const SPECS = [
  { icon: '/assets/360-perception.svg',     title: '360° Perception',                   desc: dummy },
  { icon: '/assets/obstacle-avoidance.svg', title: 'Obstacle Avoidance & Detection',    desc: dummy },
  { icon: '/assets/manual-autonomous.svg',  title: 'Manual & Autonomous Driving Modes', desc: dummy },
  { icon: '/assets/trolley-decoupling.svg', title: 'Autonomous Trolley Decoupling',     desc: dummy },
  { icon: '/assets/flexible-battery.svg',   title: 'Flexible Battery Options',          desc: dummy },
  { icon: '/assets/fleet-management.svg',   title: 'Fleet Management',                  desc: dummy },
];

export default function Specs() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h2 className={`heading-2 ${styles.heading}`}>
          Built differently,<br />so you can operate differently
        </h2>
        <div className={styles.grid}>
          {SPECS.map((spec) => (
            <div key={spec.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <Image src={spec.icon} alt="" width={50} height={50} className={styles.icon} />
                <p className={`title-2 ${styles.cardTitle}`}>{spec.title}</p>
              </div>
              <p className={`body-1 ${styles.cardDesc}`}>{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
