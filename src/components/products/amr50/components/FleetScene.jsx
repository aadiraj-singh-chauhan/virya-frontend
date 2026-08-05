'use client';
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { smoothstep, useHotspotMaterial, pickLocalPoint } from '@/components/products/shared/hotspotShader';
import HotspotMarker from '@/components/products/shared/HotspotMarker';

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

// ── Set to true to click the model and read exact 3-D coords ─────────────────
// Rotate the model to the angle you want, click a spot, copy the output panel,
// then flip back to false before committing.
export const PICK_COORDS_FLEET = false;

export const FLEET_HOTSPOTS = [
  { id: 'fleet-1', label: 'Autonomous Trolley Hitching',     position: FLEET_HOTSPOT_POSITIONS['fleet-1'], fadeRange: [0.20, 0.30],  panelIndex: 5 },
  { id: 'fleet-2', label: 'Adaptive Hitch Configuration',    position: FLEET_HOTSPOT_POSITIONS['fleet-2'], fadeRange: [0.50, 0.95], fadeRangeRight: [-0.75, -0.05], panelIndex: 6 },
  { id: 'fleet-3', label: 'Hot-Swap Battery System',         position: FLEET_HOTSPOT_POSITIONS['fleet-3'], fadeRange: [0.40, 0.60],  panelIndex: 4 },
  { id: 'fleet-4', label: 'Low-Profile Hazard Sensing',      position: FLEET_HOTSPOT_POSITIONS['fleet-4'], fadeRange: [-0.40, 0.20], panelIndex: 2 },
  { id: 'fleet-5', label: 'Operator Cabin',                  position: FLEET_HOTSPOT_POSITIONS['fleet-5'], fadeRange: [0.50, 0.65],  panelIndex: 1 },
  { id: 'fleet-6', label: 'Dual-Mode Operation',             position: FLEET_HOTSPOT_POSITIONS['fleet-6'], visibilityDirection: [1.2, 0, -0.5], fadeRange: [-0.40, 0.20], panelIndex: 3 },
  { id: 'fleet-7', label: '360° LiDAR Obstacle Detection',      position: FLEET_HOTSPOT_POSITIONS['fleet-7'], fadeRange: [-1.0, -0.99], panelIndex: 0 },
];

export const FLEET_PANEL_TO_HOTSPOT = Object.fromEntries(
  FLEET_HOTSPOTS.map(hs => [hs.panelIndex ?? (parseInt(hs.id.replace('fleet-', ''), 10) - 1), hs.id])
);

const BASE_DOT_SIZE = 0.28;

export default function FleetScene({ activeFeature, externalHoveredId, onClick, onCoordPick }) {
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

  const _currentSizes = useRef(new Float32Array(FLEET_HOTSPOTS.length).fill(BASE_DOT_SIZE));
  const _currentDims  = useRef(new Float32Array(FLEET_HOTSPOTS.length).fill(1.0));

  const { geometry, material, opacities, rippleActives, sizes } = useHotspotMaterial(FLEET_HOTSPOTS.length, BASE_DOT_SIZE);

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
    onCoordPick && onCoordPick(pickLocalPoint(e, groupRef.current));
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
