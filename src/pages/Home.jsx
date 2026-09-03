import SEO from "../components/SEO.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Projects from "../components/Projects.jsx";
import Guarantee from "../components/Guarantee.jsx";
import Reviews from "../components/Reviews.jsx";
import FAQ from "../components/FAQ.jsx";

export default function Home({ onOpenHire, onOpenBooking }) {
  return (
    <>
      <SEO
        title="Ceejay Creations | Full-Stack Software & Web Systems Agency"
        description="Ceejay Creations builds full-stack web apps, custom software, and computer-vision systems. Book a discovery call or request a project quote today."
        path="/"
      />
      <Hero onOpenHire={onOpenHire} onOpenBooking={onOpenBooking} />
      <About />
      <Projects />
      <Guarantee />
      <Reviews />
      <FAQ />
    </>
  );
}
