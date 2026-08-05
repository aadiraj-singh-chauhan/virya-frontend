'use client';

import { useEffect, useState } from 'react';
import styles from './css/EventStrip.module.css';

const STRIP_HEIGHT = '40px';

export default function EventStrip() {
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hidden = scrolled || dismissed;

  useEffect(() => {
    let raf;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 0);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // The header reads the same --strip-height variable for its own offset,
  // so this is the single source of truth for both elements collapsing together.
  useEffect(() => {
    document.documentElement.style.setProperty('--strip-height', hidden ? '0px' : STRIP_HEIGHT);
  }, [hidden]);

  if (dismissed) return null;

  return (
    <div className={`${styles.strip} ${hidden ? styles.stripHidden : ''}`}>
      <div className={`container ${styles.inner}`}>
        <p className={`body-2 ${styles.text}`}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem, aperiam, eaque ipsa quae ab illo inventore veritatis.
        </p>
        <svg className={styles.arrow} width="13" height="11" viewBox="0 0 13 11" fill="none" aria-hidden="true">
          <path d="M7.5 1L12 5.5M12 5.5L7.5 10M12 5.5H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <button
          type="button"
          className={styles.close}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
