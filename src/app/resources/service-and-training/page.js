import styles from './page.module.css';
import Hero from '@/components/resources/service-and-training/components/Hero';
import ServiceSteps from '@/components/resources/service-and-training/components/ServiceSteps';
import LatestInsights from '@/components/resources/shared/components/LatestInsights';

export const metadata = {
  title: 'Service & Training · Virya',
  description: 'Support across deployment, integration, and team training — ensuring consistent performance in real-world environments.',
};

export default function ResourcesService() {
  return (
    <main className={styles.main}>
      <Hero />
      <ServiceSteps />
      <LatestInsights />
    </main>
  );
}
