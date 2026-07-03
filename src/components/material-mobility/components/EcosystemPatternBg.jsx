import pulseStyles from './EcosystemPatternBg.module.css';

export default function EcosystemPatternBg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 676 589"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#ecosystemPatternClip)">
        <path opacity="0.3" d="M-581 256L771 256" stroke="black" strokeWidth="0.2" />
        <path
          opacity="0.3"
          d="M-262.5 476.5H219V277.5M379 316V636.5M-420.5 158.5H379V35M698.5 -3H-502M-101 636.5V-85.5"
          stroke="black"
          strokeWidth="0.2"
        />
        <path opacity="0.3" d="M-741 336L771 336" stroke="black" strokeWidth="0.2" />
        <path opacity="0.3" d="M-660.5 416H771.5" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="139.1" y1="-64" x2="139.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="299.1" y1="-64" x2="299.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="59.1" y1="-64" x2="59.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="459.1" y1="-64" x2="459.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="539.1" y1="-64" x2="539.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="619.1" y1="-64" x2="619.1" y2="657" stroke="black" strokeWidth="0.2" />
        <line opacity="0.3" x1="771" y1="96.1" x2="-741" y2="96.1" stroke="black" strokeWidth="0.2" />
        <g className={pulseStyles.pulseA}>
          <rect x="540" y="136" width="3" height="20" transform="rotate(180 540 136)" fill="#F43D00" />
          <rect
            x="540"
            y="116"
            width="3"
            height="20"
            transform="rotate(180 540 116)"
            fill="url(#ecosystemPatternPaint0)"
          />
        </g>
        <circle opacity="0.2" cx="619" cy="176" r="79.9" stroke="black" strokeWidth="0.2" />
        <g className={pulseStyles.pulseB}>
          <rect x="611" y="338" width="3" height="20" transform="rotate(-90 611 338)" fill="#F43D00" />
          <rect
            x="631"
            y="338"
            width="3"
            height="20"
            transform="rotate(-90 631 338)"
            fill="url(#ecosystemPatternPaint1)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="ecosystemPatternPaint0"
          x1="541.5"
          y1="116"
          x2="541.5"
          y2="136"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="ecosystemPatternPaint1"
          x1="632.5"
          y1="338"
          x2="632.5"
          y2="358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ecosystemPatternClip">
          <rect width="676" height="589" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
