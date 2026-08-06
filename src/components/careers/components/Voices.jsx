'use client';

import { useState } from 'react';
import Image from 'next/image';
import VoicesPatternBg from './VoicesPatternBg';
import NavButtons from './NavButtons';
import styles from '../css/Voices.module.css';

const TESTIMONIALS = [
  {
    quote: 'We are all excited by the challenge. I think the tougher it is, the more it motivates us to keep going and to keep dreaming big.',
    name: 'Person name',
    position: 'Position in the company',
    photo: '/assets/careers/careers-voices-photo.png',
  },
  {
    quote: 'What keeps me here is how fast an idea can go from a whiteboard sketch to something running on a robot on the floor.',
    name: 'Person name',
    position: 'Position in the company',
    photo: '/assets/careers/careers-voice-photo-two.webp',
  },
  {
    quote: "Every team here genuinely cares about getting the details right, even the ones nobody outside the company will ever notice.",
    name: 'Person name',
    position: 'Position in the company',
    photo: '/assets/careers/careers-voice-photo-three.webp',
  },
];

export default function Voices() {
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState(null);
  const [direction, setDirection] = useState(1);
  const testimonial = TESTIMONIALS[active];
  const outgoingTestimonial = outgoing !== null ? TESTIMONIALS[outgoing] : null;

  const go = (delta) => {
    if (outgoing !== null) return;
    setOutgoing(active);
    setDirection(delta);
    setActive((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleSettled = () => setOutgoing(null);

  const personAndNav = (
    <>
      <div key={`person-${active}`} className={styles.person} style={{ '--dir': direction }}>
        <p className={styles.name}>{testimonial.name}</p>
        <p className={`label-2 ${styles.position}`}>{testimonial.position}</p>
      </div>

      <div className={styles.navWrap}>
        <NavButtons
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          prevLabel="Previous testimonial"
          nextLabel="Next testimonial"
        />
      </div>
    </>
  );

  return (
    <section className={styles.section} data-header-theme="light">
      <VoicesPatternBg className={styles.pattern} />

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.photoWrap}>
            {outgoingTestimonial && (
              <div key={`photo-out-${outgoing}`} className={styles.photoOut} style={{ '--dir': direction }} aria-hidden="true">
                <Image
                  src={outgoingTestimonial.photo}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 457px"
                  className={styles.photo}
                />
              </div>
            )}
            <div key={`photo-${active}`} className={styles.photoIn} style={{ '--dir': direction }} onAnimationEnd={handleSettled}>
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                fill
                sizes="(max-width: 1024px) 100vw, 457px"
                className={styles.photo}
              />
            </div>
          </div>

          <div className={styles.testimonial}>
            <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Voices from within</h2>

            <div className={styles.textWrap}>
              <span className={styles.quoteMark} aria-hidden="true">
                <svg width="29" height="25" viewBox="0 0 29 25" fill="none">
                  <path
                    d="M0 0.000175476L6.72619 24.5464H12.4915L8.64795 0.000175476H0ZM16.073 0.000175476L22.7992 24.5464H28.5645L24.7209 0.000175476H16.073Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <p className={styles.quote}>{testimonial.quote}</p>
            </div>

            <div className={styles.desktopOnly}>{personAndNav}</div>
          </div>
        </div>

        <div className={styles.mobileOnly}>{personAndNav}</div>
      </div>
    </section>
  );
}
