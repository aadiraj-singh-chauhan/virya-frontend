import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/JoinUs.module.css';

export default function JoinUs() {
  return (
    <section className={styles.section} data-header-theme="dark">
      <Image
        src="/assets/careers/careers-join-us-bg.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className={styles.glow}
      />

      <h2 className={styles.heading}>
        Join us today!
        <br />
        Open opportunities at VIRYA
      </h2>

      <Button property1="Default" size="Button-2" href="#open-roles" className={styles.button}>
        See open roles
      </Button>
    </section>
  );
}
