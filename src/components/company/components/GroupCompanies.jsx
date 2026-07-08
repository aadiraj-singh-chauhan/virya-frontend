import Image from 'next/image';
import styles from '../css/GroupCompanies.module.css';

const COMPANIES = [
  {
    name: 'Maini Materials Movement',
    logo: '/assets/company/group-maini-materials-movement.png',
    body: 'Maini Materials Movement is a leading provider of innovative and dependable transportation solutions that enable businesses to optimise their operations.',
  },
  {
    name: 'Maini Plastics and Composites',
    logo: '/assets/company/group-mpc.png',
    body: 'Maini Plastics and Composites (MPC) is among the first companies in India to manufacture plastics by vacuum-forming.',
  },
  {
    name: 'Virya Electric Powertrains',
    logo: '/assets/company/group-virya-electric-powertrains.png',
    body: 'Virya Electric Powertrains, is committed to advancing electric mobility in India through high-performance electric powertrains and integrated e-mobility solutions.',
  },
  {
    name: 'Maini Rentals',
    logo: '/assets/company/group-maini-rentals.png',
    body: 'Maini rentals is revolutionizing electric mobility by providing a fast, affordable, and interoperable battery-swapping network that overcomes key barriers to EV adoption.',
  },
];

const ALLIANCES = [
  {
    name: 'JK Maini',
    logo: '/assets/company/alliance-1.png',
    body: 'Maini Materials Movement is a leading provider of innovative and dependable transportation solutions that enable businesses to optimise their operations.',
  },
  {
    name: 'JK Maini',
    logo: '/assets/company/alliance-2.png',
    body: 'Maini Plastics and Composites (MPC) is among the first companies in India to manufacture plastics by vacuum-forming.',
  },
  {
    name: 'SUN Mobility',
    logo: '/assets/company/alliance-3.png',
    body: 'SUN Mobility is revolutionizing electric mobility by providing a fast, affordable, and interoperable battery-swapping network that overcomes key barriers to EV adoption.',
  },
  {
    name: 'TLD Maini',
    logo: '/assets/company/alliance-4.png',
    body: 'TLD Maini is a trusted name in the aviation industry, delivering a complete range of Ground Support Equipment (GSE) backed by one of the most extensive worldwide sales and service networks.',
  },
];

function GroupRow({ title, items }) {
  // Track is duplicated so the marquee can loop seamlessly at translateX(-50%).
  const track = [...items, ...items];

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>
        <span className={styles.bullet} aria-hidden="true" />
        <p className={`title-2-md ${styles.groupTitleText}`}>{title}</p>
      </div>
      <div className={styles.outer}>
        <div className={styles.track}>
          {track.map((item, i) => (
            <div key={`${title}-${item.name}-${i}`} className={styles.card}>
              <Image
                src={item.logo}
                alt={i < items.length ? item.name : ''}
                aria-hidden={i < items.length ? undefined : true}
                width={220}
                height={60}
                className={styles.logo}
                draggable={false}
              />
              <p className="body-1">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GroupCompanies() {
  return (
    <section id="group-companies" className={styles.section} data-header-theme="light">
      <GroupRow title="Group Companies" items={COMPANIES} />
      <GroupRow title="Group Alliances" items={ALLIANCES} />
    </section>
  );
}
