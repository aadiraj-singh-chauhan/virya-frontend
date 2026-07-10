'use client';

import styles from '../css/MuteToggle.module.css';

export default function MuteToggle({ muted, onToggle, className }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className || ''}`}
      onClick={onToggle}
      aria-label={muted ? 'Unmute video' : 'Mute video'}
    >
      {muted ? <SpeakerSlashIcon /> : <SpeakerHighIcon />}
    </button>
  );
}

function SpeakerSlashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 19.6445 19.6445" fill="none" aria-hidden="true">
      <path d="M15.3438 7.97656V11.6599" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M17.8047 6.75V12.8889" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M4.29678 3.07053L16.5746 16.5761" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path d="M9.21875 4.83119L12.2767 2.45312V8.19531" stroke="white" strokeWidth="1.7" strokeLinecap="square" />
      <path
        d="M12.2754 12.2449V17.1862L6.75037 12.8889H3.06702C2.9042 12.8889 2.74806 12.8242 2.63293 12.7091C2.5178 12.594 2.45312 12.4378 2.45312 12.275V7.36389C2.45312 7.20108 2.5178 7.04493 2.63293 6.9298C2.74806 6.81468 2.9042 6.75 3.06702 6.75L7.0859 6.75"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  );
}

function SpeakerHighIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path
        d="M6.53137 12.4688H2.96887C2.8114 12.4688 2.66038 12.4062 2.54903 12.2948C2.43768 12.1835 2.37512 12.0325 2.37512 11.875V7.125C2.37512 6.96753 2.43768 6.81651 2.54903 6.70516C2.66038 6.59381 2.8114 6.53125 2.96887 6.53125H6.53137L11.8751 2.375V16.625L6.53137 12.4688Z"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path d="M14.8437 7.71878V11.2813" stroke="white" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M17.2188 6.53122V12.4687" stroke="white" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
