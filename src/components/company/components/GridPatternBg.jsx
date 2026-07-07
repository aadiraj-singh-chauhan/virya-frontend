// Shared decorative line-grid background — used behind Mission and Leadership sections.
export default function GridPatternBg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1512 721"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g opacity="0.5">
        <line x1="80" y1="0" x2="80" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="240" y1="0" x2="240" y2="240" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="320" y1="240" x2="320" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="400" y1="0" x2="400" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="480" y1="0" x2="480" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="560" y1="0" x2="560" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="720" y1="0" x2="720" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="800" y1="0" x2="800" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="880" y1="0" x2="880" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="1040" y1="0" x2="1040" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="1200" y1="0" x2="1200" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="1280" y1="0" x2="1280" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="1360" y1="0" x2="1360" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="1440" y1="0" x2="1440" y2="721" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="0" y1="160" x2="1512" y2="160" stroke="black" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="239" y1="0" x2="1439" y2="721" stroke="black" strokeOpacity="0.1" strokeWidth="0.5" />
      </g>

      <circle cx="1360" cy="240" r="80" stroke="black" strokeOpacity="0.2" strokeWidth="0.5" />

      {/* Accent ticks — small orange marks with a faded gradient tail */}
      <g>
        <rect x="1363" y="399" width="20" height="3" fill="#F43D00" />
        <rect x="1383" y="399" width="20" height="3" fill="url(#companyGridPaint0)" />
      </g>
      <g transform="rotate(90 322 339)">
        <rect x="322" y="339" width="20" height="3" fill="#F43D00" />
        <rect x="342" y="339" width="20" height="3" fill="url(#companyGridPaint1)" />
      </g>
      <g transform="rotate(180 120 401)">
        <rect x="100" y="401" width="20" height="3" fill="url(#companyGridPaint2)" />
        <rect x="120" y="401" width="20" height="3" fill="#F43D00" />
      </g>
      <g transform="rotate(180 300 83)">
        <rect x="280" y="83" width="20" height="3" fill="url(#companyGridPaint3)" />
        <rect x="300" y="83" width="20" height="3" fill="#F43D00" />
      </g>
      <g transform="rotate(90 1278 200)">
        <rect x="1278" y="200" width="20" height="3" fill="#F43D00" />
        <rect x="1298" y="200" width="20" height="3" fill="url(#companyGridPaint4)" />
      </g>

      <defs>
        <linearGradient id="companyGridPaint0" x1="1383" y1="400.5" x2="1403" y2="400.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="companyGridPaint1" x1="342" y1="340.5" x2="362" y2="340.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="companyGridPaint2" x1="120" y1="402.5" x2="100" y2="402.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="companyGridPaint3" x1="300" y1="84.5" x2="280" y2="84.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="companyGridPaint4" x1="1298" y1="201.5" x2="1318" y2="201.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
