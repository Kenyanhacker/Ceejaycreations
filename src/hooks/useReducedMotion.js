import { useEffect, useState } from "react";

// Returns true when the user prefers reduced motion or running on a small screen
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const prefers = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth && window.innerWidth < 640;
      return !!prefers || !!small || document.documentElement.getAttribute("data-reduced-motion") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    let mq;
    try {
      if (typeof window !== "undefined" && window.matchMedia) {
        mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = () => setReduced(!!mq.matches || window.innerWidth < 640);
        mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
        const resizeHandler = () => setReduced(!!mq.matches || window.innerWidth < 640);
        window.addEventListener("resize", resizeHandler);
        return () => {
          mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
          window.removeEventListener("resize", resizeHandler);
        };
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return reduced;
}
