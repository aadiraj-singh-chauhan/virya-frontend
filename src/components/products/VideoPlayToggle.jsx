'use client';

import styles from './VideoPlayToggle.module.css';

export default function VideoPlayToggle({ isPlaying, onToggle, className }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className || ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden="true">
          <path d="M14.1484 12.5156V23.9421" stroke="white" strokeWidth="1.08824" />
          <path d="M22.8516 12.5156V23.9421" stroke="white" strokeWidth="1.08824" />
        </svg>
      ) : (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden="true">
          <path d="M14.5 11.5V25.5L25 18.5L14.5 11.5Z" fill="white" />
        </svg>
      )}
    </button>
  );
}
