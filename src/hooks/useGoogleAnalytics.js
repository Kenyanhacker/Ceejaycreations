import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useGoogleAnalytics
 * ------------------
 * Loads the GA4 gtag.js script once, then fires a page_view event on every
 * route change. Reads the measurement ID from VITE_GA_MEASUREMENT_ID so no
 * secrets live in source control.
 *
 * Setup:
 *  1. Create a `.env` file with: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *  2. Call useGoogleAnalytics() once near the top of <App />.
 */
export function useGoogleAnalytics() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  // Inject the gtag.js script tag exactly once with basic error handling.
  useEffect(() => {
    if (!measurementId) {
      console.warn(
        "[useGoogleAnalytics] No VITE_GA_MEASUREMENT_ID set — analytics disabled."
      );
      return;
    }
    if (document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    // Fallback handling if the external script fails to load
    let errored = false;
    script.onerror = () => {
      errored = true;
      console.warn("[useGoogleAnalytics] Failed to load gtag.js — analytics disabled.");
      // Mark gtag as unavailable to avoid errors elsewhere
      window.gtag = undefined;
    };

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    // If the script failed to load, don't assign gtag
    if (!errored) {
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", measurementId, { send_page_view: false });
    } else {
      // ensure window.gtag is a safe noop to avoid runtime errors
      window.gtag = function () {
        // noop
      };
    }

    // If script hasn't executed after a timeout, treat it as failed and noop
    const loaderTimeout = setTimeout(() => {
      if (typeof window.gtag !== "function") {
        console.warn("[useGoogleAnalytics] gtag.js did not initialize in time — disabling analytics calls.");
        window.gtag = function () {};
      }
    }, 5000);

    return () => clearTimeout(loaderTimeout);
  }, [measurementId]);

  // Fire a page_view on every route change (SPA navigation).
  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location, measurementId]);
}

/**
 * trackEvent — fire a custom GA4 event from anywhere in the app, e.g.
 * trackEvent("booking_modal_open", { source: "hero_cta" })
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
