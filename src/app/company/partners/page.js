import styles from './page.module.css';
import Hero from '@/components/company/partners/components/Hero';
import PartnerCards from '@/components/company/partners/components/PartnerCards';
import LatestInsights from '@/components/resources/shared/components/LatestInsights';
import PartnerCTAForm from '@/components/company/partners/components/PartnerCTAForm';

export const metadata = {
  title: 'Partners · Virya',
  description: 'Collaborating across technology, infrastructure, and research to build reliable, scalable systems.',
};

export default function CompanyPartners() {
  return (
    <main className={styles.main}>
      <Hero />
      <PartnerCards />
      <LatestInsights />
      <PartnerCTAForm />
    </main>
  );
}
