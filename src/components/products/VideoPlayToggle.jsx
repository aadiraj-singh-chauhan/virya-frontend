'use client';

import styles from './css/VideoPlayToggle.module.css';

export default function VideoPlayToggle({ isPlaying, onToggle, className }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className || ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M3 1V13" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M9 1V13" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10.0001 11.9965" fill="none" aria-hidden="true">
      <path
        d="M0 0.490717V11.5058C0.00163267 11.5937 0.0264121 11.6796 0.0718397 11.7548C0.117267 11.8301 0.181737 11.8921 0.258748 11.9345C0.335759 11.9769 0.42259 11.9982 0.510484 11.9964C0.598378 11.9945 0.684228 11.9695 0.759379 11.9239L9.76442 6.41637C9.83635 6.37283 9.89584 6.31148 9.93712 6.23823C9.97841 6.16498 10.0001 6.08232 10.0001 5.99824C10.0001 5.91416 9.97841 5.8315 9.93712 5.75826C9.89584 5.68501 9.83635 5.62365 9.76442 5.58012L0.759379 0.0725896C0.684228 0.0269693 0.598378 0.00196975 0.510484 0.000111709C0.42259 -0.00174634 0.335759 0.0196029 0.258748 0.0620067C0.181737 0.10441 0.117267 0.166369 0.0718397 0.241637C0.0264121 0.316904 0.00163267 0.402818 0 0.490717Z"
        fill="white"
      />
    </svg>
  );
}
