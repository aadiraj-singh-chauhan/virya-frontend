import styles from './page.module.css';
import Banner from '@/components/careers/components/Banner';
import LifeAtVirya from '@/components/careers/components/LifeAtVirya';
import TeamGallery from '@/components/careers/components/TeamGallery';
import FutureBuilders from '@/components/careers/components/FutureBuilders';
import Voices from '@/components/careers/components/Voices';
import JoinUs from '@/components/careers/components/JoinUs';

export const metadata = {
  title: 'Careers · Virya',
  description: 'Build the future of autonomous mobility — explore open roles and life at Virya.',
};

export default function Careers() {
  return (
    <main className={styles.main}>
      <Banner />
      <LifeAtVirya />
      <TeamGallery />
      <FutureBuilders />
      <Voices />
      <JoinUs />
    </main>
  );
}
