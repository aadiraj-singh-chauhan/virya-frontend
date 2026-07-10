import CapabilityTabs from '@/components/shared/components/CapabilityTabs';

const TABS = [
  {
    label: 'Tugging',
    desc: 'For continuous, high-volume movement across long distances.',
    image: '/assets/technology/tech-localization-box-bg.png',
    labels: [
      'Auto hitching and unhitching',
      'Long-distance navigation',
      'Multi-load handling',
      'Fleet-based coordination',
    ],
  },
  {
    label: 'Lifting',
    desc: 'Precise vertical movement for safe and efficient material handling.',
    image: '/assets/technology/tech-localization-box-bg.png',
    labels: [
      'Variable load capacity',
      'Precision lift control',
      'Safe vertical transport',
      'Automated stacking',
    ],
  },
  {
    label: 'Tunnelling',
    desc: 'Navigating tight spaces and confined environments with ease.',
    image: '/assets/technology/tech-localization-box-bg.png',
    labels: [
      'Narrow aisle navigation',
      'Compact footprint',
      'Obstacle detection',
      'High maneuverability',
    ],
  },
];

export default function Localization() {
  return (
    <CapabilityTabs
      heading="Redundant Localization Across All Facility Layouts"
      intro="Virya's robots maintain precise, reliable positioning across your entire facility even as layouts change, features are sparse, or environments shift between indoor and outdoor."
      tag={{ label: 'Reliable Navigation' }}
      tabs={TABS}
      centered
    />
  );
}
