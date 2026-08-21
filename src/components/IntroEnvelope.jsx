import { useEffect, useRef, useState } from "react";

import { wedding } from "../data/wedding";

function IntroEnvelope({ onComplete, onReveal }) {
  const { couple } = wedding;
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const finishRef = useRef(() => {});
  const timersRef = useRef([]);

  onCompleteRef.current = onComplete;

  finishRef.current = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    onCompleteRef.current();
  };

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      finishRef.current();
      return undefined;
    }

    clearTimers();

    return () => {
      clearTimers();
    };
  }, []);

  const openEnvelope = () => {
    if (open || leaving) return;

    setOpen(true);
    window.dispatchEvent(new Event("wedding:play-music"));

    timersRef.current = [
      window.setTimeout(() => {
        setLeaving(true);
        onReveal();
      }, 2300),
      window.setTimeout(() => finishRef.current(), 5200),
    ];
  };

  const handleSkip = () => {
    clearTimers();
    setOpen(true);
    setLeaving(true);
    onReveal();
    window.setTimeout(() => finishRef.current(), 1100);
  };

  return (
    <div className={`intro-envelope${leaving ? " intro-envelope--leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Apertura de la invitación">
      <div className="intro-envelope__stage">
        <div className="intro-envelope__glow intro-envelope__glow--one" aria-hidden="true" />
        <div className="intro-envelope__glow intro-envelope__glow--two" aria-hidden="true" />

        <button
          className={`intro-envelope__envelope${open ? " intro-envelope__envelope--open" : ""}`}
          type="button"
          onClick={openEnvelope}
          aria-label="Abrir sobre"
        >
          <div className="intro-envelope__back" />
          <div className={`intro-envelope__flap${open ? " intro-envelope__flap--open" : ""}`} />
          <div className="intro-envelope__front" />
          <div className="intro-envelope__seal">
            <span className="intro-envelope__seal-initials" aria-hidden="true">{couple.bride[0]}&{couple.groom[0]}</span>
          </div>
        </button>

        <div className={`intro-envelope__card${open ? " intro-envelope__card--open" : ""}`}>
          <div className="intro-envelope__teaser">
            <p className="intro-envelope__teaser-kicker">Tenemos algo que contaros...</p>
          </div>
        </div>
      </div>

      <p className="intro-envelope__hint">Haz clic para abrir</p>
      <button className="intro-envelope__skip" type="button" onClick={handleSkip}>
        Saltar introducción
      </button>
    </div>
  );
}

export default IntroEnvelope;
