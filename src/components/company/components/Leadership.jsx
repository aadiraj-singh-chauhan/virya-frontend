import Image from 'next/image';
import GridPatternBg from './GridPatternBg';
import styles from '../css/Leadership.module.css';

const TEAM = [
  { name: 'Joey Samual', role: 'Position in the company', photo: '/assets/company/team-member-1.png' },
  { name: 'Joey Samual', role: 'Position in the company', photo: '/assets/company/team-member-2.png' },
  { name: 'Joey Samual', role: 'Position in the company', photo: '/assets/company/team-member-1.png' },
  { name: 'Joey Samual', role: 'Position in the company', photo: '/assets/company/team-member-2.png' },
];

export default function Leadership() {
  return (
    <section className={styles.section} data-header-theme="light">
      <GridPatternBg className={styles.pattern} />

      <div className={styles.content}>
        <h2 className={`heading-2 heading-2-md ${styles.heading}`}>
          Leadership Driving Industrial Operations Excellence
        </h2>
        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.photoWrap}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`${styles.photo}`}
                />
                <span className={styles.linkedin} aria-hidden="true">
                  <LinkedInIcon />
                </span>
              </div>
              <p className={`label-3-md ${styles.name}`}>{member.name}</p>
              <p className={`label-3-md ${styles.role}`}>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8008 0C17.0146 0 18 0.98543 18 2.19916V15.8008C18 17.0146 17.0146 18 15.8008 18H2.19916C0.98543 18 0 17.0146 0 15.8008V2.19916C0 0.98543 0.985395 0 2.19916 0L15.8008 0ZM5.64121 14.8809V6.9455H3.00308V14.8809H5.64121ZM15.1523 14.8809V10.3303C15.1523 7.89279 13.8509 6.75889 12.1155 6.75889C10.7162 6.75889 10.0893 7.5285 9.73835 8.06903V6.9455H7.10089C7.13588 7.69015 7.10089 14.8809 7.10089 14.8809H9.73832V10.4492C9.73832 10.212 9.7554 9.97488 9.82529 9.80532C10.0156 9.33159 10.4499 8.84085 11.1786 8.84085C12.1326 8.84085 12.5148 9.56883 12.5148 10.6351V14.8809H15.1523ZM4.33997 3.11913C3.43737 3.11913 2.84766 3.71254 2.84766 4.4903C2.84766 5.25171 3.41944 5.86146 4.30506 5.86146H4.32207C5.24194 5.86146 5.81453 5.25171 5.81453 4.4903C5.79748 3.71362 5.24355 3.12082 4.33997 3.11913Z"
        fill="#F43D00"
      />
    </svg>
  );
}
