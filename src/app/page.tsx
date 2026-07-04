import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site, whatsappLink } from "@/lib/site";

const DIFERENCIADORES = [
  { n: `${site.deliveryDays} días`, t: "Cocina montada y funcional, de principio a fin." },
  { n: "Precio claro", t: "Cotización con valor 'desde' al instante, sin vueltas." },
  { n: `${site.yearsExperience} años`, t: "Fabricando muebles a medida en la zona." },
  { n: "Marmolería propia", t: "Cubiertas de granito, cuarzo y piedra en casa." },
];

const LINEAS = [
  { t: "Cocinas a medida", d: "Diseñadas para tu espacio real, con la cubierta que elijas." },
  { t: "Closets y vestidores", d: "Aprovechan cada rincón y ordenan de verdad." },
  { t: "Muebles de baño", d: "Vanitorios y guardado a prueba de humedad." },
  { t: "Cubiertas de piedra", d: "Granito, cuarzo y piedra sinterizada, medidas e instaladas." },
];

const PASOS = [
  { n: "1", t: "Arma tu cocina online", d: "Elige distribución, medidas, cubierta y terminaciones en el configurador." },
  { n: "2", t: "Recibe un valor 'desde'", d: "Te mostramos un rango estimado al instante, sin esperar días." },
  { n: "3", t: "Afinamos con una visita", d: "Medimos, ajustamos detalles y cerramos la cotización final." },
  { n: "4", t: "Fabricamos e instalamos", d: `En ${site.deliveryDays} días tienes tu cocina lista para usar.` },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-oak-100 px-3 py-1 text-sm font-medium text-oak-600">
              Villarrica · Pucón · Lican Ray
            </span>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] text-pine sm:text-5xl md:text-6xl">
              Tu cocina a medida, montada y funcional en {site.deliveryDays} días.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Diseño propio, marmolería en casa y un precio que conoces desde el primer
              momento. Arma tu cocina en pantalla y recibe un valor estimado al instante.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cotiza" className="btn-primary">
                Cotiza tu cocina en 2 minutos
              </Link>
              <a
                href={whatsappLink(`Hola ${site.brand}, quiero conversar sobre una cocina a medida.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Hablar por WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              Sin compromiso. La estimación es referencial y la afinamos con una visita.
            </p>
          </div>

          {/* Ilustración simple de cocina (placeholder mientras llegan fotos reales) */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-sm">
              <HeroKitchen />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-pine px-5 py-4 text-white shadow-lg">
              <p className="text-2xl font-semibold">{site.deliveryDays} días</p>
              <p className="text-xs text-white/70">de la idea a la instalación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="border-y border-border bg-surface-muted">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIADORES.map((d) => (
            <div key={d.n}>
              <p className="font-display text-2xl font-semibold text-oak-600">{d.n}</p>
              <p className="mt-1 text-sm text-muted">{d.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Líneas */}
      <section id="lineas" className="container-page py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-pine sm:text-4xl">
            Todo lo que amoblas, hecho a tu medida
          </h2>
          <p className="mt-3 text-muted">
            Fabricamos en nuestro taller y controlamos cada etapa, desde la plancha hasta la
            instalación final.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LINEAS.map((l) => (
            <div
              key={l.t}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-oak"
            >
              <h3 className="font-semibold text-pine">{l.t}</h3>
              <p className="mt-2 text-sm text-muted">{l.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="bg-pine text-white">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Cotizar dejó de ser lento
            </h2>
            <p className="mt-3 text-white/70">
              Antes había que agendar, esperar y mandar mensajes de ida y vuelta. Ahora empiezas
              tú, en pantalla, y llegas a la reunión con casi todo resuelto.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p) => (
              <div key={p.n} className="rounded-2xl bg-white/5 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-oak font-semibold text-white">
                  {p.n}
                </span>
                <h3 className="mt-4 font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-white/70">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/cotiza" className="btn-primary">
              Empezar mi cotización
            </Link>
          </div>
        </div>
      </section>

      {/* Trabajos (galería placeholder) */}
      <section id="trabajos" className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-pine sm:text-4xl">
            Trabajos recientes
          </h2>
          <p className="text-sm text-muted">Próximamente con fotos reales de nuestro taller.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-surface-muted to-oak-100"
            />
          ))}
        </div>
      </section>

      {/* Cobertura + CTA */}
      <section id="cobertura" className="border-t border-border bg-surface-muted">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-pine">
              Estamos en el corazón de la Araucanía Andina
            </h2>
            <p className="mt-3 text-muted">
              Taller y showroom en {site.address}. Fabricamos e instalamos en{" "}
              {site.cities.join(", ")} y alrededores.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <Link href="/cotiza" className="btn-primary">
              Cotiza tu cocina ahora
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-pine hover:text-oak"
            >
              O escríbenos directo por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

// Ilustración esquemática de una cocina para el hero (SVG liviano).
function HeroKitchen() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Cocina a medida">
      <rect x="0" y="0" width="320" height="240" rx="12" fill="#f2ebe0" />
      <rect x="24" y="30" width="120" height="46" rx="4" fill="#b0834e" />
      <rect x="152" y="30" width="60" height="46" rx="4" fill="#b0834e" />
      <rect x="20" y="120" width="200" height="14" rx="3" fill="#33473c" />
      <rect x="24" y="134" width="90" height="80" rx="4" fill="#e7e2d8" />
      <rect x="120" y="134" width="96" height="80" rx="4" fill="#e7e2d8" />
      <rect x="234" y="150" width="66" height="14" rx="3" fill="#33473c" />
      <rect x="238" y="164" width="58" height="50" rx="4" fill="#1f3d2f" />
      <line x1="60" y1="150" x2="80" y2="150" stroke="#241f1b" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="150" x2="170" y2="150" stroke="#241f1b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
