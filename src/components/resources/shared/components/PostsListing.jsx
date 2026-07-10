'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from '../css/PostsListing.module.css';

const INITIAL_VISIBLE = 6;
const PAGE_SIZE = 3;

/**
 * Shared "posts grid" layout used by /resources/blogs and
 * /resources/case-studies: heading, featured post, optional filter tabs,
 * paginated grid.
 *
 * @param heading      page heading
 * @param featured     { image, tags, text, ctaLabel, ctaHref }
 * @param posts        [{ key, image, tags, title }]
 * @param tabs         optional [{ id, label, match(post) => bool }] — first
 *                     entry is treated as the "show everything" tab
 */
export default function PostsListing({ heading, featured, posts, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const activeMatch = tabs?.find((t) => t.id === activeTab)?.match ?? (() => true);
  const filtered = posts.filter(activeMatch);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectTab = (tab) => {
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">
        <h1 className={`heading-2 heading-2-md ${styles.heading}`}>{heading}</h1>

        <div className={styles.featured}>
          <div className={styles.featuredImageWrap}>
            <Image
              src={featured.image}
              alt={featured.text}
              fill
              sizes="(max-width: 900px) 100vw, 676px"
              className={styles.featuredImage}
            />
          </div>

          <div className={styles.featuredText}>
            <div className={styles.tags}>
              {featured.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <p className="body-1">{featured.text}</p>
            <Button property1="Variant2" size="Button-2" href={featured.ctaHref || '#'}>
              {featured.ctaLabel || 'Read now'}
            </Button>
          </div>
        </div>

        {tabs && (
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => selectTab(tab.id)}
              >
                <span className="label-2 label-1-md">{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.grid}>
          {visible.map((post) => (
            <a key={post.key} href={post.href || '#'} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 444px"
                  className={styles.image}
                />
              </div>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <p className="body-1">{post.title}</p>
            </a>
          ))}
        </div>

        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              <span className="label-2 label-1-md">Load more</span>
              <svg width="13" height="11" viewBox="0 0 12.5 10.056" fill="none" aria-hidden="true" className={styles.loadMoreIcon}>
                <path d="M0 5.028L12.5 5.028" stroke="currentColor" />
                <path d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056" stroke="currentColor" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
