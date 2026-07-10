'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/NotFound.module.css';

export default function NotFound() {
  const label = 'Home';
  const { display, play, reset } = useScramble(label);

  return (
    <div className={styles.page} data-header-theme="light">
      <div className={styles.decorLeft} aria-hidden="true">
        <div className={styles.decorLeftInner}>
          <div className={styles.stair}>
            <Image src="/assets/not-found/line-left.svg" alt="" fill />
          </div>
          <div className={styles.cornerWrap}>
            <div className={styles.cornerFlip}>
              <Image src="/assets/not-found/line-corner.svg" alt="" fill />
            </div>
          </div>
          <div className={`${styles.tickPair} ${styles.tickPairLeft}`}>
            <span className={styles.tick} />
            <span className={styles.tick} />
          </div>
        </div>
      </div>

      <div className={styles.decorRight} aria-hidden="true">
        <div className={styles.decorRightInner}>
          <div className={styles.stair}>
            <Image src="/assets/not-found/line-right.svg" alt="" fill />
          </div>
          <div className={styles.cornerWrap}>
            <div className={styles.cornerFlip}>
              <Image src="/assets/not-found/line-corner.svg" alt="" fill />
            </div>
          </div>
          <div className={`${styles.tickPair} ${styles.tickPairRight}`}>
            <span className={styles.tick} />
            <span className={styles.tick} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <p className={`heading-0 ${styles.code}`}>404</p>

        <ConeIcon className={styles.icon} />

        <p className={`body-2 ${styles.desc}`}>
          The Page you are looking for doesn&apos;t exist or an other error occurred. Go back, or head over to{' '}
          <Link
            href="/"
            className={styles.homeLink}
            onMouseEnter={play}
            onMouseLeave={reset}
          >
            <span className={styles.linkText}>
              <span className={styles.textOriginal}>{label}</span>
              <span className={styles.textDisplay} aria-hidden="true">{display || label}</span>
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

function ConeIcon({ className }) {
  return (
    <svg className={className} width="37" height="37" viewBox="0 0 37.125 37.125" fill="none" aria-hidden="true">
      <path
        d="M21.375 3.9375L11.8125 13.5M23.625 10.125L9.84375 23.9062M25.0312 18.2812L13.2188 30.0938M26.4375 24.4688L20.8125 30.0938"
        stroke="var(--color-1)"
        strokeWidth="1.6875"
      />
      <path
        d="M27.5625 30.375L22.2188 3.375H14.0625L8.71875 30.375M27.5625 30.375H32.625V33.1875H3.9375V30.375H8.71875M27.5625 30.375H8.71875"
        stroke="var(--color-1)"
        strokeWidth="1.6875"
      />
    </svg>
  );
}
