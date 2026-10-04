"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BEATS, type Shape } from "@/data/journeyData";

const W = 1024;
const H = 512;
const BASE_WIDTH = 8;
const CAMERA_Z = 9;
const MORPH_MS = 1300;

const vertexShader = `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;

  void main() {
    float t = clamp((uMix - aSeed * 0.35) / 0.65, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);
    p += sin(t * 3.14159) * vec3(sin(aSeed * 40.0), cos(aSeed * 31.0), sin(aSeed * 17.0)) * 1.1;
    p.xy += 0.012 * vec2(sin(uTime * 0.8 + aSeed * 50.0), cos(uTime * 0.7 + aSeed * 60.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.6 + aSeed * 0.8) / -mv.z;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.36, d) * 0.92 * uAlpha);
    #include <colorspace_fragment>
  }
`;

const labels: Record<Shape, string> = { degree: "B.Com", tag: "</>", name: "Roshan Thore" };

// Draws the shape in white, samples its pixels, and returns particle targets
// centred on the shape, plus the shape's width in the same units.
function shapeTargets(shape: Shape, count: number, font: string) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const weight = shape === "name" ? 500 : 700;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${weight} 300px ${font}`;
  if (shape === "name") ctx.letterSpacing = "-13.5px";
  const width = ctx.measureText(labels[shape]).width;
  if (width > W * 0.94) {
    const size = (300 * W * 0.94) / width;
    ctx.font = `${weight} ${size}px ${font}`;
    if (shape === "name") ctx.letterSpacing = `${-0.045 * size}px`;
  }
  ctx.fillText(labels[shape], W / 2, H / 2);

  const pixels = ctx.getImageData(0, 0, W, H).data;
  const filled: number[] = [];
  let minX = W;
  let maxX = 0;
  let minY = H;
  let maxY = 0;
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (pixels[(y * W + x) * 4 + 3] > 128) {
        filled.push(x, y);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const unit = BASE_WIDTH / W;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const depth = shape === "name" ? 0.08 : 0.5;
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const pick = Math.floor(Math.random() * (filled.length / 2)) * 2;
    targets[i * 3] = (filled[pick] - centerX) * unit;
    targets[i * 3 + 1] = -(filled[pick + 1] - centerY) * unit;
    targets[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return { targets, width: (maxX - minX) * unit, height: (maxY - minY) * unit };
}

// The box the hero's journey line draws into, so the particles can come to rest on it.
function heroLineBox() {
  const el = document.querySelector<HTMLElement>("[data-hero-line]");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { left: rect.left, right: rect.right, y: rect.top };
}

// Where the hero's name is on screen, measured from its ink rather than its line box.
function heroNameBox(font: string) {
  const el = document.querySelector<HTMLElement>("[data-hero-name]");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${font}`;
  ctx.letterSpacing = style.letterSpacing;
  const m = ctx.measureText(el.textContent ?? "");
  const baseline = rect.top + rect.height / 2 + (m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2;
  return {
    x: rect.left + rect.width / 2,
    y: baseline - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2,
    width: m.actualBoundingBoxLeft + m.actualBoundingBoxRight
  };
}

export default function IntroScene({ index, leaving }: { index: number; leaving: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const showRef = useRef<((beat: number) => void) | null>(null);
  const settleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    indexRef.current = index;
    showRef.current?.(index);
  }, [index]);

  useEffect(() => {
    if (leaving) settleRef.current?.();
  }, [leaving]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.innerWidth < 768 ? 7000 : 14000;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    const geometry = new THREE.BufferGeometry();
    const from = new Float32Array(count * 3);
    const to = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random();
      from[i * 3] = (Math.random() - 0.5) * 14;
      from[i * 3 + 1] = (Math.random() - 0.5) * 8;
      from[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    to.set(from);
    geometry.setAttribute("position", new THREE.BufferAttribute(to, 3));
    geometry.setAttribute("aFrom", new THREE.BufferAttribute(from, 3));
    geometry.setAttribute("aTo", new THREE.BufferAttribute(to, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uMix: { value: 1 },
      uTime: { value: 0 },
      uSize: { value: 10 },
      uAlpha: { value: 1 },
      uColor: { value: new THREE.Color(BEATS[indexRef.current].dots) }
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    const visible = { width: 1, height: 1 };
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      visible.height = 2 * Math.tan(THREE.MathUtils.degToRad(25)) * CAMERA_Z;
      visible.width = visible.height * camera.aspect;
      uniforms.uSize.value = clientHeight * renderer.getPixelRatio() * 0.014;
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-fraunces") || "serif";
    let shapes: ReturnType<typeof shapeTargets>[] = [];
    let morphStart = 0;
    let onName = false;
    const place = { scale: 1, x: 0, y: 0 };
    const colorFrom = uniforms.uColor.value.clone();
    const colorTo = uniforms.uColor.value.clone();

    const show = (beat: number) => {
      if (!shapes.length) return;
      // Freeze particles where they are so an interrupted morph doesn't jump.
      const mix = uniforms.uMix.value;
      for (let i = 0; i < count; i++) {
        let t = Math.min(Math.max((mix - seeds[i] * 0.35) / 0.65, 0), 1);
        t = t * t * (3 - 2 * t);
        for (let axis = 0; axis < 3; axis++) {
          const k = i * 3 + axis;
          from[k] += (to[k] - from[k]) * t;
        }
      }
      const shape = shapes[beat];
      to.set(shape.targets);
      geometry.attributes.aFrom.needsUpdate = true;
      geometry.attributes.aTo.needsUpdate = true;

      // The name forms exactly over the hero's name, so the page can take over from it.
      onName = BEATS[beat].shape === "name";
      const box = onName ? heroNameBox(family) : null;
      if (box) {
        const perPixel = visible.width / mount.clientWidth;
        place.scale = (box.width * perPixel) / shape.width;
        place.x = (box.x - mount.clientWidth / 2) * perPixel;
        place.y = -(box.y - mount.clientHeight / 2) * perPixel;
      } else {
        place.scale = Math.min(Math.min(visible.width * 0.8, 9) / shape.width, (visible.height * 0.42) / shape.height);
        place.x = 0;
        place.y = camera.aspect < 1 ? 0.9 : 0.5;
      }

      colorFrom.copy(uniforms.uColor.value);
      colorTo.set(BEATS[beat].dots);
      uniforms.uMix.value = reduceMotion ? 1 : 0;
      morphStart = performance.now();
    };

    // Leaving: the name dissolves down into the line under it, then fades out
    // as the real line draws itself in the same place.
    let leaveStart = 0;
    const settle = () => {
      const line = heroLineBox();
      if (!line || !shapes.length) return;
      const mix = uniforms.uMix.value;
      for (let i = 0; i < count; i++) {
        let t = Math.min(Math.max((mix - seeds[i] * 0.35) / 0.65, 0), 1);
        t = t * t * (3 - 2 * t);
        for (let axis = 0; axis < 3; axis++) {
          const k = i * 3 + axis;
          // Store positions in world space, since the group is reset to identity below.
          from[k] += (to[k] - from[k]) * t;
          from[k] = axis === 0 ? from[k] * points.scale.x + points.position.x : axis === 1 ? from[k] * points.scale.y + points.position.y : from[k];
        }
      }
      const perPixel = visible.width / mount.clientWidth;
      for (let i = 0; i < count; i++) {
        const px = line.left + Math.random() * (line.right - line.left);
        to[i * 3] = (px - mount.clientWidth / 2) * perPixel;
        to[i * 3 + 1] = -(line.y - mount.clientHeight / 2) * perPixel + (Math.random() - 0.5) * 0.02;
        to[i * 3 + 2] = 0;
      }
      geometry.attributes.aFrom.needsUpdate = true;
      geometry.attributes.aTo.needsUpdate = true;
      points.scale.setScalar(1);
      points.position.set(0, 0, 0);
      place.scale = 1;
      place.x = 0;
      place.y = 0;
      colorFrom.copy(uniforms.uColor.value);
      colorTo.set("#17160f");
      uniforms.uMix.value = reduceMotion ? 1 : 0;
      morphStart = performance.now();
      leaveStart = morphStart;
    };
    settleRef.current = settle;

    let cancelled = false;
    Promise.all([document.fonts.load(`700 200px ${family}`), document.fonts.load(`500 200px ${family}`)])
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        shapes = BEATS.map((beat) => shapeTargets(beat.shape, count, family));
        showRef.current = show;
        show(indexRef.current);
        points.scale.setScalar(place.scale);
        points.position.set(place.x, place.y, 0);
      });

    let frame = 0;
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const sinceMorph = now - morphStart;
      if (uniforms.uMix.value < 1) uniforms.uMix.value = Math.min(sinceMorph / MORPH_MS, 1);
      uniforms.uColor.value.lerpColors(colorFrom, colorTo, Math.min(sinceMorph / 800, 1));
      uniforms.uTime.value = now / 1000;
      if (leaveStart && now - leaveStart > 800) uniforms.uAlpha.value = Math.max(uniforms.uAlpha.value - 0.04, 0);

      points.scale.setScalar(points.scale.x + (place.scale - points.scale.x) * 0.09);
      points.position.x += (place.x - points.position.x) * 0.09;
      points.position.y += (place.y - points.position.y) * 0.09;

      const lookX = onName ? 0 : pointer.x * 0.9;
      const lookY = onName ? 0 : -pointer.y * 0.6;
      camera.position.x += (lookX - camera.position.x) * (onName ? 0.12 : 0.04);
      camera.position.y += (lookY - camera.position.y) * (onName ? 0.12 : 0.04);
      camera.rotation.set(0, 0, 0);
      if (!onName) camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      showRef.current = null;
      settleRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
