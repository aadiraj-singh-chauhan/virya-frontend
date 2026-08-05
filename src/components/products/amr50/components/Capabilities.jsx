'use client';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CoordPicker from '@/components/products/shared/CoordPicker';
import FeatureItem from '@/components/products/shared/FeatureItem';
import RobotScene, { PICK_COORDS, HOTSPOTS, FEATURE_PANEL_TO_HOTSPOT } from './RobotScene';
import FleetScene, { PICK_COORDS_FLEET, FLEET_HOTSPOTS, FLEET_PANEL_TO_HOTSPOT } from './FleetScene';
import styles from '../css/Capabilities.module.css';

const FEATURES = [
  {
    id: 'feature-1',
    label: '360° LiDAR Obstacle Detection',
    description: 'A full 3D LiDAR array continuously maps the environment, detecting obstacles across every angle and depth in real time.',
    image: '/assets/amr50.webp',
  },
  {
    id: 'feature-2',
    label: 'Dual-Mode Operation',
    description: 'Seamlessly switch between fully autonomous operation and manual operator control, giving your team the flexibility to adapt to any situation on the floor.',
    image: '/assets/amr50.webp',
  },
  {
    id: 'feature-3',
    label: 'Autonomous Trolley Hitching',
    description: 'The tug autonomously detects a trolley, reverses into position, completes the hitch, and resumes operations.',
    image: '/assets/amr50.webp',
  },
  {
    id: 'feature-4',
    label: 'Hot-Swap Battery System',
    description: 'Batteries can be swapped out quickly in the field, keeping the fleet operational across extended shifts without waiting on charging cycles.',
    image: '/assets/amr50.webp',
  },
  {
    id: 'feature-5',
    label: 'Adaptive Hitch Configuration',
    description: 'Every facility runs different trolleys. Our team manufactures custom hitch mechanisms tailored to your specific trolley design to integrate material handling assets without modifications.',
    image: '/assets/amr50.webp',
  },
  {
    id: 'feature-6',
    label: 'Low-Profile Hazard Sensing',
    description: 'Dedicated low-level sensors detect ground-level debris and obstructions that conventional detection systems routinely miss.',
    image: '/assets/amr50.webp',
  },
];

const FLEET_FEATURES = [
  {
    id: 'fleet-1',
    label: '360° LiDAR Obstacle Detection',
    description: 'A full 3D LiDAR array continuously maps the environment, detecting obstacles across every angle and depth in real time.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-2',
    label: 'Operator Cabin',
    description: 'Cabin configuration gives operators a purpose-built, enclosed driving position. Combining the intelligence of an AMR with the control of a manned vehicle.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-3',
    label: 'Low-Profile Hazard Sensing',
    description: 'Dedicated low-level sensors detect ground-level debris and obstructions that conventional detection systems routinely miss.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-4',
    label: 'Dual-Mode Operation',
    description: 'Seamlessly switch between fully autonomous operation and manual operator control, giving your team the flexibility to adapt to any situation on the floor.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-5',
    label: 'Hot-Swap Battery System',
    description: 'Batteries can be swapped out quickly in the field, keeping the fleet operational across extended shifts without waiting on charging cycles.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-6',
    label: 'Autonomous Trolley Hitching',
    description: 'The tug autonomously detects a trolley, reverses into position, completes the hitch, and resumes operations.',
    image: '/assets/amr50-fleet-view.png',
  },
  {
    id: 'fleet-7',
    label: 'Adaptive Hitch Configuration',
    description: 'Every facility runs different trolleys. Our team manufactures custom hitch mechanisms tailored to your specific trolley design to integrate material handling assets without modifications',
    image: '/assets/amr50-fleet-view.png',
  },
];

const VIEWS = [
  { id: 'diagram', label: 'AMR 50', thumb: '/assets/product-amr50.webp', image: '/assets/amr50-intelligent.png', showDots: true },
  { id: 'fleet', label: 'AMR 51', thumb: '/assets/amr50-fleet-view.png', model: '/assets/amr51.glb', showDots: false },
];

const TECH_CARDS = [
  { id: '360-perception', title: '360° Perception', icon: '/assets/360-perception.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'obstacle-avoidance', title: 'Obstacle Avoidance & Detection', icon: '/assets/obstacle-avoidance.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'driving-modes', title: 'Manual & Autonomous Driving Modes', icon: '/assets/manual-autonomous.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'productivity', title: 'Increased Productivity', icon: '/assets/amr10-icon-productivity.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'compact-footprint', title: 'Compact Footprint', icon: '/assets/amr10-icon-compact-footprint.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
  { id: 'indoor-outdoor', title: 'Indoor & Outdoor Operational Capability', icon: '/assets/amr10-icon-indoor-outdoor.svg', description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [activeFleet, setActiveFleet] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const [panelHoveredId, setPanelHoveredId] = useState(null);
  const [panelFleetHoveredId, setPanelFleetHoveredId] = useState(null);
  const [pickedCoords, setPickedCoords] = useState([]);
  const [pickedFleetCoords, setPickedFleetCoords] = useState([]);
  const activeFeatureId = FEATURE_PANEL_TO_HOTSPOT[active] ?? `feature-${active + 1}`;
  const activeFleetId   = FLEET_PANEL_TO_HOTSPOT[activeFleet] ?? `fleet-${activeFleet + 1}`;
  const view = VIEWS[activeView];

  function handleCoordPick(coord) {
    setPickedCoords((prev) => {
      const next = [...prev, coord];
      return next.length > 6 ? next.slice(-6) : next;
    });
  }

  function handleFleetCoordPick(coord) {
    setPickedFleetCoords((prev) => {
      const next = [...prev, coord];
      return next.length > 7 ? next.slice(-7) : next;
    });
  }

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Built on an Intelligent Core</h2>
        <p className={`body-1 body-1-md ${styles.subtitle}`}>
          Lorem ipsum dolor sit amet consectetur. Cursus sit diam pulvinar netus eget.
          Neque cras eget quis sapien cursus. Lorem ultrices neque sed sapien mattis.
        </p>
      </div>

      {/* ── Content row ── */}
      <div className={styles.contentRow}>

        <div className={styles.thumbnailPanel}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              className={`${styles.thumbCard} ${activeView === i ? styles.thumbCardActive : ''}`}
              onClick={() => setActiveView(i)}
            >
              <div className={styles.thumbImageWrap}>
                <Image src={v.thumb} alt={v.label} fill sizes="73px" className={styles.thumbImage} />
              </div>
              <p className={`label-2 label-1-md ${styles.thumbLabel}`}>{v.label}</p>
            </button>
          ))}
        </div>

        <div className={styles.mobileTabs}>
          <div className={styles.tabBar}>
            {VIEWS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.tab} ${activeView === i ? styles.tabActive : ''}`}
                onClick={() => setActiveView(i)}
              >
                <span className="label-2">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            {view.showDots ? (
              <Canvas
                camera={{ position: [0, 0.5, 4.8], fov: 28 }}
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                dpr={[1, 2]}
                gl={{ alpha: true, powerPreference: 'high-performance' }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <directionalLight position={[-5, 3, -5]} intensity={0.405} />
                <Suspense fallback={null}>
                  <RobotScene
                    activeFeature={activeFeatureId}
                    externalHoveredId={panelHoveredId}
                    onClick={(id) => { const hs = HOTSPOTS.find(h => h.id === id); const idx = hs?.panelIndex ?? (parseInt(id.replace('feature-', ''), 10) - 1); if (idx < FEATURES.length) setActive(idx); }}
                    onCoordPick={PICK_COORDS ? handleCoordPick : undefined}
                  />
                  <Environment preset="studio" background={false} environmentIntensity={0.5} />
                </Suspense>
              </Canvas>
            ) : (
              <Canvas
                camera={{ position: [0, 0.5, 8.0], fov: 28 }}
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                dpr={[1, 2]}
                gl={{ alpha: true, powerPreference: 'high-performance' }}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <directionalLight position={[-5, 3, -5]} intensity={0.405} />
                <Suspense fallback={null}>
                  <FleetScene
                    activeFeature={activeFleetId}
                    externalHoveredId={panelFleetHoveredId}
                    onClick={(id) => { const hs = FLEET_HOTSPOTS.find(h => h.id === id); const idx = hs?.panelIndex ?? (parseInt(id.replace('fleet-', ''), 10) - 1); setActiveFleet(idx); }}
                    onCoordPick={PICK_COORDS_FLEET ? handleFleetCoordPick : undefined}
                  />
                  <Environment preset="studio" background={false} environmentIntensity={0.5} />
                </Suspense>
              </Canvas>
            )}
          </div>

          {PICK_COORDS_FLEET && !view.showDots && (
            <CoordPicker
              title="FLEET COORD PICKER"
              hotspotIds={['fleet-1', 'fleet-2', 'fleet-3', 'fleet-4', 'fleet-5', 'fleet-6', 'fleet-7']}
              picked={pickedFleetCoords}
              onClear={() => setPickedFleetCoords([])}
              draggable
            />
          )}

          {PICK_COORDS && view.showDots && (
            <CoordPicker
              title="COORD PICKER"
              hotspotIds={['feature-1', 'feature-2', 'feature-3', 'feature-4', 'feature-5', 'feature-6']}
              picked={pickedCoords}
              onClear={() => setPickedCoords([])}
            />
          )}
        </div>

        <div className={`${styles.panel} ${styles.panelFleet}`}>
          {view.showDots ? (
            FEATURES.map((f, i) => (
              <FeatureItem
                key={f.id}
                feature={f}
                active={active === i}
                onClick={() => setActive(i)}
                onHoverStart={() => setPanelHoveredId(FEATURE_PANEL_TO_HOTSPOT[i] ?? `feature-${i + 1}`)}
                onHoverEnd={() => setPanelHoveredId(null)}
                styles={styles}
              />
            ))
          ) : (
            FLEET_FEATURES.map((f, i) => (
              <FeatureItem
                key={f.id}
                feature={f}
                active={activeFleet === i}
                onClick={() => setActiveFleet(i)}
                onHoverStart={() => setPanelFleetHoveredId(FLEET_PANEL_TO_HOTSPOT[i] ?? f.id)}
                onHoverEnd={() => setPanelFleetHoveredId(null)}
                styles={styles}
              />
            ))
          )}
        </div>

      </div>

      <div className={styles.techGrid}>
        {TECH_CARDS.map((card) => (
          <div key={card.id} className={styles.techCard}>
            <div className={styles.techCardHeader}>
              <div className={styles.techIconWrap}>
                <Image
                  src={card.icon}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>

              <p className={`${styles.techCardTitle} title-2 title-2-md`}>
                {card.title}
              </p>
            </div>

            <p className={`body-1 body-1-md ${styles.techCardDesc}`}>
              {card.description}
            </p>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
