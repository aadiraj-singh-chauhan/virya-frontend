import FeatureCardGrid from './FeatureCardGrid';

const CARDS = [
  {
    caption: 'ERP / MES / WMS INTEGRATION',
    image: '/assets/technology/tech-card-erp.png',
  },
  {
    caption: 'MULTI-SITE MANAGEMENT',
    image: '/assets/technology/tech-card-multisite-bg.png',
    objectPosition: '78% center',
  },
  {
    caption: 'MATERIAL MOVEMENT TRACKING',
    desc: "Virya's systems plug directly into your existing ERP, MES, and PLC infrastructure; executing event-driven tasks with real-time tracking and feedback at every step.",
    image: '/assets/technology/tech-card-material-tracking.png',
  },
  {
    caption: 'TRAFFIC MANAGEMENT',
    image: '/assets/technology/tech-localization-box-bg.png',
  },
];

export default function WorkplaceSync() {
  return <FeatureCardGrid heading="Workplace sync across enterprise systems" cards={CARDS} />;
}
