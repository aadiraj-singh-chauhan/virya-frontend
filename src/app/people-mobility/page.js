import styles from './page.module.css';
import Banner from '@/components/people-mobility/components/Banner';
import Features from '@/components/people-mobility/components/Features';
import IntelligentCore from '@/components/people-mobility/components/IntelligentCore';
import ProductOverview from '@/components/people-mobility/components/ProductOverview';
import WhereItWorks from '@/components/people-mobility/components/WhereItWorks';
import Capabilities from '@/components/people-mobility/components/Capabilities';
import VehicleSpecs from '@/components/people-mobility/components/VehicleSpecs';
import CTA from '@/components/people-mobility/components/CTA';

export default function PeopleMobility() {
  return (
    <main className={styles.main}>
      <Banner />
      <Features />
      <IntelligentCore />
      <ProductOverview />
      <WhereItWorks />
      <Capabilities />
      <VehicleSpecs />
      <CTA />
    </main>
  );
}
