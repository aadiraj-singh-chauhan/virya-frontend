'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import FormField from '@/components/shared/components/FormField';
import styles from '../css/PartnerCTAForm.module.css';

export default function PartnerCTAForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="become-a-partner" className={styles.section} data-header-theme="light">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.visual}>
            <div className={styles.bg}>
              <Image
                src="/assets/partners-contact-bg.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="560px"
                className={styles.bgImage}
              />
            </div>
            <h2 className={`heading-2 heading-2-md ${styles.heading}`}>Collaborate beyond conventional automation</h2>
            <p className={styles.desc}>
              Don&rsquo;t see the right role? Submit your details below and we&rsquo;ll reach out
              when a suitable opportunity opens.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <FormField idPrefix="partner" name="fullName" label="Enter your full name" />
              <FormField idPrefix="partner" name="companyName" label="Company name" />
              <FormField idPrefix="partner" name="companyEmail" label="Your company email" type="email" />
              <FormField idPrefix="partner" name="phoneNumber" label="Your phone number" type="tel" />
              <FormField
                idPrefix="partner"
                name="project"
                label="Brief on your project, timeline, budget etc."
                type="textarea"
                required={false}
              />
            </div>

            <Button type="submit" property1="Default" size="Button-2" className={styles.submit}>Submit</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
