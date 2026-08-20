import { wedding } from "../data/wedding";

function Footer() {
  const { couple, date, footer } = wedding;

  return (
    <footer className="footer">

      <div className="footer__inner">

        <p className="footer__monogram" aria-hidden="true">
          {footer.monogram}
        </p>

        <h2 className="footer__names">
          {couple.bride} & {couple.groom}
        </h2>

        <p className="footer__date">
          {date.day} · {date.month} · {date.year}
        </p>

        <p className="footer__thanks">
          {footer.thanks}
        </p>

        <p className="footer__credit">
          {footer.credit}
        </p>

      </div>

    </footer>
  );
}

export default Footer;