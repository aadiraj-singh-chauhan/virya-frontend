import styles from './page.module.css';
import Hero from '@/components/home/components/Hero';
import Challenges from '@/components/home/components/Challenges';
import LogisticsChallenges from '@/components/home/components/LogisticsChallenges';
import Legacy from '@/components/home/components/Legacy';
import Testimonials from '@/components/home/components/Testimonials';
import Industries from '@/components/home/components/Industries';
import EventBanner from '@/components/home/components/EventBanner';
import LatestFromVirya from '@/components/home/components/LatestFromVirya';

export const metadata = {
  title: 'Virya · Autonomous Mobility for Smarter Operations',
  description: 'Virya builds autonomous mobility platforms for material and people movement — engineered for real-world industrial and logistics operations.',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Challenges />
      <LogisticsChallenges />
      <Legacy />
      <Testimonials />
      <Industries />
      <EventBanner />
      <LatestFromVirya />
    </main>
  );
}
