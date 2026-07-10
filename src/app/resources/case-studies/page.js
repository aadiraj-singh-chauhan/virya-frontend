import styles from './page.module.css';
import CaseStudiesListing from '@/components/resources/case-studies/components/CaseStudiesListing';

export const metadata = {
  title: 'Case Studies · Virya',
  description: 'Real-world deployments and results from Virya Autonomous Technologies.',
};

export default function ResourcesCaseStudies() {
  return (
    <main className={styles.main}>
      <CaseStudiesListing />
    </main>
  );
}
