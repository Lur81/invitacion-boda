import { useEffect, useState } from "react";

function isVideoItem(item) {
  return (item.file_type || "").startsWith("video/");
}

export function CollabGallery({ items, labels }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;

    const previousTabIndex = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      } else if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % items.length,
        );
      } else if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? current : (current - 1 + items.length) % items.length,
        );
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousTabIndex;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, items.length]);

  if (!items.length) return null;

  const activeItem = active === null ? null : items[active];

  return (
    <>
      <div className="album__gallery">
        {items.map((item, index) => (
          <figure className="album__tile" key={item.id}>
            <button
              type="button"
              className="album__tile-button"
              aria-label={labels.expand}
              onClick={() => setActive(index)}
            >
              {isVideoItem(item) ? (
                <video
                  className="album__tile-media"
                  src={item.file_url}
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  className="album__tile-media"
                  src={item.file_url}
                  alt={item.file_name}
                  loading="lazy"
                  decoding="async"
                />
              )}
              {isVideoItem(item) && (
                <span className="album__tile-badge" aria-hidden="true">
                  ▶
                </span>
              )}
            </button>
          </figure>
        ))}
      </div>

      {activeItem && (
        <div
          className="album__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={labels.expand}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <button
            type="button"
            className="album__lightbox-close"
            aria-label={labels.close}
            onClick={() => setActive(null)}
          >
            ×
          </button>

          <button
            type="button"
            className="album__lightbox-nav album__lightbox-nav--prev"
            aria-label={labels.previous}
            onClick={() => setActive((current) => (current - 1 + items.length) % items.length)}
          >
            ‹
          </button>

          <button
            type="button"
            className="album__lightbox-nav album__lightbox-nav--next"
            aria-label={labels.next}
            onClick={() => setActive((current) => (current + 1) % items.length)}
          >
            ›
          </button>

          <figure className="album__lightbox-frame">
            {isVideoItem(activeItem) ? (
              <video
                className="album__lightbox-media"
                src={activeItem.file_url}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                className="album__lightbox-media"
                src={activeItem.file_url}
                alt={activeItem.file_name}
              />
            )}
            <figcaption>
              {labels.counter} {active + 1}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}