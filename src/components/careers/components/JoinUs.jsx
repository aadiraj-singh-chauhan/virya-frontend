import Button from '@/components/ui/Button';
import styles from '../css/JoinUs.module.css';

export default function JoinUs() {
  return (
    <section className={styles.section} data-header-theme="light">
      <video
        className={styles.bgVideo}
        poster="/assets/partner-with-us-bg.webp"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/partner-with-us.mp4" type="video/mp4" />
      </video>

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
