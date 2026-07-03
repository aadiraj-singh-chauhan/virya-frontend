import Image from 'next/image';
import styles from '../css/LogoSlider.module.css';

const LOGOS = [
  { src: 'bosch', alt: 'Bosch' },
  { src: 'ceat', alt: 'CEAT' },
  { src: 'denso', alt: 'DENSO' },
  { src: 'elecon', alt: 'Elecon' },
  { src: 'forbes', alt: 'Forbes' },
  { src: 'givaudan', alt: 'Givaudan' },
  { src: 'hero', alt: 'Hero' },
  { src: 'himedia', alt: 'HiMedia' },
  { src: 'infosys', alt: 'Infosys' },
  { src: 'kc', alt: 'Kimberly-Clark' },
  { src: 'kle', alt: 'KLE' },
  { src: 'manipal', alt: 'Manipal' },
  { src: 'ms', alt: 'Maruti Suzuki' },
  { src: 're', alt: 'Royal Enfield' },
  { src: 'rrkabel', alt: 'RR Kabel' },
  { src: 'sahyadri', alt: 'Sahyadri' },
  { src: 'tdk-1', alt: 'TDK' },
  { src: 'tdk', alt: 'TDK' },
  { src: 'toyota', alt: 'Toyota' },
  { src: 'tvs', alt: 'TVS' },
  { src: 'vecna', alt: 'Vecna' },
  { src: 'yamaha', alt: 'Yamaha' },
  { src: 'yokohama', alt: 'Yokohama' },
];

export default function LogoSlider() {
  return (
    <div className={styles.wrapper}>
      <p className="label-3">Trusted by</p>
      <div className={styles.outer}>
        <div className={styles.track}>
          {LOGOS.map(({ src, alt }) => (
            <Image
              key={src}
              src={`/assets/${src}.webp`}
              alt={alt}
              width={360}
              height={200}
              style={{ height: 'auto' }}
              className={styles.logo}
              draggable={false}
            />
          ))}
          {LOGOS.map(({ src, alt }) => (
            <Image
              key={`d-${src}`}
              src={`/assets/${src}.webp`}
              alt=""
              width={360}
              height={200}
              style={{ height: 'auto' }}
              aria-hidden="true"
              className={styles.logo}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
