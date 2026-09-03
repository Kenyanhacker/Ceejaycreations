import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, MessageSquareQuote, HelpCircle, Send, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Systems", icon: Briefcase },
  { id: "reviews", label: "Reviews", icon: MessageSquareQuote },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export default function Navbar({ onOpenHire }) {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const linkRefs = useRef({});
  const menuRef = useRef(null);

  // Scrollspy: watch each section, mark the one most in view as active.
  useEffect(() => {
    // Prefer a center-of-viewport approach for scrollspy because it's more stable
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (sections.length === 0) return;

    function updateActive() {
      const centerY = window.innerHeight / 2 + window.scrollY;
      let best = null;
      let bestDist = Infinity;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + window.scrollY + rect.height / 2;
        const dist = Math.abs(elCenter - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          best = el;
        }
      });
      if (best && best.id !== active) setActive(best.id);
    }

    updateActive();
    const onScroll = () => requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  // Reposition the sliding pill whenever the active link changes or on resize.
  useEffect(() => {
    function updatePill() {
      const el = linkRefs.current[active];
      const parent = menuRef.current;
      if (!el || !parent) return;
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - parentRect.left,
        width: elRect.width,
        top: elRect.top - parentRect.top,
        height: elRect.height,
      });
    }
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [active]);

  function handleNavClick(id) {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-[9999] w-[calc(100%-2rem)] sm:w-auto">
        <nav className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl px-2.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-signal to-pulse font-display text-sm font-bold text-ink"
            aria-label="Ceejay Creations home"
          >
            CJ
          </a>

          {/* Desktop nav */}
          <ul ref={menuRef} className="relative hidden md:flex items-center gap-1 list-none">
            <motion.span
              layout
              className="absolute rounded-full bg-gradient-to-r from-signal/20 to-pulse/20 border border-signal/40"
              animate={pillStyle}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id} className="relative z-10">
                <a
                  ref={(el) => (linkRefs.current[id] = el)}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                  className={`group flex items-center px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active === id ? "text-signal" : "text-paper-muted hover:text-white"
                  }`}
                >
                  <Icon size={15} strokeWidth={2.25} />
                  <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={onOpenHire}
            className="ml-1 hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-signal to-pulse px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            <Send size={14} strokeWidth={2.5} />
            Hire Us
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden ml-auto grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={16} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-sm md:hidden rounded-2xl border border-white/10 bg-ink-surface/95 backdrop-blur-2xl p-3 shadow-card"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(id);
                    }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active === id ? "bg-signal/10 text-signal" : "text-paper-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenHire();
                  }}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-signal to-pulse px-4 py-3 text-sm font-semibold text-ink"
                >
                  <Send size={14} /> Hire Us
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
