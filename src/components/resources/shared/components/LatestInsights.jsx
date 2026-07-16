'use client';

import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/LatestInsights.module.css';

const POSTS = [
  {
    image: '/assets/resources/shared/blog-1.png',
    tags: ['Blog', 'Summit'],
    title: 'Driving innovation together: highlights from automation expo 2025',
  },
  {
    image: '/assets/resources/shared/blog-2.png',
    tags: ['Insights', 'Summit'],
    title: 'Recognition on a national stage: our journey at the India–AI impact summit',
  },
  {
    image: '/assets/resources/shared/blog-3.png',
    tags: ['Blog', 'Product Advancement'],
    title: 'A milestone moment: launching our next-generation autonomous pallet truck APT20',
  },
];

export default function LatestInsights() {
  const { display, play, reset } = useScramble('Explore more');

  const exploreLink = (
    <a href="/resources/blogs" className={styles.exploreLink} onMouseEnter={play} onMouseLeave={reset}>
      <span className={styles.linkText}>
        <span className={styles.textOriginal}>Explore more</span>
        <span className={styles.textDisplay} aria-hidden="true">{display || 'Explore more'}</span>
      </span>
      <svg width="13" height="11" viewBox="0 0 12.5 10.056" fill="none" aria-hidden="true">
        <path d="M0 5.028L12.5 5.028" stroke="currentColor" />
        <path d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056" stroke="currentColor" />
      </svg>
    </a>
  );

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Latest from Insights</h2>
          <div className={styles.desktopOnly}>{exploreLink}</div>
        </div>

        <div className={styles.grid}>
          {POSTS.map((post) => (
            <div key={post.title} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 900px) 82vw, 444px"
                  className={styles.image}
                />
              </div>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <p className="body-1">{post.title}</p>
            </div>
          ))}
        </div>

        <div className={styles.mobileOnly}>{exploreLink}</div>
      </div>
    </section>
  );
}
