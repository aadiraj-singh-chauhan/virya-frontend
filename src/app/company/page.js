import styles from './page.module.css';
import Banner from '@/components/company/components/Banner';
import Stats from '@/components/company/components/Stats';
import Mission from '@/components/company/components/Mission';
import CoreValues from '@/components/company/components/CoreValues';
import Legacy from '@/components/company/components/Legacy';
import GroupCompanies from '@/components/company/components/GroupCompanies';
import Leadership from '@/components/company/components/Leadership';
import GlobalPresence from '@/components/company/components/GlobalPresence';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export const metadata = {
  title: 'Company · Virya',
  description: 'A legacy of trust powering the future of mobility — the people, values, and global presence behind Virya.',
};

export default function Company() {
  return (
    <main className={styles.main}>
      <Banner />
      <Stats />
      <Mission />
      <CoreValues />
      <Legacy />
      <GroupCompanies />
      <Leadership />
      <GlobalPresence />
      <ProductFooterCTA />
    </main>
  );
}
