import { wedding } from "../data/wedding";

function Story() {
  const { story } = wedding;

  return (
    <section className="story section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {story.eyebrow}
          </p>

          <h2 className="section__title">
            {story.title}
          </h2>

          <span className="section__divider" aria-hidden="true" />
        </header>

        <div className="story__chapters">
          {story.chapters.map((chapter, index) => (
            <article key={chapter.heading} className="story__chapter">
              <p className="story__chapter-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="story__chapter-title">
                {chapter.heading}
              </h3>

              <p className="story__chapter-text">
                {chapter.text}
              </p>
            </article>
          ))}
        </div>

        <p className="story__closing">
          {story.closing}
        </p>

      </div>

    </section>
  );
}

export default Story;