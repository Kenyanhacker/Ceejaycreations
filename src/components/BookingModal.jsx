import { useEffect, useMemo, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  Clock,
  Video,
  CalendarCheck,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { trackEvent } from "../hooks/useGoogleAnalytics.js";
import { CONTACT_EMAIL, openEmail, openWhatsApp } from "../config/site.js";

const PRESET_SLOTS = ["09:00", "11:30", "14:00", "16:30", "18:30", "20:00", "22:15"];
const TIMEZONES = [
  "East Africa Time (EAT)",
  "Greenwich Mean Time (GMT)",
  "Central European Time (CET)",
  "Eastern Time (ET)",
  "Pacific Time (PT)",
  "India Standard Time (IST)",
];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatTime12h(time24) {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function buildCalendar(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  // Convert JS Sunday-first (0-6) to Monday-first (0-6)
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay(); // 0 = Sun, 6 = Sat
    const isPast = date < today;
    const isWeekend = dow === 0 || dow === 6;
    cells.push({ day: d, disabled: isPast || isWeekend, date });
  }
  return cells;
}

function getNextAvailableDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export default function BookingModal({ isOpen, onClose }) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [viewDate, setViewDate] = useState(getNextAvailableDate);
  const [selectedDate, setSelectedDate] = useState(getNextAvailableDate);
  const [selectedTime, setSelectedTime] = useState("18:30");
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", notes: "", contactMethod: "whatsapp" });
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

  const cells = useMemo(() => buildCalendar(viewDate), [viewDate]);

  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = MONTH_NAMES[selectedDate.getMonth()];

  function reset() {
    setStep(1);
    setConfirmed(false);
    const nextDate = getNextAvailableDate();
    setViewDate(nextDate);
    setSelectedDate(nextDate);
    setForm({ name: "", email: "", notes: "", contactMethod: "whatsapp" });
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function handleNext() {
    trackEvent("booking_step_2_view", { time: selectedTime, timezone });
    setStep(2);
  }

  function isValidEmail(address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!form.name || form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (selectedDate < today || selectedDate.getDay() === 0 || selectedDate.getDay() === 6) nextErrors.date = "Please choose a future weekday.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.email) {
        setEmailError(nextErrors.email);
        document.getElementById("userEmail")?.focus();
      }
      if (nextErrors.name) document.getElementById("userName")?.focus();
      return;
    }

    setErrors({});
    setEmailError("");
    setIsSubmitting(true);

    trackEvent("booking_submitted", { time: selectedTime, timezone });

    const message = [
      "Ceejay Creations - New Request a Call booking",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Date: ${selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      `Time: ${formatTime12h(selectedTime)}`,
      `Timezone: ${timezone}`,
      `Notes: ${form.notes || "Not provided"}`,
    ].join("\n");
    if (form.contactMethod === "email") {
      openEmail("Ceejay Creations - New Request a Call booking", message);
    } else {
      openWhatsApp(message);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);
      setTimeout(() => {
        handleClose();
      }, 7000);
    }, 700);
  }

  function shiftMonth(delta) {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
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
            aria-label="Close booking modal"
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
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-surface shadow-card outline-none sm:flex-row md:max-w-4xl"
          >
            {/* Sidebar */}
            <aside className="flex w-full shrink-0 flex-col justify-between border-b border-ink-border bg-ink-soft p-7 sm:w-72 sm:border-b-0 sm:border-r">
              <div>
                <div className="flex items-center gap-4">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      aria-label="Back to date selection"
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
                  Sales
                </p>
                <h2 id="booking-modal-title" className="mt-1.5 font-display text-2xl font-bold text-white">Discovery Call</h2>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3 text-sm text-paper-muted">
                    <Clock size={16} className="mt-0.5 shrink-0 text-paper-faint" />
                    <span>30 min</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-paper-muted">
                    <Video size={16} className="mt-0.5 shrink-0 text-paper-faint" />
                    <span>Web conferencing details provided upon confirmation.</span>
                  </div>
                  {step === 2 && (
                    <>
                      <div className="flex items-start gap-3 text-sm text-paper-muted">
                        <CalendarCheck size={16} className="mt-0.5 shrink-0 text-paper-faint" />
                        <span>
                          {formatTime12h(selectedTime)}, {dayName}, {monthName} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                        </span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-paper-muted">
                        <Globe size={16} className="mt-0.5 shrink-0 text-paper-faint" />
                        <span>{timezone}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 flex gap-4 sm:mt-0">
                <a href="/privacy" className="text-xs font-semibold text-signal">Privacy Policy</a>
              </div>
            </aside>

            {/* Main panel */}
            <div className="max-h-[80vh] flex-1 overflow-y-auto scroll-thin p-7 sm:p-9">
              {confirmed ? (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                  <CalendarCheck size={40} className="text-signal" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">Message ready</h3>
                  <p className="mt-2 max-w-xs text-sm text-paper-muted">
                    Your Ceejay Creations booking details were added to a new {form.contactMethod === "email" ? "email" : "WhatsApp message"}. Complete the send step to reach us.
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
                  <h3 className="font-display text-lg font-bold text-white">Select Date, Time & Timezone</h3>

                  <div className="mt-6 flex flex-col gap-8 md:flex-row">
                    {/* Calendar */}
                    <div className="flex-1">
                      <div className="mb-5 flex items-center justify-between">
                        <button onClick={() => shiftMonth(-1)} aria-label="Previous month" className="text-paper-faint hover:text-white">
                          <ChevronLeft size={16} />
                        </button>
                        <span className="font-mono text-sm font-semibold text-white">
                          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                        </span>
                        <button onClick={() => shiftMonth(1)} aria-label="Next month" className="text-paper-faint hover:text-white">
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="mb-3 grid grid-cols-7 text-center font-mono text-[11px] font-semibold text-paper-faint">
                        {WEEKDAY_LABELS.map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2 text-center">
                        {cells.map((cell, i) => {
                          if (!cell) return <span key={`empty-${i}`} />;
                          const isSelected =
                            cell.date.toDateString() === selectedDate.toDateString();
                          return (
                            <button
                              key={cell.day}
                              disabled={cell.disabled}
                              onClick={() => setSelectedDate(cell.date)}
                              className={`grid h-9 place-items-center rounded-full text-sm font-semibold transition-colors ${
                                isSelected
                                  ? "bg-signal text-ink"
                                  : cell.disabled
                                  ? "cursor-not-allowed text-[#48484a]"
                                  : "bg-signal/10 text-signal hover:bg-signal/20"
                              }`}
                            >
                              {cell.day}
                            </button>
                          );
                        })}
                      </div>

                      <label className="mt-6 flex items-center gap-2.5 rounded-lg border border-ink-border bg-ink-surface2 px-3 py-2.5">
                        <Globe size={15} className="text-signal" />
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full appearance-none bg-transparent font-mono text-[13px] text-white outline-none"
                        >
                          {TIMEZONES.map((tz) => (
                            <option key={tz} value={tz} className="bg-ink-surface text-white">
                              {tz}
                            </option>
                          ))}
                        </select>
                      </label>
                      {errors.date && <p className="mt-2 text-xs text-red-400">{errors.date}</p>}
                    </div>

                    {/* Time slots */}
                    <div className="w-full md:w-52">
                      <p className="mb-4 text-sm text-paper-muted">
                        {dayName}, {monthName} {selectedDate.getDate()}
                      </p>

                      <div className="mb-4 flex flex-col gap-1.5 rounded-lg border border-ink-border bg-white/[0.03] p-2.5">
                        <label htmlFor="customTime" className="font-mono text-xs font-semibold text-paper-faint">
                          Pick Any Time:
                        </label>
                        <input
                          id="customTime"
                          type="time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="rounded-md border border-signal bg-ink-surface2 px-2.5 py-1.5 font-mono text-sm font-bold text-signal outline-none [color-scheme:dark]"
                        />
                      </div>

                      <div className="flex max-h-72 flex-col gap-2.5 overflow-y-auto scroll-thin pr-1">
                        {PRESET_SLOTS.map((time) => {
                          const active = selectedTime === time;
                          return (
                            <div key={time} className="flex gap-2">
                              <button
                                onClick={() => setSelectedTime(time)}
                                className={`flex-1 rounded-lg border py-3 text-sm font-bold transition-colors ${
                                  active
                                    ? "border-transparent bg-[#e5e5ea] text-black"
                                    : "border-pulse text-signal hover:bg-signal/5"
                                }`}
                              >
                                {formatTime12h(time)}
                              </button>
                              {active && (
                                <button
                                  onClick={handleNext}
                                  className="rounded-lg bg-signal px-4 text-sm font-bold text-ink"
                                >
                                  Next
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Enter Details</h3>
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                      {csrfToken && <input type="hidden" name="csrf_token" value={csrfToken} />}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="userName" className="text-sm font-semibold text-white">Name *</label>
                      <input
                        id="userName"
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
                      <label htmlFor="userEmail" className="text-sm font-semibold text-white">Email *</label>
                      <input
                        id="userEmail"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "userEmail-error" : undefined}
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                      {emailError && (
                        <p id="userEmail-error" className="text-xs text-red-400 mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="userNotes" className="text-sm font-semibold text-white">
                        Please share anything that will help prepare for our meeting.
                      </label>
                      <textarea
                        id="userNotes"
                        rows={4}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="resize-y rounded-lg bg-white px-4 py-3 text-sm text-black outline-none"
                      />
                    </div>
                    <fieldset className="flex flex-col gap-2">
                      <legend className="text-sm font-semibold text-white">How should we contact you?</legend>
                      <div className="grid grid-cols-2 gap-2">
                        {[{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: `Email (${CONTACT_EMAIL})` }].map((option) => (
                          <label key={option.value} className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-colors ${form.contactMethod === option.value ? "border-signal bg-signal/10 text-signal" : "border-ink-border text-paper-muted hover:border-white/25 hover:text-white"}`}>
                            <input
                              type="radio"
                              name="bookingContactMethod"
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
                    <p className="text-xs text-paper-faint">
                      By proceeding, you confirm that you have read and agree to{" "}
                      <a href="/terms" className="font-semibold text-signal">Terms</a> and{" "}
                      <a href="/privacy" className="font-semibold text-signal">Privacy Notice</a>.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="self-start rounded-full bg-signal px-7 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {isSubmitting ? "Scheduling..." : "Schedule Event"}
                    </button>
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
