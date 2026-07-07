import styles from '../css/HeroPattern.module.css';

export function HeroPatternLeft({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320.1 881.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M80 0V160M0 240H80V400H160V480H320L320 881.5" stroke="black" strokeWidth="0.5" />
      <g className={styles.pulseLeft}>
        <rect x="318.5" y="480" width="3" height="20" fill="var(--color-1)" />
        <rect x="318.5" y="500" width="3" height="20" fill="url(#partnersHeroPulseLeft)" />
      </g>
      <defs>
        <linearGradient id="partnersHeroPulseLeft" x1="320" y1="500" x2="320" y2="520" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-1)" />
          <stop offset="1" stopColor="var(--color-1)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HeroPatternRight({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320.1 720.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M80 0V160M0 240H80V400H160V480H320V720.5" stroke="black" strokeWidth="0.5" />
      <g className={styles.pulseRight}>
        <rect x="318.5" y="480" width="3" height="20" fill="var(--color-1)" />
        <rect x="318.5" y="500" width="3" height="20" fill="url(#partnersHeroPulseRight)" />
      </g>
      <defs>
        <linearGradient id="partnersHeroPulseRight" x1="320" y1="500" x2="320" y2="520" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-1)" />
          <stop offset="1" stopColor="var(--color-1)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
