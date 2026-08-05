'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/LatestFromVirya.module.css';

const ITEMS = [
  {
    src: '/assets/hp-latest-blog-two.jpg',
    tags: ['Blog', 'Product Advancement'],
    title: 'A milestone moment: launching our next-generation autonomous pallet truck APT20',
  },
  {
    src: '/assets/hp-latest-blog-three.jpg',
    tags: ['Blog', 'Product Advancement'],
    title: 'A milestone moment: launching our next-generation autonomous pallet truck APT20',
  },
];

export default function LatestFromVirya() {
  const { display, play, reset } = useScramble('Explore more');

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">

        <div className={styles.header}>
          <h2 className={`heading-2 heading-2-md ${styles.headingText}`}>Latest from Virya</h2>
          <Link href="/resources/blogs" className={`label-2 ${styles.exploreLink}`} onMouseEnter={play} onMouseLeave={reset}>
            <span className={styles.linkText}>
              <span className={styles.textOriginal}>Explore more</span>
              <span className={styles.textDisplay} aria-hidden="true">{display || 'Explore more'}</span>
            </span>
            <svg width="13" height="11" viewBox="0 0 12.5 10.056" fill="none" aria-hidden="true">
              <path d="M 0 5.028 L 12.5 5.028" stroke="currentColor" strokeWidth="1" />
              <path d="M 6 0 L 8 0 L 12.5 5.028 L 8 10.056 L 6 10.056" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>

        <hr className={styles.divider} />

        <div className={styles.grid}>
          <div className={styles.featured}>
            <div className={styles.featuredImageWrap}>
              <Image src="/assets/factory-automation-transformation.jpg" alt="Factory automation" fill sizes="(max-width: 768px) 100vw, 676px" className={styles.featuredBg} />
              <div className={styles.featuredOverlay} aria-hidden="true" />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.tag}>Case study</span>
              <p className="body-1 body-1-md">Real-world deployment: factory automation transformation</p>
            </div>
          </div>

          <div className={styles.items}>
            {ITEMS.map((item, i) => (
              <div key={i} className={styles.item}>
                <Image src={item.src} alt={item.title} width={328} height={171} className={styles.itemImage} />
                <div className={styles.itemContent}>
                  <div className={styles.tags}>
                    {item.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                  </div>
                  <p className="body-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}