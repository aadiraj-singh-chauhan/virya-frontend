"use client";

import { useRef, useEffect, useState, useCallback, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Lenis from "lenis";
import Image from "next/image";
import { useScramble } from "@/hooks/useScramble";
import styles from "../css/LogisticsChallenges.module.css";

// ── Transition state — module-level, zero React re-renders ────────────────────
const transitionState = {
  phase: "idle",  // "idle" | "out" | "in"
  progress: 0,
  targetScene: null,
};

// ── Scene 1 camera waypoints ──────────────────────────────────────────────────
const S1_START_POS  = new THREE.Vector3(-8.731, 5.480, 4.225);
const S1_START_LOOK = new THREE.Vector3(0.704, -0.433, -0.947);
const S1_END_POS    = new THREE.Vector3(1.067, 1.118, -0.831);
const S1_END_LOOK   = new THREE.Vector3(1.763, 0.305, -1.880);

// ── Scene 2 camera waypoints (A → B → C) ─────────────────────────────────────
const S2_A_POS  = new THREE.Vector3(4.335, 4.669, 8.974);
const S2_A_LOOK = new THREE.Vector3(-0.143, 0.185, -0.116);
const S2_B_POS  = new THREE.Vector3(0.582, 4.454, 10.078);
const S2_B_LOOK = new THREE.Vector3(0.081, 0.138, -0.114);
const S2_C_POS  = new THREE.Vector3(0.081, 11.219, -0.114);
const S2_C_LOOK = new THREE.Vector3(0.081, 0.138, -0.114);

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
  useEffect(() => {
    if (!scene) return;
    const box    = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());
    scene.position.set(-center.x, -box.min.y, -center.z);
    const mat = makeArchMaterial(size.y);
    scene.traverse((node) => {
      if (!node.isMesh) return;
      node.material = mat; node.castShadow = true; node.receiveShadow = true;
    });
  }, [scene]);
  return <primitive object={scene} />;
}

// ── Interior model ────────────────────────────────────────────────────────────
function InteriorModel() {
  const { scene } = useGLTF("/assets/factory-interior.glb");
  useEffect(() => {
    if (!scene) return;
    const box    = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.set(-center.x, -box.min.y, -center.z);
    scene.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true; node.receiveShadow = true;
    });
  }, [scene]);
  return <primitive object={scene} />;
}

useGLTF.preload("/assets/exterior-scene.glb");
useGLTF.preload("/assets/factory-interior.glb");

// ── Fade controller — animates overlay opacity inside useFrame ────────────────
function FadeController({ overlayRef, onSwitch }) {
  const switched = useRef(false);
  useFrame((_, delta) => {
    if (transitionState.phase === "out") {
      transitionState.progress = Math.min(transitionState.progress + delta * 5.0, 1);
      if (overlayRef.current) overlayRef.current.style.opacity = String(transitionState.progress);
      if (transitionState.progress >= 1 && !switched.current) {
        switched.current = true;
        onSwitch(transitionState.targetScene);
      }
    } else if (transitionState.phase === "in") {
      switched.current = false;
      transitionState.progress = Math.max(transitionState.progress - delta * 4.0, 0);
      if (overlayRef.current) overlayRef.current.style.opacity = String(transitionState.progress);
      if (transitionState.progress <= 0) {
        transitionState.phase = "idle";
        transitionState.targetScene = null;
      }
    }
  });
  return null;
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
    smoothed.current += (progressRef.current - smoothed.current) * (1 - Math.exp(-delta * 4));
    const t = smoothed.current;

    let pos, look;
    if (t <= 0.5) {
      // First half: A → B
      const seg = t * 2;
      const ease = seg * seg * (3 - 2 * seg);
      pos  = new THREE.Vector3().lerpVectors(S2_A_POS, S2_B_POS, ease);
      look = new THREE.Vector3().lerpVectors(S2_A_LOOK, S2_B_LOOK, ease);
    } else {
      // Second half: B → C
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

// ── Free cam for exploring scene 2 position ───────────────────────────────────
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

// ── Section ───────────────────────────────────────────────────────────────────
export default function LogisticsChallenges() {
  const sectionRef     = useRef(null);
  const progressRef    = useRef(0);
  const s2ProgressRef  = useRef(0);
  const activeSceneRef = useRef(1);
  const overlayRef     = useRef(null);
  const lenisRef       = useRef(null);
  const [activeScene, setActiveScene] = useState(1);
  const [freeCam, setFreeCam]         = useState(false);
  const posSpan    = useRef(null);
  const targetSpan = useRef(null);
  const { display, play, reset } = useScramble("Skip this section");

  const handleSwitch = useCallback((target) => {
    setActiveScene(target);
    activeSceneRef.current = target;
    setFreeCam(false);
    setTimeout(() => {
      transitionState.phase = "in";
      transitionState.progress = 1;
    }, 50);
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
      if (transitionState.phase !== "idle") return;
      if (!sectionRef.current) return;
      const rect       = sectionRef.current.getBoundingClientRect();
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));

      if (activeSceneRef.current === 1) {
        // Scene 1 occupies the first half of the section scroll
        progressRef.current = Math.min(raw / 0.5, 1);
        if (raw >= 0.48) {
          lenis.stop();
          transitionState.phase = "out";
          transitionState.progress = 0;
          transitionState.targetScene = 2;
        }
      } else if (activeSceneRef.current === 2) {
        // Scene 2 occupies the second half of the section scroll
        s2ProgressRef.current = Math.min(1, Math.max(0, (raw - 0.5) / 0.5));
        if (raw <= 0.45) {
          lenis.stop();
          transitionState.phase = "out";
          transitionState.progress = 0;
          transitionState.targetScene = 1;
        }
      }
    });

    let stopped = false;
    let rafId;
    const tick = (time) => {
      const shouldStop = transitionState.phase !== "idle";
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
          <Canvas
            shadows={{ type: THREE.PCFShadowMap }}
            camera={{ position: [-8.731, 5.480, 4.225], fov: 35, near: 0.05 }}
            dpr={[1, 2]}
            gl={{ alpha: false, powerPreference: "high-performance", antialias: true }}
            style={{ width: "100%", height: "100%" }}
          >
            <color attach="background" args={[activeScene === 1 ? "#F5F2ED" : "#0d0d0d"]} />

            {/* Scene 1 — exterior lights */}
            {activeScene === 1 && <>
              <directionalLight position={[60, 90, 40]} intensity={1.8} color="#FFF8F2"
                castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                shadow-camera-near={1} shadow-camera-far={700}
                shadow-camera-left={-130} shadow-camera-right={130}
                shadow-camera-top={130} shadow-camera-bottom={-130}
                shadow-radius={14} shadow-bias={-0.0004} />
              <directionalLight position={[-50, 60, -35]} intensity={0.6} color="#F2F0EE" />
              <ambientLight intensity={0.80} color="#FFF4EC" />
            </>}

            {/* Scene 2 — interior lights */}
            {activeScene === 2 && <>
              <ambientLight intensity={0.6} color="#FFF8F0" />
              <directionalLight position={[0, 10, 0]} intensity={1.8} color="#FFF5E8"
                castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
                shadow-bias={-0.0004} />
              <directionalLight position={[5, 4, 5]} intensity={0.7} color="#FFFAF5" />
              <directionalLight position={[-5, 4, -5]} intensity={0.4} color="#F0EFEE" />
            </>}

            {/* Cameras */}
            {activeScene === 1 && !freeCam && <Scene1Camera progressRef={progressRef} />}
            {activeScene === 2 && !freeCam && <Scene2Camera progressRef={s2ProgressRef} />}
            {freeCam && <FreeCam posRef={posSpan} targetRef={targetSpan} />}

            {/* Models */}
            <Suspense fallback={null}>
              {activeScene === 1 && <GroundPlane />}
              {activeScene === 1 && <ExteriorModel />}
              {activeScene === 2 && <InteriorModel />}
            </Suspense>

            <FadeController overlayRef={overlayRef} onSwitch={handleSwitch} />
          </Canvas>
        </div>

        {/* Full-screen black fade overlay — same pattern as virya-story-2 */}
        <div ref={overlayRef} style={{
          position: "absolute", inset: 0,
          background: "#000", opacity: 0, pointerEvents: "none", transition: "none",
        }} />

        {/* Free cam toggle + HUD */}
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
        </div>


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
