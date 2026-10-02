"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const Snapshot: React.FC = () => {
  const statItems = [
    {
      label: "Experience",
      value: "3.5+ Years",
      sub: "Intern to SDE at INK IN CAPS",
      color: "text-white"
    },
    {
      label: "Transactions a Year",
      value: "45K+",
      sub: "Through the checkout I own",
      color: "text-cyan-300"
    },
    {
      label: "Platform Users",
      value: "30K+",
      sub: "On KNKY, a creator platform",
      color: "text-cyan-300"
    },
    {
      label: "Developers Mentored",
      value: "2",
      sub: "Through their first releases",
      color: "text-white"
    }
  ];

  return (
    <section id="snapshot" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                <span>Where that leads</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                What I do today
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
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
                      30K+ users · 45K+ txns/yr · 20K+ stories/mo
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
                      Checkout &amp; Subscriptions
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
