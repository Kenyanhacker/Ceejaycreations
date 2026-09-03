import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "../data/reviews.js";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-signal text-signal" : "text-ink-border"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-signal"
        >
          &gt; cat reviews.log
        </motion.span>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          What clients say after launch.
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border border-ink-border bg-ink-surface/50 p-6 transition-colors hover:border-signal/30"
            >
              <div>
                <Quote size={20} className="text-signal/50" />
                <blockquote className="mt-3 text-sm leading-relaxed text-paper">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-paper-muted">{r.role}</p>
                </div>
                <Stars count={r.rating} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
