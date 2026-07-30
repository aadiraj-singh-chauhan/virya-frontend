import styles from './page.module.css';
import Hero from '@/components/roi-calculator/components/Hero';
import Calculator from '@/components/roi-calculator/components/Calculator';
import CustomSolutionsCTA from '@/components/roi-calculator/components/CustomSolutionsCTA';
import ExploreCTAs from '@/components/roi-calculator/components/ExploreCTAs';

export const metadata = {
  title: 'ROI Calculator · Virya',
  description: 'Calculate your automation ROI — project the savings, payback period, and cost reduction of switching to Virya AMRs.',
};

export default function RoiCalculator() {
  return (
    <main className={styles.main}>
      <Hero />
      <Calculator />
      <CustomSolutionsCTA />
      <ExploreCTAs />
    </main>
  );
}
