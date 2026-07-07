'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormField from '@/components/shared/components/FormField';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/ContactForm.module.css';

const REASONS = ['Sales and deployment', 'Partnerships & Collaboration', 'Service & Training'];

function MapLink() {
  const label = 'Locate us on map';
  const { display, play, reset } = useScramble(label);

  return (
    <a href="https://maps.google.com" className={styles.mapLink} onMouseEnter={play} onMouseLeave={reset}>
      <span className={styles.mapLinkText}>
        <span className={styles.textOriginal}>{label}</span>
        <span className={styles.textDisplay} aria-hidden="true">{display || label}</span>
      </span>
      <ArrowIcon />
    </a>
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

          <Button type="submit" property1="Default" size="Button-2">Submit</Button>
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 2h3l2 5-2.5 1.5a11 11 0 0 0 5 5L13 11l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 2 4a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
