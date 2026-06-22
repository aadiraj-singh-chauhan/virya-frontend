'use client';

import { useScramble } from '@/hooks/useScramble';
import styles from './Button.module.css';

/**
 * Figma: Styles and elements → Button 1 / Button 2 / Button-3
 *
 * property1 → "Default" (orange) | "Variant2" (black) | "Variant3" (white) | "Button-3" (text link)
 * size      → "Button-1" (49px tall) | "Button-2" (38px tall)  — ignored for "Button-3"
 */
export default function Button({
  children,
  property1 = 'Default',
  size = 'Button-1',
  href,
  onClick,
  className = '',
}) {
  const label = typeof children === 'string' ? children : '';
  const { display, play, reset } = useScramble(label);

  const Tag = href ? 'a' : 'button';
  const variantClass = styles[property1.replace('-', '_')];
  const sizeClass = property1 !== 'Button-3' ? styles[size.replace('-', '_')] : '';

  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
      aria-label={label || undefined}
      className={[styles.button, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.text}>
        {/* locks the width — never visible */}
        <span className={styles.textOriginal}>{children}</span>
        {/* scrambled display — absolutely overlaid */}
        <span className={styles.textDisplay} aria-hidden="true">{display || children}</span>
      </span>
      <ArrowIcon />
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
      {/* stem — Vector 161 */}
      <path d="M 0 5.028 L 12.5 5.028" stroke="currentColor" strokeWidth="1" />
      {/* chevron — overlaps stem on right half, Vector 160 rotated 180° */}
      <path
        d="M 6 0 L 8 0 L 12.5 5.028 L 8 10.056 L 6 10.056"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
