import { useEffect } from "react";

import { wedding } from "./data/wedding";

import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Countdown from "./sections/Countdown";
import Event from "./sections/Event";
import RSVP from "./sections/RSVP";
import Gallery from "./sections/Gallery";
import Music from "./sections/Music";
import Gift from "./sections/Gift";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const { modules } = wedding;

  useEffect(() => {
    document.title = `${wedding.couple.bride} & ${wedding.couple.groom} — ${wedding.meta.title}`;
    document.documentElement.lang = wedding.languages[0];
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".hero, .section, .footer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />

      {modules.story && <Story />}
      {modules.countdown && <Countdown />}
      {modules.event && <Event />}
      {modules.rsvp && <RSVP />}
      {modules.gallery && <Gallery />}
      {modules.playlist && <Music />}
      {modules.gift && <Gift />}

      <Footer />

      <MusicPlayer />
    </>
  );
}

export default App;