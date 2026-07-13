// Configuración central de marca y contacto de Muebles Venechi.
// Todo lo editable del negocio vive acá para no buscarlo por el código.

export const site = {
  brand: "Espacio VCH",
  brandFull: "Espacio VCH · Venechi",
  domain: "mueblesvenechi.cl",
  url: "https://mueblesvenechi.cl",
  tagline: "Tu cocina a medida, montada en 40 días",
  description:
    "Marmolería y mueblería premium. Cocinas, closets y baños a medida en Villarrica, Pucón y Lican Ray. Diseño propio, marmolería en casa y entrega en 40 días.",

  // Dirección física real (Marmolería y Mueblería Venechi).
  address: "Isabel Riquelme 241, Villarrica, Región de La Araucanía",
  cities: ["Villarrica", "Pucón", "Lican Ray"],
  yearsExperience: 15,
  deliveryDays: 40,

  // Visita técnica de medición en terreno (valor que se cobra al agendar).
  visitPrice: 50_000,

  // URL del "appointment schedule" de Google Calendar para agendar reunión
  // online. Mientras esté vacía, el botón de agendamiento no se muestra.
  bookingUrl: "" as string,

  // Contacto — reemplazar por los datos reales del negocio.
  whatsappNumber: "56900000000", // formato wa.me, sin '+' ni espacios
  phoneDisplay: "+56 9 0000 0000",
  email: "contacto@mueblesvenechi.cl",
  instagram: "https://instagram.com/mueblesvenechi",
  facebook: "https://facebook.com/marmoleriavenechi",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Mapa embebido de la sede (por búsqueda de dirección, sin API key).
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
