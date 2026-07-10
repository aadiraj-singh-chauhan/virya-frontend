import FeatureCardGrid from './FeatureCardGrid';

const CARDS = [
  {
    caption: 'ERP / MES / WMS INTEGRATION',
    desc: "Connects directly to your existing enterprise systems, so orders, inventory, and task data stay in sync without manual re-entry.",
    image: '/assets/technology/tech-card-erp.png',
  },
  {
    caption: 'MULTI-SITE MANAGEMENT',
    desc: "Monitor fleets across every facility from a single dashboard, with live status and task history for each site.",
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
    desc: "Configurable safety and speed zones keep robots, operators, and pedestrians coordinated on a shared floor.",
    image: '/assets/technology/tech-localization-box-bg.png',
  },
];

export default function WorkplaceSync() {
  return <FeatureCardGrid heading="Workplace sync across enterprise systems" cards={CARDS} />;
}
