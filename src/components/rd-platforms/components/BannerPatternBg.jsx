import pulseStyles from '../css/BannerPatternBg.module.css';

export default function BannerPatternBg({ className, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1511 721"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#bannerPatternClip)">
        <path opacity="0.2" d="M159 0V320M159 559.5V721.5" stroke="black" strokeWidth="0.2" />
        <path opacity="0.3" d="M159 320L1511 320" stroke="black" strokeWidth="0.2" />
        <path opacity="0.3" d="M-1 560H159" stroke="black" strokeWidth="0.2" />
        <path
          opacity="0.3"
          d="M477.5 560.5H959V361.5M1119 400V720.5M319.5 242.5H1119V119M1438.5 81H238M639 720.5V-1.5"
          stroke="black"
          strokeWidth="0.2"
        />
        <path opacity="0.3" d="M-1 400L1511 400" stroke="black" strokeWidth="0.2" />
        <path opacity="0.3" d="M79.5 480H1511.5" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="559.1" y1="4.37115e-09" x2="559.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="719.1" y1="4.37115e-09" x2="719.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="879.1" y1="4.37115e-09" x2="879.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1039.1" y1="4.37115e-09" x2="1039.1" y2="721" stroke="black" strokeWidth="0.2" />

        {animate && (
          <g className={pulseStyles.pulseA}>
            <rect x="1362" y="402" width="3" height="20" transform="rotate(-90 1362 402)" fill="#F43D00" />
            <rect x="1382" y="402" width="3" height="20" transform="rotate(-90 1382 402)" fill="url(#bannerPatternPaint0)" />
          </g>
        )}

        <line opacity="0.3" x1="799.1" y1="4.37115e-09" x2="799.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1199.1" y1="4.37115e-09" x2="1199.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1279.1" y1="4.37115e-09" x2="1279.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1359.1" y1="4.37115e-09" x2="1359.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1439.1" y1="4.37115e-09" x2="1439.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="79.1" y1="4.37115e-09" x2="79.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="1511" y1="160.1" x2="-1" y2="160.1" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="479.1" y1="4.37115e-09" x2="479.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="319.1" y1="240" x2="319.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="399.1" y1="4.37115e-09" x2="399.1" y2="721" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="239.1" y1="4.37115e-09" x2="239.1" y2="240" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="239.1" y1="560" x2="239.1" y2="721" stroke="black" strokeWidth="0.2" />

        {animate && (
          <>
            <g className={pulseStyles.pulseB}>
              <rect x="318" y="339" width="3" height="20" fill="#F43D00" />
              <rect x="318" y="359" width="3" height="20" fill="url(#bannerPatternPaint1)" />
            </g>
            <g className={pulseStyles.pulseC}>
              <rect x="119" y="398" width="3" height="20" transform="rotate(90 119 398)" fill="#F43D00" />
              <rect x="99" y="398" width="3" height="20" transform="rotate(90 99 398)" fill="url(#bannerPatternPaint2)" />
            </g>
            <g className={pulseStyles.pulseD}>
              <rect x="558.5" y="621.5" width="3" height="20" fill="#F43D00" />
              <rect x="558.5" y="641.5" width="3" height="20" fill="url(#bannerPatternPaint3)" />
            </g>
            <g className={pulseStyles.pulseE}>
              <rect x="1200" y="661.5" width="3" height="20" transform="rotate(180 1200 661.5)" fill="#F43D00" />
              <rect x="1200" y="641.5" width="3" height="20" transform="rotate(180 1200 641.5)" fill="url(#bannerPatternPaint4)" />
            </g>
            <g className={pulseStyles.pulseF}>
              <rect x="299" y="80" width="3" height="20" transform="rotate(90 299 80)" fill="#F43D00" />
              <rect x="279" y="80" width="3" height="20" transform="rotate(90 279 80)" fill="url(#bannerPatternPaint5)" />
            </g>
            <g className={pulseStyles.pulseG}>
              <rect x="1280" y="200" width="3" height="20" transform="rotate(180 1280 200)" fill="#F43D00" />
              <rect x="1280" y="180" width="3" height="20" transform="rotate(180 1280 180)" fill="url(#bannerPatternPaint6)" />
            </g>
          </>
        )}

        <circle opacity="0.2" cx="1359" cy="240" r="79.9" stroke="black" strokeWidth="0.2" />
        <path opacity="0.2" d="M469 10L159 320" stroke="black" strokeWidth="0.2" />
      </g>
      <defs>
        <linearGradient id="bannerPatternPaint0" x1="1383.5" y1="402" x2="1383.5" y2="422" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint1" x1="319.5" y1="359" x2="319.5" y2="379" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint2" x1="100.5" y1="398" x2="100.5" y2="418" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint3" x1="560" y1="641.5" x2="560" y2="661.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint4" x1="1201.5" y1="641.5" x2="1201.5" y2="661.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint5" x1="280.5" y1="80" x2="280.5" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bannerPatternPaint6" x1="1281.5" y1="180" x2="1281.5" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bannerPatternClip">
          <rect width="1512" height="721" fill="white" transform="translate(-1)" />
        </clipPath>
      </defs>
    </svg>
  );
}
