'use client';

import styles from './css/VideoPlayToggle.module.css';

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <foreignObject x="-903.509" y="-903.509" width="1840.45" height="1840.45">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: 'blur(451.75px)', clipPath: 'url(#bgblur_toggle_pause_clip)', height: '100%', width: '100%' }} />
      </foreignObject>
      <g>
        <mask id="toggle-pause-mask" fill="white">
          <path d="M0 0H33.4298V33.4298H0V0Z" />
        </mask>
        <path d="M0 0H33.4298V33.4298H0V0Z" fill="black" fillOpacity="0.1" />
        <g clipPath="url(#toggle-pause-border-clip)" mask="url(#toggle-pause-mask)">
          <g transform="matrix(0.0142568 0 0 0.0142568 16.7149 16.7149)">
            <foreignObject x="-1241.38" y="-1241.38" width="2482.76" height="2482.76">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ background: 'conic-gradient(from 90deg,rgba(102,102,102,1) 0deg,rgba(255,63,0,1) 360deg)', height: '100%', width: '100%' }} />
            </foreignObject>
          </g>
        </g>
        <path d="M0 0V-0.98323H-0.98323V0H0ZM33.4298 0H34.4131V-0.98323H33.4298V0ZM33.4298 33.4298V34.4131H34.4131V33.4298H33.4298ZM0 33.4298H-0.98323V34.4131H0V33.4298ZM0 0V0.98323H33.4298V0V-0.98323H0V0ZM33.4298 0H32.4466V33.4298H33.4298H34.4131V0H33.4298ZM33.4298 33.4298V32.4466H0V33.4298V34.4131H33.4298V33.4298ZM0 33.4298H0.98323V0H0H-0.98323V33.4298H0Z" mask="url(#toggle-pause-mask)" />
      </g>
      <path d="M12.7812 11.3125V21.6364" stroke="white" strokeWidth="0.98323" />
      <path d="M20.6406 11.3125V21.6364" stroke="white" strokeWidth="0.98323" />
      <defs>
        <clipPath id="bgblur_toggle_pause_clip" transform="translate(903.509 903.509)">
          <path d="M0 0H33.4298V33.4298H0V0Z" />
        </clipPath>
        <clipPath id="toggle-pause-border-clip">
          <path d="M0 0V-0.98323H-0.98323V0H0ZM33.4298 0H34.4131V-0.98323H33.4298V0ZM33.4298 33.4298V34.4131H34.4131V33.4298H33.4298ZM0 33.4298H-0.98323V34.4131H0V33.4298ZM0 0V0.98323H33.4298V0V-0.98323H0V0ZM33.4298 0H32.4466V33.4298H33.4298H34.4131V0H33.4298ZM33.4298 33.4298V32.4466H0V33.4298V34.4131H33.4298V33.4298ZM0 33.4298H0.98323V0H0H-0.98323V33.4298H0Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <foreignObject x="-903.509" y="-903.509" width="1840.45" height="1840.45">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: 'blur(451.75px)', clipPath: 'url(#bgblur_toggle_play_clip)', height: '100%', width: '100%' }} />
      </foreignObject>
      <g>
        <mask id="toggle-play-mask" fill="white">
          <path d="M0 0H33.4298V33.4298H0V0Z" />
        </mask>
        <path d="M0 0H33.4298V33.4298H0V0Z" fill="black" fillOpacity="0.1" />
        <g clipPath="url(#toggle-play-border-clip)" mask="url(#toggle-play-mask)">
          <g transform="matrix(0.0142568 0 0 0.0142568 16.7149 16.7149)">
            <foreignObject x="-1241.38" y="-1241.38" width="2482.76" height="2482.76">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ background: 'conic-gradient(from 90deg,rgba(102,102,102,1) 0deg,rgba(255,63,0,1) 360deg)', height: '100%', width: '100%' }} />
            </foreignObject>
          </g>
        </g>
        <path d="M0 0V-0.98323H-0.98323V0H0ZM33.4298 0H34.4131V-0.98323H33.4298V0ZM33.4298 33.4298V34.4131H34.4131V33.4298H33.4298ZM0 33.4298H-0.98323V34.4131H0V33.4298ZM0 0V0.98323H33.4298V0V-0.98323H0V0ZM33.4298 0H32.4466V33.4298H33.4298H34.4131V0H33.4298ZM33.4298 33.4298V32.4466H0V33.4298V34.4131H33.4298V33.4298ZM0 33.4298H0.98323V0H0H-0.98323V33.4298H0Z" mask="url(#toggle-play-mask)" />
      </g>
      <path d="M12 11.0592V22.0743C12.0016 22.1621 12.0264 22.2481 12.0718 22.3233C12.1173 22.3986 12.1817 22.4606 12.2587 22.503C12.3358 22.5454 12.4226 22.5667 12.5105 22.5649C12.5984 22.563 12.6842 22.538 12.7594 22.4924L21.7644 16.9849C21.8364 16.9413 21.8958 16.88 21.9371 16.8067C21.9784 16.7335 22.0001 16.6508 22.0001 16.5667C22.0001 16.4826 21.9784 16.4 21.9371 16.3267C21.8958 16.2535 21.8364 16.1921 21.7644 16.1486L12.7594 10.6411C12.6842 10.5955 12.5984 10.5705 12.5105 10.5686C12.4226 10.5667 12.3358 10.5881 12.2587 10.6305C12.1817 10.6729 12.1173 10.7349 12.0718 10.8101C12.0264 10.8854 12.0016 10.9713 12 11.0592Z" fill="white" />
      <defs>
        <clipPath id="bgblur_toggle_play_clip" transform="translate(903.509 903.509)">
          <path d="M0 0H33.4298V33.4298H0V0Z" />
        </clipPath>
        <clipPath id="toggle-play-border-clip">
          <path d="M0 0V-0.98323H-0.98323V0H0ZM33.4298 0H34.4131V-0.98323H33.4298V0ZM33.4298 33.4298V34.4131H34.4131V33.4298H33.4298ZM0 33.4298H-0.98323V34.4131H0V33.4298ZM0 0V0.98323H33.4298V0V-0.98323H0V0ZM33.4298 0H32.4466V33.4298H33.4298H34.4131V0H33.4298ZM33.4298 33.4298V32.4466H0V33.4298V34.4131H33.4298V33.4298ZM0 33.4298H0.98323V0H0H-0.98323V33.4298H0Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

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
