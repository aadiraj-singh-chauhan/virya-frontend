'use client';

import Link from 'next/link';
import { useScramble } from '@/hooks/useScramble';
import styles from './css/Button.module.css';
import '../../app/globals.css';

export default function Button({
  children,
  property1 = 'Default',
  size = 'Button-1',
  href,
  target,
  onClick,
  className = '',
  icon = 'arrow',
  type,
  disabled = false,
}) {
  const label = typeof children === 'string' ? children : '';
  const { display, play, reset } = useScramble(label);

  const isExternal = href && (/^([a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:'));
  const Tag = !href || disabled ? 'button' : isExternal || target === '_blank' ? 'a' : Link;
  const isAnchor = Tag === 'button' ? false : isExternal || target === '_blank';
  const variantClass = styles[property1.replace('-', '_')];
  const sizeClass = property1 !== 'Button-3' ? styles[size.replace('-', '_')] : '';

  return (
    <Tag
      href={disabled ? undefined : href}
      target={Tag !== 'button' ? target : undefined}
      rel={isAnchor && target === '_blank' ? 'noopener noreferrer' : undefined}
      type={Tag === 'button' ? type : undefined}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : play}
      onMouseLeave={disabled ? undefined : reset}
      aria-label={label || undefined}
      className={[styles.button,'label-2','label-1-md', variantClass, sizeClass, disabled && styles.disabled, className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.text}>
        <span className={styles.textOriginal}>{children}</span>
        <span className={styles.textDisplay} aria-hidden="true">{display || children}</span>
      </span>
      {icon === 'download' ? <DownloadIcon /> : <ArrowIcon />}
    </Tag>
  );
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      width="13"
      height="11"
      viewBox="0 0 12.5 10.056"
      fill="none"
      aria-hidden="true"
    >
      <path d="M 0 5.028 L 12.5 5.028" stroke="currentColor" strokeWidth="1" />
      <path
        d="M 6 0 L 8 0 L 12.5 5.028 L 8 10.056 L 6 10.056"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className={styles.arrow}
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0.5 8.14844V10.2953H12.5V8.14844" stroke="currentColor" />
      <path d="M3.5 3.62008L3.5 4.8L6.5 7.5L9.53335 4.8L9.53335 3.59557" stroke="currentColor" />
      <path d="M6.5 7.5L6.5 -2.98023e-07" stroke="currentColor" />
    </svg>
  );
}
