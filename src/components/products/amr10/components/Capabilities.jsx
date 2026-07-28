'use client';
import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Capabilities.module.css';

const IMAGE_WIDTH = 879;
const IMAGE_HEIGHT = 579;

// ── Hotspot 3-D positions (local to model centre) ─────────────────────────────
const HOTSPOT_POSITIONS = {
  'feature-1': [ 0.58,  0.32, -0.01],
  'feature-2': [-0.67,  0.39,  0.02],
  'feature-3': [ 0.25,  0.95,  0.00],
  'feature-4': [-0.65,  0.17,  0.15],
};

// ── Set to true to click the model and read exact 3-D coords ─────────────────
// Rotate the model to the angle you want, click a spot, copy the output panel,
// then flip back to false before committing.
const PICK_COORDS = false;

const HOTSPOTS = [
  { id: 'feature-1', label: 'Customisable Hitching',  position: HOTSPOT_POSITIONS['feature-1'], fadeRange: [-0.40, 0.10], fadeRangeRight: [-0.60, -0.05] },
  { id: 'feature-2', label: 'Low-Profile Hazard Sensing',  position: HOTSPOT_POSITIONS['feature-2'], fadeRange: [-0.30, 0.48], fadeRangeRight: [0.20, 0.48] },
  { id: 'feature-3', label: '360° LiDAR Obstacle Detection', position: HOTSPOT_POSITIONS['feature-3'], fadeRange: [-0.55, 0.10], fadeRangeRight: [-0.75, -0.05] },
  { id: 'feature-4', label: 'Compact Operating Footprint',  position: HOTSPOT_POSITIONS['feature-4'], fadeRange: [0.15, 0.60], fadeRangeRight: [0.70, 0.90] },
];

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const VERTEX_SHADER = /* glsl */`
  attribute float instanceOpacity;
  attribute float instanceRippleActive;
  attribute float instanceSize;
  varying  float vOpacity;
  varying  float vRippleActive;
  varying  vec2  vUv;

  void main() {
    vUv           = uv;
    vOpacity      = instanceOpacity;
    vRippleActive = instanceRippleActive;

    vec4 worldPos = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec4 viewPos  = viewMatrix * worldPos;
    viewPos.xy   += position.xy * instanceSize;
    viewPos.z    += 0.004;

    gl_Position = projectionMatrix * viewPos;
  }
`;

const FRAGMENT_SHADER = /* glsl */`
  uniform float time;
  uniform vec3  hotspotColor;
  varying float vOpacity;
  varying float vRippleActive;
  varying vec2  vUv;

  void main() {
    vec2  uv   = vUv * 2.0 - 1.0;
    float dist = max(abs(uv.x), abs(uv.y));

    float centre = 1.0 - smoothstep(0.12, 0.20, dist);

    float speed = 0.6;
    float p1    = fract(time * speed);
    float r1    = p1 * 0.88;
    float w     = 0.055;
    float ring1 = smoothstep(r1 - w, r1, dist)
                * (1.0 - smoothstep(r1, r1 + w * 0.35, dist))
                * pow(1.0 - p1, 2.0);

    float p2    = fract(time * speed + 0.5);
    float r2    = p2 * 0.88;
    float ring2 = smoothstep(r2 - w, r2, dist)
                * (1.0 - smoothstep(r2, r2 + w * 0.35, dist))
                * pow(1.0 - p2, 2.0);

    float alpha = centre + (ring1 + ring2) * 0.72 * vRippleActive;
    alpha      *= smoothstep(1.05, 0.88, dist);
    alpha      *= vOpacity;

    if (alpha < 0.005) discard;

    gl_FragColor = vec4(hotspotColor, alpha);
  }
`;

function RobotScene({ activeFeature, externalHoveredId, onClick, onCoordPick }) {
  const { scene } = useGLTF('/assets/amr10.glb');

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

  const _currentSizes = useRef(new Float32Array(HOTSPOTS.length).fill(0.18));
  const _currentDims  = useRef(new Float32Array(HOTSPOTS.length).fill(1.0));

  const BASE_DOT_SIZE = 0.18;

  const { geometry, material, opacities, rippleActives, sizes } = useMemo(() => {
    const geo  = new THREE.PlaneGeometry(1, 1);
    const ops  = new Float32Array(HOTSPOTS.length).fill(1.0);
    geo.setAttribute('instanceOpacity', new THREE.InstancedBufferAttribute(ops, 1));

    const rips = new Float32Array(HOTSPOTS.length).fill(0.0);
    geo.setAttribute('instanceRippleActive', new THREE.InstancedBufferAttribute(rips, 1));

    const szs  = new Float32Array(HOTSPOTS.length).fill(0.18);
    geo.setAttribute('instanceSize', new THREE.InstancedBufferAttribute(szs, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time:         { value: 0 },
        hotspotColor: { value: new THREE.Color('#F43D00') },
      },
      vertexShader:   VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent:    true,
      depthTest:      false,
      depthWrite:     false,
      side:           THREE.DoubleSide,
    });

    return { geometry: geo, material: mat, opacities: ops, rippleActives: rips, sizes: szs };
  }, []);

  useEffect(() => {
    if (!scene || scene.userData.isCentered) return;
    scene.userData.isCentered = true;
    scene.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    // Keep the GLB horizontally centered, but let the parent group control height.
    scene.position.set(-center.x, 0, -center.z);

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
        const lerpFactor = 0.025;
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
      const fp = hs.fadePosition ?? hs.position;
      _hotspotDir.current.set(fp[0], fp[1], fp[2]).normalize();

      const dot = _hotspotDir.current.dot(_camDir.current);
      let [fe0, fe1] = hs.fadeRange ?? [0.05, 0.22];
      if (hs.fadeRangeRight) {
        const camRelX  = camera.position.x - _groupPos.current.x;
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
    const inv = new THREE.Matrix4().copy(groupRef.current.matrixWorld).invert();
    const local = e.point.clone().applyMatrix4(inv);
    onCoordPick && onCoordPick([
      parseFloat(local.x.toFixed(2)),
      parseFloat(local.y.toFixed(2)),
      parseFloat(local.z.toFixed(2)),
    ]);
  }

  return (
    <group
      ref={groupRef}
      position={[0, -0.4, 0]}
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
          <Html key={hs.id} position={hs.position} center zIndexRange={[100, 0]}>
            <div style={{ position: 'relative' }}>
              <div
                ref={(el) => { hitRefs.current[i] = el; }}
                style={{
                  position:      'absolute',
                  width:         '30px',
                  height:        '30px',
                  left:          '-15px',
                  top:           '-15px',
                  cursor:        'pointer',
                  pointerEvents: 'none',
                }}
                onMouseEnter={() => {
                  setHoveredId(hs.id);
                  document.body.style.cursor = 'pointer';
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  document.body.style.cursor = 'auto';
                }}
                onClick={() => onClick(hs.id)}
              />
              <div
                ref={(el) => { labelRefs.current[i] = el; }}
                style={{ position: 'relative', pointerEvents: 'none', opacity: 0 }}
              >
                <div style={{
                  position:        'absolute',
                  left:            '22px',
                  top:             '0px',
                  transform:       `translateY(-50%) translateX(${isNameplateVisible ? '0px' : '-8px'})`,
                  backgroundColor: '#F43D00',
                  color:           '#FFFFFF',
                  height:          '38px',
                  padding:         '0 16px',
                  display:         'flex',
                  alignItems:      'center',
                  whiteSpace:      'nowrap',
                  fontFamily:      'inherit',
                  fontSize:        '12px',
                  fontWeight:      500,
                  letterSpacing:   '1.2px',
                  boxShadow:       '0 4px 12px rgba(244,61,0,0.2)',
                  pointerEvents:   'none',
                  opacity:         isNameplateVisible ? 1 : 0,
                  visibility:      isNameplateVisible ? 'visible' : 'hidden',
                  transition:      'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1), visibility 0.2s ease',
                }}>
                  <span>{hs.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
                    <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <line x1="0"  y1="8"  x2="6"  y2="8"  stroke="currentColor" strokeWidth="1.5" />
                      <line x1="10" y1="8"  x2="16" y2="8"  stroke="currentColor" strokeWidth="1.5" />
                      <line x1="8"  y1="0"  x2="8"  y2="6"  stroke="currentColor" strokeWidth="1.5" />
                      <line x1="8"  y1="10" x2="8"  y2="16" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Html>
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
    id: '2d-lidar',
    label: 'Customisable Hitching',
    description: 'Every facility runs different trolleys. Our team manufactures custom hitch mechanisms tailored to your specific trolley design to integrate material handling assets without modifications',
    image: '/assets/amr10-feature-detail.webp',
    dot: { left: 614, top: 149 },
  },
  {
    id: '3d-lidar',
    label: 'Low-Profile Hazard Sensing',
    description: 'Dedicated low-level sensors detect ground-level debris and obstructions that conventional detection systems routinely miss',
    image: '/assets/amr10-feature-detail.webp',
    dot: { left: 395, top: 15 },
  },
  {
    id: 'wheelbase',
    label: '360° LiDAR Obstacle Detection',
    description: 'A full 3D LiDAR array continuously maps the environment, detecting obstacles across every angle and depth in real time.',
    image: '/assets/amr10-feature-detail.webp',
    dot: { left: 279, top: 215 },
  },
  {
    id: 'axis-imu',
    label: 'Compact Operating Footprint',
    description: 'Engineered to operate efficiently in space-constrained environments. Its compact form factor allows it to navigate narrow aisles, tight corners, and high-traffic zones without compromising payload capacity or operational performance.',
    image: '/assets/amr10-feature-detail.webp',
    dot: { left: 171, top: 460 },
  },
];

function FeatureItem({ feature, active, onClick, onHoverStart, onHoverEnd }) {
  const { display, play, reset } = useScramble(feature.label);
  return (
    <button
      className={`${styles.featureItem} ${active ? styles.featureItemActive : ''}`}
      onClick={onClick}
      onMouseEnter={() => { play(); onHoverStart && onHoverStart(); }}
      onMouseLeave={() => { reset(); onHoverEnd && onHoverEnd(); }}
    >
      <div className={styles.imageExpandable}>
        <div className={styles.imageExpandableInner}>
          <div className={styles.detailImage}>
            <Image
              src={feature.image}
              alt={feature.label}
              fill
              sizes="328px"
              className={styles.detailImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.labelRow}>
        <p className={`${styles.featureLabel} label-2`}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
          <div className={styles.detailContent}>
            <p className={`body-2 ${styles.featureDesc}`}>{feature.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [panelHoveredId, setPanelHoveredId] = useState(null);
  const activeFeatureId = `feature-${active + 1}`;
  const [pickedCoords, setPickedCoords] = useState([]);

  function handleCoordPick(coord) {
    setPickedCoords((prev) => {
      const next = [...prev, coord];
      return next.length > 4 ? next.slice(-4) : next;
    });
  }

  return (
    <section className={styles.section} data-header-theme="light">
      <div className="container">

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

        <div className={styles.imageArea}>
          <div className={styles.robotWrap}>
            <Canvas
              camera={{ position: [0, 0.5, 3.2], fov: 28 }}
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
              dpr={[1, 2]}
              gl={{ alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.9} />
              <directionalLight position={[-5, 3, -5]} intensity={0.25} />
              <Suspense fallback={null}>
                <RobotScene
                  activeFeature={activeFeatureId}
                  externalHoveredId={panelHoveredId}
                  onClick={(id) => setActive(parseInt(id.replace('feature-', ''), 10) - 1)}
                  onCoordPick={PICK_COORDS ? handleCoordPick : undefined}
                />
                <Environment preset="studio" background={false} environmentIntensity={0.3} />
              </Suspense>
            </Canvas>
          </div>
          {PICK_COORDS && (
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 9999,
              background: 'rgba(0,0,0,0.82)', color: '#fff',
              padding: '14px 16px', fontFamily: 'monospace', fontSize: 12,
              lineHeight: 1.7, borderRadius: 6, maxWidth: 340, pointerEvents: 'auto',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F43D00' }}>
                COORD PICKER — click the model ({pickedCoords.length}/4 picked)
              </div>
              {['feature-1','feature-2','feature-3','feature-4'].map((id, i) => {
                const c = pickedCoords[i];
                return (
                  <div key={id} style={{ color: c ? '#7effa0' : '#888' }}>
                    {`'${id}': `}
                    {c ? `[${c[0]}, ${c[1]}, ${c[2]}],` : '— not yet picked'}
                  </div>
                );
              })}
              {pickedCoords.length > 0 && (
                <button
                  onClick={() => setPickedCoords([])}
                  style={{
                    marginTop: 10, background: '#333', color: '#fff', border: '1px solid #555',
                    padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11,
                  }}
                >
                  Clear
                </button>
              )}
            </div>
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
            />
          ))}
        </div>

      </div>

      </div>
    </section>
  );
}
