'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_phase;
uniform float u_vertical;

#define TAU 6.28318530718

const float FREQ        = 7.5;
const float PATTERN     = 15.0;
const float EDGE_SHARP  = 26.0;
const float FADE_END_H  = 1.45;
const float FADE_END_V  = 0.85;
const vec3  C_BLACK     = vec3(0.004, 0.002, 0.001);
const vec3  C_EMBER     = vec3(0.16, 0.035, 0.010);
const vec3  C_MID       = vec3(0.55, 0.135, 0.030);
const vec3  C_HOT       = vec3(1.00, 0.36, 0.10);
const vec3  C_CORE      = vec3(1.00, 0.72, 0.45);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 p = gl_FragCoord.xy / u_res.y;

  float d = p.x - p.y;

  float shift = u_phase * PATTERN;
  float bd = d * FREQ - shift;
  float f  = fract(bd);

  float vary = 0.62
             + 0.30 * sin(bd * TAU / PATTERN * 3.0)
             + 0.18 * sin(bd * TAU / PATTERN * 5.0 + 1.7);
  vary = clamp(vary, 0.18, 1.05);

  float grad = pow(1.0 - f, 1.6);
  float rim  = exp(-f * EDGE_SHARP);
  float rim2 = exp(-(1.0 - f) * 60.0) * 0.35;

  float bd2 = d * FREQ * 0.5 - shift * 0.5;
  float broad = pow(1.0 - fract(bd2), 2.2) * 0.35;

  float axisPos = mix(p.x, 1.0 - p.y, u_vertical);
  float fadeEnd = mix(FADE_END_H, FADE_END_V, u_vertical);
  float mask = smoothstep(fadeEnd, -0.35, axisPos);
  mask = pow(mask, 1.35);
  mask *= 0.88 + 0.12 * smoothstep(0.6, -0.8, d);

  float bloom = smoothstep(mix(0.7, 0.32, u_vertical), -0.4, axisPos) * 0.20;

  float L = mask * ( (grad * 0.55 + broad) * vary
                   + (rim + rim2) * vary * 1.15 )
          + bloom * mask;

  L *= 0.94 + 0.06 * sin(u_phase * TAU);

  vec3 col = C_BLACK;
  col = mix(col, C_EMBER, smoothstep(0.00, 0.18, L));
  col = mix(col, C_MID,   smoothstep(0.12, 0.45, L));
  col = mix(col, C_HOT,   smoothstep(0.38, 0.85, L));
  col = mix(col, C_CORE,  smoothstep(0.85, 1.35, L));

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
    const uVertical = gl.getUniformLocation(program, 'u_vertical');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uVertical, canvas.height > canvas.width ? 1.0 : 0.0);
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
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
