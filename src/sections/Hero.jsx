import { wedding } from "../data/wedding";

function Hero() {
  const { couple, date, hero } = wedding;

  return (
    <section className="hero">

      <img
        className="hero__image"
        src={hero.image}
        alt={`${couple.bride} y ${couple.groom}`}
        style={{ aspectRatio: hero.aspect }}
      />

      <div className="hero__content">
        <p className="hero__subtitle">
          {hero.subtitle}
        </p>

        <h1 className="hero__title">
          {couple.bride} & {couple.groom}
        </h1>

        <span className="hero__separator" aria-hidden="true" />

        <p className="hero__date">
          {date.full}
        </p>
      </div>

    </section>
  );
}

export default Hero;