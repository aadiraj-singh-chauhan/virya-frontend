import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import styles from '../css/BrochureCTA.module.css';

export default function BrochureCTA() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.container}`}>
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          Every thing we do
          <br />
          at one place
        </h2>

        <div className={styles.details}>
          <p className="body-1">
            Figma ipsum component variant layer. Variant union component mask selection connection
            link. Figma ipsum component variant layer.
          </p>
          <DownloadBrochureButton property1="Variant2" size="Button-2" />
        </div>
      </div>
    </section>
  );
}
