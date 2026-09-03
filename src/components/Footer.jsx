import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL } from "../config/site.js";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Systems", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-signal to-pulse font-display text-sm font-bold text-ink">
                CJ
              </div>
              <span className="font-display text-lg font-bold">Ceejay Creations</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-muted">
              Full-stack software, web systems, and computer-vision pipelines
              — designed, built, and supported by engineers who ship.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-signal hover:underline"
            >
              <Mail size={14} /> {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-paper-faint">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={`/${link.href}`} className="text-sm text-paper-muted transition-colors hover:text-signal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-paper-faint">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-paper-muted transition-colors hover:text-signal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 sm:flex-row">
          <p className="font-mono text-xs text-paper-faint">
            © {new Date().getFullYear()} Ceejay Creations. All rights reserved.
          </p>
          <p className="font-mono text-xs text-paper-faint">
            &gt; built with react + tailwind + framer-motion
          </p>
        </div>
      </div>
    </footer>
  );
}
