import pulseStyles from '../css/LeadershipPatternBg.module.css';

// Figma node 1399-6001 — dedicated to Leadership (viewBox 1511x801). Two
// vertically-stacked tiles of the same grid pattern (each clipped to its
// own band) since Leadership's section is taller than one 721px tile.
export default function LeadershipPatternBg({ className, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1511 801"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#leadershipPatternClip0)">
        <g clipPath="url(#leadershipPatternClip1)">
          <path opacity="0.2" d="M159 561V881M159 1120.5V1282.5" stroke="black" strokeWidth="0.5" />
          <path
            opacity="0.3"
            d="M477.5 1121.5H959V922.5M1119 961V1281.5M319.5 803.5H1119V680M1438.5 642H238M639 1281.5V559.5"
            stroke="black"
            strokeWidth="0.5"
          />
          <line opacity="0.3" x1="559.25" y1="561" x2="559.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="719.25" y1="561" x2="719.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="879.25" y1="561" x2="879.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1039.25" y1="561" x2="1039.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="799.25" y1="561" x2="799.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1199.25" y1="561" x2="1199.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1279.25" y1="561" x2="1279.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1359.25" y1="561" x2="1359.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1439.25" y1="561" x2="1439.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="79.25" y1="561" x2="79.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1511" y1="721.25" x2="-1" y2="721.25" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="479.25" y1="561" x2="479.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="399.25" y1="561" x2="399.25" y2="1282" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="239.25" y1="561" x2="239.25" y2="801" stroke="black" strokeWidth="0.5" />

          {animate && (
            <g className={pulseStyles.pulseH}>
              <rect x="1280" y="761" width="3" height="20" transform="rotate(180 1280 761)" fill="#F43D00" />
              <rect x="1280" y="741" width="3" height="20" transform="rotate(180 1280 741)" fill="url(#leadershipPatternPaint0)" />
            </g>
          )}

          <circle opacity="0.2" cx="1359" cy="801" r="79.75" stroke="black" strokeWidth="0.5" />
          <path opacity="0.2" d="M469 571L159 881" stroke="black" strokeWidth="0.5" />
        </g>

        <g clipPath="url(#leadershipPatternClip2)">
          <path opacity="0.2" d="M159 -160V160M159 399.5V561.5" stroke="black" strokeWidth="0.5" />
          <path opacity="0.3" d="M159 160L1511 160" stroke="black" strokeWidth="0.5" />
          <path opacity="0.3" d="M-1 400H159" stroke="black" strokeWidth="0.5" />
          <path
            opacity="0.3"
            d="M477.5 400.5H959V201.5M1119 240V560.5M319.5 82.5H1119V-41M1438.5 -79H238M639 560.5V-161.5"
            stroke="black"
            strokeWidth="0.5"
          />
          <path opacity="0.3" d="M-1 240L1511 240" stroke="black" strokeWidth="0.5" />
          <path opacity="0.3" d="M79.5 320H1511.5" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="559.25" y1="-160" x2="559.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="719.25" y1="-160" x2="719.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="879.25" y1="-160" x2="879.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1039.25" y1="-160" x2="1039.25" y2="561" stroke="black" strokeWidth="0.5" />

          {animate && (
            <g className={pulseStyles.pulseA}>
              <rect x="1362" y="242" width="3" height="20" transform="rotate(-90 1362 242)" fill="#F43D00" />
              <rect x="1382" y="242" width="3" height="20" transform="rotate(-90 1382 242)" fill="url(#leadershipPatternPaint1)" />
            </g>
          )}

          <line opacity="0.3" x1="799.25" y1="-160" x2="799.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1199.25" y1="-160" x2="1199.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1279.25" y1="-160" x2="1279.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1359.25" y1="-160" x2="1359.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1439.25" y1="-160" x2="1439.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="79.25" y1="-160" x2="79.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="1511" y1="0.25" x2="-1" y2="0.25" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="479.25" y1="-160" x2="479.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="319.25" y1="80" x2="319.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="399.25" y1="-160" x2="399.25" y2="561" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="239.25" y1="-160" x2="239.25" y2="80" stroke="black" strokeWidth="0.5" />
          <line opacity="0.3" x1="239.25" y1="400" x2="239.25" y2="561" stroke="black" strokeWidth="0.5" />

          {animate && (
            <>
              <g className={pulseStyles.pulseB}>
                <rect x="318" y="179" width="3" height="20" fill="#F43D00" />
                <rect x="318" y="199" width="3" height="20" fill="url(#leadershipPatternPaint2)" />
              </g>
              <g className={pulseStyles.pulseC}>
                <rect x="119" y="238" width="3" height="20" transform="rotate(90 119 238)" fill="#F43D00" />
                <rect x="99" y="238" width="3" height="20" transform="rotate(90 99 238)" fill="url(#leadershipPatternPaint3)" />
              </g>
              <g className={pulseStyles.pulseG}>
                <rect x="1280" y="40" width="3" height="20" transform="rotate(180 1280 40)" fill="#F43D00" />
                <rect x="1280" y="20" width="3" height="20" transform="rotate(180 1280 20)" fill="url(#leadershipPatternPaint4)" />
              </g>
            </>
          )}

          <circle opacity="0.2" cx="1359" cy="80" r="79.75" stroke="black" strokeWidth="0.5" />
          <path opacity="0.2" d="M469 -150L159 160" stroke="black" strokeWidth="0.5" />
        </g>
      </g>
      <defs>
        <linearGradient id="leadershipPatternPaint0" x1="1281.5" y1="741" x2="1281.5" y2="761" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leadershipPatternPaint1" x1="1383.5" y1="242" x2="1383.5" y2="262" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leadershipPatternPaint2" x1="319.5" y1="199" x2="319.5" y2="219" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leadershipPatternPaint3" x1="100.5" y1="238" x2="100.5" y2="258" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leadershipPatternPaint4" x1="1281.5" y1="20" x2="1281.5" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="leadershipPatternClip0">
          <rect width="1512" height="801" fill="white" transform="translate(-1)" />
        </clipPath>
        <clipPath id="leadershipPatternClip1">
          <rect width="1512" height="721" fill="white" transform="translate(-1 561)" />
        </clipPath>
        <clipPath id="leadershipPatternClip2">
          <rect width="1512" height="561" fill="white" transform="translate(-1)" />
        </clipPath>
      </defs>
    </svg>
  );
}
