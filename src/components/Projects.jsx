import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects, ACCENT_CLASSES } from "../data/projects.js";
import useReducedMotion from "../hooks/useReducedMotion.js";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function ProjectCard({ project, index, reduced }) {
  const accent = ACCENT_CLASSES[project.accent] ?? ACCENT_CLASSES.signal;
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={reduced ? { duration: 0 } : { duration: 0.55, delay: (index % 2) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-surface/50 transition-colors hover:border-white/20"
    >
      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-ink-surface2 to-black">
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={project.name}
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget;
                t.onerror = null;
                t.style.display = "none";
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-20`} />
            <div className="absolute -right-8 top-6 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-5 left-5 h-20 w-20 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-end justify-between p-5">
              <div
                className={`font-display text-5xl font-bold tracking-[-0.08em] ${accent.text} transition-transform duration-500 group-hover:scale-110`}
              >
                {project.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)}
              </div>
              <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted backdrop-blur-sm">
                Live
              </span>
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Hover overlay with live demo / case study links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ink/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={project.demoUrl}
            className={`flex items-center gap-1.5 rounded-full ${accent.bg} px-4 py-2 text-xs font-semibold text-ink transition-transform hover:scale-105`}
          >
            <ExternalLink size={13} /> Live Demo
          </a>
          <a
            href={project.caseStudyUrl}
            className="flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
          >
            <Github size={13} /> Case Study
          </a>
        </div>

        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-paper-muted backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{project.name}</h3>
          <ArrowUpRight
            size={18}
            className={`mt-1 shrink-0 text-paper-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:${accent.text}`}
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">{project.summary}</p>

        <ul className="mt-4 space-y-1.5">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] text-paper-muted">
              <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink-border bg-black/30 px-2.5 py-1 font-mono text-[11px] text-paper-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduced = useReducedMotion();
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-signal"
        >
          &gt; ls ./systems
        </motion.span>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          Systems we've shipped to production.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-paper-muted"
        >
          A sample of the platforms, tools, and pipelines currently running
          for our clients — hover a card for the live demo and write-up.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
