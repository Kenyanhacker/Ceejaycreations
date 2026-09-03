import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Mail } from "lucide-react";
import SEO from "../components/SEO.jsx";
import { CONTACT_EMAIL } from "../config/site.js";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <SEO title="404 — Page Not Found | Ceejay Creations" path="/404" />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[130px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-2xl border border-ink-border bg-ink-surface/60 p-10 text-center backdrop-blur"
      >
        <p className="caret inline-block font-mono text-sm font-semibold uppercase tracking-widest text-signal">
          &gt; error 404
        </p>
        <h1 className="mt-4 font-display text-6xl font-bold text-white">404</h1>
        <p className="mt-3 font-mono text-sm text-paper-muted">
          $ route not found: this path doesn't resolve to a page.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-paper-muted">
          The page you're looking for may have moved or never existed.
          Head back home, or reach out if you think this is a mistake.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-signal to-pulse px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            <Home size={15} /> Back to Home
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-signal/50"
          >
            <Mail size={15} /> Contact Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
