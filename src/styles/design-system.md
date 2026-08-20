# Sistema de diseño

Base visual de la plantilla de invitaciones de boda. Todos los valores se definen
en `src/styles/theme.css` como variables CSS (vía `:root`). No se usa ningún
preprocesador ni framework de estilos.

## Paleta

| Variable            | Valor     | Uso                                   |
| ------------------- | --------- | ------------------------------------- |
| `--color-primary`   | `#7d5a50` | Tono tierra, acciones y énfasis       |
| `--color-primary-dark` | `#5f443c` | Fondo del pie de página             |
| `--color-secondary` | `#f8f5f2` | Fondo papel de las secciones          |
| `--color-accent`    | `#d8b384` | Dorado, eyebrows, separadores, hover  |
| `--color-text`      | `#2f2f2f` | Texto principal                       |
| `--color-text-muted`| `#6b615a` | Texto secundario, descripciones       |
| `--color-white`     | `#ffffff` | Fondo de tarjetas (`--bg-card`)       |
| `--color-border`    | `#e8e0d8` | Líneas y bordes suaves                |

### Fondos

| Variable    | Valor             | Uso                          |
| ----------- | ----------------- | ---------------------------- |
| `--bg-base` | `var(--color-secondary)` | Fondo por defecto del `body` |
| `--bg-card` | `var(--color-white)`     | Tarjetas y secciones blancas |

## Tipografía

- `--font-title`: `Georgia, serif` — títulos, nombres de la pareja y acentos editoriales.
- `--font-body`: `Arial, sans-serif` — texto general, formularios y botones.

### Escala de texto

| Variable      | Valor     | Uso                          |
| ------------- | --------- | ---------------------------- |
| `--fs-xs`     | `0.75rem` | Labels, eyebrows, créditos   |
| `--fs-sm`     | `0.875rem`| Pies, direcciones            |
| `--fs-base`   | `1rem`    | Cuerpo de texto              |
| `--fs-lg`     | `1.25rem` | Subtítulos de tarjetas       |
| `--fs-xl`     | `1.6rem`  | Títulos de tarjetas          |
| `--fs-2xl`    | `2.25rem` | Nombres en el pie            |
| `--fs-3xl`    | `3rem`    | Títulos de sección (máx.)    |
| `--fs-title`  | `4rem`    | Nombres del hero / contador  |

`--fs-subtitle` y `--fs-date` (`1rem` y `1.3rem`) se reservan al hero. Los textos
se escalan de forma fluida con `clamp()` ligado al viewport; no se usan rem fijos
ni media queries arbitrarias para tipografía.

## Espaciado

`--space-xs: 0.5rem` · `--space-sm: 1rem` · `--space-md: 2rem` ·
`--space-lg: 4rem` · `--space-xl: 6rem`

## Radios y sombras

- `--radius-sm: 4px` · `--radius-md: 8px` · `--radius-lg: 16px`
- `--shadow-soft: 0 16px 48px rgba(45, 30, 20, 0.08)`

## Layout

- `--max-width: 1200px` — ancho máximo de los contenedores.
- `--section-padding: clamp(2rem, 6vw, 6rem)` — padding vertical de sección.

## Patrones de sección

Todas las secciones comparten el esqueleto de `src/styles/sections.css`:

```html
<section class="nombre section">
  <div class="section__inner">
    <header class="section__header">
      <p class="section__eyebrow">…</p>
      <h2 class="section__title">…</h2>
      <span class="section__divider"></span>
    </header>
    …
  </div>
</section>
```

- `.section` — relleno vertical (`--section-padding`).
- `.section__inner` — centra el contenido dentro de `--max-width`.
- `.section__eyebrow` — etiqueta pequeña, dorada, en mayúsculas espaciadas.
- `.section__title` — título serif con tamaño fluido.
- `.section__divider` — línea dorada decorativa de 3rem.

## Naming

BEM estricto: `.sección__elemento` y `.sección--modificador` (p. ej.
`rsvp__message--success`). Cada sección tiene su propia hoja de estilos con el
mismo nombre que su componente (`hero.css`, `story.css`, …).

## Animaciones

`src/styles/animations.css`: fade-in + desplazamiento sutil al entrar en
viewport, gestionado con `IntersectionObserver` en `App.jsx`. Se desactiva con
`prefers-reduced-motion`.

## Personalización por boda

Colores, tipografías, textos e imágenes se cambian solo en:

1. `src/styles/theme.css` — paleta y tipografía.
2. `src/data/wedding.js` — textos, fechas, enlaces y módulos.
3. `public/image/` — imágenes e ilustraciones.