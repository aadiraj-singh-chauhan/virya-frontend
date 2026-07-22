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
    ctas: [
      { label: 'Explore AMR10', href: '/products/amr10' },
      { label: 'Explore AMR50', href: '/products/amr50' },
    ],
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
    ctas: [
      { label: 'Explore APT20', href: '/products/apt20' },
    ],
  },
];

export default function Features() {
  return <CapabilityTabs heading="Designed for How Materials Move" tabs={TABS} />;
}
