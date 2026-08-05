'use client';
import Image from 'next/image';
import { useScramble } from '@/hooks/useScramble';

// Expandable feature-list item used in every product's Capabilities section:
// collapsed it shows just an image + label; active/hover expands it to reveal
// the description. `styles` is the caller's own CSS module, so each product
// keeps its own visual tuning while sharing this markup and behavior.
export default function FeatureItem({ feature, active, onClick, onHoverStart, onHoverEnd, compact = true, styles }) {
  const { display, play, reset } = useScramble(feature.label);
  return (
    <button
      className={`${styles.featureItem} ${active ? styles.featureItemActive : ''}`}
      onClick={onClick}
      onMouseEnter={() => { play(); onHoverStart && onHoverStart(); }}
      onMouseLeave={() => { reset(); onHoverEnd && onHoverEnd(); }}
    >
      <div className={styles.imageExpandable}>
        <div className={styles.imageExpandableInner}>
          <div className={styles.detailImage}>
            <Image
              src={feature.image}
              alt={feature.label}
              fill
              sizes="328px"
              className={styles.detailImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.labelRow}>
        <p className={`${styles.featureLabel} ${compact ? 'label-2' : 'title-2 title-2-md'}`}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
          <div className={styles.detailContent}>
            <p className={`body-2 ${compact ? '' : 'body-1-md'} ${styles.featureDesc}`}>{feature.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
