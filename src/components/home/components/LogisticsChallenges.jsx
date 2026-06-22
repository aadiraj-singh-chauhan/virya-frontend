import Image from "next/image";
import styles from "../css/LogisticsChallenges.module.css";

const CARDS = [
  {
    id: "indoor",
    title: "Indoor and outdoor operations",
    body: "Lorem ipsum dolor sit amet consectetur. Bibendum tristique dictumst feugiat metus,",
    style: { left: "54.17%", top: "14.62%" },
  },
  {
    id: "payload",
    title: "Handles varied payload demands with ease",
    body: "Lorem ipsum dolor sit amet consectetur. Bibendum tristique dictumst feugiat metus,",
    style: { left: "9.13%", top: "50.29%" },
  },
  {
    id: "dynamic",
    title: "Adapts seamlessly to dynamic environments",
    body: "Lorem ipsum dolor sit amet consectetur. Bibendum tristique dictumst feugiat metus,",
    style: { left: "58.8%", top: "73.73%" },
  },
];

export default function LogisticsChallenges() {
  return (
    <section className={styles.section} data-header-theme="light">
      <Image
        src="/assets/logistics-challenges-bg.webp"
        alt=""
        fill
        className={styles.bgImage}
        aria-hidden="true"
      />

      <div className={styles.heading}>
        <h2 className="heading-2">
          Every operation faces unique logistics challenges.
        </h2>
      </div>

      {CARDS.map(({ id, title, body, style }) => (
        <article key={id} className={styles.card} style={style}>
          <div className={styles.cardHeader}>
            <span className={styles.bullet} aria-hidden="true" />
            <span className="label-2">The difference we deliver</span>
          </div>
          <div className={styles.cardContent}>
            <h3 className="title-1">{title}</h3>
            <div className={styles.cardBody}>
              <p className="body-1">{body}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
