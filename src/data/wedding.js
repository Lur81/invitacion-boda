export const wedding = {
  couple: {
    bride: "Marta",
    groom: "Jorge",
  },

  meta: {
    title: "Boda",
  },

  hero: {
    image: "/image/hero/hero_square.jpg",
    aspect: "1 / 1",
    subtitle: "Nos casamos",
  },

  story: {
    eyebrow: "Nuestro camino",
    title: "Nuestra historia",
    chapters: [
      {
        heading: "Cómo nos conocimos",
        text: "Complementa aquí cómo comenzó todo: dónde os conocisteis, qué pasó aquel día y cuándo supisteis que algo especial estaba empezando.",
      },
      {
        heading: "El primer viaje",
        text: "Añade una anécdota de un viaje, una aventura o un plan que os unió todavía más y que recordáis con una sonrisa.",
      },
      {
        heading: "La propuesta",
        text: "Cuenta cómo fue el momento en el que decidisteis pasar el resto de vuestras vidas juntos.",
      },
    ],
    closing:
      "Y ahora, queremos celebrarlo con todas las personas que queremos, y sois parte imprescindible de nuestra historia.",
  },

  countdown: {
    eyebrow: "Falta poco",
    title: "La cuenta atrás ha comenzado",
    doneMessage: "¡Es el gran día!",
    labels: {
      days: "días",
      hours: "horas",
      minutes: "minutos",
      seconds: "segundos",
    },
  },

  date: {
    day: "3",
    month: "Octubre",
    year: "2026",
    full: "3 de octubre de 2026",
    time: "18:00",
    iso: "2026-10-03T18:00:00",
  },

  venue: {
    ceremony: {
      label: "Ceremonia",
      name: "Ceremonia religiosa",
      address: "Dirección de la ceremonia, Ciudad",
      maps: "",
      time: "18:00",
    },

    banquet: {
      label: "Celebración",
      name: "Banquete y celebración",
      address: "Dirección de la celebración, Ciudad",
      maps: "https://maps.app.goo.gl/NQd1HEBZt4ZWbwrFA",
      time: "21:00",
    },
  },

  event: {
    eyebrow: "Cuándo y dónde",
    title: "El gran día",
    linkLabel: "Cómo llegar",
    timeSuffix: " h",
  },

  contact: {
    phone: "34647192799",
    email: "invitaciones@correo.com",
  },

  rsvp: {
    eyebrow: "Confirmación",
    title: "¿Nos acompañarás?",
    description:
      "Nos encantaría contar contigo en nuestro gran día. Confirma tu asistencia y cualquier alergia o necesidad especial en el mensaje.",
    method: "whatsapp",
    formspree: "",
    submitLabel: "Enviar confirmación",
    sendingLabel: "Enviando...",
    successMessage: "¡Gracias! Tu confirmación se ha registrado.",
    errorMessage:
      "No se ha podido enviar la confirmación. Inténtalo de nuevo o escríbenos directamente.",
    messageTitle: "Confirmación de asistencia",
    labels: {
      name: "Nombre y apellidos",
      attendance: "Asistencia",
      guests: "Acompañantes",
      message: "Mensaje (opcional)",
    },
    placeholders: {
      name: "Tu nombre",
      message: "Alergias, necesidades especiales o un mensaje bonito",
    },
    attendanceOptions: [
      { value: "yes", label: "Sí, asistiré" },
      { value: "no", label: "No podré asistir" },
    ],
    guestsOptions: [
      { value: "0", label: "Ninguno" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4 o más" },
    ],
    messageLabels: {
      name: "Nombre",
      attendance: "Asistencia",
      guests: "Acompañantes",
      message: "Mensaje",
      yes: "Sí, asistirá",
      no: "No podrá asistir",
      unspecified: "Sin especificar",
    },
  },

  playlist: {
    eyebrow: "Música",
    title: "🎵 La banda sonora de nuestra boda",
    text:
      "Hay canciones que simplemente no pueden faltar. Añade tu canción favorita y ayúdanos a crear la playlist de nuestra boda.",
    button: "Añadir mi canción en Spotify",
    inviteUrl: "https://open.spotify.com/playlist/2341dc6B5idLe7KYnNrS7M?si=bQdPPJUSRHy5NSB7LpQSdg&utm_source=copy-link&pi=VCH5waNwSTydz&pt=85984162e17019204c66347ea08a552e",
  },

  audio: {
    src: "",
    title: "Nuestra canción",
    playLabel: "Reproducir",
    pauseLabel: "Pausar música",
  },

  gallery: {
    eyebrow: "Recuerdos",
    title: "Nuestra galería",
    labels: {
      expand: "Ampliar imagen",
      close: "Cerrar",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
    },
    images: [
      { src: "/image/gallery/image_1.png", alt: "Fotografía de la pareja" }
      
    ],
  },

  gift: {
    eyebrow: "Detalle",
    title: "Regalo",
    intro:
      "El mejor regalo es que nos acompañéis, pero si queréis contribuir a nuestra nueva vida juntos, aquí tenéis cómo hacerlo.",
    iban: "ES00 0000 0000 0000 0000 0000",
    ibanLabel: "Cuenta bancaria",
    copyLabel: "Copiar número",
    copiedLabel: "Copiado",
    bizum: "+34647192799",
    bizumLabel: "Bizum",
  },

  footer: {
    thanks: "Gracias por formar parte de nuestra historia.",
    monogram: "M & J",
    credit: "Hecho con cariño",
  },

  languages: ["es", "en", "fr"],

  modules: {
    story: true,
    countdown: true,
    event: true,
    gallery: true,
    rsvp: true,
    playlist: true,
    gift: true,
  },
};