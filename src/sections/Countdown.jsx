import { useEffect, useState } from "react";

import { wedding } from "../data/wedding";

function getRemaining(target) {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done: false,
  };
}

function Countdown() {
  const { date, countdown } = wedding;
  const target = new Date(date.iso).getTime();

  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: countdown.labels.days, value: remaining.days },
    { label: countdown.labels.hours, value: remaining.hours },
    { label: countdown.labels.minutes, value: remaining.minutes },
    { label: countdown.labels.seconds, value: remaining.seconds },
  ];

  return (
    <section className="countdown section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {countdown.eyebrow}
          </p>

          <h2 className="section__title">
            {remaining.done ? countdown.doneMessage : countdown.title}
          </h2>

          <span className="section__divider" aria-hidden="true" />
        </header>

        {!remaining.done && (
          <div className="countdown__grid" role="timer">
            {units.map((unit) => (
              <div key={unit.label} className="countdown__unit">
                <span className="countdown__value">
                  {String(unit.value).padStart(2, "0")}
                </span>

                <span className="countdown__label">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}

export default Countdown;