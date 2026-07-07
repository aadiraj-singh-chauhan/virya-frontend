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
    bg: '/assets/resources/partners/auro-bg.png',
    logo: '/assets/resources/partners/auro-logo.svg',
    logoWidth: 464,
    logoHeight: 124,
    href: '#',
  },
  {
    name: 'siMA.ai',
    desc: [
      'The company specializes in precision engineering, aerospace components, material handling systems, and electric mobility solutions.',
      'With global operations and customers across multiple countries, the group focuses on innovation, quality, and advanced manufacturing.',
    ],
    bg: '/assets/resources/partners/sima-bg.png',
    logo: '/assets/resources/partners/sima-logo.svg',
    logoWidth: 262,
    logoHeight: 64,
    href: '#',
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
                <Image src={p.bg} alt="" fill sizes="672px" className={styles.bgImage} />
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.logoWidth}
                  height={p.logoHeight}
                  className={styles.logo}
                />
              </div>

              <div className={styles.textWrap}>
                <p className={`title-1 ${styles.name}`}>{p.name}</p>
                <p className={`body-1 ${styles.desc}`}>
                  {p.desc.map((line) => <span key={line}>{line}</span>)}
                </p>
              </div>

              <Button property1="Variant2" size="Button-1" href={p.href} className={styles.button}>
                Visit website
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
