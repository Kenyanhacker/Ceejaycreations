import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, PhoneCall, LayoutGrid, Mail, ArrowDownRight } from "lucide-react";
import { CONTACT_EMAIL } from "../config/site.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

const BOOT_LINES = [
  "$ initializing ceejay_creations/agency.sys",
  "> loading modules: react, node, postgres, cv-pipeline...",
  "> compiling discovery_call.exe ......... done",
  "> status: accepting new projects [ 3 slots open ]",
];

function BootLog() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) return;
    const current = BOOT_LINES[lineIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 400);
    return () => clearTimeout(t);
  }, [charIndex, lineIndex]);

  return (
    <div className="rounded-xl border border-ink-border bg-black/40 px-5 py-4 font-mono text-[13px] leading-relaxed text-signal/90 shadow-inner min-h-[132px]">
      {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
        <div key={i} className={line.startsWith(">") ? "text-paper-muted" : "text-signal"}>
          {line}
        </div>
      ))}
      {lineIndex < BOOT_LINES.length && (
        <div className={BOOT_LINES[lineIndex].startsWith(">") ? "text-paper-muted" : "text-signal"}>
          {BOOT_LINES[lineIndex].slice(0, charIndex)}
          <span className="caret text-signal" />
        </div>
      )}
    </div>
  );
}

const BUTTON_IMAGES = {
  // Request webp format and reasonable width for faster loads — consider hosting resized images in your CDN for best Core Web Vitals.
  coding:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60&fm=webp",
  phoneline:
    "https://images.unsplash.com/photo-1691039923133-2ce1a7da85c9?auto=format&fit=crop&w=800&q=60&fm=webp",
  gallery:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=60&fm=webp",
};

export default function Hero({ onOpenHire, onOpenBooking }) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 sm:pt-40"
    >
      {/* Ambient background grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
        <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-signal/10 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-[380px] w-[380px] rounded-full bg-pulse/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="caret inline-block font-mono text-sm font-semibold uppercase tracking-widest text-signal"
          >
            &gt; whoami
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            We build the
            <br />
            <span className="bg-gradient-to-r from-signal to-pulse bg-clip-text text-transparent">
              systems
            </span>{" "}
            your business runs on.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-paper-muted"
          >
            Ceejay Creations is a full-stack software studio — web apps,
            internal tools, and computer-vision systems designed, built, and
            supported by engineers who ship. From first call to production
            deploy, in weeks, not quarters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button onClick={onOpenHire} className="hero-btn group">
              <img src={BUTTON_IMAGES.coding} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="btn-overlay" aria-hidden="true" />
              <span className="btn-content flex items-center gap-2">
                <Code2 size={16} className="transition-transform duration-300 group-hover:scale-110" /> Hire Us
              </span>
            </button>
            <button onClick={onOpenBooking} className="hero-btn group">
              <img src={BUTTON_IMAGES.phoneline} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="btn-overlay" aria-hidden="true" />
              <span className="btn-content flex items-center gap-2">
                <PhoneCall size={16} className="transition-transform duration-300 group-hover:scale-110" /> Book a Discovery Call
              </span>
            </button>
            <a href="#projects" className="hero-btn group">
              <img src={BUTTON_IMAGES.gallery} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="btn-overlay" aria-hidden="true" />
              <span className="btn-content flex items-center gap-2">
                <LayoutGrid size={16} className="transition-transform duration-300 group-hover:scale-110" /> View Systems
              </span>
            </a>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-paper-muted transition-colors hover:text-signal"
          >
            <Mail size={14} /> {CONTACT_EMAIL}
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          <div className="rounded-2xl border border-ink-border bg-ink-surface/60 p-2 shadow-card backdrop-blur">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[11px] text-paper-faint">terminal — ceejay_creations</span>
            </div>
            <BootLog />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-ink-border bg-ink-surface/60 px-5 py-4 backdrop-blur">
            <div>
              <p className="font-mono text-2xl font-bold text-signal">99.9%</p>
              <p className="text-xs text-paper-muted">Uptime guarantee</p>
            </div>
            <div className="h-8 w-px bg-ink-border" />
            <div>
              <p className="font-mono text-2xl font-bold text-pulse">30d</p>
              <p className="text-xs text-paper-muted">Bug-fix warranty</p>
            </div>
            <div className="h-8 w-px bg-ink-border" />
            <div>
              <p className="font-mono text-2xl font-bold text-signal">4.9★</p>
              <p className="text-xs text-paper-muted">Avg. client rating</p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-1 font-mono text-xs text-paper-faint hover:text-signal sm:flex"
      >
        scroll <ArrowDownRight size={13} />
      </a>
    </section>
  );
}
