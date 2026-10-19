"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Folio } from "./Folio";
import { Magnetic } from "./Magnetic";
import { MumbaiTime } from "./MumbaiTime";
import { ReplayJourney } from "./ReplayJourney";

const TOPICS = [
  { id: "fulltime", label: "Full-time role", subject: "Engineering Opportunity at [Company]" },
  { id: "scale", label: "High-scale frontend", subject: "Frontend Architecture & System Scaling" },
  { id: "advisory", label: "Contract / Advisory", subject: "Contract / Frontend Consulting Inquiry" },
  { id: "chat", label: "Say hello", subject: "Quick hello from portfolio" }
] as const;

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[number]["id"]>("fulltime");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {}
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {}
  };

  const currentTopic = TOPICS.find((t) => t.id === selectedTopic) ?? TOPICS[0];

  const buildMailto = () => {
    const subject = encodeURIComponent(currentTopic.subject);
    const bodyLines = [];
    if (senderMessage.trim()) {
      bodyLines.push(senderMessage.trim());
    } else {
      bodyLines.push(`Hi Roshan,\n\nI'd like to talk about ${currentTopic.label.toLowerCase()}...`);
    }
    if (senderName.trim() || senderEmail.trim()) {
      bodyLines.push("\n---");
      if (senderName.trim()) bodyLines.push(`From: ${senderName.trim()}`);
      if (senderEmail.trim()) bodyLines.push(`Email: ${senderEmail.trim()}`);
    }
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const copyDraft = async () => {
    try {
      const text = [
        `To: ${PERSONAL_INFO.email}`,
        `Subject: ${currentTopic.subject}`,
        "",
        senderMessage.trim() || `Hi Roshan,\n\nI'd like to discuss ${currentTopic.label.toLowerCase()} with you.`,
        ...(senderName.trim() ? [`\nFrom: ${senderName.trim()}`] : []),
        ...(senderEmail.trim() ? [`Email: ${senderEmail.trim()}`] : [])
      ].join("\n");

      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2400);
    } catch {}
  };

  return (
    <section id="contact" data-tone="ink" className="relative overflow-hidden bg-ink text-paper">
      {/* Subtle blueprint grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, #f1eee6 1px, transparent 1px), linear-gradient(to bottom, #f1eee6 1px, transparent 1px)",
          backgroundSize: "2.5rem 2.5rem"
        }}
      />

      <div className="relative mx-auto max-w-[96rem] px-5 pb-12 pt-20 sm:px-10 sm:pt-32">
        <Folio no="06" title="Contact" note="What's next" dark />

        {/* Live Availability & Time Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-paper/15 pb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-ember" />
            </span>
            <span className="label text-paper/90">Available for high-impact roles & select contracts</span>
          </div>

          <div className="label flex items-center gap-4 text-paper/60">
            <span>
              Mumbai · <MumbaiTime />
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Replies &lt; 24h</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="mt-14 max-w-5xl sm:mt-20">
          <h2 className="on-view font-display text-[clamp(2.8rem,8.5vw,7.8rem)] leading-[0.92] tracking-[-0.045em]">
            Let&apos;s build
            <br />
            <em className="text-ember">something ambitious.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70 sm:text-xl">
            Bigger systems. Harder frontend problems. More ownership. If you&apos;re scaling a product, untangling complex UI state, or building real-time web applications, let&apos;s connect.
          </p>
        </div>

        {/* Two-Column Grid: Left Dispatch Composer, Right Channels & Dossier */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Quick Dispatch Composer */}
          <div className="border border-paper/15 bg-paper/[0.03] p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-paper/15 pb-4">
              <div>
                <p className="label text-ember">Direct Inquiry</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight text-paper sm:text-3xl">Send a note</h3>
              </div>
              <span className="label text-paper/40">Quick dispatch</span>
            </div>

            {/* Topic Selector */}
            <div className="mt-6">
              <label className="label block text-paper/60">What are you looking to discuss?</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`cursor-pointer rounded-none border px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all ${
                      selectedTopic === topic.id
                        ? "border-ember bg-ember text-ink font-medium"
                        : "border-paper/20 bg-transparent text-paper/70 hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="label block text-paper/60">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-sm text-paper placeholder:text-paper/25 focus:border-ember focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="label block text-paper/60">
                    Your email / handle
                  </label>
                  <input
                    id="contact-email"
                    type="text"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="mt-2 w-full border-b border-paper/20 bg-transparent py-2 text-sm text-paper placeholder:text-paper/25 focus:border-ember focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="label block text-paper/60">
                  Message / Context
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder={`Hi Roshan, we have an exciting project and would love to chat...`}
                  className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent py-2 text-sm leading-relaxed text-paper placeholder:text-paper/25 focus:border-ember focus:outline-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href={buildMailto()}
                    data-cursor="SEND"
                    className="inline-flex items-center gap-2 bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ember"
                  >
                    <span>Launch email client</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>

                <button
                  type="button"
                  onClick={copyDraft}
                  data-cursor="COPY"
                  className="cursor-pointer border border-paper/20 px-4 py-3 font-mono text-xs uppercase tracking-wider text-paper/80 transition-colors hover:border-paper hover:text-paper"
                >
                  {copiedDraft ? "✓ Draft Copied" : "Copy Draft"}
                </button>
              </div>

              <div className="label text-paper/50">
                <span>Direct: </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cursor-pointer underline decoration-paper/30 underline-offset-4 hover:text-paper"
                >
                  {copiedEmail ? "Email Copied!" : "Copy Email"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Channels & Dossier Bento */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            {/* Direct Channels Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="group relative border border-paper/15 bg-paper/[0.03] p-5 transition-colors hover:border-paper/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label text-paper/50">Primary Channel</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      data-cursor="MAIL"
                      className="mt-1 block font-display text-xl tracking-tight text-paper transition-colors group-hover:text-ember sm:text-2xl"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    data-cursor="COPY"
                    className="label cursor-pointer border border-paper/20 px-2.5 py-1 text-paper/60 transition-colors hover:border-paper hover:text-paper"
                  >
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group relative border border-paper/15 bg-paper/[0.03] p-5 transition-colors hover:border-paper/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label text-paper/50">Direct Line & WhatsApp</p>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`}
                      data-cursor="CALL"
                      className="mt-1 block font-mono text-lg text-paper transition-colors group-hover:text-ember sm:text-xl"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label border border-paper/20 px-2.5 py-1 text-paper/60 transition-colors hover:border-paper hover:text-paper"
                    >
                      WhatsApp ↗
                    </a>
                    <button
                      type="button"
                      onClick={copyPhone}
                      className="label cursor-pointer border border-paper/20 px-2.5 py-1 text-paper/60 transition-colors hover:border-paper hover:text-paper"
                    >
                      {copiedPhone ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Profiles Row */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="group block border border-paper/15 bg-paper/[0.03] p-4 transition-colors hover:border-paper/40 hover:bg-paper/[0.06]"
                >
                  <p className="label text-paper/50">Network</p>
                  <p className="mt-1 font-display text-lg text-paper transition-colors group-hover:text-ember">LinkedIn ↗</p>
                  <p className="mt-2 text-xs text-paper/40">Work history & endorsements</p>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="group block border border-paper/15 bg-paper/[0.03] p-4 transition-colors hover:border-paper/40 hover:bg-paper/[0.06]"
                >
                  <p className="label text-paper/50">Code</p>
                  <p className="mt-1 font-display text-lg text-paper transition-colors group-hover:text-ember">GitHub ↗</p>
                  <p className="mt-2 text-xs text-paper/40">Repos, experiments & PRs</p>
                </a>
              </div>

              {/* Résumé Download Card */}
              <div className="border border-paper/15 bg-paper/[0.03] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="label text-paper/50">Curriculum Vitae</p>
                    <p className="mt-1 font-display text-lg text-paper">Roshan Thore — Résumé</p>
                    <p className="mt-1 font-mono text-xs text-paper/40">PDF · SDE · Updated 2026</p>
                  </div>
                  <Magnetic>
                    <a
                      href={PERSONAL_INFO.resumeUrl}
                      download
                      data-cursor="DOWNLOAD"
                      className="block whitespace-nowrap bg-ember px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-transform hover:opacity-90"
                    >
                      Download ↓
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>

            {/* Quick Principles Capsule */}
            <div className="border-t border-paper/15 pt-5 text-xs leading-relaxed text-paper/50">
              <span className="label block text-paper/40">Core focus</span>
              <p className="mt-2">
                High ownership frontend engineering · Resilient state & checkout architectures · Sub-60fps rendering & fluid interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Polished Editorial Footer */}
        <footer className="mt-24 border-t border-paper/20 pt-8 sm:mt-36">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-display text-xl text-paper">Roshan Thore</p>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Frontend Engineer · {PERSONAL_INFO.company} · {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="label flex flex-wrap items-center gap-x-8 gap-y-3 text-paper/70">
              <ReplayJourney className="cursor-pointer uppercase tracking-[inherit] transition-colors hover:text-ember">
                ↗ Replay story
              </ReplayJourney>
              <a href="#top" className="transition-colors hover:text-ember">
                Back to top ↑
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-paper/10 pt-4 text-xs text-paper/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Roshan Thore. All rights reserved.</p>
            <p className="font-mono">19.0760° N, 72.8777° E · Asia/Kolkata</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
