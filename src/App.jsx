import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BookingModal from "./components/BookingModal.jsx";
import HireModal from "./components/HireModal.jsx";
import Home from "./pages/Home.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useGoogleAnalytics, trackEvent } from "./hooks/useGoogleAnalytics.js";

export default function App() {
  useGoogleAnalytics();

  const [isHireOpen, setHireOpen] = useState(false);
  const [isBookingOpen, setBookingOpen] = useState(false);

  function openHire() {
    trackEvent("hire_modal_open", { source: "navbar_or_hero" });
    setHireOpen(true);
  }

  function openBooking() {
    trackEvent("booking_modal_open", { source: "hero" });
    setBookingOpen(true);
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navbar onOpenHire={openHire} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home onOpenHire={openHire} onOpenBooking={openBooking} />}
          />
          <Route path="/terms" element={<Legal page="terms" />} />
          <Route path="/privacy" element={<Legal page="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
      <HireModal isOpen={isHireOpen} onClose={() => setHireOpen(false)} />
    </div>
  );
}
