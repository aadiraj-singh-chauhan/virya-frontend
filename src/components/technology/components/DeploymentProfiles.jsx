import FeatureCardGrid from './FeatureCardGrid';

const CARDS = [
  {
    caption: 'RAPID ENVIRONMENT MAPPING FOR FASTER DEPLOYMENT',
    desc: "Robots scan and map new facilities in hours, not weeks, so you're running live operations almost immediately after install.",
    image: '/assets/technology/tech-card-rapid-mapping.png',
  },
  {
    caption: 'CONFIGURABLE ROBOT BEHAVIORS TAILORED TO FACILITY NEEDS',
    desc: 'Tune speed, routing, and task priority per zone so the fleet adapts to how each facility actually operates.',
    image: '/assets/technology/tech-card-image245-bg.png',
    overlayImage: '/assets/technology/tech-card-image245.png',
  },
  {
    caption: 'TABLET AND HMI-BASED CONTROLS WITH REAL-TIME VISIBILITY',
    desc: 'Operators get live fleet status and task history from a simple tablet interface, no specialized training required.',
    image: '/assets/technology/tech-card-tablet-hmi.png',
  },
  {
    caption: 'MINIMAL OPERATOR TRAINING REQUIRED FOR DAILY OPERATIONS',
    desc: 'Intuitive controls and guided workflows mean new operators are productive on day one.',
    image: '/assets/technology/tech-card-minimal-training.png',
  },
];

export default function DeploymentProfiles() {
  return <FeatureCardGrid heading="Deployment with configurable behaviour profiles" cards={CARDS} />;
}
