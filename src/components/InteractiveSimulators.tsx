"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Layers, 
  Sparkles, 
  Activity, 
  Cpu, 
  EyeOff, 
  CheckCircle2, 
  Sliders
} from "lucide-react";
import dynamic from "next/dynamic";

// Pulls in TanStack Virtual, so only load it when the tab is opened.
const VirtualizationBenchmark = dynamic(
  () => import("@/components/VirtualizationBenchmark").then((mod) => mod.VirtualizationBenchmark),
  { ssr: false, loading: () => <div className="h-[520px]" /> }
);

export const InteractiveSimulators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"hls" | "stories" | "virtualization">("hls");

  // --- HLS Simulator State ---
  const [networkSpeed, setNetworkSpeed] = useState<number>(8.5); // Mbps
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [bufferSeconds, setBufferSeconds] = useState<number>(14.2);

  // Compute adaptive quality based on network speed
  const getHlsQuality = (mbps: number) => {
    if (mbps >= 15) return { res: "1080p (60fps)", bitrate: "6,200 kbps", label: "Ultra HD", color: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    if (mbps >= 6) return { res: "1080p", bitrate: "4,500 kbps", label: "Full HD", color: "text-cyan-400", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
    if (mbps >= 2.5) return { res: "720p", bitrate: "2,200 kbps", label: "High Def", color: "text-indigo-400", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" };
    if (mbps >= 1.0) return { res: "480p", bitrate: "900 kbps", label: "Standard", color: "text-amber-400", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
    return { res: "360p (Low Bandwidth)", bitrate: "450 kbps", label: "Adaptive Fallback", color: "text-rose-400", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
  };

  const currentQuality = getHlsQuality(networkSpeed);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBufferSeconds((prev) => {
        const delta = (networkSpeed > 3 ? 0.3 : -0.2);
        return Math.min(30, Math.max(1, +(prev + delta).toFixed(1)));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, networkSpeed]);

  // --- 3D Story Simulator State ---
  const stories = [
    { id: 1, title: "Creator Exclusive Backstage Pass", author: "@elena_creator", time: "2h ago", nsfw: false, color: "from-indigo-600 to-purple-800" },
    { id: 2, title: "VIP Studio Live Stream Preview", author: "@marcus_live", time: "4h ago", nsfw: true, color: "from-cyan-600 to-blue-900" },
    { id: 3, title: "World Cup Watch Party Highlights", author: "@sports_official", time: "6h ago", nsfw: false, color: "from-emerald-600 to-teal-900" }
  ];
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [nsfwRevealed, setNsfwRevealed] = useState(false);
  const [storyComments, setStoryComments] = useState<string[]>([
    "Awesome stream! 🚀",
    "How did you achieve that 3D effect?"
  ]);
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    if (activeTab !== "stories" || isStoryPaused) return;
    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          setCurrentStoryIdx((curr) => (curr + 1) % stories.length);
          setNsfwRevealed(false);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [activeTab, isStoryPaused, stories.length]);

  const nextStory = () => {
    setCurrentStoryIdx((prev) => (prev + 1) % stories.length);
    setStoryProgress(0);
    setNsfwRevealed(false);
  };

  const prevStory = () => {
    setCurrentStoryIdx((prev) => (prev - 1 + stories.length) % stories.length);
    setStoryProgress(0);
    setNsfwRevealed(false);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;
    setStoryComments([...storyComments, inputComment.trim()]);
    setInputComment("");
  };

  return (
    <section id="simulators" className="py-24 bg-[#0a0d16] border-y border-slate-800/80 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Architecture Playground</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Playground
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Small interactive versions of features I&apos;ve shipped. The virtualization benchmark runs for real in your browser; the streaming and stories demos are simulated.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0e1322] border border-slate-800 shadow-xl gap-1">
            <button
              onClick={() => setActiveTab("hls")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "hls"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Adaptive HLS Stream</span>
            </button>

            <button
              onClick={() => setActiveTab("stories")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "stories"
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Story Viewer</span>
            </button>

            <button
              onClick={() => setActiveTab("virtualization")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "virtualization"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Virtualization Benchmark</span>
            </button>
          </div>
        </div>

        {/* Simulator Display Card */}
        <div className="mt-8 rounded-3xl bg-[#0e1424] border border-slate-800/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          {/* SIMULATOR 1: HLS ADAPTIVE BITRATE */}
          {activeTab === "hls" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Player Visualizer */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-5">
                  {/* Stream Watermark / Top status */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        HLS Stream · Simulated
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${currentQuality.badge}`}>
                      {currentQuality.res} · {currentQuality.bitrate}
                    </span>
                  </div>

                  {/* Animated Video Simulation Content */}
                  <div className="my-auto text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-cyan-300 animate-pulse">
                      {isPlaying ? <Activity className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Adaptive bitrate switching
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Chunk Duration: 2.0s · Dynamic `hls.js` Loader
                    </div>
                  </div>

                  {/* Player Bottom HUD */}
                  <div className="space-y-2 z-10 bg-slate-900/80 p-3 rounded-xl backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          aria-label={isPlaying ? "Pause stream" : "Play stream"}
                          className="hover:text-cyan-400 transition"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span>Buffer: <strong className="text-cyan-300">{bufferSeconds}s</strong></span>
                      </div>
                      <span className="text-slate-400">{currentQuality.label}</span>
                    </div>

                    {/* Buffer Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (bufferSeconds / 30) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Bandwidth Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>Network Bandwidth Control</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Drag the slider to change the simulated connection speed and see which rendition an adaptive player would switch to.
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2 p-4 rounded-2xl bg-[#12192c] border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Simulated Bandwidth</span>
                    <span className="text-cyan-300 font-bold text-sm">{networkSpeed} Mbps</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Simulated bandwidth"
                    min="0.3"
                    max="25"
                    step="0.1"
                    value={networkSpeed}
                    onChange={(e) => setNetworkSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span>2G (300 Kbps)</span>
                    <span>3G (2 Mbps)</span>
                    <span>4G (8 Mbps)</span>
                    <span>Fiber (25 Mbps)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Slow 3G", speed: 0.8 },
                    { label: "Normal 4G", speed: 6.5 },
                    { label: "Fast WiFi", speed: 18.0 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setNetworkSpeed(preset.speed)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 transition"
                    >
                      {preset.label} ({preset.speed} Mbps)
                    </button>
                  ))}
                </div>

                {/* Technical Insight Pill */}
                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-world Production Implementation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dynamically imported `hls.js` only when video content is in viewport, reducing initial JS payload by 120KB and optimizing playback across mobile devices.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: 3D STORIES VIEWER */}
          {activeTab === "stories" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Mobile Story Viewport */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] h-[480px] rounded-[36px] bg-slate-950 border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between p-4 group select-none">
                  {/* Background Story Color */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${stories[currentStoryIdx].color} transition-colors duration-500`} />

                  {/* NSFW Blur Overlay if active */}
                  {stories[currentStoryIdx].nsfw && !nsfwRevealed && (
                    <div className="absolute inset-0 backdrop-blur-2xl bg-black/60 z-20 flex flex-col items-center justify-center p-4 text-center">
                      <EyeOff className="w-8 h-8 text-rose-400 mb-2" />
                      <div className="text-xs font-bold text-white">Sensitive / NSFW Content</div>
                      <p className="text-[10px] text-slate-400 mt-1">Gated creator content</p>
                      <button
                        onClick={() => setNsfwRevealed(true)}
                        className="mt-3 px-3 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white text-[10px] font-bold transition"
                      >
                        Tap to Reveal
                      </button>
                    </div>
                  )}

                  {/* Story Progress Indicators */}
                  <div className="relative z-30 flex space-x-1 pt-1">
                    {stories.map((s, i) => (
                      <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-100"
                          style={{
                            width:
                              i < currentStoryIdx
                                ? "100%"
                                : i === currentStoryIdx
                                ? `${storyProgress}%`
                                : "0%"
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Story Header */}
                  <div className="relative z-30 flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-bold text-white">
                        {stories[currentStoryIdx].author[1].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {stories[currentStoryIdx].author}
                        </div>
                        <div className="text-[9px] text-white/70">
                          {stories[currentStoryIdx].time}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsStoryPaused(!isStoryPaused)}
                      aria-label={isStoryPaused ? "Resume story" : "Pause story"}
                      className="p-1 rounded-full bg-black/40 text-white/80 hover:text-white"
                    >
                      {isStoryPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Story Mid Body Content */}
                  <div className="relative z-30 my-auto text-center px-3">
                    <div className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white">
                      <p className="text-xs font-bold leading-snug">
                        {stories[currentStoryIdx].title}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Left/Right Tap Zones */}
                  <div
                    aria-hidden="true"
                    onClick={prevStory}
                    className="absolute left-0 top-16 bottom-16 w-1/3 z-20 cursor-pointer"
                  />
                  <div
                    aria-hidden="true"
                    onClick={nextStory}
                    className="absolute right-0 top-16 bottom-16 w-1/3 z-20 cursor-pointer"
                  />

                  {/* Story Bottom Comments */}
                  <div className="relative z-30 space-y-2">
                    <form onSubmit={addComment} className="flex gap-1.5">
                      <input
                        type="text"
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                        placeholder="Send message..."
                        aria-label="Send message"
                        className="w-full bg-black/50 border border-white/20 rounded-full px-3 py-1.5 text-[11px] text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                      />
                    </form>
                  </div>
                </div>
              </div>

              {/* Right: Architecture & Features Explanation */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>3D Cube-Face Stories Subsystem</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    A simplified mock of the stories viewer. Tap the left or right side of the phone to switch stories, pause with the button, or reveal gated content.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#12192c] border border-slate-800">
                    <div className="text-xs font-bold text-white">Gesture Navigation</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Smooth touch swipes and drag-to-dismiss physics built with `@use-gesture/react` and Framer Motion.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#12192c] border border-slate-800">
                    <div className="text-xs font-bold text-white">Seen-State Caching</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Seen flags are cached in IndexedDB via LocalForage, so viewed stories stay marked between visits.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#12192c] border border-slate-800">
                    <div className="text-xs font-bold text-white">NSFW Gating Engine</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Granular creator age-restrictions and blur filters rendered before media buffer initialization.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#12192c] border border-slate-800">
                    <div className="text-xs font-bold text-white">Vault-Sourced Creation</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Allows creators to select directly from their media vault with automatic transcoding and cropping.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevStory}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition"
                  >
                    ← Previous Story
                  </button>
                  <button
                    onClick={nextStory}
                    className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition"
                  >
                    Next Story →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "virtualization" && <VirtualizationBenchmark />}
        </div>
      </div>
    </section>
  );
};
