import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, type FaqItem } from "@/lib/seo";
import { site } from "@/lib/site";
import { LAYOUTS, FRONTS } from "@/lib/kitchen-options";
import { calcPrice, formatCLP, type KitchenConfig } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "Cocinas a medida en Villarrica y Pucón",
  description:
    "Fabricamos cocinas a medida con marmolería propia en Villarrica, Pucón y Lican Ray. Diseño, fabricación e instalación en 40 días. Cotiza online y conoce tu precio al instante.",
  path: "/cocinas-a-medida",
});

// Cocinas de ejemplo para la sección de precios. Se calculan con el motor
// real, así esta página siempre refleja la tabla vigente de lib/pricing.ts.
const EJEMPLOS: { nombre: string; detalle: string; config: KitchenConfig }[] = [
  {
    nombre: "Cocina compacta",
    detalle: "Lineal de 2,4 m, postformado y melamina lisa, con lavaplatos. Cajones incluidos.",
    config: {
      layout: "lineal",
      baseMeters: 2.4,
      drawerMeters: 0.5,
      wallMeters: 1.8,
      wallPosition: "completo",
      countertop: "postformado",
      front: "melamina-mate",
      extras: ["lavaplatos"],
      projectType: "nueva",
    },
  },
  {
    nombre: "Cocina familiar en L",
    detalle: "En L de 3,6 m con un metro de cajonera, cubierta de cuarzo y melamina símil madera.",
    config: {
      layout: "l",
      baseMeters: 3.6,
      drawerMeters: 1,
      wallMeters: 2.4,
      wallPosition: "completo",
      countertop: "cuarzo",
      front: "melamina-madera",
      extras: ["lavaplatos", "especiero", "basurero-retractil"],
      projectType: "nueva",
    },
  },
  {
    nombre: "Cocina con isla",
    detalle: "Isla central, piedra ultracompacta, frentes laqueados, vitrinas e iluminación LED.",
    config: {
      layout: "isla",
      baseMeters: 4.2,
      drawerMeters: 1.5,
      wallMeters: 2.4,
      wallPosition: "completo",
      countertop: "ultracompacto",
      front: "laqueado",
      lacquerColor: "negro",
      extras: ["lavaplatos", "especiero", "basurero-retractil", "vitrinas", "iluminacion"],
      projectType: "nueva",
    },
  },
];

const FAQ: FaqItem[] = [
  {
    q: "¿Cuánto demora una cocina a medida con Venechi?",
    a: "Cuarenta días desde que cerramos el diseño y la medición en terreno hasta que la cocina queda montada y funcionando. Es un plazo que podemos cumplir porque fabricamos los muebles y las cubiertas de piedra en nuestro propio taller de Villarrica, sin depender de terceros.",
  },
  {
    q: "¿Cuánto cuesta una cocina a medida?",
    a: "Depende de los metros lineales, la cubierta y las terminaciones. Como referencia, una cocina compacta parte cerca de los dos millones de pesos netos y una cocina con isla y piedra ultracompacta puede superar los cinco. Con el configurador online obtienes un valor estimado para tu caso en menos de cinco minutos.",
  },
  {
    q: "¿Trabajan fuera de Villarrica?",
    a: "Sí. Instalamos en Villarrica, Pucón y Lican Ray. Si tu proyecto está en otra comuna de la zona lacustre, escríbenos por WhatsApp y lo evaluamos.",
  },
  {
    q: "¿Qué incluye el precio?",
    a: "Los muebles base y murales fabricados a la medida exacta de tu espacio, la cubierta que elijas cortada y pulida en nuestra marmolería, los herrajes, el flete y la instalación completa. No trabajamos con costos ocultos: lo que cotizas es lo que pagas.",
  },
  {
    q: "¿Puedo remodelar mi cocina actual o solo hacen cocinas nuevas?",
    a: "Hacemos ambas. En remodelaciones retiramos la cocina antigua, ajustamos lo necesario y montamos la nueva. El configurador tiene una opción específica para remodelación que considera ese trabajo extra.",
  },
  {
    q: "¿Cómo parto? ¿Tengo que saber las medidas exactas?",
    a: "No. Con medidas aproximadas de tus paredes basta para obtener una estimación online. Antes de fabricar, vamos a tu casa y medimos todo con precisión. Esa medición es la que manda.",
  },
];

export default function CocinasAMedidaPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Cocinas a medida",
          description: metadata.description!,
          path: "/cocinas-a-medida",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Cocinas a medida", path: "/cocinas-a-medida" },
        ]}
      />
      <PageHero
        kicker="Cocinas a medida"
        title="Cocinas a medida, fabricadas e instaladas en 40 días"
        lede="Diseñamos y fabricamos tu cocina en nuestro taller de Villarrica, con cubiertas de piedra cortadas en nuestra propia marmolería. Sin intermediarios, sin demoras y con un precio claro desde el primer día."
        image="/images/hero-kitchen.jpg"
      />

      {/* Qué significa "a medida" */}
      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              A medida de verdad, no módulos adaptados
            </h2>
            <div className="mt-3 h-px w-16 bg-gold" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Una cocina a medida se fabrica para tu espacio exacto: cada mueble llega con los
                centímetros que tu pared tiene, no con los que trae el módulo del retail. Eso
                significa cero espacios muertos, cajones donde los necesitas y una cubierta que
                calza sin junturas improvisadas.
              </p>
              <p>
                En Venechi llevamos {site.yearsExperience} años fabricando muebles en el sur de
                Chile. Partimos como marmolería y eso sigue siendo nuestra ventaja: la cubierta de
                granito, cuarzo o piedra sinterizada se corta y pule en nuestro taller, sobre la
                medida real de tus muebles. Por eso podemos comprometer 40 días donde otros piden
                tres o cuatro meses.
              </p>
              <p>
                Trabajamos en {site.cities.join(", ")} y alrededores, tanto en casas nuevas como en
                remodelaciones de cocinas existentes.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] self-center overflow-hidden border border-white/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)]">
            <Image src="/images/hero-kitchen.jpg" alt="Cocina a medida fabricada por Muebles Venechi" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Distribuciones */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Distribuciones que fabricamos
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <p className="mt-5 max-w-2xl text-muted">
            La distribución define cuánto rinde tu cocina en el día a día. Estas son las cuatro que
            más pedimos en la zona, y todas se pueden armar en el configurador para comparar precios.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LAYOUTS.map((l) => (
              <div key={l.id} className="border border-line bg-black p-6">
                <span className="kicker text-gold">{l.label}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materiales */}
      <section className="container-page py-20">
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Frentes y terminaciones
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" />
        <p className="mt-5 max-w-2xl text-muted">
          Los frentes son lo que ves y tocas todos los días. Trabajamos tres líneas de terminación,
          todas con tableros de 18 mm y herrajes con cierre suave.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FRONTS.map((f) => (
            <div key={f.id} className="border border-line bg-surface p-6">
              <div className="h-10 w-10 border border-white/20" style={{ backgroundColor: f.swatch }} />
              <h3 className="mt-4 font-medium text-foreground">{f.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-muted">
          Para la cubierta trabajamos granito, cuarzo y piedra sinterizada de nuestra marmolería,
          además de postformado como alternativa económica. Comparamos los cuatro materiales en{" "}
          <Link href="/cubiertas-de-piedra" className="link-cta">
            cubiertas de piedra
          </Link>
          .
        </p>
      </section>

      {/* Precios de referencia */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            ¿Cuánto cuesta una cocina a medida?
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <p className="mt-5 max-w-2xl text-muted">
            Tres cocinas de ejemplo, calculadas con los mismos valores del configurador. Son
            referencias "desde": el precio final se cierra después de medir en terreno.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {EJEMPLOS.map((e) => {
              const p = calcPrice(e.config);
              return (
                <div key={e.nombre} className="flex flex-col border border-line bg-black p-6">
                  <h3 className="font-medium text-foreground">{e.nombre}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{e.detalle}</p>
                  <p className="font-display mt-5 text-2xl text-gold">desde {formatCLP(p.from)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <Link href="/guias/cuanto-cuesta-una-cocina-a-medida" className="link-cta">
              Ver la guía completa de precios →
            </Link>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="container-page py-20">
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Así llegamos a los 40 días
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" />
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {[
            { n: "01", t: "Cotiza online", d: "Armas tu cocina en el configurador y recibes un valor estimado al instante." },
            { n: "02", t: "Medición en terreno", d: "Visitamos tu casa, medimos milimétricamente y cerramos diseño y precio." },
            { n: "03", t: "Fabricación en taller", d: "Muebles y cubierta se fabrican en paralelo en nuestro taller de Villarrica." },
            { n: "04", t: "Montaje final", d: "Instalamos todo en pocos días y te entregamos la cocina funcionando." },
          ].map((p) => (
            <div key={p.n} className="border-t border-line pt-6">
              <span className="font-display text-xl text-gold">{p.n}</span>
              <h3 className="mt-3 font-medium text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-muted">
          ¿Tu proyecto está en la zona lacustre? Mira lo que hacemos en{" "}
          <Link href="/cocinas-a-medida-villarrica" className="link-cta">Villarrica</Link> y en{" "}
          <Link href="/cocinas-a-medida-pucon" className="link-cta">Pucón</Link>.
        </p>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes sobre cocinas a medida" />

      <CtaBand
        title="Arma tu cocina online y conoce el precio hoy"
        whatsappMessage="Hola Espacio VCH, quiero cotizar una cocina a medida."
      />
      <SiteFooter />
    </>
  );
}
