"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string;
  badge?: string;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const lineCounterRef = useRef(3);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "Roshan Thore Interactive Portfolio CLI [Version 3.4.0]"
    },
    {
      id: "init-2",
      type: "system",
      text: "Type 'help' to view available commands or click quick action pills below."
    }
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lines.length > 2 && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const getNextId = (prefix: string) => {
    lineCounterRef.current += 1;
    return `${prefix}-${lineCounterRef.current}`;
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);

    const inputId = getNextId("in");
    const outputId = getNextId("out");
    const errorId = getNextId("err");

    const newLines: TerminalLine[] = [
      ...lines,
      { id: inputId, type: "input", text: cmd }
    ];

    switch (trimmed) {
      case "help":
        newLines.push({
          id: outputId,
          type: "output",
          text: `Available commands:
  • skills       - View core frontend, state & media tech stack
  • projects     - List key applications (Streaming, Admin, Agency, 3D Web)
  • stats        - View production metrics & experience summary
  • contact      - Get email, phone & social profiles
  • resume       - Download PDF resume
  • about        - Print engineer summary & bio
  • sudo hire    - Fast-track interview / direct outreach (Easter Egg 🎉)
  • clear        - Clear terminal screen`
        });
        break;

      case "skills":
        newLines.push({
          id: outputId,
          type: "output",
          text: `Core Tech Stack:
  [Frontend]  React.js, Next.js 14 (App Router), TypeScript, JavaScript (ES6+), Vite, Angular
  [State]     Redux Toolkit, TanStack Query, TanStack Table, TanStack Virtual
  [Media]     HLS.js (Adaptive Video), LiveKit WebRTC, Socket.IO, Uppy/tus S3
  [UI/UX]     Tailwind CSS, Framer Motion, Radix UI, Material UI, SCSS
  [Backend]   Node.js, Express.js, MongoDB, RESTful APIs, 2FA/Auth`
        });
        break;

      case "projects":
        newLines.push({
          id: outputId,
          type: "output",
          text: `Key Applications:
  1. Creator Streaming Platform -> Next.js 14, HLS.js, LiveKit, 30K+ Active Users
  2. Enterprise Admin Console   -> Vite SPA, Granular RBAC, Unbounded CSV, Material UI
  3. B2B Agency & Talent Portal -> Vite, Radix UI, Multi-tenant Talent Mgmt, Shop module
  4. Real-Time 3D Web Engine    -> Angular + Unity 3D runtime bridge, WebRTC live video`
        });
        break;

      case "stats":
        newLines.push({
          id: outputId,
          type: "output",
          text: `Production Metrics:
  • Experience       : 3.5+ Years of Continuous Web Delivery
  • Active Users     : 30,000+ Active Users across platform
  • Systems Shipped  : 3+ Enterprise Web Platforms
  • Performance      : 95+ Lighthouse Score / Sub-second TTFB
  • Availability     : 99.9% Production Uptime`
        });
        break;

      case "contact":
        newLines.push({
          id: outputId,
          type: "output",
          text: `Let's Connect:
  • Email    : ${PERSONAL_INFO.email}
  • Phone    : ${PERSONAL_INFO.phone}
  • LinkedIn : ${PERSONAL_INFO.linkedin}
  • GitHub   : ${PERSONAL_INFO.github}
  • Location : ${PERSONAL_INFO.location}`
        });
        break;

      case "resume":
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        newLines.push({
          id: outputId,
          type: "output",
          text: `Opening Roshan-Thore-Resume.pdf in new tab...`
        });
        break;

      case "about":
        newLines.push({
          id: outputId,
          type: "output",
          text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}
${PERSONAL_INFO.bio}`
        });
        break;

      case "sudo hire":
      case "hire":
        fireConfetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        newLines.push({
          id: outputId,
          type: "output",
          text: `🚀 ACCESS GRANTED!
Thank you for your interest! Roshan is open to Frontend and Full-Stack opportunities.
Send an email to ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.phone} to connect!`
        });
        break;

      case "clear":
        setLines([]);
        setInputVal("");
        return;

      default:
        newLines.push({
          id: errorId,
          type: "error",
          text: `command not found: "${trimmed}". Type "help" for a list of available commands.`
        });
        break;
    }

    setLines(newLines);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIdx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== null) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIndex(null);
          setInputVal("");
        }
      }
    }
  };

  const quickPills = ["help", "skills", "projects", "stats", "contact", "sudo hire"];

  return (
    <section id="terminal" className="py-20 bg-[#090a0f] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-2xl overflow-hidden font-mono">
          <div className="px-4 py-3 bg-[#111624] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-semibold">
                roshan@mac: ~/portfolio-cli
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">zsh · interactive</span>
            </div>
          </div>

          <div className="px-4 py-2 bg-[#0d1220] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 text-[11px]">Quick commands:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleCommand(pill)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-indigo-600/30 hover:border-indigo-500/40 border border-slate-700/60 text-cyan-300 text-[11px] transition whitespace-nowrap cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          <div
            ref={terminalBodyRef}
            className="p-5 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3 text-xs leading-relaxed"
          >
            {lines.map((line) => {
              if (line.type === "system") {
                return (
                  <div key={line.id} className="text-slate-400">
                    {line.text}
                  </div>
                );
              }
              if (line.type === "input") {
                return (
                  <div key={line.id} className="flex items-center space-x-2 text-slate-200">
                    <span className="text-cyan-400 font-bold">roshan@mac:~$</span>
                    <span className="text-white">{line.text}</span>
                  </div>
                );
              }
              if (line.type === "error") {
                return (
                  <div key={line.id} className="text-rose-400 whitespace-pre-line pl-4">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={line.id} className="text-emerald-300/90 whitespace-pre-line pl-4 font-normal">
                  {line.text}
                </div>
              );
            })}

            <div className="flex items-center space-x-2 pt-1">
              <span className="text-cyan-400 font-bold flex-shrink-0">roshan@mac:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                aria-label="Terminal command"
                className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
