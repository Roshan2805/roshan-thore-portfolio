"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  MapPin, 
  Layers, 
  Play
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { fireConfetti } from "@/lib/confetti";

export const Hero: React.FC = () => {
  const handleConfetti = () => {
    fireConfetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const statItems = [
    {
      label: "Experience",
      value: "3.5+ Years",
      sub: "Intern to SDE at INK IN CAPS",
      color: "text-indigo-400"
    },
    {
      label: "Platform Users",
      value: "30K+",
      sub: "On KNKY, where I own payments",
      color: "text-cyan-400"
    },
    {
      label: "Products Shipped",
      value: "4",
      sub: "Consumer, admin, B2B & 3D web",
      color: "text-emerald-400"
    },
    {
      label: "Developers Mentored",
      value: "2",
      sub: "Through their first releases",
      color: "text-pink-400"
    }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-mono backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium">Open to Opportunities</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 text-xs font-mono">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Mumbai / Nashik, India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              <div className="h-9 sm:h-10 flex items-center">
                <span className="sr-only">{PERSONAL_INFO.title}</span>
                <Typewriter roles={PERSONAL_INFO.roles} />
                <span aria-hidden="true" className="inline-block w-2.5 h-6 sm:h-8 ml-1 bg-cyan-400 animate-pulse" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              Frontend engineer with <strong className="text-white font-semibold">3.5+ years</strong> at INK IN CAPS, from intern to SDE. I work on <span className="text-cyan-400 font-medium">KNKY</span>, a creator monetization platform with <span className="text-cyan-400 font-mono font-medium">30K+ users</span>, where I own payments and subscriptions. I&apos;m also the only frontend engineer on its admin console, and I mentor junior developers on the team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all transform hover:-translate-y-0.5 group"
              >
                <Layers className="w-4 h-4 text-cyan-200" />
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#simulators"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-200 font-medium text-sm transition hover:border-slate-600"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Try the Demos</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Roshan-Thore-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConfetti}
                className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-medium transition"
              >
                <FileDown className="w-4 h-4 text-indigo-400" />
                <span>Resume (PDF)</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-4 pt-2 text-slate-400 text-xs font-mono"
            >
              <span className="text-slate-400">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-white transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-indigo-400 transition"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center space-x-1.5 hover:text-cyan-400 transition"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse" />

              <div className="relative rounded-3xl bg-[#0e1322]/90 border border-slate-700/80 p-6 backdrop-blur-2xl shadow-2xl space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20 flex-shrink-0 bg-slate-800">
                    <Image
                      src={PERSONAL_INFO.avatar}
                      alt={PERSONAL_INFO.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-base font-bold text-white truncate">
                        {PERSONAL_INFO.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      Software Development Engineer
                    </p>
                    <div className="mt-1 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[11px] font-mono text-emerald-400">
                        INK IN CAPS
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#090b11] border border-slate-800 p-3 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      <span className="ml-1 text-slate-400">engineer-profile.sh</span>
                    </div>
                    <span className="text-indigo-400">status: active</span>
                  </div>

                  <div className="text-[11px] leading-relaxed pt-1">
                    <p className="text-slate-400">
                      $ <span className="text-cyan-300">stack</span> --top
                    </p>
                    <p className="text-indigo-300">
                      React 18 · Next.js 14 · TypeScript · Tailwind · HLS.js
                    </p>
                    <p className="text-slate-400 pt-1">
                      $ <span className="text-cyan-300">metrics</span> --live
                    </p>
                    <p className="text-emerald-400">
                      30K+ users · payments owner · 2 devs mentored
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Core Framework
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      Next.js 14 App Router
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Video &amp; Live
                    </div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5">
                      HLS.js + LiveKit
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Virtualization
                    </div>
                    <div className="text-xs font-bold text-indigo-300 mt-0.5">
                      TanStack Virtual
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Payments
                    </div>
                    <div className="text-xs font-bold text-emerald-300 mt-0.5">
                      Multi-Gateway Checkout
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statItems.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/30 backdrop-blur-md transition-all hover:bg-slate-900/80 group"
            >
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${stat.color} tracking-tight group-hover:scale-105 transition-transform origin-left`}>
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Typewriter: React.FC<{ roles: string[] }> = ({ roles }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const currentRole = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTypingSpeed(1800); // Pause at end
          setIsDeleting(true);
        } else {
          setTypingSpeed(60);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(30);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles, typingSpeed, reduceMotion]);

  return (
    <span
      aria-hidden="true"
      suppressHydrationWarning
      className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400"
    >
      {reduceMotion ? roles[0] : displayedText}
    </span>
  );
};
