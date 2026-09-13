"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare,
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { fireConfetti } from "@/lib/confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState("");

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    const subject = formState.subject || `Inquiry from ${formState.name} via Portfolio`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    const mailtoUrl = `mailto:${encodeURIComponent(PERSONAL_INFO.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setLastMailtoUrl(mailtoUrl);

    setTimeout(() => {
      window.open(mailtoUrl, "_blank");
      setIsSubmitting(false);
      setIsSubmitted(true);

      fireConfetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hiring for a frontend role or want to talk about a project? Email is the quickest way to reach me.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-[#0e1424]/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Status: Available
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Open for Frontend &amp; Full-Stack Roles
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open to full-time Frontend Engineer and SDE roles.
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 text-xs font-mono text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#0e1424]/70 border border-slate-800 flex items-center justify-between group hover:border-indigo-500/40 transition">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Email</div>
                    <div className="text-xs font-semibold text-slate-200 truncate">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Open mail client"
                    aria-label="Open mail client"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                    title="Copy email"
                    aria-label="Copy email"
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1424]/70 border border-slate-800 flex items-center justify-between group hover:border-cyan-500/40 transition">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Phone</div>
                    <div className="text-xs font-semibold text-slate-200 font-mono">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Call directly"
                    aria-label="Call directly"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, "phone")}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-cyan-600 text-slate-300 hover:text-white transition"
                    title="Copy phone"
                    aria-label="Copy phone"
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0e1424]/70 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition flex items-center justify-center space-x-2 text-xs font-medium"
                >
                  <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0e1424]/70 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition flex items-center justify-center space-x-2 text-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-7 rounded-3xl bg-[#0e1424]/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                    <span>Send a Message</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Opens your email app with the message addressed to <strong className="text-slate-200">{PERSONAL_INFO.email}</strong>.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-gradient-to-b from-[#131b2e] to-[#0d1220] border border-indigo-500/40 text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <Check className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Your email app should be open</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      If it didn&apos;t open, use the button below or copy your message and send it to <strong className="text-cyan-300">{PERSONAL_INFO.email}</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {lastMailtoUrl && (
                      <a
                        href={lastMailtoUrl}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md transition flex items-center space-x-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Re-open Email App</span>
                      </a>
                    )}
                    
                    <button
                      onClick={() => copyToClipboard(formState.message, "messageText")}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white transition flex items-center space-x-1.5 border border-slate-700"
                    >
                      {copiedField === "messageText" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Message</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition flex items-center space-x-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Write Another</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">Your Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Frontend Engineer role at your company"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Roshan, I'd like to talk to you about..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Opening your email app...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
