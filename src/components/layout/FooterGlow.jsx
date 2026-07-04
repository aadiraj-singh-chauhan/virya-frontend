'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_phase;   // 0..1, seamless loop

#define TAU 6.28318530718

// ---- tunables calibrated to the banner reference ----
const float FREQ        = 7.5;   // stripes per diagonal unit
const float PATTERN     = 15.0;  // bands per loop (integer -> perfect loop)
const float EDGE_SHARP  = 26.0;  // hot rim falloff
const float FADE_END    = 1.45;  // x (in height units) where light fully dies
const vec3  C_BLACK     = vec3(0.004, 0.002, 0.001);
const vec3  C_EMBER     = vec3(0.16, 0.035, 0.010);
const vec3  C_MID       = vec3(0.55, 0.135, 0.030);
const vec3  C_HOT       = vec3(1.00, 0.36, 0.10);
const vec3  C_CORE      = vec3(1.00, 0.72, 0.45);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // y-normalized coords: y in [0,1], x in [0,aspect] -> true 45 deg stripes
  vec2 p = gl_FragCoord.xy / u_res.y;

  // diagonal stripe axis (bottom-left -> top-right stripes)
  float d = p.x - p.y;

  // stripes drift toward the lower-right; PATTERN bands per full loop
  float shift = u_phase * PATTERN;
  float bd = d * FREQ - shift;
  float f  = fract(bd);

  // per-stripe brightness variation (periodic in PATTERN -> loops cleanly)
  float vary = 0.62
             + 0.30 * sin(bd * TAU / PATTERN * 3.0)
             + 0.18 * sin(bd * TAU / PATTERN * 5.0 + 1.7);
  vary = clamp(vary, 0.18, 1.05);

  // stripe shading: soft sawtooth gradient + hot rim on the leading edge
  float grad = pow(1.0 - f, 1.6);
  float rim  = exp(-f * EDGE_SHARP);
  float rim2 = exp(-(1.0 - f) * 60.0) * 0.35;

  // broader soft band layer for depth (same loop period)
  float bd2 = d * FREQ * 0.5 - shift * 0.5;
  float broad = pow(1.0 - fract(bd2), 2.2) * 0.35;

  // ---- light mask: anchored to the LEFT edge, dies out horizontally ----
  float mask = smoothstep(FADE_END, -0.35, p.x);
  mask = pow(mask, 1.35);
  // slight extra weight toward the top-left / bottom-left corners
  mask *= 0.88 + 0.12 * smoothstep(0.6, -0.8, d);

  // soft bloom hugging the left side of the frame
  float bloom = smoothstep(0.7, -0.4, p.x) * 0.20;

  float L = mask * ( (grad * 0.55 + broad) * vary
                   + (rim + rim2) * vary * 1.15 )
          + bloom * mask;

  // gentle breathing of the whole light field (loops with u_phase)
  L *= 0.94 + 0.06 * sin(u_phase * TAU);

  // tone-map into the ember palette
  vec3 col = C_BLACK;
  col = mix(col, C_EMBER, smoothstep(0.00, 0.18, L));
  col = mix(col, C_MID,   smoothstep(0.12, 0.45, L));
  col = mix(col, C_HOT,   smoothstep(0.38, 0.85, L));
  col = mix(col, C_CORE,  smoothstep(0.85, 1.35, L));

  // fine grain to kill gradient banding
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

const LOOP_SECONDS = 14;

export default function FooterGlow({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) return;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uPhase = gl.getUniformLocation(program, 'u_phase');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let rafId = null;

    const frame = (now) => {
      const phase = reduced ? 0 : ((now - start) / 1000 / LOOP_SECONDS) % 1;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uPhase, phase);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) rafId = requestAnimationFrame(frame);
    };

    // The footer sits far below the fold on every page and this canvas
    // renders unconditionally once mounted — left running while off-screen,
    // it was found to trigger multi-second GPU/compositor stalls that froze
    // the whole page (including scrolling) until a refresh. Only render
    // while actually visible.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (rafId === null && !reduced) rafId = requestAnimationFrame(frame);
      } else if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    intersectionObserver.observe(canvas);

    if (reduced) frame(performance.now());

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
