import fs from "node:fs";
import path from "node:path";
import qrcode from "qrcode";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function stripTrailingSlash(url) {
  return url.replace(/\/+$/, "");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/);
  return match ? match[1] : "0 0 29 29";
}

function embedQr(rawSvg, x, y, size) {
  const viewBox = extractViewBox(rawSvg);
  const inner = rawSvg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" shape-rendering="crispEdges">${inner}</svg>`;
}

function buildElegantCard(rawSvg, { kicker, caption, note, footer }) {
  const W = 900;
  const H = 1200;
  const qrSize = 620;
  const qrX = (W - qrSize) / 2;
  const qrY = 340;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f8f5f2"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="18" fill="#ffffff" stroke="#d8b384" stroke-width="2"/>
  <rect x="56" y="56" width="${W - 112}" height="${H - 112}" rx="12" fill="none" stroke="#e8e0d8" stroke-width="1"/>
  <text x="${W / 2}" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="8" fill="#d8b384">${escapeXml(kicker).toUpperCase()}</text>
  <text x="${W / 2}" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#2f2f2f">${escapeXml(caption)}</text>
  <line x1="${W / 2 - 60}" y1="250" x2="${W / 2 + 60}" y2="250" stroke="#d8b384" stroke-width="1"/>
  ${embedQr(rawSvg, qrX, qrY, qrSize)}
  <text x="${W / 2}" y="${qrY + qrSize + 180}" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#2f2f2f">${escapeXml(note)}</text>
  <text x="${W / 2}" y="1100" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6b615a">${escapeXml(footer)}</text>
</svg>
`;
}

function buildFunCard(rawSvg, { kicker, caption, note, footer }) {
  const W = 900;
  const H = 1200;
  const qrSize = 560;
  const qrX = (W - qrSize) / 2;
  const qrY = 420;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f8f5f2"/>
  <circle cx="120" cy="120" r="52" fill="#d8b384"/>
  <circle cx="790" cy="90" r="30" fill="#e8e0d8"/>
  <circle cx="820" cy="240" r="18" fill="#d8b384"/>
  <circle cx="80" cy="360" r="16" fill="#e8e0d8"/>
  <rect x="48" y="48" width="${W - 96}" height="${H - 96}" rx="24" fill="#ffffff"/>
  <text x="${W / 2}" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="4" fill="#7d5a50">${escapeXml(kicker).toUpperCase()}</text>
  <text x="${W / 2}" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="#2f2f2f">${escapeXml(caption)}</text>
  ${embedQr(rawSvg, qrX, qrY, qrSize)}
  <circle cx="120" cy="1040" r="34" fill="#d8b384"/>
  <circle cx="760" cy="1060" r="22" fill="#e8e0d8"/>
  <circle cx="780" cy="1170" r="14" fill="#d8b384"/>
  <text x="${W / 2}" y="1100" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#2f2f2f">${escapeXml(note)}</text>
  <text x="${W / 2}" y="1150" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6b615a">${escapeXml(footer)}</text>
</svg>
`;
}

async function main() {
  const { wedding } = await import("../src/data/wedding.js");
  const couple = `${wedding.couple.bride} & ${wedding.couple.groom}`;

  const argUrl = process.argv[2];
  const env = loadEnv();
  const siteUrlRaw = argUrl || process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";

  if (!siteUrlRaw) {
    console.error("");
    console.error("No se ha encontrado el dominio de la boda.");
    console.error("Configura VITE_SITE_URL en .env (ver .env.example) o pásalo como argumento:");
    console.error("  npm run qr -- https://mi-boda.com");
    console.error("");
    process.exit(1);
  }

  const fullUrl = `${stripTrailingSlash(siteUrlRaw)}/fotos`;

  const designs = [
    {
      name: "qr-fotos-elegante",
      dark: wedding.album.qr.elegantColor,
      kicker: couple,
      caption: wedding.album.qr.elegantCaption,
      note: wedding.date.full,
      build: buildElegantCard,
    },
    {
      name: "qr-fotos-divertido",
      dark: wedding.album.qr.funColor,
      kicker: wedding.footer.monogram,
      caption: wedding.album.qr.funCaption,
      note: wedding.date.full,
      build: buildFunCard,
    },
  ];

  const outDir = path.resolve(process.cwd(), "public/qr");
  fs.mkdirSync(outDir, { recursive: true });

  for (const design of designs) {
    const options = {
      margin: 4,
      errorCorrectionLevel: "M",
      color: { dark: design.dark, light: "#ffffff" },
    };

    await qrcode.toFile(path.join(outDir, `${design.name}.png`), fullUrl, {
      ...options,
      type: "png",
      width: 2000,
    });

    const rawSvg = await qrcode.toString(fullUrl, { ...options, type: "svg" });
    fs.writeFileSync(path.join(outDir, `${design.name}.svg`), rawSvg);

    const card = design.build(rawSvg, design);
    fs.writeFileSync(path.join(outDir, `${design.name}-tarjeta.svg`), card);

    console.log(`✔ Generados  public/qr/${design.name}.png  (+ .svg y -tarjeta.svg)`);
  }

  console.log(`Destino del QR: ${fullUrl}`);
  console.log("Imprime con la resolución más alta y comprueba siempre el escaneo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
