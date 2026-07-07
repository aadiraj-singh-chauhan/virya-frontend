import CapabilityTabs from '@/components/shared/components/CapabilityTabs';

const TABS = [
  {
    label: 'Tugging',
    desc: 'For continuous, high-volume movement across long distances.',
    image: '/assets/mm-feature-tugging.webp',
    labels: [
      'Auto hitching and unhitching',
      'Long-distance navigation',
      'Multi-load handling',
      'Fleet-based coordination',
    ],
    href: '/products/amr50',
  },
  {
    label: 'Lifting',
    desc: 'Precise vertical movement for safe and efficient material handling.',
    image: '/assets/mm-feature-tugging.webp',
    labels: [
      'Variable load capacity',
      'Precision lift control',
      'Safe vertical transport',
      'Automated stacking',
    ],
    href: '/products/apt20',
  },
  {
    label: 'Tunnelling',
    desc: 'Navigating tight spaces and confined environments with ease.',
    image: '/assets/mm-feature-tugging.webp',
    labels: [
      'Narrow aisle navigation',
      'Compact footprint',
      'Obstacle detection',
      'High maneuverability',
    ],
    href: '/products/amr10',
  },
];

export default function Features() {
  return <CapabilityTabs heading="Designed for How Materials Move" tabs={TABS} />;
}
