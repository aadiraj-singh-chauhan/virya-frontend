import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/AcademicPartners.module.css';

const ACADEMIC_PARTNERS = [
  {
    name: 'GITAM University',
    desc: [
      'The company specializes in precision engineering, aerospace components, material handling systems, and electric mobility solutions.',
      'With global operations and customers across multiple countries, the group focuses on innovation, quality, and advanced manufacturing.',
    ],
    logo: '/assets/gitam-university.png',
    href: 'https://www.gitam.edu/',
  },
  {
    name: 'Manipal Academy of Higher Education',
    desc: [
      'The company specializes in precision engineering, aerospace components, material handling systems, and electric mobility solutions.',
      'With global operations and customers across multiple countries, the group focuses on innovation, quality, and advanced manufacturing.',
    ],
    logo: '/assets/manipal-academy.png',
    href: 'https://www.manipal.edu/mu.html',
  },
];

export default function AcademicPartners() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.content}>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Academic Partners</h2>

          <div className={styles.grid}>
            {ACADEMIC_PARTNERS.map((p) => (
              <div key={p.name} className={styles.card}>
                <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
                <div className={styles.imageWrap}>
                  <Image src={p.logo} alt={p.name} fill sizes="672px" className={styles.logo} />
                </div>

                <div className={styles.textWrap}>
                  <p className={`title-1 ${styles.name}`}>{p.name}</p>
                  <p className={`body-1 ${styles.desc}`}>
                    {p.desc.map((line) => <span key={line}>{line}</span>)}
                  </p>
                </div>

                <Button property1="Variant2" size="Button-1" href={p.href} target="_blank" className={styles.button}>
                  Visit website
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
