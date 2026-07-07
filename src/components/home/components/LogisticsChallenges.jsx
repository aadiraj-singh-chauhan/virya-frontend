"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScramble } from "@/hooks/useScramble";
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
  const sectionRef = useRef(null);
  const { display, play, reset } = useScramble("Skip this section");

  const handleSkip = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={styles.section} data-header-theme="light">
      <Image
        src="/assets/logistics-challenges-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className={`${styles.bgImage} ${styles.bgImageDesktop}`}
        aria-hidden="true"
      />

      <div className={styles.heading}>
        <h2 className="heading-2 heading-2-md">
          Every operation faces unique logistics challenges.
        </h2>
      </div>

      <div className={styles.mobileDiagram}>
        <Image
          src="/assets/logistics-challenges-bg-md.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.mobileDiagramImage}
          aria-hidden="true"
        />
      </div>

      <div className={styles.cardGrid}>
        {CARDS.map(({ id, title, body, style }) => (
          <article
            key={id}
            className={styles.card}
            style={{ '--card-left': style.left, '--card-top': style.top }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.bullet} aria-hidden="true" />
              <span className="label-2 label-3-md">The difference we deliver</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className="title-1 title-1-md">{title}</h3>
              <div className={styles.cardBody}>
                <p className="body-1 body-1-md">{body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className={styles.skipSection}
        onClick={handleSkip}
        onMouseEnter={play}
        onMouseLeave={reset}
      >
        <span className={`label-2 label-2-md ${styles.skipText}`}>
          <span className={styles.skipTextOriginal}>Skip this section</span>
          <span className={styles.skipTextDisplay} aria-hidden="true">{display}</span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}