'use client';
import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useScramble } from '@/hooks/useScramble';
import styles from '../css/Capabilities.module.css';

const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 568;

const HOTSPOT_POSITIONS = {
  'feature-1': [ 0.77, -0.59,  0.45],
  'feature-2': [ 0.50, -0.24,  0.30],
  'feature-3': [-0.21, -0.71,  0.42],
  'feature-4': [-0.79, -0.79, -0.41],
  'feature-5': [-0.55,  0.31, -0.21],
  'feature-6': [ 0.33,  0.80,  0.18],
};

// ── Set to true to click the model and read exact 3-D coords ─────────────────
// Rotate the model to the angle you want, click a spot, copy the output panel,
// then flip back to false before committing.
const PICK_COORDS = false;
const PICK_COORDS_FLEET = false;

const HOTSPOTS = [
  { id: 'feature-1', label: 'Adaptive Hitch Configuration',   position: HOTSPOT_POSITIONS['feature-1'], fadeRange: [0.50, 0.95], fadeRangeRight: [-0.75, -0.05], panelIndex: 4 },
  { id: 'feature-2', label: 'Autonomous Trolley Hitching',    position: HOTSPOT_POSITIONS['feature-2'], fadePosition: HOTSPOT_POSITIONS['feature-1'], fadeRange: [-0.55, 0.10], fadeRangeRight: [-0.75, -0.05], panelIndex: 2 },
  { id: 'feature-3', label: 'Hot-Swap Battery System',        position: HOTSPOT_POSITIONS['feature-3'], fadeRange: [-0.50, 0.38], fadeRangeRight: [-0.30, 0.65], panelIndex: 3 },
  { id: 'feature-4', label: 'Low-Profile Hazard Sensing',     position: HOTSPOT_POSITIONS['feature-4'], fadeRange: [-0.55, 0.48], fadeRangeRight: [-0.75, 0.48], panelIndex: 5 },
  { id: 'feature-5', label: 'Dual-Mode Operation',            position: HOTSPOT_POSITIONS['feature-5'], fadeRange: [-0.80, 0.10], fadeRangeRight: [-0.95, -0.05], panelIndex: 1 },
  { id: 'feature-6', label: '360° LiDAR Obstacle Detection',  position: HOTSPOT_POSITIONS['feature-6'], fadeRange: [-0.80, 0.10], fadeRangeRight: [-0.95, -0.05], panelIndex: 0 },
];

const FEATURE_PANEL_TO_HOTSPOT = Object.fromEntries(
  HOTSPOTS.map(hs => [hs.panelIndex ?? (parseInt(hs.id.replace('feature-', ''), 10) - 1), hs.id])
);

const FLEET_HOTSPOT_POSITIONS = {
  'fleet-1': [ 0.53,  0.75,  0.30],
  'fleet-2': [ 0.74,  0.34,  0.48],
  'fleet-3': [-0.22,  0.31,  0.42],
  'fleet-4': [-1.01,  0.30, -0.03],
  'fleet-5': [-0.62,  0.99, -0.57],
  'fleet-6': [-0.50,  1.29, -0.08],
  'fleet-7': [-0.53,  2.08, -0.25],
};

// Show a marker only when its surface is nearly facing the camera.
const FLEET_HOTSPOT_FADE_RANGE = [0.70, 0.90];
const FLEET_HITCH_HIDDEN_VIEW_DIRECTION = new THREE.Vector3(-20.0, 0, 1).normalize();

const FLEET_HOTSPOTS = [
  { id: 'fleet-1', label: 'Autonomous Trolley Hitching',     position: FLEET_HOTSPOT_POSITIONS['fleet-1'], fadeRange: [0.20, 0.30],  panelIndex: 5 },
  { id: 'fleet-2', label: 'Adaptive Hitch Configuration',    position: FLEET_HOTSPOT_POSITIONS['fleet-2'], fadeRange: [0.50, 0.95], fadeRangeRight: [-0.75, -0.05], panelIndex: 6 },
  { id: 'fleet-3', label: 'Hot-Swap Battery System',         position: FLEET_HOTSPOT_POSITIONS['fleet-3'], fadeRange: [0.40, 0.60],  panelIndex: 4 },
  { id: 'fleet-4', label: 'Low-Profile Hazard Sensing',      position: FLEET_HOTSPOT_POSITIONS['fleet-4'], fadeRange: [-0.40, 0.20], panelIndex: 2 },
  { id: 'fleet-5', label: 'Operator Cabin',                  position: FLEET_HOTSPOT_POSITIONS['fleet-5'], fadeRange: [0.50, 0.65],  panelIndex: 1 },
  { id: 'fleet-6', label: 'Dual-Mode Operation',             position: FLEET_HOTSPOT_POSITIONS['fleet-6'], visibilityDirection: [1.2, 0, -0.5], fadeRange: [-0.40, 0.20], panelIndex: 3 },
  { id: 'fleet-7', label: '360° LiDAR Obstacle Detection',      position: FLEET_HOTSPOT_POSITIONS['fleet-7'], fadeRange: [-1.0, -0.99], panelIndex: 0 },
];

const FLEET_PANEL_TO_HOTSPOT = Object.fromEntries(
  FLEET_HOTSPOTS.map(hs => [hs.panelIndex ?? (parseInt(hs.id.replace('fleet-', ''), 10) - 1), hs.id])
);

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
  const { scene } = useGLTF('/assets/amr50.glb');

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

  const _currentSizes = useRef(new Float32Array(HOTSPOTS.length).fill(0.28));
  const _currentDims  = useRef(new Float32Array(HOTSPOTS.length).fill(1.0));

  const BASE_DOT_SIZE = 0.28;

  const { geometry, material, opacities, rippleActives, sizes } = useMemo(() => {
    const geo  = new THREE.PlaneGeometry(1, 1);
    const ops  = new Float32Array(HOTSPOTS.length).fill(1.0);
    geo.setAttribute('instanceOpacity', new THREE.InstancedBufferAttribute(ops, 1));

    const rips = new Float32Array(HOTSPOTS.length).fill(0.0);
    geo.setAttribute('instanceRippleActive', new THREE.InstancedBufferAttribute(rips, 1));

    const szs  = new Float32Array(HOTSPOTS.length).fill(0.28);
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
    scene.position.copy(center).negate();

    setHoverBox({
      size: [size.x * 1.35, size.y * 1.15, size.z * 1.35],
      position: [0, 0, 0]
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
      position={[0, 0.1, 0]}
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

function FleetScene({ activeFeature, externalHoveredId, onClick, onCoordPick }) {
  const { scene } = useGLTF('/assets/amr51.glb');
  const [scale, setScale] = useState(1);

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

  const _currentSizes = useRef(new Float32Array(FLEET_HOTSPOTS.length).fill(0.28));
  const _currentDims  = useRef(new Float32Array(FLEET_HOTSPOTS.length).fill(1.0));

  const BASE_DOT_SIZE = 0.28;

  const { geometry, material, opacities, rippleActives, sizes } = useMemo(() => {
    const geo  = new THREE.PlaneGeometry(1, 1);
    const ops  = new Float32Array(FLEET_HOTSPOTS.length).fill(1.0);
    geo.setAttribute('instanceOpacity', new THREE.InstancedBufferAttribute(ops, 1));
    const rips = new Float32Array(FLEET_HOTSPOTS.length).fill(0.0);
    geo.setAttribute('instanceRippleActive', new THREE.InstancedBufferAttribute(rips, 1));
    const szs  = new Float32Array(FLEET_HOTSPOTS.length).fill(0.28);
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
    if (!scene) return;
    if (!scene.userData.isCentered) {
      scene.userData.isCentered = true;
      scene.position.set(0, 0, 0);
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      // Preserve the GLB's vertical position; the parent group controls model height.
      scene.position.set(-center.x, 0, -center.z);
    }
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) setScale(2.0 / maxDim);

    setHoverBox({
      size: [size.x * 1.35, size.y * 1.15, size.z * 1.35],
      position: [0, size.y / 2, 0]
    });
  }, [scene]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    FLEET_HOTSPOTS.forEach((hs, i) => {
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
      const activeHotspot = FLEET_HOTSPOTS.find(hs => hs.id === activeFeature);
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

    FLEET_HOTSPOTS.forEach((hs, i) => {
      const fp = hs.fadePosition ?? hs.position;
      _hotspotDir.current.set(fp[0], fp[1], fp[2]).normalize();

      const dot = _hotspotDir.current.dot(_camDir.current);
      let [fe0, fe1] = hs.fadeRange ?? FLEET_HOTSPOT_FADE_RANGE;
      if (hs.fadeRangeRight) {
        const camRelX   = camera.position.x - _groupPos.current.x;
        const rightBias = Math.max(0, Math.min(1, camRelX / 0.4));
        fe0 = fe0 * (1 - rightBias) + hs.fadeRangeRight[0] * rightBias;
        fe1 = fe1 * (1 - rightBias) + hs.fadeRangeRight[1] * rightBias;
      }
      const isFrontView = _camDir.current.dot(FLEET_HITCH_HIDDEN_VIEW_DIRECTION) > 0.20;
      const fade = hs.id === 'fleet-6' && isFrontView
        ? 0
        : smoothstep(fe0, fe1, dot);

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
    if (!PICK_COORDS_FLEET || !groupRef.current) return;
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
      position={[0, -0.95, 0]}
      scale={scale}
      onClick={PICK_COORDS_FLEET ? handlePickClick : undefined}
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
        args={[geometry, material, FLEET_HOTSPOTS.length]}
        renderOrder={1}
        frustumCulled={false}
      />

      {FLEET_HOTSPOTS.map((hs, i) => {
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
                style={{ position: 'absolute', width: '30px', height: '30px', left: '-15px', top: '-15px', cursor: 'pointer', pointerEvents: 'none' }}
                onMouseEnter={() => { setHoveredId(hs.id); document.body.style.cursor = 'pointer'; }}
                onMouseLeave={() => { setHoveredId(null); document.body.style.cursor = 'auto'; }}
                onClick={() => onClick(hs.id)}
              />
              <div ref={(el) => { labelRefs.current[i] = el; }} style={{ position: 'relative', pointerEvents: 'none', opacity: 0 }}>
                <div style={{
                  position: 'absolute', left: '22px', top: '0px',
                  transform: `translateY(-50%) translateX(${isNameplateVisible ? '0px' : '-8px'})`,
                  backgroundColor: '#F43D00', color: '#FFFFFF', height: '38px',
                  padding: '0 16px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',
                  fontFamily: 'inherit', fontSize: '12px', fontWeight: 500, letterSpacing: '1.2px',
                  boxShadow: '0 4px 12px rgba(244,61,0,0.2)', pointerEvents: 'none',
                  opacity: isNameplateVisible ? 1 : 0, visibility: isNameplateVisible ? 'visible' : 'hidden',
                  transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1), visibility 0.2s ease',
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

function FeatureItem({ feature, active, onClick, onHoverStart, onHoverEnd, compact }) {
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
        <p className={`${styles.featureLabel} ${compact ? 'label-2' : 'title-2 title-2-md'}`}>
          <span className={styles.labelHidden}>{feature.label}</span>
          <span className={styles.labelDisplay} aria-hidden="true">{display || feature.label}</span>
        </p>
      </div>

      <div className={styles.expandable}>
        <div className={styles.expandableInner}>
          <div className={styles.detailContent}>
            <p className={`body-2 ${compact ? '' : 'body-1-md'} ${styles.featureDesc}`}>{feature.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [activeFleet, setActiveFleet] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const [panelHoveredId, setPanelHoveredId] = useState(null);
  const [panelFleetHoveredId, setPanelFleetHoveredId] = useState(null);
  const [pickedCoords, setPickedCoords] = useState([]);
  const [pickedFleetCoords, setPickedFleetCoords] = useState([]);
  const [fleetPickerPos, setFleetPickerPos] = useState({ x: 12, y: 12 });
  const activeFeatureId = FEATURE_PANEL_TO_HOTSPOT[active] ?? `feature-${active + 1}`;
  const activeFleetId   = FLEET_PANEL_TO_HOTSPOT[activeFleet] ?? `fleet-${activeFleet + 1}`;
  const view = VIEWS[activeView];

  function handleCoordPick(coord) {
    setPickedCoords((prev) => {
      const next = [...prev, coord];
      return next.length > 6 ? next.slice(-6) : next;
    });
  }

  function handleFleetPickerDragStart(e) {
    const startX = e.clientX - fleetPickerPos.x;
    const startY = e.clientY - fleetPickerPos.y;
    function onMove(ev) {
      setFleetPickerPos({ x: ev.clientX - startX, y: ev.clientY - startY });
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
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
            <div
              onMouseDown={handleFleetPickerDragStart}
              style={{
                position: 'absolute', top: fleetPickerPos.y, left: fleetPickerPos.x, zIndex: 9999,
                background: 'rgba(0,0,0,0.82)', color: '#fff',
                padding: '14px 16px', fontFamily: 'monospace', fontSize: 12,
                lineHeight: 1.7, borderRadius: 6, maxWidth: 360, pointerEvents: 'auto',
                cursor: 'grab', userSelect: 'none',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F43D00' }}>
                FLEET COORD PICKER — click the model ({pickedFleetCoords.length}/7 picked)
              </div>
              {['fleet-1','fleet-2','fleet-3','fleet-4','fleet-5','fleet-6','fleet-7'].map((id, i) => {
                const c = pickedFleetCoords[i];
                return (
                  <div key={id} style={{ color: c ? '#7effa0' : '#888' }}>
                    {`'${id}': `}
                    {c ? `[${c[0]}, ${c[1]}, ${c[2]}],` : '— not yet picked'}
                  </div>
                );
              })}
              {pickedFleetCoords.length > 0 && (
                <button
                  onClick={() => setPickedFleetCoords([])}
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

          {PICK_COORDS && view.showDots && (
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 9999,
              background: 'rgba(0,0,0,0.82)', color: '#fff',
              padding: '14px 16px', fontFamily: 'monospace', fontSize: 12,
              lineHeight: 1.7, borderRadius: 6, maxWidth: 340, pointerEvents: 'auto',
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F43D00' }}>
                COORD PICKER — click the model ({pickedCoords.length}/6 picked)
              </div>
              {['feature-1','feature-2','feature-3','feature-4','feature-5','feature-6'].map((id, i) => {
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

          {false && view.showDots && FEATURES.map((f, i) => (
            <button
              key={f.id}
              className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
              style={{ left: `${(f.dot.left / IMAGE_WIDTH) * 100}%`, top: `${(f.dot.top / IMAGE_HEIGHT) * 100}%` }}
              onClick={() => setActive(i)}
              aria-label={`View ${f.label}`}
            >
              <span className={styles.dotOuter} />
              <span className={styles.dotMiddle} />
              <span className={styles.dotInner} />
            </button>
          ))}

          {false && view.showDots && (
          <div
            className={styles.pill}
            style={{
              left: `${((FEATURES[active].dot.left + 55) / IMAGE_WIDTH) * 100}%`,
              top: `${((FEATURES[active].dot.top + 5) / IMAGE_HEIGHT) * 100}%`,
            }}
          >
            <span className="label-2">{FEATURES[active].label}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="1"/>
            </svg>
          </div>
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
                compact
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
                compact
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
