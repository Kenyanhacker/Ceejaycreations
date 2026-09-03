import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  LaptopMinimal,
  PenTool,
  Cog,
  Database,
  Network,
  Server,
} from "lucide-react";
import { trackEvent } from "../hooks/useGoogleAnalytics.js";
import { CONTACT_EMAIL, openEmail, openWhatsApp } from "../config/site.js";

const SERVICES = [
  { id: "fullstack", label: "Full-Stack Web App Development", icon: LaptopMinimal },
  { id: "design", label: "Website Design & UI/UX", icon: PenTool },
  { id: "software", label: "Custom Software & Script Engines", icon: Cog },
  { id: "database", label: "Database Schema & Architecture", icon: Database },
  { id: "api", label: "API Integration & Microservices", icon: Network },
  { id: "it", label: "IT Support & Network Setup", icon: Server },
];

export default function HireModal({ isOpen, onClose }) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", budget: "", scope: "", contactMethod: "whatsapp" });
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef(null);
  const csrfToken = typeof document !== "undefined" ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : null;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") handleClose();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll("button, a, input, textarea, select") ?? [];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  function toggleService(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function reset() {
    setStep(1);
    setSubmitted(false);
    setSelected(new Set());
    setForm({ name: "", email: "", budget: "", scope: "", contactMethod: "whatsapp" });
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function isValidEmail(address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};
    if (!form.name || form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (selected.size === 0) nextErrors.services = "Select at least one service.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.email) {
        setEmailError(nextErrors.email);
        document.getElementById("clientEmail")?.focus();
      }
      if (nextErrors.name) document.getElementById("clientName")?.focus();
      return;
    }

    setErrors({});
    setEmailError("");
    setIsSubmitting(true);

    trackEvent("hire_inquiry_submitted", {
      services: Array.from(selected).join(","),
      budget: form.budget,
    });

    const serviceNames = SERVICES
      .filter(({ id }) => selected.has(id))
      .map(({ label }) => label)
      .join(", ");
    const message = [
      "Ceejay Creations - New Hire Us inquiry",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Services: ${serviceNames}`,
      `Budget: ${form.budget || "Not specified"}`,
      `Project brief: ${form.scope || "Not provided"}`,
    ].join("\n");
    if (form.contactMethod === "email") {
      openEmail("Ceejay Creations - New Hire Us inquiry", message);
    } else {
      openWhatsApp(message);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Keep success visible longer so users can read it; also allow manual close
      setTimeout(handleClose, 7000);
    }, 700);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <button
            onClick={handleClose}
            aria-label="Close hire modal"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-transform hover:scale-105 sm:right-8 sm:top-8"
          >
            <X size={18} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-modal-title"
            tabIndex={-1}
            className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-surface shadow-card outline-none sm:flex-row"
          >
            {/* Sidebar */}
            <aside className="flex w-full shrink-0 flex-col justify-between border-b border-ink-border bg-ink-soft p-7 sm:w-72 sm:border-b-0 sm:border-r">
              <div>
                <div className="flex items-center gap-4">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      aria-label="Back to service selection"
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink-border text-signal"
                    >
                      <ArrowLeft size={15} />
                    </button>
                  )}
                  <div className="grid h-16 w-16 place-items-center rounded-xl bg-black p-2">
                    <div className="grid h-full w-full place-items-center rounded-full border-[3px] border-signal font-display text-lg font-bold text-signal">
                      CJ
                    </div>
                  </div>
                </div>

                <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-paper-faint">
                  Services
                </p>
                <h2 id="hire-modal-title" className="mt-1.5 font-display text-2xl font-bold text-white">Work with Ceejay</h2>
                <p className="mt-3 text-sm leading-relaxed text-paper-muted">
                  Select the service areas you need help with to tailor your project quote.
                </p>

                {step === 2 && (
                  <div className="mt-6 flex items-start gap-3 text-sm text-paper-muted">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-signal" />
                    <span>
                      {selected.size} service{selected.size !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4 sm:mt-0">
                <a href="/terms" className="text-xs font-semibold text-signal">Terms of Service</a>
                <a href="/privacy" className="text-xs font-semibold text-signal">Privacy Policy</a>
              </div>
            </aside>

            {/* Main panel */}
            <div className="max-h-[80vh] flex-1 overflow-y-auto scroll-thin p-7 sm:p-9">
              {submitted ? (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                  <CheckCheck size={40} className="text-signal" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">Message ready</h3>
                  <p className="mt-2 max-w-xs text-sm text-paper-muted">
                    Your Ceejay Creations details were added to a new {form.contactMethod === "email" ? "email" : "WhatsApp message"}. Complete the send step to reach us.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : step === 1 ? (
                <div>
                  <h3 className="font-display text-lg font-bold text-white">What services do you need from Ceejay?</h3>
                  <p className="mt-1.5 text-sm text-paper-muted">Select all that apply to your project:</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {SERVICES.map(({ id, label, icon: Icon }) => {
                      const active = selected.has(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleService(id)}
                          aria-pressed={active}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                            active
                              ? "border-signal bg-signal/10 text-white"
                              : "border-ink-border bg-ink-surface2 text-paper-muted hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <Icon size={18} className={active ? "text-signal" : "text-paper-faint"} />
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      disabled={selected.size === 0}
                      onClick={() => setStep(2)}
                      aria-disabled={selected.size === 0}
                      className="flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-sm font-bold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Project Scope & Contact Info</h3>
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                      {csrfToken && <input type="hidden" name="csrf_token" value={csrfToken} />}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="clientName" className="text-sm font-semibold text-white">Your Name *</label>
                      <input
                        id="clientName"
                        required
                        aria-required="true"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="clientEmail" className="text-sm font-semibold text-white">Email Address *</label>
                      <input
                        id="clientEmail"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "clientEmail-error" : undefined}
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                      {emailError && (
                        <p id="clientEmail-error" className="text-xs text-red-400 mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="projectBudget" className="text-sm font-semibold text-white">Estimated Budget</label>
                      <input
                        id="projectBudget"
                        type="text"
                        placeholder="e.g. $2,000 or flexible"
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                    </div>
                    <fieldset className="flex flex-col gap-2">
                      <legend className="text-sm font-semibold text-white">How should we contact you?</legend>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: `Email (${CONTACT_EMAIL})` }].map((option) => (
                          <label key={option.value} className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-colors ${form.contactMethod === option.value ? "border-signal bg-signal/10 text-signal" : "border-ink-border text-paper-muted hover:border-white/25 hover:text-white"}`}>
                            <input
                              type="radio"
                              name="hireContactMethod"
                              value={option.value}
                              checked={form.contactMethod === option.value}
                              onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                              className="sr-only"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="projectScope" className="text-sm font-semibold text-white">
                        Project Brief / Key Requirements
                      </label>
                      <textarea
                        id="projectScope"
                        rows={3}
                        placeholder="Tell us a bit about what you want to build..."
                        value={form.scope}
                        onChange={(e) => setForm({ ...form, scope: e.target.value })}
                        className="resize-y rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="self-start rounded-full bg-signal px-7 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Submit Project Inquiry"}
                    </button>
                    {errors.services && <p className="text-xs text-red-400 mt-2">{errors.services}</p>}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
