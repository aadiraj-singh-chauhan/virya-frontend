import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.bg}>
        <Image
          src="/assets/pm-cta-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.buttons}>
        <Button property1="Default" size="Button-1" href="/contact">
          Request a Consultation
        </Button>
        <Button property1="Variant2" size="Button-1">
          Download Brochure
        </Button>
      </div>
    </section>
  );
}
