import styles from './page.module.css';
import Hero from '@/components/resources/partners/components/Hero';
import PartnerCards from '@/components/resources/partners/components/PartnerCards';
import LatestInsights from '@/components/resources/shared/components/LatestInsights';
import PartnerCTAForm from '@/components/resources/partners/components/PartnerCTAForm';

export const metadata = {
  title: 'Partners · Virya',
  description: 'Collaborating across technology, infrastructure, and research to build reliable, scalable systems.',
};

export default function ResourcesPartners() {
  return (
    <main className={styles.main}>
      <Hero />
      <PartnerCards />
      <LatestInsights />
      <PartnerCTAForm />
    </main>
  );
}
