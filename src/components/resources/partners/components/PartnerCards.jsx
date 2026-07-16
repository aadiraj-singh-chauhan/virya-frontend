import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/PartnerCards.module.css';

const PARTNERS = [
  {
    name: 'Auro Alliance',
    desc: [
      'The company specializes in precision engineering, aerospace components, material handling systems, and electric mobility solutions.',
      'With global operations and customers across multiple countries, the group focuses on innovation, quality, and advanced manufacturing.',
    ],
    bg: '/assets/auro-alliance.jpg',
    href: 'https://www.auroalliance.com/',
  },
  {
    name: 'siMA.ai',
    desc: [
      'The company specializes in precision engineering, aerospace components, material handling systems, and electric mobility solutions.',
      'With global operations and customers across multiple countries, the group focuses on innovation, quality, and advanced manufacturing.',
    ],
    bg: '/assets/sima-ai.jpg',
    href: 'https://sima.ai/',
  },
];

export default function PartnerCards() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.grid}>
          {PARTNERS.map((p) => (
            <div key={p.name} className={styles.card}>
              <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
              <div className={styles.imageWrap}>
                <Image src={p.bg} alt={p.name} fill sizes="672px" className={styles.bgImage} />
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
    </section>
  );
}
