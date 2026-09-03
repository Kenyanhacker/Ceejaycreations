import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CONTENT = {
  terms: {
    title: "Terms of Service",
    body: [
      "Welcome to Ceejay Creations. These Terms of Service describe the terms under which Ceejay Creations (\"we\", \"us\") provides information about our services on this website and accepts inquiries and bookings.",
      "By submitting an inquiry or booking through this site you acknowledge that any engagement requires a separate written agreement. Quotes are valid for the period stated on the quote and work begins only after a signed agreement and any agreed deposit are received.",
      "We make commercially reasonable efforts to meet agreed timelines; however, all delivery dates are estimates and depend on timely client feedback and scope finalization. Payment, ownership, and support terms will be set out in each project agreement.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "This Privacy Policy explains how Ceejay Creations collects and uses personal information submitted via our booking and inquiry forms.",
      "We collect only the personal data you provide directly (name, email address, and project details) to respond to your inquiry and, if engaged, to perform services. We may also collect anonymous analytics data to improve the site.",
      "We will not sell your personal information. If you request deletion or have questions about your data, contact us at the address shown on this site.",
    ],
  },

};

export default function Legal({ page = "terms" }) {
  const { title, body } = CONTENT[page] ?? CONTENT.terms;
  return (
    <section className="relative min-h-screen px-6 pb-24 pt-40">
      <SEO title={`${title} | Ceejay Creations`} path={`/${page}`} />
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-signal hover:underline">
          <ArrowLeft size={15} /> Back to Ceejay Creations
        </Link>
        <span className="font-mono text-sm font-semibold uppercase tracking-widest text-signal">
          &gt; cat {page}.md
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-paper-muted">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
