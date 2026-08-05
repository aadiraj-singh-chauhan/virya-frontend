'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FormField from '@/components/shared/components/FormField';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/ContactForm.module.css';

const REASONS = ['Sales and deployment', 'Partnerships & Collaboration', 'Service & Training'];

const MAP_EXTERNAL_URL = 'https://www.google.com/maps?cid=10029747371914808982';

function MapLink() {
  const label = 'Locate us on map';
  const { display, play, reset } = useScramble(label);

  return (
    <div className={styles.mapBlock}>
      <a
        href={MAP_EXTERNAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mapEmbedWrap}
        aria-label="Open Virya Autonomous Technologies office location in Google Maps"
      >
        <Image
          src="/assets/contact-map.jpg"
          alt="Virya Autonomous Technologies — office location map"
          fill
          className={styles.mapEmbed}
        />
      </a>
      <a
        href={MAP_EXTERNAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mapLink}
        onMouseEnter={play}
        onMouseLeave={reset}
      >
        <span className={styles.mapLinkText}>
          <span className={styles.textOriginal}>{label}</span>
          <span className={styles.textDisplay} aria-hidden="true">{display || label}</span>
        </span>
        <ArrowIcon />
      </a>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 12.5 10.056" fill="none" aria-hidden="true">
      <path d="M0 5.028L12.5 5.028" stroke="currentColor" />
      <path d="M6 0L8 0L12.5 5.028L8 10.056L6 10.056" stroke="currentColor" />
    </svg>
  );
}

export default function ContactForm() {
  const [reason, setReason] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.container}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.reasons}>
            {REASONS.map((r, i) => (
              <button
                key={r}
                type="button"
                className={`${styles.reasonPill} ${i === reason ? styles.reasonActive : ''}`}
                onClick={() => setReason(i)}
              >
                <span className={styles.reasonDot} aria-hidden="true" />
                {r}
              </button>
            ))}
          </div>

          <div className={styles.fields}>
            <FormField idPrefix="contact" name="fullName" label="Enter your full name" />
            <FormField idPrefix="contact" name="companyName" label="Company name" />
            <FormField idPrefix="contact" name="companyEmail" label="Your company email" type="email" />
            <FormField idPrefix="contact" name="phoneNumber" label="Your phone number" type="tel" />
            <FormField
              idPrefix="contact"
              name="project"
              label="Brief on your project, timeline, budget etc."
              type="textarea"
              required={false}
            />
          </div>

          <Button type="submit" property1="Default" size="Button-2" className={styles.submit}>Submit</Button>
        </form>

        <div className={styles.sideInfo}>
          <div className={styles.connect}>
            <p className={styles.sideHeading}>Connect with us</p>
            <p className={styles.sideText}>
              Send us a quick note or email{' '}
              <a href="mailto:info@virya.ai" className={styles.emailLink}>info@virya.ai</a>
              {' '}to arrange a call.
            </p>
            <a href="tel:+919741380600" className={styles.phone}>
              <PhoneIcon />
              +91 97413 80600
            </a>
          </div>

          <div className={styles.office}>
            <p className={styles.sideHeading}>Registered Office</p>
            <p className={styles.sideText}>
              220, Bommasandra Industrial Area, Bommasandra, Bengaluru, Karnataka 560099
            </p>
            <MapLink />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={styles.phoneIcon}>
      <path
        d="M13.5843 10.2676C13.4632 11.1885 13.0109 12.0338 12.312 12.6457C11.6131 13.2575 10.7154 13.594 9.7866 13.5923C4.39038 13.5923 6.14968e-06 9.20198 6.14968e-06 3.80576C-0.00165892 2.87691 0.334848 1.97922 0.946677 1.28034C1.55851 0.581463 2.40382 0.1292 3.32473 0.00801796C3.5576 -0.0204169 3.79343 0.0272254 3.997 0.143833C4.20058 0.260441 4.36098 0.439759 4.45426 0.65502L5.88963 3.85945V3.8676C5.96105 4.03238 5.99055 4.21228 5.97548 4.39124C5.96042 4.5702 5.90127 4.74264 5.80332 4.89316C5.79108 4.91151 5.77817 4.9285 5.76458 4.94549L4.3496 6.6228C4.85864 7.65719 5.9406 8.72964 6.98858 9.24003L8.64279 7.83253C8.65903 7.81888 8.67605 7.80617 8.69376 7.79447C8.84416 7.69416 9.01719 7.63293 9.1972 7.61632C9.37722 7.59971 9.55853 7.62823 9.72475 7.69933L9.73358 7.7034L12.9353 9.13809C13.1509 9.23104 13.3307 9.3913 13.4477 9.59491C13.5647 9.79851 13.6126 10.0345 13.5843 10.2676Z"
        fill="currentColor"
      />
    </svg>
  );
}
