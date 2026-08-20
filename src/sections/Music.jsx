import { wedding } from "../data/wedding";

const SPOTIFY_PLAYLIST_URL = wedding.playlist.inviteUrl;

function SpotifyIcon() {
  return (
    <svg
      className="music__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.8.5-1.2.3-3.3-2-7.4-2.4-12.3-1.3-.5.1-.9-.2-1-.7-.1-.5.2-.9.7-1 5.5-1.3 10.1-.8 13.8 1.5.4.2.5.8.3 1.2zm1.5-3.3c-.3.5-.9.6-1.4.3-3.8-2.3-9.5-3-14-1.6-.6.2-1.1-.2-1.3-.7-.1-.5.2-1.1.8-1.2 5.1-1.4 11.5-.6 15.8 1.9.5.3.6.9.1 1.3zm.1-3.4C14.4 7.9 8.5 7.6 4.2 8.8c-.6.2-1.2-.1-1.4-.7-.2-.6.1-1.2.7-1.4 4.9-1.4 11.4-1 16.1 1.7.5.3.7.9.4 1.4-.2.4-.7.6-1.3.4z"
      />
    </svg>
  );
}

function Music() {
  const { playlist } = wedding;

  return (
    <section className="music section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {playlist.eyebrow}
          </p>

          <h2 className="section__title">
            {playlist.title}
          </h2>

          <span className="section__divider" aria-hidden="true" />
        </header>

        <div className="music__content">
          <p className="music__text">
            {playlist.text}
          </p>

          <button
            type="button"
            className="music__button"
            onClick={() => window.open(SPOTIFY_PLAYLIST_URL, "_blank")}
          >
            <SpotifyIcon />
            {playlist.button}
          </button>
        </div>

      </div>

    </section>
  );
}

export default Music;