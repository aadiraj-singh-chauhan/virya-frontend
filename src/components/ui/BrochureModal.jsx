'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import BrochureModalPattern from './BrochureModalPattern';
import styles from './BrochureModal.module.css';

export default function BrochureModal({ open, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    modalRef.current?.querySelector('input, button')?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll('input, button, [href]');
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-modal-heading"
        onClick={(e) => e.stopPropagation()}
      >
        <BrochureModalPattern className={styles.pattern} />

        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <h2 id="brochure-modal-heading" className={`title-1 ${styles.heading}`}>
          Download the brochure
        </h2>
        <p className={`body-2 ${styles.subheading}`}>Get this insightful case study in your inbox</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Field name="fullName" label="Enter your full name" />
          <Field name="companyName" label="Company name" />
          <Field name="companyEmail" label="Your company email" type="email" />
          <Field name="phoneNumber" label="Your phone number" type="tel" />

          <div className={styles.submitRow}>
            <Button type="submit" property1="Variant2" size="Button-2" icon="download">
              Download Brochure
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function Field({ name, label, type = 'text' }) {
  return (
    <div className={styles.field}>
      <input
        id={`brochure-${name}`}
        name={name}
        type={type}
        required
        placeholder=" "
        aria-label={label}
        className={styles.input}
      />
      <label htmlFor={`brochure-${name}`} className={styles.fieldLabel} aria-hidden="true">
        {label}
        <span className={styles.required}>*</span>
      </label>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
