import { motion } from "framer-motion";
import { ShieldCheck, Bug, TrendingUp, Clock } from "lucide-react";

const GUARANTEES = [
  {
    icon: ShieldCheck,
    stat: "99.9%",
    title: "Uptime guarantee",
    body: "Every hosted system we ship is monitored around the clock, with an SLA-backed 99.9% uptime commitment on production deployments.",
  },
  {
    icon: Bug,
    stat: "30 days",
    title: "Bug-free warranty",
    body: "Find a defect within 30 days of launch and we fix it at no cost — no change orders, no arguing over what counts as a bug.",
  },
  {
    icon: TrendingUp,
    stat: "Conversion-first",
    title: "Design guarantee",
    body: "Every interface we ship is designed against a conversion goal, not just a mockup — if it doesn't move the metric it was built for, we revise it.",
  },
  {
    icon: Clock,
    stat: "On-time",
    title: "Milestone commitment",
    body: "We quote realistic timelines and hold to them. If we're going to miss a milestone, you hear about it days before the deadline, not after.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Guarantee() {
  return (
    <section id="guarantee" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-signal/25 bg-gradient-to-b from-signal/[0.06] to-transparent p-8 sm:p-12">
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-signal"
        >
          &gt; guarantee --show
        </motion.span>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          The Ceejay Satisfaction & Performance Guarantee.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-paper-muted"
        >
          We stand behind what we ship. If any part of this doesn't hold up,
          we make it right before we consider the engagement closed.
        </motion.p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map(({ icon: Icon, stat, title, body }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur"
            >
              <Icon size={20} className="text-signal" />
              <p className="mt-4 font-display text-2xl font-bold text-white">{stat}</p>
              <p className="mt-1 text-sm font-semibold text-signal">{title}</p>
              <p className="mt-2.5 text-xs leading-relaxed text-paper-muted">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
