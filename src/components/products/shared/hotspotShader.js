import { useMemo } from 'react';
import * as THREE from 'three';

// ── Shared radar-ping shader used by every product's 3-D hotspot markers ──────
// Renders a solid centre dot plus two outward-expanding rings that loop on a
// timer. The `time` uniform is updated once per frame by the caller's useFrame.

export function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const HOTSPOT_VERTEX_SHADER = /* glsl */`
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

export const HOTSPOT_FRAGMENT_SHADER = /* glsl */`
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

// Builds the instanced-plane geometry + shader material that every hotspot
// dot in a scene shares, plus the per-instance attribute buffers the caller
// mutates each frame (opacity / ripple state / size).
export function useHotspotMaterial(count, baseDotSize, color = '#F43D00') {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1);
    const ops = new Float32Array(count).fill(1.0);
    geo.setAttribute('instanceOpacity', new THREE.InstancedBufferAttribute(ops, 1));

    const rips = new Float32Array(count).fill(0.0);
    geo.setAttribute('instanceRippleActive', new THREE.InstancedBufferAttribute(rips, 1));

    const szs = new Float32Array(count).fill(baseDotSize);
    geo.setAttribute('instanceSize', new THREE.InstancedBufferAttribute(szs, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time:         { value: 0 },
        hotspotColor: { value: new THREE.Color(color) },
      },
      vertexShader:   HOTSPOT_VERTEX_SHADER,
      fragmentShader: HOTSPOT_FRAGMENT_SHADER,
      transparent:    true,
      depthTest:      false,
      depthWrite:     false,
      side:           THREE.DoubleSide,
    });

    return { geometry: geo, material: mat, opacities: ops, rippleActives: rips, sizes: szs };
  }, [count, baseDotSize, color]);
}

// Converts a Canvas pointer event into the model's local-space coordinates,
// rounded to 2dp — used only by the dev-only coordinate picker.
export function pickLocalPoint(event, groupObject3D) {
  const inv = new THREE.Matrix4().copy(groupObject3D.matrixWorld).invert();
  const local = event.point.clone().applyMatrix4(inv);
  return [
    parseFloat(local.x.toFixed(2)),
    parseFloat(local.y.toFixed(2)),
    parseFloat(local.z.toFixed(2)),
  ];
}
