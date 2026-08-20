import { useState } from "react";

import { wedding } from "../data/wedding";

function Gift() {
  const { gift } = wedding;
  const [copied, setCopied] = useState(false);

  if (!gift.iban && !gift.bizum) {
    return null;
  }

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(gift.iban);
      setCopied(true);
    } catch {
      return;
    }
  }

  return (
    <section className="gift section">

      <div className="section__inner">

        <header className="section__header">
          <p className="section__eyebrow">
            {gift.eyebrow}
          </p>

          <h2 className="section__title">
            {gift.title}
          </h2>

          <p className="gift__intro">
            {gift.intro}
          </p>
        </header>

        <div className="gift__grid">
          {gift.iban && (
            <div className="gift__card">
              <p className="gift__label">
                {gift.ibanLabel}
              </p>

              <p className="gift__value">
                {gift.iban}
              </p>

              <button
                type="button"
                className="gift__copy"
                onClick={copyIban}
              >
                {copied ? gift.copiedLabel : gift.copyLabel}
              </button>
            </div>
          )}

          {gift.bizum && (
            <div className="gift__card">
              <p className="gift__label">
                {gift.bizumLabel}
              </p>

              <p className="gift__value">
                {gift.bizum}
              </p>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}

export default Gift;