import pulseStyles from '../css/VoicesPatternBg.module.css';

export default function VoicesPatternBg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1511 622"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#voicesPatternClip)">
        <path opacity="0.2" d="M159 -18V302M159 541.5V703.5" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M159 302L1511 302" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M-1 542H159" stroke="black" strokeWidth="0.5" />
        <path
          opacity="0.3"
          d="M477.5 542.5H959V343.5M1119 382V702.5M319.5 224.5H1119V142M1438.5 63H238M639 702.5V-19.5"
          stroke="black"
          strokeWidth="0.5"
        />
        <path opacity="0.3" d="M-1 382L1511 382" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M79.5 462H1511.5" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="559.25" y1="-18" x2="559.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="719.25" y1="-18" x2="719.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="879.25" y1="-18" x2="879.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1039.25" y1="-18" x2="1039.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="799.25" y1="-18" x2="799.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1199.25" y1="-18" x2="1199.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1279.25" y1="-18" x2="1279.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1359.25" y1="-18" x2="1359.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1439.25" y1="-18" x2="1439.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="79.25" y1="-18" x2="79.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="1511" y1="142.25" x2="-1" y2="142.25" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="479.25" y1="-18" x2="479.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="319.25" y1="222" x2="319.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="399.25" y1="-18" x2="399.25" y2="703" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="239.25" y1="-18" x2="239.25" y2="222" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="239.25" y1="542" x2="239.25" y2="703" stroke="black" strokeWidth="0.5" />
        <g className={pulseStyles.pulseA}>
          <rect x="318" y="321" width="3" height="20" fill="#F43D00" />
          <rect x="318" y="341" width="3" height="20" fill="url(#voicesPatternPaint0)" />
        </g>
        <g className={pulseStyles.pulseB}>
          <rect x="119" y="380" width="3" height="20" transform="rotate(90 119 380)" fill="#F43D00" />
          <rect
            x="99"
            y="380"
            width="3"
            height="20"
            transform="rotate(90 99 380)"
            fill="url(#voicesPatternPaint1)"
          />
        </g>
        <g className={pulseStyles.pulseC}>
          <rect x="299" y="62" width="3" height="20" transform="rotate(90 299 62)" fill="#F43D00" />
          <rect
            x="279"
            y="62"
            width="3"
            height="20"
            transform="rotate(90 279 62)"
            fill="url(#voicesPatternPaint2)"
          />
        </g>
        <circle opacity="0.2" cx="1359" cy="222" r="79.75" stroke="black" strokeWidth="0.5" />
        <path opacity="0.2" d="M469 -8L159 302" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M79.5 622H1511.5" stroke="black" strokeWidth="0.5" />
      </g>
      <defs>
        <linearGradient id="voicesPatternPaint0" x1="319.5" y1="341" x2="319.5" y2="361" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="voicesPatternPaint1" x1="100.5" y1="380" x2="100.5" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="voicesPatternPaint2" x1="280.5" y1="62" x2="280.5" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="voicesPatternClip">
          <rect width="1512" height="721" fill="white" transform="translate(-1 -18)" />
        </clipPath>
      </defs>
    </svg>
  );
}
