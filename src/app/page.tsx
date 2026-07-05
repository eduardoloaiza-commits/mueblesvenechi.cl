import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site, whatsappLink } from "@/lib/site";

const TRUST = ["40 días", "Precio desde claro", "15 años de oficio", "Marmolería propia"];

const LINEAS = [
  { n: "01", t: "Cocinas", d: "Diseñadas a tu espacio real, con la cubierta de piedra que elijas.", img: "/images/hero-kitchen.jpg" },
  { n: "02", t: "Closets y vestidores", d: "Aprovechan cada rincón y ordenan de verdad.", img: "/images/marble-quartz.jpg" },
  { n: "03", t: "Baños", d: "Vanitorios y guardado a prueba de humedad.", img: "/images/marble-sintered.jpg" },
  { n: "04", t: "Cubiertas de piedra", d: "Granito, cuarzo y piedra sinterizada, medidas e instaladas.", img: "/images/marble-granite.jpg" },
];

const PASOS = [
  { n: "01", t: "Arma tu cocina online", d: "Distribución, medidas, cubierta y terminaciones en minutos." },
  { n: "02", t: "Recibe un valor desde", d: "Un rango estimado al instante, sin esperar días." },
  { n: "03", t: "Afinamos en terreno", d: "Medimos, ajustamos y cerramos la cotización final." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Hero a sangre */}
      <section className="relative">
        <div className="relative min-h-[86vh] w-full overflow-hidden">
          <Image
            src="/images/hero-kitchen.jpg"
            alt="Cocina a medida Espacio VCH"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
          <div className="container-page relative flex min-h-[86vh] flex-col justify-center">
            <p className="kicker text-gold">Marmolería y mueblería · Villarrica</p>
            <h1 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              Tu cocina a medida, montada en {site.deliveryDays} días.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              Diseño a medida y ejecución milimétrica. Transformamos placas de piedra natural y
              maderas nobles en cocinas de alto estándar, sin demoras ni sobrecostos ocultos.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/cotiza" className="btn-primary">
                Cotiza tu cocina
              </Link>
              <a href="#trabajos" className="link-cta">
                Ver trabajos →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="border-y border-line bg-black">
        <div className="rule-gold" />
        <div className="container-page grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t} className="border-line md:border-l md:pl-6 [&:first-child]:md:border-l-0 [&:first-child]:md:pl-0">
              <span className="kicker text-foreground">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lo que fabricamos */}
      <section id="lineas" className="container-page py-24">
        <h2 className="font-display text-4xl font-medium text-foreground">Lo que fabricamos</h2>
        <div className="mt-3 h-px w-16 bg-gold" />

        <div className="mt-14 space-y-20">
          {LINEAS.map((l, i) => (
            <div
              key={l.n}
              className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-gold">{l.n}</span>
                  <span className="kicker text-muted">{l.t}</span>
                </div>
                <h3 className="font-display mt-4 text-3xl font-medium text-foreground">{l.t}</h3>
                <p className="mt-3 max-w-md text-muted">{l.d}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)]">
                <Image src={l.img} alt={l.t} fill className="object-cover" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulador */}
      <section id="proceso" className="border-y border-line bg-surface">
        <div className="container-page grid items-center gap-14 py-24 md:grid-cols-2">
          <div>
            <p className="kicker text-gold">El simulador</p>
            <h2 className="font-display mt-5 text-4xl font-medium text-foreground">
              Cotizar dejó de ser lento
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Antes había que agendar, esperar y mandar mensajes de ida y vuelta. Ahora empiezas tú,
              en pantalla, y llegas a la reunión con casi todo resuelto.
            </p>
            <div className="mt-10 space-y-6">
              {PASOS.map((p) => (
                <div key={p.n} className="flex gap-5 border-t border-line pt-6">
                  <span className="font-display text-xl text-gold">{p.n}</span>
                  <div>
                    <h3 className="font-medium text-foreground">{p.t}</h3>
                    <p className="mt-1 text-sm text-muted">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/cotiza" className="btn-primary mt-10">
              Arma tu cocina ahora
            </Link>
          </div>

          {/* Tarjeta mock del configurador */}
          <div className="border border-line bg-black p-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/marble-granite.jpg" alt="Preview cocina" fill className="object-cover" />
            </div>
            <div className="flex items-end justify-between p-5">
              <div>
                <p className="kicker text-gold">Estimación</p>
                <p className="font-display mt-1 text-3xl text-foreground">
                  desde $2.470.000
                </p>
              </div>
              <span className="kicker text-muted">Isla · Granito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registro de obra — banda clara para contraste (galería tipo museo) */}
      <section id="trabajos" className="bg-[#efe9dd] text-[#1a1712]">
        <div className="rule-gold" />
        <div className="container-page py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker text-gold-600">Registro de obra</p>
              <h2 className="font-display mt-3 text-4xl font-medium">Piezas que hablan por nosotros</h2>
            </div>
            <span className="kicker text-[#6b6255]">Próximamente con fotos reales de taller</span>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            <Frame className="col-span-2 row-span-2" ratio="aspect-square md:aspect-auto" src="/images/hero-kitchen.jpg" alt="Cocina terminada" />
            <Frame ratio="aspect-square" src="/images/marble-quartz.jpg" alt="Cubierta de cuarzo blanco" />
            <Frame ratio="aspect-square" src="/images/marble-granite.jpg" alt="Cubierta de granito" />
            <Frame className="col-span-2" ratio="aspect-[2/1]" src="/images/marble-sintered.jpg" alt="Piedra sinterizada" />
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section id="cobertura" className="relative overflow-hidden border-t border-line">
        <Image src="/images/marble-granite.jpg" alt="" fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container-page relative py-24 text-center">
          <p className="font-display mx-auto max-w-3xl text-3xl font-medium leading-snug text-foreground">
            “Llegaron cuando dijeron, instalaron impecable y la cocina quedó tal cual la habíamos
            imaginado.”
          </p>
          <p className="kicker mt-6 text-muted">Cliente · Pucón</p>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link href="/cotiza" className="btn-primary">
              Cotiza tu cocina
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">
            Cobertura: {site.cities.join(" · ")}. La estimación es referencial y se afina con la visita.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

// Imagen enmarcada tipo galería: mat blanco + sombra, para que la pieza
// resalte con contraste sobre cualquier fondo.
function Frame({
  src,
  alt,
  ratio,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  className?: string;
}) {
  return (
    <figure className={`bg-white p-2 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] ${className}`}>
      <div className={`relative w-full overflow-hidden ${ratio}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </figure>
  );
}
