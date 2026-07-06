import pulseStyles from './css/BrochureModalPattern.module.css';

export default function BrochureModalPattern({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 210 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#brochurePopupPatternClip)">
        <path opacity="0.2" d="M132.676 -107.031V47.6234M132.676 163.373V241.667" stroke="black" strokeWidth="0.236486" />
        <path opacity="0.3" d="M132.676 47.625L-520.74 47.625" stroke="black" strokeWidth="0.236486" />
        <path opacity="0.3" d="M210 163.617H132.673" stroke="black" strokeWidth="0.236486" />
        <path
          opacity="0.3"
          d="M-21.2552 163.854H-253.962V67.6786M-331.289 86.2855V241.182M55.1055 10.1664H-331.289V-49.5207M-485.702 -67.8859H94.4941M-99.3075 241.182V-107.758"
          stroke="black"
          strokeWidth="0.236486"
        />
        <path opacity="0.3" d="M210 86.2891L-520.743 86.2891" stroke="black" strokeWidth="0.236486" />
        <path opacity="0.3" d="M171.098 124.961H-520.982" stroke="black" strokeWidth="0.236486" />
        <line opacity="0.3" y1="-0.118243" x2="348.456" y2="-0.118243" transform="matrix(4.37115e-08 1 1 -4.37115e-08 171.342 -107.031)" stroke="black" strokeWidth="0.236486" />
        <line opacity="0.3" y1="-0.118243" x2="231.499" y2="-0.118243" transform="matrix(-4.37114e-08 1 1 4.37114e-08 55.3457 9.92969)" stroke="black" strokeWidth="0.236486" />
        <line opacity="0.3" y1="-0.118243" x2="348.456" y2="-0.118243" transform="matrix(4.37115e-08 1 1 -4.37115e-08 16.6875 -107.031)" stroke="black" strokeWidth="0.236486" />
        <line opacity="0.3" y1="-0.118243" x2="115.991" y2="-0.118243" transform="matrix(4.37115e-08 1 1 -4.37115e-08 94.0107 -107.031)" stroke="black" strokeWidth="0.236486" />
        <line opacity="0.3" y1="-0.118243" x2="77.8106" y2="-0.118243" transform="matrix(-4.37114e-08 1 1 4.37114e-08 94.0107 163.617)" stroke="black" strokeWidth="0.236486" />
        <g className={pulseStyles.pulseA}>
          <rect width="1.44989" height="9.66592" transform="matrix(-1 0 0 1 55.8311 56.8125)" fill="#FF4000" />
          <rect width="1.44989" height="9.66592" transform="matrix(-1 0 0 1 55.8311 66.4785)" fill="url(#brochurePopupPaint0)" />
        </g>
        <g className={pulseStyles.pulseB}>
          <rect width="1.44989" height="9.66592" transform="matrix(4.37114e-08 1 1 -4.37114e-08 152.006 85.3237)" fill="#FF4000" />
          <rect width="1.44989" height="9.66592" transform="matrix(4.37114e-08 1 1 -4.37114e-08 161.672 85.3237)" fill="url(#brochurePopupPaint1)" />
        </g>
        <path opacity="0.2" d="M-17.1459 -102.195L132.676 47.6264" stroke="black" strokeWidth="0.236486" />
        <rect x="171" width="213" height="171" transform="rotate(90 171 0)" fill="url(#brochurePopupPaint2)" />
        <rect x="3" y="94" width="213" height="122" fill="url(#brochurePopupPaint3)" />
      </g>
      <defs>
        <linearGradient id="brochurePopupPaint0" x1="0.724945" y1="9.9023e-08" x2="0.724944" y2="9.66592" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="brochurePopupPaint1" x1="0.724945" y1="9.9023e-08" x2="0.724944" y2="9.66592" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#FF4000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="brochurePopupPaint2" x1="266.424" y1="2.60697e-06" x2="266.424" y2="196.468" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id="brochurePopupPaint3" x1="98.424" y1="94" x2="98.424" y2="234.17" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="brochurePopupPatternClip">
          <rect width="210" height="216" fill="white" transform="matrix(-1 0 0 1 210 0)" />
        </clipPath>
      </defs>
    </svg>
  );
}
