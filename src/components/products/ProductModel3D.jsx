'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, modelY = 0 }) {
  const { scene } = useGLTF(url);
  const centerKey = `pm3d_centered_${url}`;

  useEffect(() => {
    if (!scene || scene.userData[centerKey]) return;
    scene.userData[centerKey] = true;
    scene.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.copy(center).negate();
  }, [scene, centerKey]);

  return <group position={[0, modelY, 0]}><primitive object={scene} /></group>;
}

export default function ProductModel3D({
  url,
  cameraPosition = [0, 0.5, 4.5],
  fov = 28,
  autoRotateSpeed = 1.2,
  polarAngleOffset = 0.4,
  ambientIntensity = 0.7,
  directionalIntensity = 1.5,
  environmentIntensity = 0.5,
  modelY = 0,
}) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
      gl={{ alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={[5, 5, 5]} intensity={directionalIntensity} />
      <directionalLight position={[-5, 3, -5]} intensity={directionalIntensity * 0.27} />
      <Suspense fallback={null}>
        <Model url={url} modelY={modelY} />
        <Environment preset="studio" background={false} environmentIntensity={environmentIntensity} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
        minPolarAngle={Math.PI / 2 - polarAngleOffset}
        maxPolarAngle={Math.PI / 2 - polarAngleOffset}
      />
    </Canvas>
  );
}
