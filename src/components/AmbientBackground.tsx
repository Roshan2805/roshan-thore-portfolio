"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AmbientBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#090a0f]" suppressHydrationWarning>
      {/* Dynamic Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Radial Gradient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#090a0f]/60 to-[#090a0f]" />

      {/* Interactive Mouse Spotlight Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)"
        }}
      />

      {/* Ambient Floating Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[150px]" />
    </div>
  );
};
