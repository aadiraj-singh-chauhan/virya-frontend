import FeatureCardGrid from './FeatureCardGrid';

const CARDS = [
  {
    caption: 'RAPID ENVIRONMENT MAPPING FOR FASTER DEPLOYMENT',
    image: '/assets/technology/tech-card-rapid-mapping.png',
  },
  {
    caption: 'CONFIGURABLE ROBOT BEHAVIORS TAILORED TO FACILITY NEEDS',
    image: '/assets/technology/tech-card-image245-bg.png',
    overlayImage: '/assets/technology/tech-card-image245.png',
  },
  {
    caption: 'TABLET AND HMI-BASED CONTROLS WITH REAL-TIME VISIBILITY',
    image: '/assets/technology/tech-card-tablet-hmi.png',
  },
  {
    caption: 'MINIMAL OPERATOR TRAINING REQUIRED FOR DAILY OPERATIONS',
    image: '/assets/technology/tech-card-minimal-training.png',
  },
];

export default function DeploymentProfiles() {
  return <FeatureCardGrid heading="Deployment with configurable behaviour profiles" cards={CARDS} />;
}
