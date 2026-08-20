import { useState } from "react";

import { wedding } from "../data/wedding";

const initialForm = {
  name: "",
  guests: "0",
  attendance: "yes",
  message: "",
};

function RSVP() {
  const { couple, contact, rsvp } = wedding;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  function update(field) {
    return (event) => setForm({ ...form, [field]: event.target.value });
  }

  function buildMessage() {
    const labels = rsvp.messageLabels;

    const lines = [
      `${rsvp.messageTitle} — ${couple.bride} & ${couple.groom}`,
      "",
      `${labels.name}: ${form.name || labels.unspecified}`,
      `${labels.attendance}: ${form.attendance === "yes" ? labels.yes : labels.no}`,
      `${labels.guests}: ${form.guests}`,
    ];

    if (form.message.trim()) {
      lines.push(`${labels.message}: ${form.message.trim()}`);
    }

    return lines.join("\n");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (rsvp.method === "formspree") {
      try {
        setStatus("sending");

        await fetch(rsvp.formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        setStatus("success");
      } catch {
        setStatus("error");
      }
      return;
    }

    const text = encodeURIComponent(buildMessage());

    if (rsvp.method === "whatsapp") {
      window.open(`https://wa.me/${contact.phone}?text=${text}`, "_blank", "noopener");
    } else {
      const subject = encodeURIComponent(
        `${rsvp.messageTitle} — ${couple.bride} & ${couple.groom}`,
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${text}`;
    }

    setStatus("success");
  }

  return (
    <section className="rsvp section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {rsvp.eyebrow}
          </p>

          <h2 className="section__title">
            {rsvp.title}
          </h2>

          <p className="rsvp__description">
            {rsvp.description}
          </p>
        </header>

        {status === "success" ? (
          <div className="rsvp__message rsvp__message--success">
            <p>{rsvp.successMessage}</p>
          </div>
        ) : (
          <form className="rsvp__form" onSubmit={handleSubmit}>

            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="rsvp-name">
                {rsvp.labels.name}
              </label>
              <input
                id="rsvp-name"
                type="text"
                className="rsvp__input"
                value={form.name}
                onChange={update("name")}
                placeholder={rsvp.placeholders.name}
                required
              />
            </div>

            <fieldset className="rsvp__field rsvp__field--choice">
              <legend className="rsvp__label">
                {rsvp.labels.attendance}
              </legend>

              {rsvp.attendanceOptions.map((option) => (
                <label key={option.value} className="rsvp__choice">
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={form.attendance === option.value}
                    onChange={update("attendance")}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>

            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="rsvp-guests">
                {rsvp.labels.guests}
              </label>
              <select
                id="rsvp-guests"
                className="rsvp__input"
                value={form.guests}
                onChange={update("guests")}
              >
                {rsvp.guestsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="rsvp-message">
                {rsvp.labels.message}
              </label>
              <textarea
                id="rsvp-message"
                className="rsvp__input rsvp__input--textarea"
                value={form.message}
                onChange={update("message")}
                placeholder={rsvp.placeholders.message}
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="rsvp__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? rsvp.sendingLabel : rsvp.submitLabel}
            </button>

            {status === "error" && (
              <p className="rsvp__message rsvp__message--error">
                {rsvp.errorMessage}
              </p>
            )}

          </form>
        )}

      </div>

    </section>
  );
}

export default RSVP;