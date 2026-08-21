import { useEffect, useRef, useState } from "react";

import { wedding } from "../data/wedding";

function MusicPlayer() {
  const { audio } = wedding;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    const audioElement = audioRef.current;

    if (playing) {
      audioElement.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioElement.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  useEffect(() => {
    async function handlePlayMusic() {
      const audioElement = audioRef.current;

      if (!audioElement) return;

      try {
        // La intro solo dispara el evento; el audio real vive aquí para que no se corte
        // al desmontarse el sobre o al cambiar el estado de la pantalla inicial.
        audioElement.currentTime = 0;
        await audioElement.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }

    window.addEventListener("wedding:play-music", handlePlayMusic);

    return () => {
      window.removeEventListener("wedding:play-music", handlePlayMusic);
    };
  }, []);

  if (!audio.src) {
    return null;
  }

  return (
    <div className="music-player">

      <audio ref={audioRef} src={audio.src} loop preload="auto" />

      <button
        type="button"
        className="music-player__button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? audio.pauseLabel : `${audio.playLabel} ${audio.title}`}
      >
        {playing ? "\u275A\u275A" : "\u266A"}
      </button>

    </div>
  );
}

export default MusicPlayer;
