import Image from 'next/image';
import styles from '../css/LogoSlider.module.css';

const LOGOS = Array.from({ length: 8 }, (_, i) => i);

export default function LogoSlider() {
  return (
    <div className={styles.wrapper}>
      <p className="label-3">Trusted by</p>
      <div className={styles.outer}>
        <div className={styles.track}>
          {LOGOS.map(i => (
            <Image
              key={i}
              src="/assets/logoIpsum-asset.webp"
              alt="Trusted partner logo"
              width={300}
              height={50}
              style={{ height: 'auto' }}
              className={styles.logo}
              draggable={false}
            />
          ))}
          {LOGOS.map(i => (
            <Image
              key={`d${i}`}
              src="/assets/logoIpsum-asset.webp"
              alt=""
              width={300}
              height={50}
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
