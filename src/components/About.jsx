import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Cpu,
    title: "Engineers, not middlemen",
    body: "Every project is scoped and built by the same senior engineers you talk to on your discovery call — no account managers relaying requirements down a chain.",
  },
  {
    icon: ShieldCheck,
    title: "Fixed scope, fixed price",
    body: "You get a written scope and quote before any code is written. If something changes, we tell you before we build it, not on the final invoice.",
  },
  {
    icon: Users,
    title: "Built for founders who ship",
    body: "We've shipped LMS platforms, marketplaces, desktop tools, and computer-vision systems — real production software carrying real daily users.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-signal"
        >
          &gt; cat about.md
        </motion.span>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          A small studio that builds like an in-house engineering team.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-5 max-w-2xl leading-relaxed text-paper-muted"
        >
          Ceejay Creations sits at the intersection of full-stack web
          development, custom software, and embedded/robotics systems.
          We're founder-led, deadline-obsessed, and small enough that your
          project never gets lost in a queue.
        </motion.p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-ink-border bg-ink-surface/50 p-7 transition-colors hover:border-signal/40"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-signal/10 text-signal transition-transform group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper-muted">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
