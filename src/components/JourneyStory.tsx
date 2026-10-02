"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { JOURNEY } from "@/data/journeyData";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const JourneyStory: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-slate-100">
      <Drift reduceMotion={!!reduceMotion} />

      <motion.div
        style={{ scaleX: reduceMotion ? 1 : progress }}
        className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 z-50"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to portfolio</span>
        </Link>

        <div className="mt-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <span>My journey</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            How I got here
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            I didn&apos;t come from a technical background. I studied commerce and expected to work
            in banking. This is the whole route from there to building payments and streaming for a
            platform used by 30K+ people.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/60 via-cyan-500/40 to-transparent" />

          <div className="space-y-14">
            {JOURNEY.map((chapter, idx) => (
              <motion.section
                key={chapter.label}
                initial={reduceMotion ? false : { opacity: 0.6, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-cyan-400/70 bg-[#090a0f]" />
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  {String(idx + 1).padStart(2, "0")} · {chapter.label}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
                  {chapter.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
                  {chapter.body}
                </p>
                {chapter.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {chapter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>

        <div className="mt-20 p-7 rounded-3xl bg-[#0e1424]/90 border border-slate-800 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white">
            If you&apos;re starting from outside tech
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mt-2">
            The part that mattered wasn&apos;t talent or the right degree. It was getting to a real
            codebase and staying there long enough to understand it. Everything after that was just
            the next thing to learn.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href="/#projects"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm transition"
            >
              <span>See what I build</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-200 text-sm font-medium transition"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Say hello</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

const Drift: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const dots: { x: number; y: number; r: number; speed: number; hue: string }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots.length = 0;
      const count = Math.min(70, Math.round(width / 18));
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.4,
          speed: Math.random() * 0.25 + 0.05,
          hue: Math.random() > 0.5 ? "99, 102, 241" : "6, 182, 212"
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.hue}, 0.5)`;
        ctx.fill();
        dot.y -= dot.speed;
        if (dot.y < -5) {
          dot.y = height + 5;
          dot.x = Math.random() * width;
        }
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    seed();
    if (reduceMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.hue}, 0.4)`;
        ctx.fill();
      }
    } else {
      draw();
    }

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090a0f]" aria-hidden="true">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />
    </div>
  );
};
