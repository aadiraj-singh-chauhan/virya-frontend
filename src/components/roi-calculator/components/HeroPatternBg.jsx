import pulseStyles from '../css/HeroPatternBg.module.css';

export default function HeroPatternBg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1512 721"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#roiHeroPatternClip)">
        <path opacity="0.2" d="M160 0V320M160 560V721.5" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M160 320L1512 320" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M0 560H160" stroke="black" strokeWidth="0.5" />
        <path
          opacity="0.3"
          d="M478.5 560.5H960V361.5M1120 400V720.5M320.5 242.5H1120V119M1439.5 81H239M640 720.5V-1.5"
          stroke="black"
          strokeWidth="0.5"
        />
        <path opacity="0.3" d="M0 400L1512 400" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M80.5 480H1512.5" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="560.25" y1="0" x2="560.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="720.25" y1="0" x2="720.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="880.25" y1="0" x2="880.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1040.25" y1="0" x2="1040.25" y2="721" stroke="black" strokeWidth="0.5" />

        <g className={pulseStyles.pulseA}>
          <rect x="1363" y="399" width="3" height="20" transform="rotate(-90 1363 399)" fill="#F43D00" />
          <rect x="1383" y="399" width="3" height="20" transform="rotate(-90 1383 399)" fill="url(#roiHeroPaint0)" />
        </g>

        <line opacity="0.3" x1="800.25" y1="0" x2="800.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1200.25" y1="0" x2="1200.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1280.25" y1="0" x2="1280.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1360.25" y1="0" x2="1360.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1440.25" y1="0" x2="1440.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="80.25" y1="0" x2="80.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1512" y1="160.25" x2="0" y2="160.25" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="480.25" y1="0" x2="480.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="320.25" y1="240" x2="320.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="400.25" y1="0" x2="400.25" y2="721" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="240.25" y1="0" x2="240.25" y2="240" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="240.25" y1="560" x2="240.25" y2="721" stroke="black" strokeWidth="0.5" />

        <g className={pulseStyles.pulseB}>
          <rect x="319" y="339" width="3" height="20" fill="#F43D00" />
          <rect x="319" y="359" width="3" height="20" fill="url(#roiHeroPaint1)" />
        </g>
        <g className={pulseStyles.pulseC}>
          <rect x="120" y="398" width="3" height="20" transform="rotate(90 120 398)" fill="#F43D00" />
          <rect x="100" y="398" width="3" height="20" transform="rotate(90 100 398)" fill="url(#roiHeroPaint2)" />
        </g>
        <g className={pulseStyles.pulseD}>
          <rect x="300" y="80" width="3" height="20" transform="rotate(90 300 80)" fill="#F43D00" />
          <rect x="280" y="80" width="3" height="20" transform="rotate(90 280 80)" fill="url(#roiHeroPaint3)" />
        </g>
        <g className={pulseStyles.pulseE}>
          <rect x="1281" y="200" width="3" height="20" transform="rotate(180 1281 200)" fill="#F43D00" />
          <rect x="1281" y="180" width="3" height="20" transform="rotate(180 1281 180)" fill="url(#roiHeroPaint4)" />
        </g>

        <circle opacity="0.2" cx="1360" cy="240" r="80" stroke="black" strokeWidth="0.5" />
        <path opacity="0.2" d="M470 10L160 320" stroke="black" strokeWidth="0.5" />
      </g>
      <defs>
        <linearGradient id="roiHeroPaint0" x1="1384.5" y1="399" x2="1384.5" y2="419" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="roiHeroPaint1" x1="320.5" y1="359" x2="320.5" y2="379" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="roiHeroPaint2" x1="101.5" y1="398" x2="101.5" y2="418" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="roiHeroPaint3" x1="281.5" y1="80" x2="281.5" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="roiHeroPaint4" x1="1282.5" y1="180" x2="1282.5" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="roiHeroPatternClip">
          <rect width="1512" height="721" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
