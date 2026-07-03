import { notFound } from 'next/navigation';

export const metadata = {
  title: 'R&D Platforms · Virya',
  description: 'From simulation to real-world autonomy — explore the Drive By Wire research platforms behind Virya’s autonomous mobility products.',
};

// Page temporarily disabled — restore the original body below to re-enable.
//
// import styles from './page.module.css';
// import Banner from '@/components/rd-platforms/components/Banner';
// import Overview from '@/components/rd-platforms/components/Overview';
// import Gallery from '@/components/rd-platforms/components/Gallery';
// import Platforms from '@/components/rd-platforms/components/Platforms';
// import Applications from '@/components/rd-platforms/components/Applications';
// import Testimonials from '@/components/rd-platforms/components/Testimonials';
// import ClosingBanner from '@/components/rd-platforms/components/ClosingBanner';
//
// export default function RDPlatforms() {
//   return (
//     <main className={styles.main}>
//       <Banner />
//       <Overview />
//       <Gallery />
//       <Platforms />
//       <Applications />
//       <ClosingBanner />
//       <Testimonials />
//     </main>
//   );
// }

export default function RDPlatforms() {
  notFound();
}
