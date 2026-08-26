"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame, createPortal } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Lenis from "lenis";
import Image from "next/image";
import { useScramble } from "@/hooks/useScramble";
import styles from "../css/LogisticsChallenges.module.css";

// ── Scene 2 camera auto-state — set by InteriorScene, read by Scene2Camera ────
const s2CamState = { autoToC: false };

// ── Scroll lock — freezes lenis while halt animation plays ────────────────────
const s2ScrollLock = { locked: false };

// ── Scene 3 animation state — set by tick loop, read by ExteriorAMR ──────────
const s3AnimState = { active: false, progress: 0 };

// ── Scene 4 animation state — set by scroll handler, read by AMR50Color/Trolley
const s4AnimState  = { progress: 0 };
// Phase 2: AMR50 slides -Z after AMR10 finishes
const s4Anim2State = { progress: 0 };

// ── Scene 5 animation state
const s5AnimState = { progress: 0 };

// ── Scene 4 L-path: truck moves 1.2 +Z → smooth arc → 0.5 +X ────────────────
const S4_PATH_STRAIGHT  = 1.2;
const S4_PATH_TURN_X    = 0.02;
const S4_PATH_STRAIGHT2 = 2.0;                                   // +Z after second turn
const S4_TURN_RADIUS    = 0.6;                                   // arc corner radius
const S4_ARC_LENGTH     = S4_TURN_RADIUS * (Math.PI / 2);       // ≈ 0.942
const S4_TURN2_RADIUS   = 0.3;                                   // second arc radius
const S4_ARC2_LENGTH    = S4_TURN2_RADIUS * (Math.PI / 2);
const S4_TRUCK_GAP      = 0.5;                                   // trolley lags this far behind truck
const S4_TOTAL_STRAIGHT = S4_TRUCK_GAP + S4_PATH_STRAIGHT;      // straight +Z from trolley origin
// Progress 0→1 drives truck through the full path
const S4_PATH_TOTAL     = S4_PATH_STRAIGHT + S4_ARC_LENGTH + S4_PATH_TURN_X + S4_ARC2_LENGTH + S4_PATH_STRAIGHT2;
const S4_EXTRA_TOGETHER = 2.0;                                   // extra units both travel together
const S4_EXTRA_ALONE    = 1.0;                                   // extra units AMR10 travels alone after drop-off
const S4_PATH_TOTAL_EXT = S4_PATH_TOTAL + S4_EXTRA_TOGETHER + S4_EXTRA_ALONE;
const S4_TROLLEY_DROP   = S4_PATH_TOTAL + S4_EXTRA_TOGETHER;    // distance at which trolley stops

// ── Scene 1 camera waypoints ──────────────────────────────────────────────────
const S1_START_POS  = new THREE.Vector3(-8.731, 5.480, 4.225);
const S1_START_LOOK = new THREE.Vector3(0.704, -0.433, -0.947);
const S1_END_POS    = new THREE.Vector3(1.067, 1.118, -0.831);
const S1_END_LOOK   = new THREE.Vector3(1.763, 0.305, -1.880);

// ── Scene 3 camera waypoint ───────────────────────────────────────────────────
const S3_POS  = new THREE.Vector3(-0.706, 0.664, -2.571);
const S3_LOOK = new THREE.Vector3(0.746, 0.110, -1.985);

// ── Scene 4 camera waypoint ───────────────────────────────────────────────────
const S4_POS   = new THREE.Vector3(-2.326, 3.085, 4.359);
const S4_LOOK  = new THREE.Vector3(1.759, -3.562, -1.897);
const S4_POS_B = new THREE.Vector3(2.435, 4.336, 4.555);
const S4_LOOK_B = new THREE.Vector3(-0.973, -2.477, -1.923);

// ── Scene 5 camera waypoints (A → B sweep as scroll progresses) ──────────────
const S5_POS_A  = new THREE.Vector3(5, 4, 6);
const S5_LOOK_A = new THREE.Vector3(0, 0.4, 0);
const S5_POS_B  = new THREE.Vector3(-1, 2.5, 5);
const S5_LOOK_B = new THREE.Vector3(0, 0.4, 0);

// ── Scene 2 camera waypoints (A → B → C) ─────────────────────────────────────
const S2_A_POS  = new THREE.Vector3(5.457, 4.542, 8.230);
const S2_A_LOOK = new THREE.Vector3(0.284, 0.377, 0.753);
const S2_B_POS  = new THREE.Vector3(0.582, 4.454, 10.078);
const S2_B_LOOK = new THREE.Vector3(0.081, 0.138, -0.114);
const S2_C_POS  = new THREE.Vector3(0.330, 10.850, 1.144);
const S2_C_LOOK = new THREE.Vector3(0.329, 0.914, 0.015);

// ── Exterior color palette ────────────────────────────────────────────────────
const ROOF_COLOR   = new THREE.Color("#606063");
const WALL_COLOR   = new THREE.Color("#D8D6D2");
const GROUND_COLOR = new THREE.Color("#EDEAE4");

function makeArchMaterial(maxHeight) {
  const mat = new THREE.MeshStandardMaterial({
    color: WALL_COLOR, roughness: 0.94, metalness: 0, envMapIntensity: 0,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRoofColor   = { value: ROOF_COLOR };
    shader.uniforms.uWallColor   = { value: WALL_COLOR };
    shader.uniforms.uGroundColor = { value: GROUND_COLOR };
    shader.uniforms.uMaxHeight   = { value: maxHeight };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", ["#include <common>", "varying float vWY;", "varying vec3  vWN;"].join("\n"))
      .replace("#include <begin_vertex>", [
        "#include <begin_vertex>",
        "vWY = (modelMatrix * vec4(position, 1.0)).y;",
        "vWN = normalize(mat3(modelMatrix) * normal);",
      ].join("\n"));
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", [
        "#include <common>",
        "uniform vec3  uRoofColor;", "uniform vec3  uWallColor;",
        "uniform vec3  uGroundColor;", "uniform float uMaxHeight;",
        "varying float vWY;", "varying vec3  vWN;",
      ].join("\n"))
      .replace("#include <color_fragment>", [
        "float upness    = clamp(vWN.y, 0.0, 1.0);",
        "float hRatio    = clamp(vWY / uMaxHeight, 0.0, 1.0);",
        "float roofBlend = smoothstep(0.52, 0.82, upness) * smoothstep(0.07, 0.22, hRatio);",
        "float gndBlend  = 1.0 - smoothstep(0.0, 0.06, hRatio);",
        "vec3 col = mix(uWallColor, uRoofColor, roofBlend);",
        "col       = mix(col, uGroundColor, gndBlend * (1.0 - roofBlend));",
        "diffuseColor.rgb = col;",
      ].join("\n"));
  };
  return mat;
}

// ── Ground plane ──────────────────────────────────────────────────────────────
function createGroundTexture() {
  if (typeof window === "undefined") return null;
  const sz = 512, cv = document.createElement("canvas");
  cv.width = sz; cv.height = sz;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#F5F2ED"; ctx.fillRect(0, 0, sz, sz);
  let seed = 12345;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 22000; i++) {
    ctx.fillStyle = rand() > 0.5 ? `rgba(0,0,0,${rand() * 0.025})` : `rgba(255,255,255,${rand() * 0.025})`;
    ctx.fillRect(rand() * sz, rand() * sz, 1, 1);
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(28, 28);
  return t;
}

function GroundPlane() {
  const tex = useMemo(() => createGroundTexture(), []);
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[4000, 4000]} />
      <meshStandardMaterial map={tex} roughness={1} metalness={0} envMapIntensity={0}
        polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
    </mesh>
  );
}

// ── Exterior model ────────────────────────────────────────────────────────────
function ExteriorModel() {
  const { scene } = useGLTF("/assets/exterior-scene.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    if (!cloned) return;
    const box    = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());
    cloned.position.set(-center.x, -box.min.y, -center.z);
    const mat = makeArchMaterial(size.y);
    cloned.traverse((node) => {
      if (!node.isMesh) return;
      node.material = mat; node.castShadow = true; node.receiveShadow = true;
    });
  }, [cloned]);
  return <primitive object={cloned} />;
}

// ── Interior material — height + normal shader, industrial palette ────────────
// floor → charcoal, walls/equipment → warm off-white, ceiling → steel blue
const INT_FLOOR   = new THREE.Color("#3D3A36");
const INT_WALL    = new THREE.Color("#BEB9B2");
const INT_CEILING = new THREE.Color("#4E5561");

function makeInteriorMaterial(maxHeight) {
  const mat = new THREE.MeshStandardMaterial({
    color: INT_WALL, roughness: 0.88, metalness: 0.06, envMapIntensity: 0,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFloor     = { value: INT_FLOOR };
    shader.uniforms.uWall      = { value: INT_WALL };
    shader.uniforms.uCeiling   = { value: INT_CEILING };
    shader.uniforms.uMaxHeight = { value: maxHeight };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vWY;\nvarying vec3 vWN;")
      .replace("#include <begin_vertex>", [
        "#include <begin_vertex>",
        "vWY = (modelMatrix * vec4(position,1.0)).y;",
        "vWN = normalize(mat3(modelMatrix) * normal);",
      ].join("\n"));
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", [
        "#include <common>",
        "uniform vec3 uFloor; uniform vec3 uWall; uniform vec3 uCeiling;",
        "uniform float uMaxHeight;",
        "varying float vWY; varying vec3 vWN;",
      ].join("\n"))
      .replace("#include <color_fragment>", [
        "float h      = clamp(vWY / uMaxHeight, 0.0, 1.0);",
        "float upness = clamp(vWN.y, 0.0, 1.0);",
        // ceiling: top-facing surfaces above 70% height
        "float ceilBlend = smoothstep(0.55, 0.80, upness) * smoothstep(0.65, 0.90, h);",
        // floor: bottom-facing or very low height
        "float floorBlend = (1.0 - smoothstep(0.0, 0.08, h)) + smoothstep(0.55, 0.80, 1.0 - upness) * smoothstep(0.0, 0.15, h);",
        "floorBlend = clamp(floorBlend, 0.0, 1.0);",
        "vec3 col = uWall;",
        "col = mix(col, uFloor,   floorBlend);",
        "col = mix(col, uCeiling, ceilBlend * (1.0 - floorBlend));",
        "diffuseColor.rgb = col;",
      ].join("\n"));
  };
  return mat;
}

// ── AMR10 world position — change these, HMR picks them up instantly ──────────
const AMR_X = -0.47;
const AMR_Z = -2.31;

// ── Forklift (amr50) world position ───────────────────────────────────────────
const FORK_X = 0.5;
const FORK_Z = 3.0;

// ── Trolley world position — independent of AMR10 ────────────────────────────
const TROLL_X = -0.47;
const TROLL_Z = 0.23;

// ── Scene 3 AMR10 + Trolley (truck-trailer left-turn animation) ───────────────
const S3_AMR10_X      = 1.51;
const S3_AMR10_Z      = -2.5;
const S3_AMR10_SCALE   = 0.2;
const S3_TROLLEY_X     = 1.1;
const S3_TROLLEY_Z     = -2.5;
const S3_TROLLEY_SCALE = 0.2;

const S3_PATH_STRAIGHT  = 0.48;
const S3_PATH_STRAIGHT2 = 1.0;
const S3_TURN_RADIUS         = 0.12;
const S3_TROLLEY_TURN_RADIUS  = 0.12;
const S3_TROLLEY_PATH_STRAIGHT = 0.07;
const S3_ARC_LENGTH          = S3_TURN_RADIUS * (Math.PI / 2);
const S3_TRUCK_GAP      = 0.5;
const S3_PATH_TOTAL     = S3_PATH_STRAIGHT + S3_ARC_LENGTH + S3_PATH_STRAIGHT2;

// ── Interior scene — factory floor + forklift + AMR10 + AMR10 Trolley ─────────
const ANIM_DIST = 3; // units travelled by each model during scroll animation

function InteriorScene({ progressRef, trackerRef }) {
  const { scene: factScene  } = useGLTF("/assets/factory-interior.glb");
  const { scene: forkScene  } = useGLTF("/assets/forklift.glb");
  const { scene: amrScene   } = useGLTF("/assets/amr10.glb");
  const { scene: trollScene } = useGLTF("/assets/amr10-trolley.glb");

  const factory  = useMemo(() => factScene.clone(true),  [factScene]);
  const forklift = useMemo(() => forkScene.clone(true),  [forkScene]);
  const amr10    = useMemo(() => amrScene.clone(true),   [amrScene]);
  const trolley  = useMemo(() => trollScene.clone(true), [trollScene]);

  // Bounding boxes computed once per clone — used for floor alignment + trolley gap
  const factBox  = useMemo(() => new THREE.Box3().setFromObject(factory),  [factory]);
  const forkBox  = useMemo(() => new THREE.Box3().setFromObject(forklift), [forklift]);
  const amrBox   = useMemo(() => new THREE.Box3().setFromObject(amr10),    [amr10]);
  const trollBox = useMemo(() => new THREE.Box3().setFromObject(trolley),  [trolley]);

  // Material + shadow flags (side effects only — no positioning)
  useEffect(() => {
    const factSz = factBox.getSize(new THREE.Vector3());
    const intMat = makeInteriorMaterial(factSz.y);
    factory.traverse(n => { if (!n.isMesh) return; n.material = intMat; n.castShadow = true; n.receiveShadow = true; });
    forklift.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    amr10.traverse(n =>   { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    trolley.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
  }, [factory, forklift, amr10, trolley, factBox]);

  // Positions computed in render body — HMR-safe: constants are module-level
  const factCtr   = factBox.getCenter(new THREE.Vector3());
  const factPos   = [-factCtr.x, -factBox.min.y, -factCtr.z];

  const forkCtr   = forkBox.getCenter(new THREE.Vector3());
  const forkPos   = [AMR_X - 2.0 - forkCtr.x, -forkBox.min.y, AMR_Z + 2.4 - forkCtr.z];

  const amrCtr    = amrBox.getCenter(new THREE.Vector3());
  const amrPos    = [FORK_X - amrCtr.x, -amrBox.min.y, FORK_Z - amrCtr.z];

  const trollCtr  = trollBox.getCenter(new THREE.Vector3());
  const trollPos  = [FORK_X - trollCtr.x, -trollBox.min.y, FORK_Z + 0.46 - trollCtr.z];

  // Scroll animation — triggered at waypoint B (progress > 0.5)
  const baseSet    = useRef(false);
  const forkBaseX  = useRef(0);
  const amrBaseZ   = useRef(0);
  const trollBaseZ = useRef(0);
  const animT      = useRef(0); // forklift progress
  const amrT             = useRef(0); // AMR10 + trolley progress (independent)
  const haltState        = useRef("before"); // "before" | "halting" | "after"
  const prevHaltState    = useRef("before");
  const resumeTime       = useRef(0); // ramps AMR10 back up after a halt
  const prevScrollTarget = useRef(0); // for direction detection
  const autoComplete     = useRef(false); // drives animation to end after forklift passes
  const collisionHalt    = useRef(false); // proximity guard — freezes AMR10 near AMR50
  const amrResumeSnap    = useRef(null);  // { scroll, amrT } — taken when AMR50 clears halt

  useEffect(() => { baseSet.current = false; }, [forklift, amr10, trolley]);

  useFrame((_, delta) => {
    if (!baseSet.current) {
      forkBaseX.current  = forklift.position.x;
      amrBaseZ.current   = amr10.position.z;
      trollBaseZ.current = trolley.position.z;
      baseSet.current    = true;
    }

    const prog         = progressRef.current;
    const scrollTarget = prog; // full scene-2 scroll range drives the models
    const goingBack    = scrollTarget < prevScrollTarget.current - 0.001;
    prevScrollTarget.current = scrollTarget;

    // Cancel auto-complete + camera auto-move + overlay if user scrolls back
    if (goingBack) { autoComplete.current = false; s2CamState.autoToC = false; amrResumeSnap.current = null; }

    const effectiveTarget = scrollTarget;

    // AMR10 current distance — needed for reverse zone logic
    const amrEase0     = amrT.current * amrT.current * (3 - 2 * amrT.current);
    const amrDistNow   = amrEase0 * 5;
    const amrInRevZone = amrDistNow >= 2.5 && amrDistNow <= 3.6;

    // ── Forklift: smooth 5 units north ──────────────────────────────
    const forkSpeed = 4;
    let forkTarget  = effectiveTarget;
    // Reverse: if AMR10 is in collision zone (2.5–3.6), freeze AMR50 until AMR10 backs out
    if (goingBack && haltState.current === "halting" && amrInRevZone) {
      forkTarget = animT.current;
    }
    animT.current += (forkTarget - animT.current) * (1 - Math.exp(-delta * forkSpeed));
    const forkEase = animT.current * animT.current * (3 - 2 * animT.current);
    const forkDist = forkEase * 5;
    forklift.position.x = forkBaseX.current + forkDist;

    // ── Halt state machine — driven by forklift distance ───────────
    if      (haltState.current === "before"  && forkDist >= 2.5) haltState.current = "halting";
    else if (haltState.current === "halting" && forkDist >  4.0) haltState.current = "after";
    else if (haltState.current === "after"   && forkDist <= 4.0) haltState.current = "halting";
    else if (haltState.current === "halting" && forkDist <  2.5) haltState.current = "before";

    // When halt begins → send camera to S2_C automatically
    if (prevHaltState.current === "before" && haltState.current === "halting") {
      s2CamState.autoToC = true;
    }
    if (prevHaltState.current === "halting" && haltState.current === "after") {
      amrResumeSnap.current = { scroll: scrollTarget, amrT: amrT.current };
    }
    prevHaltState.current = haltState.current;

    // ── Proximity guard: freeze AMR10 when too close to forklift ──────
    const dx = forklift.position.x - amr10.position.x;
    const dz = forklift.position.z - amr10.position.z;
    const proximity = Math.sqrt(dx * dx + dz * dz);
    if (!collisionHalt.current && proximity < 1.5) collisionHalt.current = true;
    else if (collisionHalt.current && proximity > 2.0) collisionHalt.current = false;

    // ── AMR10 + trolley ───────────────────────────────────────────────
    // Keep the scroll position as the destination, but do not let the AMR
    if (goingBack) {
      if (haltState.current === "halting" && !amrInRevZone) {
        // AMR10 outside 2.5–3.6: freeze it, let AMR50 back through 4.0→2.5
        resumeTime.current = 0;
      } else {
        amrT.current += (scrollTarget - amrT.current) * (1 - Math.exp(-delta * 4));
      }
    } else if ((amrDistNow >= 2.15 && haltState.current !== "after") || collisionHalt.current) {
      // AMR10 stops at 2.15 units and waits until AMR50 clears (haltState → "after")
      resumeTime.current = 0;
    } else if (haltState.current === "after" && amrResumeSnap.current !== null) {
      // Scale remaining amrT distance to fit the remaining scroll range so the full
      // 3.97→5.0 movement is user-scroll-controlled, not auto-played.
      resumeTime.current += delta;
      const remainingScroll = Math.max(0.001, 1.0 - amrResumeSnap.current.scroll);
      const remainingAmrT   = 1.0 - amrResumeSnap.current.amrT;
      const scale           = remainingAmrT / remainingScroll;
      const scrollAdv       = Math.max(0, scrollTarget - amrResumeSnap.current.scroll);
      const catchTarget     = Math.min(1.0, amrResumeSnap.current.amrT + scrollAdv * scale);
      const lerpSpeed       = 1.5 + Math.min(resumeTime.current / 1.5, 1) * 2.5;
      amrT.current += (catchTarget - amrT.current) * (1 - Math.exp(-delta * lerpSpeed));
    } else {
      amrT.current += (scrollTarget - amrT.current) * (1 - Math.exp(-delta * 4));
    }

    const amrEase = amrT.current * amrT.current * (3 - 2 * amrT.current);
    amr10.position.z   = amrBaseZ.current   - amrEase * 5;
    trolley.position.z = trollBaseZ.current - amrEase * 5;
    if (trackerRef?.current) trackerRef.current.textContent = `${(amrEase * 5).toFixed(2)} / 5.00`;
  });

  return (
    <>
      <primitive object={factory}  position={factPos}  />
      <primitive object={forklift} position={forkPos}  rotation={[0, -Math.PI / 2, 0]} />
      <primitive object={amr10}    position={amrPos}   />
      <primitive object={trolley}  position={trollPos} />
    </>
  );
}

useGLTF.setDecoderPath("/draco/gltf/");
useGLTF.preload("/assets/amr10-color.glb");
useGLTF.preload("/assets/amr10-trolley-color.glb");

// ── Scene 3 path — straight -X (left) → arc (-X → +Z) → straight +Z ────────────
// r param lets the trolley use a smaller radius than the truck (real trailer off-tracking)
function getS3PathState(d, ox = 0, oz = 0, r = S3_TURN_RADIUS, s = S3_PATH_STRAIGHT) {
  const arcLen = r * (Math.PI / 2);
  if (d <= 0) return { x: ox, z: oz, ry: -Math.PI / 2 };

  if (d <= s) {
    return { x: ox - d, z: oz, ry: -Math.PI / 2 };
  }

  const dA = d - s;
  if (dA <= arcLen) {
    const a = dA / r;
    return {
      x: ox - s - r * Math.sin(a),
      z: oz + r * (1 - Math.cos(a)),
      ry: -Math.PI / 2 + a,
    };
  }

  const dZ = d - s - arcLen;
  return { x: ox - s - r, z: oz + r + dZ, ry: 0 };
}

// ── Scene 3 AMR10 (truck — leads the pair) ────────────────────────────────────
function S3AMR10() {
  const { scene } = useGLTF("/assets/amr10-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s3AnimState.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const { x, z, ry } = getS3PathState(getAMR10EasedDistance(smoothedP.current) + S4_TRUCK_GAP, S3_AMR10_X, S3_AMR10_Z);
    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.y = ry;
  });
  return (
    <group ref={groupRef} position={[S3_AMR10_X, 0, S3_AMR10_Z]}>
      <primitive
        object={cloned}
        scale={S3_AMR10_SCALE}
        position={[-ctr.x * S3_AMR10_SCALE, -minY * S3_AMR10_SCALE, -ctr.z * S3_AMR10_SCALE]}
      />
    </group>
  );
}

// ── Scene 3 Trolley (trailer — follows behind) ────────────────────────────────
function S3Trolley() {
  const { scene } = useGLTF("/assets/amr10-trolley-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s3AnimState.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const d = Math.min(getAMR10EasedDistance(smoothedP.current), S4_TROLLEY_DROP);
    const { x, z, ry } = getS3PathState(d, S3_TROLLEY_X, S3_TROLLEY_Z, S3_TROLLEY_TURN_RADIUS, S3_TROLLEY_PATH_STRAIGHT);
    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.y = ry;
  });
  return (
    <group ref={groupRef} position={[S3_TROLLEY_X, 0, S3_TROLLEY_Z]}>
      <primitive
        object={cloned}
        scale={S3_TROLLEY_SCALE}
        position={[-ctr.x * S3_TROLLEY_SCALE, -minY * S3_TROLLEY_SCALE, -ctr.z * S3_TROLLEY_SCALE]}
      />
    </group>
  );
}

// ── Scene 4 — colored factory interior model ──────────────────────────────────
function FactoryInterior2() {
  const { scene } = useGLTF("/assets/factory-interior-2.glb");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    if (!cloned) return;
    cloned.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
  }, [cloned]);
  return <primitive object={cloned} />;
}

// ── Scene 4 AMR10 pair (original) ────────────────────────────────────────────
const S4_AMR10_X     = 0;
const S4_AMR10_Z     = -4;
const S4_AMR10_SCALE = 1;
const S4_TROLLEY_X   = 0;
const S4_TROLLEY_Z   = -4.5;
const S4_TROLLEY_SCALE = 1;

// ── Scene 4 AMR50 pair ────────────────────────────────────────────────────────
const S4_AMR50_X          = -0.7;
const S4_AMR50_Z          = 2.5;
const S4_AMR50_SCALE      = 1;
const S4_AMR50_TROLLEY_X  = -2.3;
const S4_AMR50_TROLLEY_Z  = 0;
const S4_AMR50_TROLLEY_SCALE = 1;

// ── Scene 4 AMR50 path: -Z → arc right → +X → reverse -X → pull trolley +X ───
const S4_AMR50_STRAIGHT = 1.9;
const S4_AMR50_ARC_R    = 0.6;
const S4_AMR50_ARC_LEN  = S4_AMR50_ARC_R * (Math.PI / 2);
const S4_AMR50_TURN_X   = 0.5;
const S4_AMR50_BACK     = 1.8;
const S4_AMR50_PULL     = 5.5;
const S4_AMR50_TOTAL    = S4_AMR50_STRAIGHT + S4_AMR50_ARC_LEN + S4_AMR50_TURN_X + S4_AMR50_BACK + S4_AMR50_PULL;

// Path function: straight +Z → arc +Z→+X → short +X → arc +X→+Z → straight +Z.
// ox/oz is the trolley (trailer) starting position.
function getS4PathState(d, ox, oz) {
  if (d <= 0) return { x: ox, z: oz, ry: 0 };

  if (d <= S4_TOTAL_STRAIGHT) {
    return { x: ox, z: oz + d, ry: 0 };
  }

  const r1 = S4_TURN_RADIUS;
  const dA1 = d - S4_TOTAL_STRAIGHT;
  const x1end = ox + r1, z1end = oz + S4_TOTAL_STRAIGHT + r1;
  if (dA1 <= S4_ARC_LENGTH) {
    const a = dA1 / r1;
    return {
      x: ox + r1 * (1 - Math.cos(a)),
      z: oz + S4_TOTAL_STRAIGHT + r1 * Math.sin(a),
      ry: a,
    };
  }

  const dS2 = d - S4_TOTAL_STRAIGHT - S4_ARC_LENGTH;
  const x2end = x1end + S4_PATH_TURN_X, z2end = z1end;
  if (dS2 <= S4_PATH_TURN_X) {
    return { x: x1end + dS2, z: z1end, ry: Math.PI / 2 };
  }

  const r2 = S4_TURN2_RADIUS;
  const dA2 = d - S4_TOTAL_STRAIGHT - S4_ARC_LENGTH - S4_PATH_TURN_X;
  const x3end = x2end + r2, z3end = z2end + r2;
  if (dA2 <= S4_ARC2_LENGTH) {
    const a = dA2 / r2;
    return {
      x: x2end + r2 * Math.sin(a),
      z: z2end + r2 * (1 - Math.cos(a)),
      ry: Math.PI / 2 - a,
    };
  }

  const dS3 = d - S4_TOTAL_STRAIGHT - S4_ARC_LENGTH - S4_PATH_TURN_X - S4_ARC2_LENGTH;
  return { x: x3end, z: z3end + dS3, ry: 0 };
}

// Distance easing for AMR10: slows to ~32 % of normal speed at the drop-off
// point then accelerates back out. Speed is continuous at all boundaries.
// Derivation: the slow zone [D1,D2] is allocated SLOW_WIDTH of the total progress;
// the remaining progress covers the rest at V_NORMAL. Within the slow zone the
// speed profile is v(t)=V_MIN+(V_NORMAL-V_MIN)*(2t-1)^2 which integrates exactly
// to D_SLOW over [0,1] and matches V_NORMAL at both edges (no jump).
function getAMR10EasedDistance(p) {
  const TOTAL      = S4_PATH_TOTAL_EXT;
  const D_SLOW     = 0.8;
  const D1         = S4_TROLLEY_DROP - D_SLOW / 2;
  const D2         = S4_TROLLEY_DROP + D_SLOW / 2;
  const SLOW_WIDTH = 0.2;
  const V_NORMAL   = (TOTAL - D_SLOW) / (1 - SLOW_WIDTH);
  const V_MIN      = (3 * D_SLOW / SLOW_WIDTH - V_NORMAL) / 2;
  const P1         = D1 / V_NORMAL;
  const P2         = P1 + SLOW_WIDTH;

  if (p <= P1) return p * V_NORMAL;
  if (p >= P2) return D2 + (p - P2) * V_NORMAL;

  const t = (p - P1) / SLOW_WIDTH;
  return D1 + SLOW_WIDTH * (V_MIN * t + (V_NORMAL - V_MIN) * ((2 * t - 1) ** 3 + 1) / 6);
}

// ── AMR10 truck ───────────────────────────────────────────────────────────────
function AMR10Color() {
  const { scene } = useGLTF("/assets/amr10-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s4AnimState.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const { x, z, ry } = getS4PathState(getAMR10EasedDistance(smoothedP.current) + S4_TRUCK_GAP, S4_TROLLEY_X, S4_TROLLEY_Z);
    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.y = ry;
  });
  return (
    <group ref={groupRef} position={[S4_AMR10_X, 0, S4_AMR10_Z]}>
      <primitive object={cloned} scale={S4_AMR10_SCALE}
        position={[-ctr.x * S4_AMR10_SCALE, -minY * S4_AMR10_SCALE, -ctr.z * S4_AMR10_SCALE]} />
    </group>
  );
}

// ── AMR10 trolley trailer ─────────────────────────────────────────────────────
function AMR10TrolleyColor() {
  const { scene } = useGLTF("/assets/amr10-trolley-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s4AnimState.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const d = Math.min(getAMR10EasedDistance(smoothedP.current), S4_TROLLEY_DROP);
    const { x, z, ry } = getS4PathState(d, S4_TROLLEY_X, S4_TROLLEY_Z);
    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.y = ry;
  });
  return (
    <group ref={groupRef} position={[S4_TROLLEY_X, 0, S4_TROLLEY_Z]}>
      <primitive object={cloned} scale={S4_TROLLEY_SCALE}
        position={[-ctr.x * S4_TROLLEY_SCALE, -minY * S4_TROLLEY_SCALE, -ctr.z * S4_TROLLEY_SCALE]} />
    </group>
  );
}

// AMR50 easing: two slow zones — decelerate before reversing and before picking up trolley.
// Each slow zone spans D_SLOW world units (centred on the transition) and uses SLOW_W of
// total progress, leaving the rest for normal-speed travel. Math mirrors getAMR10EasedDistance.
function getAMR50EasedDistance(p) {
  const TOTAL  = S4_AMR50_TOTAL;
  const TURN   = S4_AMR50_STRAIGHT + S4_AMR50_ARC_LEN + S4_AMR50_TURN_X;       // phase3→4 (start reverse)
  const ATTACH = TURN + S4_AMR50_BACK;                                           // phase4→5 (pick up trolley)
  const D_SLOW = 0.5;   // world-unit half-width of each slow zone (±0.25 around transition)
  const SLOW_W = 0.12;  // fraction of total progress consumed by each slow zone
  const V_NORMAL = (TOTAL - 2 * D_SLOW) / (1 - 2 * SLOW_W);
  const V_MIN    = (3 * D_SLOW / SLOW_W - V_NORMAL) / 2;
  // Integrate velocity profile inside a slow zone: v(t)=V_MIN+(V_NORMAL-V_MIN)*(2t-1)²
  const slowDist = (t) => SLOW_W * (V_MIN * t + (V_NORMAL - V_MIN) * ((2 * t - 1) ** 3 + 1) / 6);
  const d1s = TURN   - D_SLOW / 2;  const P1 = d1s / V_NORMAL;  const P1e = P1 + SLOW_W;
  const d2s = ATTACH - D_SLOW / 2;  const P2 = P1e + (d2s - (d1s + D_SLOW)) / V_NORMAL;  const P2e = P2 + SLOW_W;
  if (p <= P1)  return p * V_NORMAL;
  if (p <= P1e) return d1s + slowDist((p - P1) / SLOW_W);
  if (p <= P2)  return (d1s + D_SLOW) + (p - P1e) * V_NORMAL;
  if (p <= P2e) return d2s + slowDist((p - P2) / SLOW_W);
  return (d2s + D_SLOW) + (p - P2e) * V_NORMAL;
}

// Path: straight -Z → arc right (-Z→+X) → short +X → reverse -X → pull +X with trolley
function getS4AMR50PathState(d) {
  const ox = S4_AMR50_X, oz = S4_AMR50_Z;
  if (d <= 0) return { x: ox, z: oz, ry: 0 };

  // Phase 1: straight -Z
  if (d <= S4_AMR50_STRAIGHT) {
    return { x: ox, z: oz - d, ry: 0 };
  }

  // Phase 2: quarter-circle arc (right turn, -Z → +X)
  const r  = S4_AMR50_ARC_R;
  const ax = ox, az = oz - S4_AMR50_STRAIGHT;
  const dA = d - S4_AMR50_STRAIGHT;
  if (dA <= S4_AMR50_ARC_LEN) {
    const a = dA / r;
    return {
      x:  ax + r * (1 - Math.cos(a)),
      z:  az - r * Math.sin(a),
      ry: -a,
    };
  }

  const ex = ax + r, ez = az - r;

  // Phase 3: straight +X
  const dX = d - S4_AMR50_STRAIGHT - S4_AMR50_ARC_LEN;
  if (dX <= S4_AMR50_TURN_X) {
    return { x: ex + dX, z: ez, ry: -Math.PI / 2 };
  }

  const px = ex + S4_AMR50_TURN_X;

  // Phase 4: reverse -X to attach to trolley
  const dB = d - S4_AMR50_STRAIGHT - S4_AMR50_ARC_LEN - S4_AMR50_TURN_X;
  if (dB <= S4_AMR50_BACK) {
    return { x: px - dB, z: ez, ry: -Math.PI / 2 };
  }

  // Phase 5: pull trolley forward +X
  const bx = px - S4_AMR50_BACK;
  const dP = d - S4_AMR50_STRAIGHT - S4_AMR50_ARC_LEN - S4_AMR50_TURN_X - S4_AMR50_BACK;
  return { x: bx + dP, z: ez, ry: -Math.PI / 2 };
}

// ── AMR50 truck — slides -Z then arcs right into +X after AMR10 finishes ─────
function AMR50Color() {
  const { scene } = useGLTF("/assets/amr50-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s4Anim2State.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const { x, z, ry } = getS4AMR50PathState(getAMR50EasedDistance(smoothedP.current));
    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.y = ry;
  });
  return (
    <group ref={groupRef} position={[S4_AMR50_X, 0, S4_AMR50_Z]}>
      <primitive object={cloned} scale={S4_AMR50_SCALE}
        position={[-ctr.x * S4_AMR50_SCALE, -minY * S4_AMR50_SCALE, -ctr.z * S4_AMR50_SCALE]} />
    </group>
  );
}

// ── AMR50 trolley — static until phase 5, then pulled +X with AMR50 ───────────
function AMR50TrolleyColor() {
  const { scene } = useGLTF("/assets/amr50-trolley-color.glb");
  const groupRef  = useRef(null);
  const smoothedP = useRef(0);
  const [cloned, ctr, minY] = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return [c, center, box.min.y];
  }, [scene]);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    smoothedP.current += (s4Anim2State.progress - smoothedP.current) * (1 - Math.exp(-delta * 1.8));
    const d = getAMR50EasedDistance(smoothedP.current);
    const phase5Start = S4_AMR50_STRAIGHT + S4_AMR50_ARC_LEN + S4_AMR50_TURN_X + S4_AMR50_BACK;
    const offsetX = d > phase5Start ? Math.min(d - phase5Start, S4_AMR50_PULL) : 0;
    groupRef.current.position.set(S4_AMR50_TROLLEY_X + offsetX, 0, S4_AMR50_TROLLEY_Z);
  });
  return (
    <group ref={groupRef} position={[S4_AMR50_TROLLEY_X, 0, S4_AMR50_TROLLEY_Z]}>
      <primitive object={cloned} scale={S4_AMR50_TROLLEY_SCALE}
        position={[-ctr.x * S4_AMR50_TROLLEY_SCALE, -minY * S4_AMR50_TROLLEY_SCALE, -ctr.z * S4_AMR50_TROLLEY_SCALE]} />
    </group>
  );
}

// ── Scene 4 static camera ─────────────────────────────────────────────────────
function Scene4Camera() {
  const { camera } = useThree();
  const smoothed = useRef(0);
  useEffect(() => {
    camera.position.copy(S4_POS);
    camera.lookAt(S4_LOOK);
  }, [camera]);
  useFrame((_, delta) => {
    // Begin shifting to second angle during the last 25% of the AMR10 animation
    const target = Math.max(0, Math.min(1, (s4AnimState.progress - 0.75) / 0.25));
    smoothed.current += (target - smoothed.current) * (1 - Math.exp(-delta * 2.5));
    const t = smoothed.current;
    camera.position.lerpVectors(S4_POS, S4_POS_B, t);
    camera.lookAt(new THREE.Vector3().lerpVectors(S4_LOOK, S4_LOOK_B, t));
  });
  return null;
}

// ── Scene 5 scroll camera — sweeps A → B as s5AnimState.progress goes 0 → 1 ──
function Scene5Camera() {
  const { camera } = useThree();
  const smoothed = useRef(0);
  useEffect(() => {
    camera.position.copy(S5_POS_A);
    camera.lookAt(S5_LOOK_A);
  }, [camera]);
  useFrame((_, delta) => {
    smoothed.current += (s5AnimState.progress - smoothed.current) * (1 - Math.exp(-delta * 3));
    const t = smoothed.current;
    const ease = t * t * (3 - 2 * t);
    camera.position.lerpVectors(S5_POS_A, S5_POS_B, ease);
    camera.lookAt(new THREE.Vector3().lerpVectors(S5_LOOK_A, S5_LOOK_B, ease));
  });
  return null;
}

// ── Scene 5 model — final-scene.glb (Draco-compressed) ───────────────────────
function FinalScene() {
  const { scene } = useGLTF("/assets/final-scene.glb");
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.set(-center.x, -box.min.y, -center.z);
    c.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
    return c;
  }, [scene]);
  return <primitive object={cloned} />;
}

// ── Scene 1 scroll camera ─────────────────────────────────────────────────────
function Scene1Camera({ progressRef }) {
  const { camera } = useThree();
  const smoothed = useRef(0);
  useEffect(() => {
    camera.position.copy(S1_START_POS);
    camera.lookAt(S1_START_LOOK);
  }, [camera]);
  useFrame((_, delta) => {
    smoothed.current += (progressRef.current - smoothed.current) * (1 - Math.exp(-delta * 4));
    const t = smoothed.current, ease = t * t * (3 - 2 * t);
    camera.position.lerpVectors(S1_START_POS, S1_END_POS, ease);
    camera.lookAt(new THREE.Vector3().lerpVectors(S1_START_LOOK, S1_END_LOOK, ease));
  });
  return null;
}

// ── Scene 2 scroll camera — A → B → C through 3 waypoints ────────────────────
function Scene2Camera({ progressRef }) {
  const { camera } = useThree();
  const smoothed = useRef(0);

  useEffect(() => {
    smoothed.current = 0;
    camera.position.copy(S2_A_POS);
    camera.lookAt(S2_A_LOOK);
  }, [camera]);

  useFrame((_, delta) => {
    const camTarget = Math.min(progressRef.current / 0.4, 1.0);
    smoothed.current += (camTarget - smoothed.current) * (1 - Math.exp(-delta * 4));
    const t = smoothed.current;

    let pos, look;
    if (t <= 0.5) {
      const seg = t * 2;
      const ease = seg * seg * (3 - 2 * seg);
      pos  = new THREE.Vector3().lerpVectors(S2_A_POS, S2_B_POS, ease);
      look = new THREE.Vector3().lerpVectors(S2_A_LOOK, S2_B_LOOK, ease);
    } else {
      const seg = (t - 0.5) * 2;
      const ease = seg * seg * (3 - 2 * seg);
      pos  = new THREE.Vector3().lerpVectors(S2_B_POS, S2_C_POS, ease);
      look = new THREE.Vector3().lerpVectors(S2_B_LOOK, S2_C_LOOK, ease);
    }

    camera.position.copy(pos);
    camera.lookAt(look);
  });

  return null;
}

// ── Scene 3 static camera ─────────────────────────────────────────────────────
function Scene3Camera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(S3_POS);
    camera.lookAt(S3_LOOK);
  }, [camera]);
  return null;
}

// ── Free cam for exploring scene positions ────────────────────────────────────
function FreeCam({ posRef, targetRef }) {
  const { camera } = useThree();
  const controlsRef = useRef(null);
  const seeded = useRef(false);
  useFrame(() => {
    if (!seeded.current && controlsRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      controlsRef.current.target.copy(camera.position.clone().addScaledVector(dir, 10));
      controlsRef.current.update();
      seeded.current = true;
    }
    if (posRef.current) {
      const { x, y, z } = camera.position;
      posRef.current.textContent = `${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}`;
    }
    if (targetRef.current && controlsRef.current) {
      const { x, y, z } = controlsRef.current.target;
      targetRef.current.textContent = `${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}`;
    }
  });
  return <OrbitControls ref={controlsRef} />;
}

// ── Wipe shaders ──────────────────────────────────────────────────────────────
const WIPE_VERT = /* glsl */`
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const WIPE_FRAG = /* glsl */`
precision highp float;
uniform sampler2D map;
uniform float wipeP;
uniform float clipped;
varying vec2 vUv;
void main() {
  if (clipped > 0.5) {
    float leftFrac  = 1.30 - 1.40 * wipeP;
    float rightFrac = 1.05 - 1.45 * wipeP;
    float threshold = 1.0 - mix(leftFrac, rightFrac, vUv.x);
    if (vUv.y < threshold) discard;
  }
  gl_FragColor = texture2D(map, vUv);
}
`;

// ── WipeQuad — fullscreen quad that samples an RT texture with optional wipe ──
function WipeQuad({ rtRef, wipePRef, clipped, renderOrder }) {
  const matRef = useRef();
  useFrame(() => {
    if (!matRef.current || !rtRef.current) return;
    matRef.current.uniforms.map.value = rtRef.current.texture;
    matRef.current.uniforms.wipeP.value = wipePRef ? wipePRef.current : 0;
  });
  return (
    <mesh renderOrder={renderOrder} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        ref={matRef}
        vertexShader={WIPE_VERT}
        fragmentShader={WIPE_FRAG}
        uniforms={{ map: { value: null }, wipeP: { value: 0 }, clipped: { value: clipped ? 1.0 : 0.0 } }}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── RenderManager — renders each virtual scene into its own RT ────────────────
function RenderManager({ sceneObjs, cameras, rtRefs, wipePRefs }) {
  const { gl, size } = useThree();
  useEffect(() => {
    const w = Math.round(size.width  * window.devicePixelRatio);
    const h = Math.round(size.height * window.devicePixelRatio);
    rtRefs.forEach(ref => {
      ref.current?.dispose();
      ref.current = new THREE.WebGLRenderTarget(w, h, { depthBuffer: true, stencilBuffer: false });
    });
    cameras.forEach(cam => {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    });
    return () => rtRefs.forEach(r => r.current?.dispose());
  }, [size.width, size.height]);

  useFrame(() => {
    const [w1, w2, w3, w4] = wipePRefs.map(r => r.current);
    // Only render scenes that are actually contributing to the composite this frame.
    // At any moment at most 2 scenes are visible (active + the one being transitioned to).
    const visible = [
      w1 < 0.999,                    // S1: visible until fully wiped away
      w1 > 0.001 && w2 < 0.999,      // S2: visible once S1 wipe starts, until S2 wipe ends
      w2 > 0.001 && w3 < 0.999,      // S3
      w3 > 0.001 && w4 < 0.999,      // S4
      w4 > 0.001,                    // S5: bottom layer, shown when wipe4 begins
    ];
    const prev = gl.autoClear;
    gl.autoClear = true;
    for (let i = 0; i < sceneObjs.length; i++) {
      if (!rtRefs[i].current || !visible[i]) continue;
      gl.setRenderTarget(rtRefs[i].current);
      gl.render(sceneObjs[i], cameras[i]);
    }
    gl.setRenderTarget(null);
    gl.autoClear = prev;
  }, -1);
  return null;
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function LogisticsChallenges() {
  const sectionRef         = useRef(null);
  const progressRef        = useRef(0);
  const s2ProgressRef      = useRef(0);
  const activeSceneRef     = useRef(1);
  const wipeTargetRef      = useRef(0);
  const wipeSmoothRef      = useRef(0);
  const wipe2TargetRef     = useRef(0);
  const wipe2SmoothRef     = useRef(0);
  const wipe3TargetRef     = useRef(0);
  const wipe3SmoothRef     = useRef(0);
  const wipe4TargetRef     = useRef(0);
  const wipe4SmoothRef     = useRef(0);
  const lenisRef           = useRef(null);
  const amr10TrackerRef    = useRef(null);
  const [activeScene, setActiveScene] = useState(1);
  const [freeCam, setFreeCam]   = useState(false);
  const [freeCam1, setFreeCam1] = useState(false);
  const [freeCam3, setFreeCam3] = useState(false);
  const [freeCam4, setFreeCam4] = useState(false);
  const [freeCam5, setFreeCam5] = useState(false);
  const posSpan    = useRef(null);
  const targetSpan = useRef(null);
  const posSpan1   = useRef(null);
  const targetSpan1 = useRef(null);
  const posSpan3   = useRef(null);
  const targetSpan3 = useRef(null);
  const posSpan4   = useRef(null);
  const targetSpan4 = useRef(null);
  const posSpan5   = useRef(null);
  const targetSpan5 = useRef(null);
  const { display, play, reset } = useScramble("Skip this section");

  // ── Wipe progress refs (written by tick loop, read by WipeQuad in useFrame) ─
  const wipe1PRef = useRef(0);
  const wipe2PRef = useRef(0);
  const wipe3PRef = useRef(0);
  const wipe4PRef = useRef(0);

  // ── Stable scene/camera objects ───────────────────────────────────────────
  const [sceneObjs] = useState(() => Array.from({ length: 5 }, () => new THREE.Scene()));
  const [cameras] = useState(() => [
    Object.assign(new THREE.PerspectiveCamera(35, 1, 0.05, 1000), { name: 'cam1' }),
    Object.assign(new THREE.PerspectiveCamera(35, 1, 0.05, 1000), { name: 'cam2' }),
    Object.assign(new THREE.PerspectiveCamera(35, 1, 0.05, 1000), { name: 'cam3' }),
    Object.assign(new THREE.PerspectiveCamera(50, 1, 0.05, 1000), { name: 'cam4' }),
    Object.assign(new THREE.PerspectiveCamera(45, 1, 0.05, 1000), { name: 'cam5' }),
  ]);
  // Each element of rtRefs is a {current: null} object (mirrors useRef shape)
  const rtRefs = useRef(Array.from({ length: 5 }, () => ({ current: null }))).current;

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.28,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      if (!sectionRef.current) return;
      const rect       = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));

      // Both refs always update; each clamps naturally at its boundary
      // Note: all raw thresholds scaled by 0.8 vs original (section is 3000vh vs 2400vh — same absolute vh travel)
      progressRef.current   = Math.min(raw / 0.096, 1);
      // Interior animation completes by raw=0.304 (before wipe2 starts)
      s2ProgressRef.current = Math.min(1, Math.max(0, (raw - 0.024) / 0.28));

      // Feed raw wipe targets — smoothing happens in tick loop
      wipeTargetRef.current  = Math.max(0, Math.min(1, raw / 0.20));
      // wipe2: Scene 2 → Scene 3 — starts while AMR10 is still mid-animation
      wipe2TargetRef.current = Math.max(0, Math.min(1, (raw - 0.240) / 0.048));
      // Scene 3 animation — clamped to wipe3 start so models freeze when wipe begins
      s3AnimState.progress   = Math.min(1, Math.max(0, (Math.min(raw, 0.301) - 0.288) / 0.08));
      // wipe3: Scene 3 → Scene 4 (starts early, while Scene 3 models are mid-animation)
      wipe3TargetRef.current = Math.max(0, Math.min(1, (raw - 0.301) / 0.064));
      // Scene 4 phase 1 — AMR10 L-path
      s4AnimState.progress   = Math.min(1, Math.max(0, (raw - 0.365) / 0.16));
      // Scene 4 phase 2 — AMR50 slides (continues through wipe4)
      s4Anim2State.progress  = Math.min(1, Math.max(0, (raw - 0.525) / 0.16));
      // wipe4: Scene 4 → Scene 5 — starts while AMR50 is still mid-animation
      wipe4TargetRef.current = Math.max(0, Math.min(1, (raw - 0.616) / 0.06));
      // Scene 5
      s5AnimState.progress   = Math.min(1, Math.max(0, (raw - 0.676) / 0.089));
    });

    let stopped = false;
    let lastTime = 0;
    let rafId;
    const tick = (time) => {
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
      lastTime = time;

      // Exponential lerp for temporal smoothness
      wipeSmoothRef.current += (wipeTargetRef.current - wipeSmoothRef.current)
        * (1 - Math.exp(-delta * 5));

      // Smootherstep (6t⁵ − 15t⁴ + 10t³) for silky spatial easing
      const t = wipeSmoothRef.current;
      const wipeP = t * t * t * (t * (t * 6 - 15) + 10);
      wipe1PRef.current = wipeP;

      // wipe2: smooth + smootherstep
      wipe2SmoothRef.current += (wipe2TargetRef.current - wipe2SmoothRef.current)
        * (1 - Math.exp(-delta * 5));
      const t2 = wipe2SmoothRef.current;
      const wipe2P = t2 * t2 * t2 * (t2 * (t2 * 6 - 15) + 10);
      wipe2PRef.current = wipe2P;

      // wipe3: smooth + smootherstep
      wipe3SmoothRef.current += (wipe3TargetRef.current - wipe3SmoothRef.current)
        * (1 - Math.exp(-delta * 2.0));
      const t3 = wipe3SmoothRef.current;
      const wipe3P = t3 * t3 * t3 * (t3 * (t3 * 6 - 15) + 10);
      wipe3PRef.current = wipe3P;

      // wipe4: smooth + smootherstep
      wipe4SmoothRef.current += (wipe4TargetRef.current - wipe4SmoothRef.current)
        * (1 - Math.exp(-delta * 2.0));
      const t4 = wipe4SmoothRef.current;
      const wipe4P = t4 * t4 * t4 * (t4 * (t4 * 6 - 15) + 10);
      wipe4PRef.current = wipe4P;

      const nextScene = wipeP < 0.5 ? 1 : (wipe2P < 0.5 ? 2 : (wipe3P < 0.5 ? 3 : (wipe4P < 0.5 ? 4 : 5)));
      s3AnimState.active = (nextScene === 3);
      if (nextScene !== activeSceneRef.current) {
        activeSceneRef.current = nextScene;
        setActiveScene(nextScene);
      }

      const shouldStop = s2ScrollLock.locked;
      if (shouldStop !== stopped) {
        stopped = shouldStop;
        if (stopped) lenis.stop(); else lenis.start();
      }
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  const handleSkip = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyWrapper}>
        <div className={styles.canvasWrapper}>

          {/* ── Single Canvas — all scenes composited via render targets ─── */}
          <Canvas
            shadows={{ type: THREE.PCFShadowMap }}
            dpr={[1, 2]}
            gl={{ alpha: false, powerPreference: "high-performance", antialias: true }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* ── Virtual scene portals (index 0=S1, 1=S2, 2=S3, 3=S4, 4=S5) ── */}

            {/* Scene 1 — exterior, daylight */}
            {createPortal(
              <>
                <color attach="background" args={["#F5F2ED"]} />
                <directionalLight position={[60, 90, 40]} intensity={1.8} color="#FFF8F2"
                  castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                  shadow-camera-near={1} shadow-camera-far={700}
                  shadow-camera-left={-130} shadow-camera-right={130}
                  shadow-camera-top={130} shadow-camera-bottom={-130}
                  shadow-radius={14} shadow-bias={-0.0004} />
                <directionalLight position={[-50, 60, -35]} intensity={0.6} color="#F2F0EE" />
                <ambientLight intensity={0.80} color="#FFF4EC" />
                {freeCam1
                  ? <FreeCam posRef={posSpan1} targetRef={targetSpan1} />
                  : <Scene1Camera progressRef={progressRef} />
                }
                <Suspense fallback={null}>
                  <GroundPlane />
                  <ExteriorModel />
                </Suspense>
              </>,
              sceneObjs[0],
              { camera: cameras[0] }
            )}

            {/* Scene 2 — interior, dark */}
            {createPortal(
              <>
                <color attach="background" args={["#0d0d0d"]} />
                <ambientLight intensity={0.6} color="#FFF8F0" />
                <directionalLight position={[0, 10, 0]} intensity={1.8} color="#FFF5E8"
                  castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                  shadow-bias={-0.0004} />
                <directionalLight position={[5, 4, 5]} intensity={0.7} color="#FFFAF5" />
                <directionalLight position={[-5, 4, -5]} intensity={0.4} color="#F0EFEE" />
                {freeCam
                  ? <FreeCam posRef={posSpan} targetRef={targetSpan} />
                  : <Scene2Camera progressRef={s2ProgressRef} />
                }
                <Suspense fallback={null}>
                  <InteriorScene progressRef={s2ProgressRef} trackerRef={amr10TrackerRef} />
                </Suspense>
              </>,
              sceneObjs[1],
              { camera: cameras[1] }
            )}

            {/* Scene 3 — exterior with AMR pair */}
            {createPortal(
              <>
                <color attach="background" args={["#F5F2ED"]} />
                <directionalLight position={[60, 90, 40]} intensity={1.8} color="#FFF8F2"
                  castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                  shadow-camera-near={1} shadow-camera-far={700}
                  shadow-camera-left={-130} shadow-camera-right={130}
                  shadow-camera-top={130} shadow-camera-bottom={-130}
                  shadow-radius={14} shadow-bias={-0.0004} />
                <directionalLight position={[-50, 60, -35]} intensity={0.6} color="#F2F0EE" />
                <ambientLight intensity={0.80} color="#FFF4EC" />
                {freeCam3
                  ? <FreeCam posRef={posSpan3} targetRef={targetSpan3} />
                  : <Scene3Camera />
                }
                <Suspense fallback={null}>
                  <GroundPlane />
                  <ExteriorModel />
                  <S3AMR10 />
                  <S3Trolley />
                </Suspense>
              </>,
              sceneObjs[2],
              { camera: cameras[2] }
            )}

            {/* Scene 4 — colored factory interior */}
            {createPortal(
              <>
                <color attach="background" args={["#1a1a1a"]} />
                <ambientLight intensity={0.8} color="#FFF8F0" />
                <directionalLight position={[10, 20, 10]} intensity={1.5} color="#FFF5E8"
                  castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                  shadow-bias={-0.0004} />
                <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#F0EFEE" />
                {freeCam4
                  ? <FreeCam posRef={posSpan4} targetRef={targetSpan4} />
                  : <Scene4Camera />
                }
                <Suspense fallback={null}>
                  <FactoryInterior2 />
                  <AMR10Color />
                  <AMR10TrolleyColor />
                  <AMR50Color />
                  <AMR50TrolleyColor />
                </Suspense>
              </>,
              sceneObjs[3],
              { camera: cameras[3] }
            )}

            {/* Scene 5 — final scene */}
            {createPortal(
              <>
                <color attach="background" args={["#F5F2ED"]} />
                <ambientLight intensity={1.0} color="#FFF8F0" />
                <directionalLight position={[10, 20, 10]} intensity={2.0} color="#FFF5E8"
                  castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                  shadow-bias={-0.0004} />
                <directionalLight position={[-10, 15, -10]} intensity={0.7} color="#F0EFEE" />
                <directionalLight position={[0, -5, 5]} intensity={0.3} color="#EEF0F2" />
                {freeCam5
                  ? <FreeCam posRef={posSpan5} targetRef={targetSpan5} />
                  : <Scene5Camera />
                }
                <Suspense fallback={null}>
                  <FinalScene />
                </Suspense>
              </>,
              sceneObjs[4],
              { camera: cameras[4] }
            )}

            {/* ── Render manager — writes each scene to its RT ─────────────── */}
            <RenderManager sceneObjs={sceneObjs} cameras={cameras} rtRefs={rtRefs} wipePRefs={[wipe1PRef, wipe2PRef, wipe3PRef, wipe4PRef]} />

            {/* ── Compositor quads (back → front) ──────────────────────────── */}
            {/* Scene5: no clip (background layer) */}
            <WipeQuad rtRef={rtRefs[4]} wipePRef={null}     clipped={false} renderOrder={0} />
            {/* Scene4: wipe4 */}
            <WipeQuad rtRef={rtRefs[3]} wipePRef={wipe4PRef} clipped={true}  renderOrder={1} />
            {/* Scene3: wipe3 */}
            <WipeQuad rtRef={rtRefs[2]} wipePRef={wipe3PRef} clipped={true}  renderOrder={2} />
            {/* Scene2: wipe2 */}
            <WipeQuad rtRef={rtRefs[1]} wipePRef={wipe2PRef} clipped={true}  renderOrder={3} />
            {/* Scene1: wipe1 (topmost) */}
            <WipeQuad rtRef={rtRefs[0]} wipePRef={wipe1PRef} clipped={true}  renderOrder={4} />
          </Canvas>
        </div>

        {/* Free cam toggle + HUD — scene 1 */}
        {activeScene === 1 && (
          <div style={{
            position: "absolute", top: 96, right: 14,
            display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", zIndex: 10,
          }}>
            <button
              onClick={() => setFreeCam1(f => !f)}
              style={{
                background: freeCam1 ? "#b08ac8" : "rgba(0,0,0,0.55)",
                color: "#fff",
                border: `1px solid ${freeCam1 ? "#b08ac8" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 4, padding: "5px 14px",
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                letterSpacing: "0.12em", cursor: "pointer", userSelect: "none",
              }}
            >
              {freeCam1 ? "STORY CAM" : "FREE CAM"}
            </button>
            {freeCam1 && (
              <div style={{
                background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
                fontFamily: "monospace", fontSize: 11,
                padding: "10px 14px", borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                lineHeight: 2, minWidth: 270,
              }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                  CAMERA POSITION
                </div>
                <div>pos &nbsp;&nbsp;: <span ref={posSpan1} style={{ color: "#f5c842" }} /></div>
                <div>target: <span ref={targetSpan1} style={{ color: "#4ab0d9" }} /></div>
              </div>
            )}
          </div>
        )}

        {/* Free cam toggle + HUD — only on scene 2 */}
        {activeScene === 2 && (
          <div style={{
            position: "absolute", top: 96, right: 14,
            display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", zIndex: 10,
          }}>
            <button
              onClick={() => setFreeCam(f => !f)}
              style={{
                background: freeCam ? "#b08ac8" : "rgba(0,0,0,0.55)",
                color: "#fff",
                border: `1px solid ${freeCam ? "#b08ac8" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 4, padding: "5px 14px",
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                letterSpacing: "0.12em", cursor: "pointer", userSelect: "none",
              }}
            >
              {freeCam ? "STORY CAM" : "FREE CAM"}
            </button>
            {freeCam && (
              <div style={{
                background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
                fontFamily: "monospace", fontSize: 11,
                padding: "10px 14px", borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                lineHeight: 2, minWidth: 270,
              }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                  CAMERA POSITION
                </div>
                <div>pos &nbsp;&nbsp;: <span ref={posSpan} style={{ color: "#f5c842" }} /></div>
                <div>target: <span ref={targetSpan} style={{ color: "#4ab0d9" }} /></div>
              </div>
            )}
            <div style={{
              background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
              fontFamily: "monospace", fontSize: 11,
              padding: "10px 14px", borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
              lineHeight: 1.8, minWidth: 270,
            }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                AMR10 DISTANCE
              </div>
              <span ref={amr10TrackerRef} style={{ color: "#4ab0d9" }}>0.00 / 5.00</span>
              <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 4 }}>units</span>
            </div>
          </div>
        )}

        {/* Free cam toggle + HUD — scene 4 */}
        {activeScene === 4 && (
          <div style={{
            position: "absolute", top: 96, right: 14,
            display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", zIndex: 10,
          }}>
            <button
              onClick={() => setFreeCam4(f => !f)}
              style={{
                background: freeCam4 ? "#b08ac8" : "rgba(0,0,0,0.55)",
                color: "#fff",
                border: `1px solid ${freeCam4 ? "#b08ac8" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 4, padding: "5px 14px",
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                letterSpacing: "0.12em", cursor: "pointer", userSelect: "none",
              }}
            >
              {freeCam4 ? "STORY CAM" : "FREE CAM"}
            </button>
            {freeCam4 && (
              <div style={{
                background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
                fontFamily: "monospace", fontSize: 11,
                padding: "10px 14px", borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                lineHeight: 2, minWidth: 270,
              }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                  CAMERA POSITION (SCENE 4)
                </div>
                <div>pos &nbsp;&nbsp;: <span ref={posSpan4} style={{ color: "#f5c842" }} /></div>
                <div>target: <span ref={targetSpan4} style={{ color: "#4ab0d9" }} /></div>
              </div>
            )}
          </div>
        )}

        {/* Free cam toggle + HUD — scene 3 */}
        {activeScene === 3 && (
          <div style={{
            position: "absolute", top: 96, right: 14,
            display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", zIndex: 10,
          }}>
            <button
              onClick={() => setFreeCam3(f => !f)}
              style={{
                background: freeCam3 ? "#b08ac8" : "rgba(0,0,0,0.55)",
                color: "#fff",
                border: `1px solid ${freeCam3 ? "#b08ac8" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 4, padding: "5px 14px",
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                letterSpacing: "0.12em", cursor: "pointer", userSelect: "none",
              }}
            >
              {freeCam3 ? "STORY CAM" : "FREE CAM"}
            </button>
            {freeCam3 && (
              <div style={{
                background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
                fontFamily: "monospace", fontSize: 11,
                padding: "10px 14px", borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                lineHeight: 2, minWidth: 270,
              }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                  CAMERA POSITION (SCENE 3)
                </div>
                <div>pos &nbsp;&nbsp;: <span ref={posSpan3} style={{ color: "#f5c842" }} /></div>
                <div>target: <span ref={targetSpan3} style={{ color: "#4ab0d9" }} /></div>
              </div>
            )}
          </div>
        )}

        {/* Free cam toggle + HUD — scene 5 */}
        {activeScene === 5 && (
          <div style={{
            position: "absolute", top: 96, right: 14,
            display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", zIndex: 10,
          }}>
            <button
              onClick={() => setFreeCam5(f => !f)}
              style={{
                background: freeCam5 ? "#b08ac8" : "rgba(0,0,0,0.55)",
                color: "#fff",
                border: `1px solid ${freeCam5 ? "#b08ac8" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 4, padding: "5px 14px",
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                letterSpacing: "0.12em", cursor: "pointer", userSelect: "none",
              }}
            >
              {freeCam5 ? "STORY CAM" : "FREE CAM"}
            </button>
            {freeCam5 && (
              <div style={{
                background: "rgba(0,0,0,0.72)", color: "#e0e0e0",
                fontFamily: "monospace", fontSize: 11,
                padding: "10px 14px", borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                lineHeight: 2, minWidth: 270,
              }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.14em", marginBottom: 4 }}>
                  CAMERA POSITION (SCENE 5)
                </div>
                <div>pos &nbsp;&nbsp;: <span ref={posSpan5} style={{ color: "#f5c842" }} /></div>
                <div>target: <span ref={targetSpan5} style={{ color: "#4ab0d9" }} /></div>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          className={styles.skipSection}
          onClick={handleSkip}
          onMouseEnter={play}
          onMouseLeave={reset}
        >
          <span className={`label-2 label-2-md ${styles.skipText}`}>
            <span className={styles.skipTextOriginal}>Skip this section</span>
            <span className={styles.skipTextDisplay} aria-hidden="true">{display}</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.mobileDiagram}>
        <Image src="/assets/logistics-challenges-bg-md.png" alt=""
          width={320} height={374} sizes="100vw"
          className={styles.mobileDiagramImage} aria-hidden="true" />
      </div>
    </section>
  );
}
