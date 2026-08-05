'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { smoothstep, useHotspotMaterial, pickLocalPoint } from '@/components/products/shared/hotspotShader';
import HotspotMarker from '@/components/products/shared/HotspotMarker';
import CoordPicker from '@/components/products/shared/CoordPicker';
import FeatureItem from '@/components/products/shared/FeatureItem';
import styles from '../css/Capabilities.module.css';

// ── Hotspot 3-D positions (local to model centre) ─────────────────────────────
const HOTSPOT_POSITIONS = {
  'feature-1': [-0.98,  0.15,  0.39],
  'feature-2': [-0.70,  1.39,  0.04],
  'feature-3': [-0.46,  1.77, -0.01],
  'feature-4': [-0.16,  0.73,  0.01],
};

// ── Set to true to click the model and read exact 3-D coords ─────────────────
const PICK_COORDS = false;

const HOTSPOTS = [
  { id: 'feature-1', label: 'Low-Profile Hazard Sensing',    position: HOTSPOT_POSITIONS['feature-1'], fadeRange: [-0.40, 0.20] },
  { id: 'feature-2', label: 'Dual-Mode Operation',position: HOTSPOT_POSITIONS['feature-2'], fadeRange: [0.30, 0.55] },
  { id: 'feature-3', label: '360° LiDAR Obstacle Detection', position: HOTSPOT_POSITIONS['feature-3'], fadeRange: [-0.40, 0.20] },
  { id: 'feature-4', label: 'Adaptive Pallet Identification',          position: HOTSPOT_POSITIONS['feature-4'], visibilityDirection: [4.50, 0, -1], fadeRange: [-0.05, 0.25] },
];

const BASE_DOT_SIZE = 0.28;

function RobotScene({ activeFeature, externalHoveredId, onClick, onCoordPick }) {
  const { scene } = useGLTF('/assets/apt20.glb');

  const groupRef  = useRef(null);
  const meshRef   = useRef(null);
  const labelRefs = useRef([]);
  const hitRefs   = useRef([]);
  const [hoveredId, setHoveredId] = useState(null);

  const controlsRef = useRef(null);
  const autoRotateRef = useRef(true);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [hoverBox, setHoverBox] = useState(null);
  const prevActiveFeatureRef = useRef(activeFeature);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (activeFeature !== prevActiveFeatureRef.current) {
      prevActiveFeatureRef.current = activeFeature;
      isAnimatingRef.current = true;
      autoRotateRef.current = false;
    }
  }, [activeFeature]);

  const _groupPos   = useRef(new THREE.Vector3());
  const _camDir     = useRef(new THREE.Vector3());
  const _hotspotDir = useRef(new THREE.Vector3());

  const _currentSizes = useRef(new Float32Array(HOTSPOTS.length).fill(BASE_DOT_SIZE));
  const _currentDims  = useRef(new Float32Array(HOTSPOTS.length).fill(1.0));

  const { geometry, material, opacities, rippleActives, sizes } = useHotspotMaterial(HOTSPOTS.length, BASE_DOT_SIZE);

  useEffect(() => {
    if (!scene || scene.userData.apt20Centered) return;
    scene.userData.apt20Centered = true;
    scene.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    // Keep horizontal centering only; parent group position controls height.
    scene.position.set(-center.x, 0, -center.z);

    // Save the padded box dimensions for hover zone
    setHoverBox({
      size: [size.x * 1.35, size.y * 1.15, size.z * 1.35],
      position: [0, size.y / 2, 0]
    });
  }, [scene]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    HOTSPOTS.forEach((hs, i) => {
      dummy.position.set(hs.position[0], hs.position[1], hs.position[2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ camera, clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    material.uniforms.time.value = clock.getElapsedTime();
    if (controlsRef.current) controlsRef.current.autoRotate = autoRotateRef.current && !isHoveredRef.current;

    groupRef.current.getWorldPosition(_groupPos.current);
    _camDir.current.copy(camera.position).sub(_groupPos.current).normalize();

    // Smooth camera transition to horizontally focus on active feature hotspot
    if (isAnimatingRef.current && controlsRef.current) {
      const controls = controlsRef.current;
      const activeHotspot = HOTSPOTS.find(hs => hs.id === activeFeature);
      if (activeHotspot) {
        const fp = activeHotspot.visibilityDirection ?? activeHotspot.fadePosition ?? activeHotspot.position;
        const [hx, hy, hz] = fp;
        const targetTheta = Math.atan2(hx, hz);

        // Get current spherical coordinates relative to the controls target
        const offset = new THREE.Vector3().copy(camera.position).sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);

        // Interpolate theta (azimuthal angle) using shortest path
        const lerpFactor = 0.025; // slow and smooth
        const currentTheta = spherical.theta;
        const diffTheta = Math.atan2(Math.sin(targetTheta - currentTheta), Math.cos(targetTheta - currentTheta));
        const nextTheta = currentTheta + diffTheta * lerpFactor;

        // Set the new camera position relative to the target, keeping radius and polar angle constant
        const nextOffset = new THREE.Vector3().setFromSphericalCoords(spherical.radius, spherical.phi, nextTheta);
        camera.position.copy(controls.target).add(nextOffset);

        controls.update();

        // Check if transition is close enough to stop animating
        if (Math.abs(diffTheta) < 0.005) {
          isAnimatingRef.current = false;
          autoRotateRef.current = true;
        }
      }
    }

    HOTSPOTS.forEach((hs, i) => {
      const fp = hs.visibilityDirection ?? hs.fadePosition ?? hs.position;
      _hotspotDir.current.set(fp[0], fp[1], fp[2]).normalize();

      const dot = _hotspotDir.current.dot(_camDir.current);
      let [fe0, fe1] = hs.fadeRange ?? [0.05, 0.22];
      if (hs.fadeRangeRight) {
        const camRelX   = camera.position.x - _groupPos.current.x;
        const rightBias = Math.max(0, Math.min(1, camRelX / 0.4));
        fe0 = fe0 * (1 - rightBias) + hs.fadeRangeRight[0] * rightBias;
        fe1 = fe1 * (1 - rightBias) + hs.fadeRangeRight[1] * rightBias;
      }
      const fade = smoothstep(fe0, fe1, dot);

      const activeId     = hoveredId ?? externalHoveredId ?? activeFeature;
      const isThisActive = hs.id === activeId;
      const anyHovered   = hoveredId !== null || externalHoveredId !== null;

      const targetSize = isThisActive ? BASE_DOT_SIZE * 1.4 : BASE_DOT_SIZE;
      _currentSizes.current[i] += (targetSize - _currentSizes.current[i]) * 0.1;
      sizes[i] = _currentSizes.current[i];

      const targetDim = (anyHovered && !isThisActive) ? 0.4 : 1.0;
      _currentDims.current[i] += (targetDim - _currentDims.current[i]) * 0.1;
      opacities[i] = fade * _currentDims.current[i];

      rippleActives[i] = hs.id === (hoveredId ?? externalHoveredId ?? activeFeature) ? 1.0 : 0.0;

      const el = labelRefs.current[i];
      if (el) el.style.opacity = String(fade);

      const hitEl = hitRefs.current[i];
      if (hitEl) hitEl.style.pointerEvents = fade > 0.15 ? 'auto' : 'none';
    });

    meshRef.current.geometry.getAttribute('instanceOpacity').needsUpdate = true;
    meshRef.current.geometry.getAttribute('instanceRippleActive').needsUpdate = true;
    meshRef.current.geometry.getAttribute('instanceSize').needsUpdate = true;
  });

  function handlePickClick(e) {
    if (!PICK_COORDS || !groupRef.current) return;
    e.stopPropagation();
    onCoordPick && onCoordPick(pickLocalPoint(e, groupRef.current));
  }

  return (
    <group
      ref={groupRef}
      position={[0, -0.75, 0]}
      onClick={PICK_COORDS ? handlePickClick : undefined}
    >
      <primitive
        object={scene}
        onPointerEnter={(e) => { e.stopPropagation(); if (!isDraggingRef.current) isHoveredRef.current = true; }}
        onPointerLeave={(e) => { e.stopPropagation(); isHoveredRef.current = false; }}
      />

      {hoverBox && (
        <mesh position={hoverBox.position}>
          <boxGeometry args={hoverBox.size} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      <instancedMesh
        ref={meshRef}
        args={[geometry, material, HOTSPOTS.length]}
        renderOrder={1}
        frustumCulled={false}
      />

      {HOTSPOTS.map((hs, i) => {
        const isHovered  = hoveredId === hs.id;
        const isActive   = activeFeature === hs.id;
        const isNameplateVisible = hoveredId !== null
          ? isHovered
          : (externalHoveredId === hs.id || isActive);

        return (
          <HotspotMarker
            key={hs.id}
            hotspot={hs}
            isNameplateVisible={isNameplateVisible}
            hitRef={(el) => { hitRefs.current[i] = el; }}
            labelRef={(el) => { labelRefs.current[i] = el; }}
            onHoverStart={setHoveredId}
            onHoverEnd={() => setHoveredId(null)}
            onSelect={onClick}
          />
        );
      })}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 2 - 0.4}
        maxPolarAngle={Math.PI / 2 - 0.4}
        onStart={() => {
          isAnimatingRef.current = false;
          autoRotateRef.current = false;
          isDraggingRef.current = true;
          isHoveredRef.current = false;
          scene.traverse((c) => { if (c.isMesh) { c.userData._rc = c.raycast; c.raycast = () => {}; } });
        }}
        onEnd={() => {
          isDraggingRef.current = false;
          scene.traverse((c) => { if (c.isMesh && c.userData._rc) { c.raycast = c.userData._rc; delete c.userData._rc; } });
        }}
      />
    </group>
  );
}

const FEATURES = [
  {
    id: 'fork-mechanism',
    label: 'Low-Profile Hazard Sensing',
    description: 'Dedicated low-level sensing detects ground-level debris and obstructions that conventional systems routinely miss.',
    image: '/assets/product-apt20.webp',
    dot: { left: 569, top: 439 },
  },
  {
    id: '3d-lidar',
    label: 'Dual-Mode Operation',
    description: 'Seamlessly switch between autonomous and manual operation.Complete flexibility without compromising efficiency.',
    image: '/assets/product-apt20.webp',
    dot: { left: 348, top: 35 },
  },
  {
    id: 'navigation',
    label: '360° LiDAR Obstacle Detection',
    description: 'A full 3D LiDAR array continuously maps the environment, detecting obstacles across every angle and depth in real time.',
    image: '/assets/product-apt20.webp',
    dot: { left: 238, top: 315 },
  },
  {
    id: 'axis-imu',
    label: 'Adaptive Pallet Identification',
    description: 'Detects and handles your custom pallets and trolleys without modifications to your existing assets.',
    image: '/assets/product-apt20.webp',
    dot: { left: 382, top: 286 },
  },
];

const TECH_CARDS = [
  { id: '360-perception',    title: '360° Perception',                        icon: '/assets/360-perception.svg',               description: 'Full-surround sensing coverage ensures safe operation in crowded warehouse aisles and loading bays.' },
  { id: 'obstacle-avoid',    title: 'Obstacle Avoidance & Detection',          icon: '/assets/obstacle-avoidance.svg',           description: 'Real-time detection and dynamic re-routing keeps operations running without human intervention.' },
  { id: 'driving-modes',     title: 'Manual & Autonomous Driving Modes',       icon: '/assets/manual-autonomous.svg',            description: 'Seamless transition between manual joystick control and full autonomy for flexible deployment.' },
  { id: 'productivity',      title: 'Increased Productivity',                  icon: '/assets/amr10-icon-productivity.svg',      description: 'Continuous 24/7 operation with rapid charge cycles reduces idle time and boosts throughput.' },
  { id: 'compact-footprint', title: 'Compact Footprint',                       icon: '/assets/amr10-icon-compact-footprint.svg', description: 'Slim profile navigates standard pallet racking aisles without facility modifications.' },
  { id: 'indoor-outdoor',    title: 'Indoor & Outdoor Operational Capability',  icon: '/assets/amr10-icon-indoor-outdoor.svg',   description: 'Solid rubber tyres and sealed electronics support operation across indoor floors and outdoor yard surfaces.' },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [panelHoveredId, setPanelHoveredId] = useState(null);
  const [pickedCoords, setPickedCoords] = useState([]);
  const activeFeatureId = `feature-${active + 1}`;

  function handleCoordPick(coord) {
    setPickedCoords((prev) => {
      const next = [...prev, coord];
      return next.length > 4 ? next.slice(-4) : next;
    });
  }

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={`container ${styles.inner}`}>

      <div className={styles.header}>
        <h2 className="heading-2 heading-2-md">Built on an Intelligent Core</h2>
        <p className={`body-1 body-1-md ${styles.subtitle}`}>
          Precision autonomy meets heavy-duty lifting. The APT20 combines
          advanced sensing with a robust fork mechanism for reliable pallet handling.
        </p>
      </div>

      <div className={styles.contentRow}>

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            <Canvas
              camera={{ position: [0, 0.5, 5.5], fov: 28 }}
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
                  onClick={(id) => { const idx = parseInt(id.replace('feature-', ''), 10) - 1; setActive(idx); }}
                  onCoordPick={PICK_COORDS ? handleCoordPick : undefined}
                />
                <Environment preset="studio" background={false} environmentIntensity={0.5} />
              </Suspense>
            </Canvas>
          </div>

          {PICK_COORDS && (
            <CoordPicker
              title="COORD PICKER"
              hotspotIds={['feature-1', 'feature-2', 'feature-3', 'feature-4']}
              picked={pickedCoords}
              onClear={() => setPickedCoords([])}
              draggable
            />
          )}
        </div>

        <div className={`${styles.panel} ${styles.panelFleet}`}>
          {FEATURES.map((f, i) => (
            <FeatureItem
              key={f.id}
              feature={f}
              active={active === i}
              onClick={() => setActive(i)}
              onHoverStart={() => setPanelHoveredId(`feature-${i + 1}`)}
              onHoverEnd={() => setPanelHoveredId(null)}
              styles={styles}
            />
          ))}
        </div>

      </div>

      <div className={styles.techGrid}>
        {TECH_CARDS.map((card) => (
          <div key={card.id} className={styles.techCard}>
            <div className={styles.techCardHeader}>
              <div className={styles.techIconWrap}>
                <Image src={card.icon} alt="" width={50} height={50} />
              </div>
              <p className={`${styles.techCardTitle} title-2 title-2-md`}>{card.title}</p>
            </div>
            <p className={`body-1 body-1-md ${styles.techCardDesc}`}>{card.description}</p>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
