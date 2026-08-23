"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Clock } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(new Date());
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#07090f] py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-bold text-sm text-white font-sans">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-cyan-400">/</span>
              <span className="text-slate-400 text-xs">Frontend Developer</span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Building modern web applications with React.js, Next.js, and TypeScript.
            </p>
          </div>

          {/* Live Mumbai Clock */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px]" suppressHydrationWarning>
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mumbai, IN:</span>
            <span className="text-emerald-400 font-bold" suppressHydrationWarning>{time || "Loading..."}</span>
            <span className="text-slate-600">(IST)</span>
          </div>

          {/* Back to top CTA */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition group border border-slate-700/60"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center space-x-1">
            <span>Engineered with</span>
            <span className="text-indigo-400 font-mono">Next.js 14</span>
            <span>·</span>
            <span className="text-cyan-400 font-mono">TypeScript</span>
            <span>·</span>
            <span className="text-emerald-400 font-mono">Tailwind CSS</span>
            <span>·</span>
            <span className="text-pink-400 font-mono">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
