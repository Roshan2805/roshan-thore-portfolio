"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { JOURNEY, type Shape } from "@/data/journeyData";

const W = 1024;
const H = 512;
const BASE_WIDTH = 8;
const MORPH_MS = 1500;

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

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.36, d) * 0.92);
    #include <colorspace_fragment>
  }
`;

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, font: string) {
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text = (value: string, size: number) => {
    ctx.font = `700 ${size}px ${font}`;
    const width = ctx.measureText(value).width;
    if (width > W * 0.94) ctx.font = `700 ${(size * W * 0.94) / width}px ${font}`;
    ctx.fillText(value, W / 2, H / 2);
  };

  if (shape === "tag") text("</>", 330);
  if (shape === "score") text("52%", 360);
  if (shape === "users") text("30K+", 340);
  if (shape === "name") text("Roshan Thore", 190);

  if (shape === "ring") {
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 190, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (shape === "code") {
    const rows = [
      [0, 180, 150],
      [50, 260, 120],
      [50, 120, 220],
      [100, 300, 0],
      [100, 150, 100],
      [50, 210, 0],
      [0, 90, 0]
    ];
    rows.forEach(([indent, first, second], row) => {
      const y = 70 + row * 58;
      ctx.fillRect(250 + indent, y, first, 18);
      if (second) ctx.fillRect(250 + indent + first + 28, y, second, 18);
    });
  }

  if (shape === "window") {
    ctx.lineWidth = 12;
    ctx.strokeRect(212, 56, 600, 400);
    ctx.fillRect(212, 126, 600, 10);
    [0, 1, 2].forEach((i) => {
      ctx.beginPath();
      ctx.arc(252 + i * 36, 92, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillRect(262, 186, 240, 26);
    ctx.fillRect(262, 246, 500, 12);
    ctx.fillRect(262, 286, 420, 12);
    ctx.fillRect(262, 366, 130, 40);
  }

  if (shape === "bars") {
    [90, 150, 200, 280, 400].forEach((height, i) => {
      ctx.fillRect(272 + i * 104, 456 - height, 64, height);
    });
  }
}

function shapeTargets(shape: Shape, count: number, font: string) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  drawShape(ctx, shape, font);

  const pixels = ctx.getImageData(0, 0, W, H).data;
  const filled: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (pixels[(y * W + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }

  // The first shape is an idea, not a fact yet, so it stays loose.
  const spread = shape === "tag" ? 0.5 : 0.03;
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const pick = Math.floor(Math.random() * (filled.length / 2)) * 2;
    targets[i * 3] = (filled[pick] / W - 0.5) * BASE_WIDTH + (Math.random() - 0.5) * spread;
    targets[i * 3 + 1] = -(filled[pick + 1] / H - 0.5) * BASE_WIDTH * (H / W) + (Math.random() - 0.5) * spread;
    targets[i * 3 + 2] = (Math.random() - 0.5) * (0.5 + spread);
  }
  return targets;
}

export default function IntroScene({ index }: { index: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const showRef = useRef<((stage: number) => void) | null>(null);

  useEffect(() => {
    indexRef.current = index;
    showRef.current?.(index);
  }, [index]);

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
      uColor: { value: new THREE.Color(JOURNEY[indexRef.current].dots) }
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      const visibleWidth = 2 * Math.tan(THREE.MathUtils.degToRad(25)) * 9 * camera.aspect;
      points.scale.setScalar(Math.min(visibleWidth * 0.9, 10.5) / BASE_WIDTH);
      points.position.y = camera.aspect < 1 ? 1.1 : 0.7;
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

    let targets: Float32Array[] = [];
    let morphStart = 0;
    const colorFrom = uniforms.uColor.value.clone();
    const colorTo = uniforms.uColor.value.clone();

    const show = (stage: number) => {
      if (!targets.length) return;
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
      to.set(targets[stage]);
      geometry.attributes.aFrom.needsUpdate = true;
      geometry.attributes.aTo.needsUpdate = true;
      colorFrom.copy(uniforms.uColor.value);
      colorTo.set(JOURNEY[stage].dots);
      uniforms.uMix.value = reduceMotion ? 1 : 0;
      morphStart = performance.now();
    };

    let cancelled = false;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-fraunces") || "serif";
    document.fonts
      .load(`700 200px ${family}`)
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        targets = JOURNEY.map((stage) => shapeTargets(stage.shape, count, family));
        showRef.current = show;
        show(indexRef.current);
      });

    let frame = 0;
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const sinceMorph = now - morphStart;
      if (uniforms.uMix.value < 1) {
        uniforms.uMix.value = Math.min(sinceMorph / MORPH_MS, 1);
      }
      uniforms.uColor.value.lerpColors(colorFrom, colorTo, Math.min(sinceMorph / 900, 1));
      uniforms.uTime.value = now / 1000;

      // A slow push-in on every milestone, like a held camera shot.
      const push = reduceMotion ? 0 : Math.min(sinceMorph / 4000, 1) * 0.7;
      camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.6 - camera.position.y) * 0.04;
      camera.position.z = 9.4 - push;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      showRef.current = null;
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
