'use client';

import styles from '../css/FullscreenToggle.module.css';

export default function FullscreenToggle({ onClick, className }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className || ''}`}
      onClick={onClick}
      aria-label="View fullscreen"
    >
      <svg width="17" height="16" viewBox="0 0 18.7683 18.1908" fill="none" aria-hidden="true">
        <path d="M12.7979 0.852912H17.9154V5.97039" stroke="white" strokeWidth="1.70582" strokeLinecap="square" />
        <path d="M5.97039 17.3379H0.852912V12.2204" stroke="white" strokeWidth="1.70582" strokeLinecap="square" />
      </svg>
    </button>
  );
}
