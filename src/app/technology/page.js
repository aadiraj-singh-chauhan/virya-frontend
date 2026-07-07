import styles from './page.module.css';
import Hero from '@/components/technology/components/Hero';
import Localization from '@/components/technology/components/Localization';
import WorkplaceSync from '@/components/technology/components/WorkplaceSync';
import TrajectoryAdaptation from '@/components/technology/components/TrajectoryAdaptation';
import DeploymentProfiles from '@/components/technology/components/DeploymentProfiles';
import SoftwarePlatform from '@/components/technology/components/SoftwarePlatform';
import ProductFooterCTA from '@/components/products/ProductFooterCTA';

export const metadata = {
  title: 'Technology · Virya',
  description: 'Full-stack autonomous systems engineered for the complexity of real-world operations — from sensing to decision-making.',
};

export default function Technology() {
  return (
    <main className={styles.main}>
      <Hero />
      <Localization />
      <WorkplaceSync />
      <TrajectoryAdaptation />
      <DeploymentProfiles />
      <SoftwarePlatform />
      <ProductFooterCTA />
    </main>
  );
}
