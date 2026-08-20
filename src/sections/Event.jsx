import { wedding } from "../data/wedding";

function Event() {
  const { venue, event } = wedding;

  const moments = [
    { label: venue.ceremony.label, ...venue.ceremony },
    { label: venue.banquet.label, ...venue.banquet },
  ];

  return (
    <section className="event section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {event.eyebrow}
          </p>

          <h2 className="section__title">
            {event.title}
          </h2>

          <span className="section__divider" aria-hidden="true" />
        </header>

        <div className="event__grid">
          {moments.map((moment) => (
            <article key={moment.label} className="event__card">
              <p className="event__time">
                {moment.time}{event.timeSuffix}
              </p>

              <h3 className="event__type">
                {moment.label}
              </h3>

              <p className="event__name">
                {moment.name}
              </p>

              <p className="event__address">
                {moment.address}
              </p>

              {moment.maps && (
                <a
                  className="event__link"
                  href={moment.maps}
                  target="_blank"
                  rel="noreferrer"
                >
                  {event.linkLabel}
                </a>
              )}
            </article>
          ))}
        </div>

      </div>

    </section>
  );
}

export default Event;