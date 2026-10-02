"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { JOURNEY } from "@/data/journeyData";

interface JourneySceneProps {
  progressRef: React.RefObject<number>;
}

const COUNT = JOURNEY.length;
const SPACING = 14;
const CAMERA_DISTANCE = 6.5;

function glowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function shellGeometry(index: number) {
  switch (index % 6) {
    case 0:
      return new THREE.IcosahedronGeometry(0.9, 0);
    case 1:
      return new THREE.OctahedronGeometry(0.95);
    case 2:
      return new THREE.BoxGeometry(1.2, 1.2, 1.2);
    case 3:
      return new THREE.DodecahedronGeometry(0.9);
    case 4:
      return new THREE.TorusKnotGeometry(0.55, 0.16, 80, 10);
    default:
      return new THREE.TetrahedronGeometry(1.1);
  }
}

export const JourneyScene: React.FC<JourneySceneProps> = ({ progressRef }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080d, 0.03);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    mount.appendChild(renderer.domElement);

    const points = JOURNEY.map(
      (stage, i) => new THREE.Vector3(Math.sin(i * 0.85) * 5, stage.height, -i * SPACING)
    );
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);

    const segments = 520;
    const pathPoints = curve.getPoints(segments);
    const path = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pathPoints),
      new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.7 })
    );
    const travelledGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const travelled = new THREE.Line(
      travelledGeometry,
      new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.9 })
    );
    scene.add(path, travelled);

    const glow = glowTexture();
    const markers = JOURNEY.map((stage, i) => {
      const color = new THREE.Color(stage.accent);
      const group = new THREE.Group();
      group.position.copy(points[i]);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.24, 1),
        new THREE.MeshBasicMaterial({ color })
      );
      const shell = new THREE.LineSegments(
        new THREE.WireframeGeometry(shellGeometry(i)),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 })
      );
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.45, 0.012, 8, 96),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 })
      );
      ring.rotation.x = Math.PI / 2.4;
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glow,
          color,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      halo.scale.setScalar(5.5);

      group.add(core, shell, ring, halo);
      scene.add(group);
      return { group, shell, ring, halo };
    });

    const starCount = window.innerWidth < 768 ? 900 : 2200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const palette = [new THREE.Color("#818cf8"), new THREE.Color("#22d3ee"), new THREE.Color("#e2e8f0")];
    for (let i = 0; i < starCount; i++) {
      const anchor = curve.getPoint(Math.random());
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 22;
      starPositions[i * 3] = anchor.x + Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = anchor.y + Math.sin(angle) * radius * 0.7;
      starPositions[i * 3 + 2] = anchor.z + (Math.random() - 0.5) * SPACING;
      const tint = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = tint.r;
      starColors[i * 3 + 1] = tint.g;
      starColors[i * 3 + 2] = tint.b;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(stars);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let wide = true;
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / Math.max(1, clientHeight);
      camera.updateProjectionMatrix();
      wide = clientWidth >= 1024;
    };

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(mount);

    const clock = new THREE.Clock();
    const position = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const smoothPointer = { x: 0, y: 0 };
    let current = 0;
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const progress = progressRef.current ?? 0;
      const target = THREE.MathUtils.clamp((progress * COUNT - 0.5) / (COUNT - 1), 0, 1);
      current += (target - current) * (reduceMotion ? 1 : Math.min(1, delta * 3.5));

      curve.getPoint(current, position);
      curve.getTangent(current, tangent);

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.05;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.05;

      camera.position.copy(position).addScaledVector(tangent, -CAMERA_DISTANCE);
      camera.position.y += 1.1 - smoothPointer.y * 0.4;
      camera.position.x += smoothPointer.x * 0.6;
      camera.lookAt(position);
      // Push the stage off-centre so it doesn't sit behind the text.
      if (wide) camera.translateX(-2.4);
      else camera.translateY(-1.3);

      travelledGeometry.setDrawRange(0, Math.floor(current * segments) + 1);

      const activeIndex = Math.round(current * (COUNT - 1));
      markers.forEach((marker, i) => {
        const isActive = i === activeIndex;
        const scale = THREE.MathUtils.lerp(marker.group.scale.x, isActive ? 1.45 : 0.8, 0.08);
        marker.group.scale.setScalar(scale);
        const haloMaterial = marker.halo.material as THREE.SpriteMaterial;
        haloMaterial.opacity = THREE.MathUtils.lerp(haloMaterial.opacity, isActive ? 0.95 : 0.22, 0.08);
        if (!reduceMotion) {
          marker.shell.rotation.x += delta * 0.25;
          marker.shell.rotation.y += delta * 0.35;
          marker.ring.rotation.z += delta * 0.2;
        }
      });

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });
      glow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progressRef]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
};
