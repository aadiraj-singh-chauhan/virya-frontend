import styles from './page.module.css';
import Banner from '@/components/material-mobility/components/Banner';
import VideoSection from '@/components/material-mobility/components/VideoSection';
import Features from '@/components/material-mobility/components/Features';
import Ecosystem from '@/components/material-mobility/components/Ecosystem';
import Specs from '@/components/material-mobility/components/Specs';

export default function MaterialMobility() {
  return (
    <main className={styles.main}>
      <Banner />
      <VideoSection />
      <Features />
      <Ecosystem />
      <Specs />
    </main>
  );
}
