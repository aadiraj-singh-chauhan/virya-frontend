'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './css/EventStrip.module.css';

export default function EventStrip() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY === 0);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`${styles.strip} ${visible ? '' : styles.stripHidden}`}>
      <p className={`body-2 ${styles.text}`}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem, aperiam, eaque ipsa quae ab illo inventore veritatis.
      </p>
      <svg className={styles.arrow} width="13" height="11" viewBox="0 0 13 11" fill="none" aria-hidden="true">
        <path d="M7.5 1L12 5.5M12 5.5L7.5 10M12 5.5H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
