import Button from '@/components/ui/Button';
import styles from '../css/JoinUs.module.css';

export default function JoinUs() {
  return (
    <section className={styles.section} data-header-theme="dark">
      <video
        className={styles.glow}
        src="/assets/pwu-cta-bg.webm"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div className={styles.contentRow}>
        <h2 className={styles.heading}>
          Join us today!
          <br />
          Open opportunities at VIRYA
        </h2>

        <Button property1="Default" size="Button-2" href="#open-roles" className={styles.button}>
          See open roles
        </Button>
      </div>
    </section>
  );
}
