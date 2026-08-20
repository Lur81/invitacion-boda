import { useRef, useState } from "react";

import { wedding } from "../data/wedding";

function MusicPlayer() {
  const { audio } = wedding;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!audio.src) {
    return null;
  }

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