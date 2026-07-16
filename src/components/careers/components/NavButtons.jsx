import styles from '../css/NavButtons.module.css';

function ArrowIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 13.81 11.109" fill="none" aria-hidden="true">
      <path d="M0 5.554L13.81 5.554" stroke="currentColor" />
      <path d="M6.6 0L8.8 0L13.81 5.554L8.8 11.109L6.6 11.109" stroke="currentColor" />
    </svg>
  );
}

export default function NavButtons({ onPrev, onNext, prevLabel = 'Previous', nextLabel = 'Next' }) {
  return (
    <div className={styles.pair}>
      <button type="button" className={styles.square} onClick={onPrev} aria-label={prevLabel}>
        <span className={styles.iconFlip}>
          <ArrowIcon />
        </span>
      </button>
      <button type="button" className={styles.square} onClick={onNext} aria-label={nextLabel}>
        <ArrowIcon />
      </button>
    </div>
  );
}
