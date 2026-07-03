import pulseStyles from './EventBannerPatternBg.module.css';

export default function EventBannerPatternBg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 683 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#eventBannerPatternClip)">
        <path opacity="0.3" d="M-529.43 233.273L702.57 233.273" stroke="black" strokeWidth="0.5" />
        <path
          opacity="0.3"
          d="M-239.203 434.204H199.561V252.867M345.359 287.95V580.003M-383.179 144.429H345.359V31.8907M636.501 -2.73655H-457.445M-92.037 580.003V-77.9141"
          stroke="black"
          strokeWidth="0.5"
        />
        <path opacity="0.3" d="M-675.23 306.18L702.568 306.18" stroke="black" strokeWidth="0.5" />
        <path opacity="0.3" d="M-601.875 379.078H703.024" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="126.914" y1="-58.3203" x2="126.914" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="272.711" y1="-58.3203" x2="272.711" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="54.0156" y1="-58.3203" x2="54.0156" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="418.512" y1="-58.3203" x2="418.512" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="491.41" y1="-58.3203" x2="491.41" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="564.309" y1="-58.3203" x2="564.309" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="637.207" y1="-58.3203" x2="637.207" y2="598.686" stroke="black" strokeWidth="0.5" />
        <line opacity="0.3" x1="702.566" y1="87.7266" x2="-675.232" y2="87.7266" stroke="black" strokeWidth="0.5" />
        <g className={pulseStyles.pulseA}>
          <rect
            x="492.07"
            y="123.93"
            width="2.73373"
            height="18.2249"
            transform="rotate(180 492.07 123.93)"
            fill="#F43D00"
          />
          <rect
            x="492.07"
            y="105.705"
            width="2.73373"
            height="18.2249"
            transform="rotate(180 492.07 105.705)"
            fill="url(#eventBannerPatternPaint0)"
          />
        </g>
        <circle opacity="0.2" cx="564.06" cy="160.376" r="72.6494" stroke="black" strokeWidth="0.5" />
        <g className={pulseStyles.pulseB}>
          <rect
            x="556.77"
            y="307.999"
            width="2.73373"
            height="18.2249"
            transform="rotate(-90 556.77 307.999)"
            fill="#F43D00"
          />
          <rect
            x="574.994"
            y="307.999"
            width="2.73373"
            height="18.2249"
            transform="rotate(-90 574.994 307.999)"
            fill="url(#eventBannerPatternPaint1)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="eventBannerPatternPaint0"
          x1="493.437"
          y1="105.705"
          x2="493.437"
          y2="123.93"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="eventBannerPatternPaint1"
          x1="576.361"
          y1="307.999"
          x2="576.361"
          y2="326.224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="eventBannerPatternClip">
          <rect width="683" height="430" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
