# Códigos QR — Galería de fotos

Esta carpeta se rellena automáticamente con el script del proyecto:

    npm run qr

El script necesita el dominio real de la boda. Configúralo en `.env`
(ver `.env.example`):

    VITE_SITE_URL=https://tudominio.com

También puedes pasarlo como argumento:

    npm run qr -- https://tudominio.com

## Archivos generados

| Archivo | Uso |
| --- | --- |
| `qr-fotos-elegante.png` | QR puro de 2000 px, listo para imprimir a todo tamaño |
| `qr-fotos-elegante.svg` | Misma versión en vector |
| `qr-fotos-elegante-tarjeta.svg` | Tarjeta completa con QR + texto, para imprimir directamente |
| `qr-fotos-divertido.png` | QR puro de 2000 px, versión divertida |
| `qr-fotos-divertido.svg` | Misma versión en vector |
| `qr-fotos-divertido-tarjeta.svg` | Tarjeta divertida con QR + texto |

Todos apuntan a `{VITE_SITE_URL}/fotos`. Hemos usado una corrección de error
nivel M y **sin** decoración sobre los módulos del QR, de modo que sigue siendo
perfectamente escaneable.

## Consejos de impresión

- Imprime el PNG a una resolución de al menos 300 DPI (~15 cm de ancho).
- Si usas la tarjeta SVG, ábrela en el navegador y también sirve para pantalla.
- Antes de imprimir en masa, comprueba siempre el escaneo desde un móvil.