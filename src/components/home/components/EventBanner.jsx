import Image from 'next/image';
import Button from '@/components/ui/Button';
import EventBannerPatternBg from './EventBannerPatternBg';
import styles from '../css/EventBanner.module.css';

export default function EventBanner() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <EventBannerPatternBg className={styles.patternBg} />
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className="label-2 label-2-md">Event</span>
                <span className="label-2 label-2-md">Nov 20</span>
                <span className="label-2 label-2-md">4pm · Mumbai</span>
              </div>
              <p className={`title-1 title-1-md ${styles.title}`}>
                A milestone moment: launching our next-generation autonomous pallet truck APT20
              </p>
              <p className="body-1 body-1-md">
                Lorem ipsum dolor sit amet consectetur. Bibendum tristique dictumst feugiat metus,
              </p>
              <Button href="/events/apt20" property1="Default" size="Button-2">Learn more</Button>
            </div>
            <Image
              src="/assets/milestone-moment.webp"
              alt="APT20 launch event"
              width={535}
              height={308}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
