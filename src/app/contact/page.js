import styles from './page.module.css';
import Hero from '@/components/contact/components/Hero';
import ContactForm from '@/components/contact/components/ContactForm';
import BrochureCTA from '@/components/contact/components/BrochureCTA';

export const metadata = {
  title: 'Contact · Virya',
  description: "Got plans? Let's turn them into something real — get in touch with Virya Autonomous Technologies.",
};

export default function Contact() {
  return (
    <main className={styles.main}>
      <Hero />
      <ContactForm />
      <BrochureCTA />
    </main>
  );
}
