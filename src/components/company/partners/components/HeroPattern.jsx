import styles from '../css/HeroPattern.module.css';

export default function HeroPattern({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1512 713"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g clipPath="url(#partnersHeroClip)">
        <path
          d="M-128 633L32 633M112 713L112 633L272 633L272 553L352 553L352 393L753.5 393"
          stroke="black"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M-295 153L-135 153M-55 73L-55 153L105 153L105 233L185 233L185 393L425.5 393"
          stroke="black"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <g className={styles.pulse1}>
          <rect x="186" y="331" width="3" height="20" transform="rotate(180 186 331)" fill="#FF4000" />
          <rect x="186" y="311" width="3" height="20" transform="rotate(180 186 311)" fill="url(#partnersHeroPulse1)" />
        </g>

        <path
          d="M1762.5 633L1602.5 633M1522.5 713L1522.5 633L1362.5 633L1362.5 553L1282.5 553L1282.5 393L759 393"
          stroke="black"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M1929.5 153L1769.5 153M1689.5 73L1689.5 153L1529.5 153L1529.5 233L1449.5 233L1449.5 393L1209 393"
          stroke="black"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <g className={styles.pulse2}>
          <rect x="1280" y="439" width="3" height="20" fill="#FF4000" />
          <rect x="1280" y="459" width="3" height="20" fill="url(#partnersHeroPulse2)" />
        </g>

        <rect opacity="0.2" x="747" y="384" width="18" height="18" fill="#FF4000" />
        <rect opacity="0.2" x="749" y="386" width="14" height="14" fill="#FF4000" />
        <rect opacity="0.2" x="751" y="388" width="10" height="10" fill="#FF4000" />
        <rect x="753" y="390" width="6" height="6" fill="#FF4000" />
      </g>

      <defs>
        <linearGradient id="partnersHeroPulse1" x1="187.5" y1="311" x2="187.5" y2="331" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="partnersHeroPulse2" x1="1281.5" y1="459" x2="1281.5" y2="479" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="partnersHeroClip">
          <rect width="1512" height="713" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
