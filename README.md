# Invitación de boda digital

Plantilla profesional de invitaciones de boda construida con **React + Vite**,
CSS propio y un único punto de personalización: `src/data/wedding.js`.

Diseño editorial, minimalista y mediterráneo: mucho espacio, tipografía cuidada,
ilustración personalizada de la pareja y animaciones suaves y discretas.

## Puesta en marcha

```bash
npm install
npm run dev       # desarrollo con HMR
npm run lint      # oxlint
npm run build     # build de producción en /dist
npm run preview   # previsualiza el build
```

## Estructura

```
src/
├── assets/                 # (opcional) imágenes importadas desde código
├── data/
│   └── wedding.js          # todos los datos de la boda
├── sections/               # Hero, Story, Countdown, Event, RSVP,
│                           # Gallery, Music, Gift, Footer
├── styles/
│   ├── theme.css           # sistema de diseño (colores, tipos, espacios)
│   ├── sections.css        # esqueleto compartido de sección
│   ├── hero.css / story.css / …
│   └── animations.css      # aparición en scroll
├── App.jsx                 # monta las secciones según wedding.modules
├── index.css               # reset y base del body
└── main.jsx                # entrada + importación de estilos
public/
└── image/                  # imágenes: /image/hero, /image/gallery
```

Ver `src/styles/design-system.md` para consultar la paleta, tipografía y
convenciones.

## Personalizar una boda

Edita **solamente** `src/data/wedding.js` (textos, fechas, enlaces), la paleta
en `src/styles/theme.css` y las imágenes en `public/image/`. No hace falta tocar
ningún componente.

### Bloques de datos

| Bloque       | Qué contiene                                                            |
| ------------ | ------------------------------------------------------------------------ |
| `couple`     | Nombres de la pareja (`bride`, `groom`)                                  |
| `meta`       | `title` para el título de la pestaña (`... & ... — {title}`)             |
| `hero`       | Imagen del hero, `aspect` (p. ej. `"1 / 1"`) y subtítulo                 |
| `story`      | Eyebrow, título, capítulos (`heading` + `text`) y cierre                 |
| `countdown`  | Eyebrow, título, mensaje final y `labels` de las unidades                |
| `date`       | Fecha legible y `iso` (para la cuenta atrás)                             |
| `venue`      | `label`, nombre, dirección, enlace de maps y hora de ceremonia/celebración |
| `event`      | Eyebrow, título, etiqueta «Cómo llegar» y `timeSuffix`                   |
| `contact`    | Teléfono y email (usados por el RSVP)                                    |
| `rsvp`       | Textos del formulario, mensaje y método de envío (ver abajo)             |
| `playlist`   | CTA colaborativo: título, texto, botón e `inviteUrl` de la playlist      |
| `audio`      | Canción de fondo: `src`, y etiquetas de lectura                          |
| `gallery`    | Eyebrow, título, `labels` del lightbox y lista de imágenes (`src`+`alt`) |
| `gift`       | Textos, IBAN, Bizum y etiquetas de copiar                                |
| `footer`     | Monograma, gracias y crédito                                             |
| `languages`  | El primer idioma se usa como `lang` de la página                         |
| `modules`    | Conmuta cada sección con `true` / `false`                                |

### Módulos

`wedding.modules` activa o desactiva cada sección:

```js
modules: {
  story: true,
  countdown: true,
  event: true,
  gallery: true,
  rsvp: true,
  playlist: true,
  gift: true,
}
```

El Hero y el Footer siempre se muestran. Si un módulo está activo pero su
sección no tiene datos (sin imágenes, sin Spotify, sin regalo), la sección se
oculta automáticamente.

### Confirmación de asistencia (RSVP)

El formulario envía por uno de tres métodos, configurado con `rsvp.method`:

| Método       | Requisito                     | Comportamiento                          |
| ------------ | ----------------------------- | --------------------------------------- |
| `whatsapp`   | `contact.phone` internacional (sin `+` ni espacios, p. ej. `34600111222`) | Abre WhatsApp con el mensaje redactado |
| `mailto`     | `contact.email`               | Abre el cliente de correo               |
| `formspree`  | `rsvp.formspree` con el endpoint completo | Envía por `fetch` a Formspree   |

### Imágenes

Aloja los archivos en `public/image/` y referencia rutas absolutas
(`/image/hero/hero_square.jpg`). Para la galería, evita PNG pesados: optimiza o
convierte a JPG/WebP para que la invitación cargue rápido.