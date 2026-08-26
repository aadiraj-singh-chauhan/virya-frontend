"use client";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

// Priority order — Scene 1 first (immediately visible), then sequential by scene
const MODEL_QUEUE = [
  "/assets/exterior-scene.glb",
  "/assets/factory-interior.glb",
  "/assets/forklift.glb",
  "/assets/amr10.glb",
  "/assets/amr10-trolley.glb",
  "/assets/amr10-color.glb",
  "/assets/amr10-trolley-color.glb",
  "/assets/amr50-color.glb",
  "/assets/factory-interior-2.glb",
  "/assets/amr50-trolley-color.glb",
  "/assets/final-scene.glb",
];

export default function ModelPreloader() {
  useEffect(() => {
    useGLTF.setDecoderPath("/draco/gltf/");
    let active = true;
    (async () => {
      for (const url of MODEL_QUEUE) {
        if (!active) break;
        try {
          await fetch(url);
          useGLTF.preload(url);
        } catch (_) {}
      }
    })();
    return () => { active = false; };
  }, []);
  return null;
}
