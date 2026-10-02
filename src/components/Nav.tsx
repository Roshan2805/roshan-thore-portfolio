"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export function Nav() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[84rem] items-center justify-between px-5 sm:px-10">
        <a href="#overview" className="font-display text-lg tracking-tight" onClick={() => setOpen(false)}>
          Roshan Thore
        </a>

        <nav aria-label="Sections" className="hidden gap-7 lg:flex">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`label transition-colors ${active === id ? "text-ink" : "text-mute hover:text-ink"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="label lg:hidden"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="menu" aria-label="Sections" className="border-t border-rule bg-paper px-5 pb-6 sm:px-10 lg:hidden">
          {links.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-rule py-3 font-display text-2xl"
            >
              <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
