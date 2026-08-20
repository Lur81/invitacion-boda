import { useEffect, useState } from "react";

import { wedding } from "../data/wedding";

function Gallery() {
  const { gallery } = wedding;
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") {
        setActive(null);
      }

      if (event.key === "ArrowRight") {
        setActive((index) => (index + 1) % gallery.images.length);
      }

      if (event.key === "ArrowLeft") {
        setActive(
          (index) => (index - 1 + gallery.images.length) % gallery.images.length,
        );
      }
    }

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, gallery.images.length]);

  if (!gallery.images.length) {
    return null;
  }

  function open(index) {
    setActive(index);
  }

  return (
    <section className="gallery section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {gallery.eyebrow}
          </p>

          <h2 className="section__title">
            {gallery.title}
          </h2>

          <span className="section__divider" aria-hidden="true" />
        </header>

        <div className="gallery__grid">
          {gallery.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="gallery__item"
              onClick={() => open(index)}
              aria-label={`${gallery.labels.expand}: ${image.alt}`}
            >
              <img
                className="gallery__image"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </button>
          ))}
        </div>

      </div>

      {active !== null && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={gallery.images[active].alt}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="gallery__close"
            onClick={() => setActive(null)}
            aria-label={gallery.labels.close}
          >
            ×
          </button>

          <button
            type="button"
            className="gallery__nav gallery__nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              setActive(
                (active - 1 + gallery.images.length) % gallery.images.length,
              );
            }}
            aria-label={gallery.labels.previous}
          >
            ‹
          </button>

          <figure className="gallery__frame">
            <img
              src={gallery.images[active].src}
              alt={gallery.images[active].alt}
            />
          </figure>

          <button
            type="button"
            className="gallery__nav gallery__nav--next"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active + 1) % gallery.images.length);
            }}
            aria-label={gallery.labels.next}
          >
            ›
          </button>
        </div>
      )}

    </section>
  );
}

export default Gallery;