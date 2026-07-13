import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, type FaqItem } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cubiertas de granito, cuarzo y piedra sinterizada",
  description:
    "Marmolería en Villarrica: cortamos, pulimos e instalamos cubiertas de granito, cuarzo y piedra sinterizada para cocinas y baños en toda la zona lacustre.",
  path: "/cubiertas-de-piedra",
  ogImage: "/images/marble-granite.jpg",
});

const PIEDRAS = [
  {
    nombre: "Granito",
    img: "/images/marble-granite.jpg",
    resumen: "Piedra natural, única en cada placa.",
    detalle:
      "El clásico que no falla: durísimo, tolera ollas calientes y cada placa tiene un veteado irrepetible. Requiere sellado periódico por ser levemente poroso. Excelente relación precio y durabilidad.",
    ideal: "Cocinas de uso intenso y quienes valoran la piedra natural.",
  },
  {
    nombre: "Cuarzo",
    img: "/images/marble-quartz.jpg",
    resumen: "Superficie uniforme, no porosa e higiénica.",
    detalle:
      "Piedra de ingeniería: color parejo, sin poros, no necesita sellado y no absorbe manchas de vino, café o limón. Es el material más pedido en cocinas modernas. Conviene proteger del calor directo.",
    ideal: "Cocinas claras y minimalistas, familias con niños.",
  },
  {
    nombre: "Piedra sinterizada",
    img: "/images/marble-sintered.jpg",
    resumen: "Alta gama: resiste calor, rayas y manchas.",
    detalle:
      "La tecnología más avanzada en superficies: soporta calor directo, no se raya con cuchillos y viene en formatos grandes con muy pocas junturas. Es la opción premium de nuestro catálogo.",
    ideal: "Proyectos de alto estándar e islas protagonistas.",
  },
  {
    nombre: "Postformado",
    img: "/images/hero-kitchen.jpg",
    resumen: "La alternativa económica y honesta.",
    detalle:
      "Tablero recubierto con laminado de alta presión. No es piedra, pero bien instalado rinde años y permite armar una cocina completa con presupuesto acotado. Lo decimos sin rodeos: si puedes subir a piedra, sube.",
    ideal: "Presupuestos ajustados y propiedades de arriendo.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "¿Granito o cuarzo? ¿Cuál me conviene?",
    a: "Si quieres piedra natural con veta única y máxima resistencia al calor, granito. Si prefieres color uniforme, cero poros y cero mantención, cuarzo. En precio son parecidos; la decisión es más de estilo y de uso que de presupuesto. En nuestra guía comparamos los dos en detalle.",
  },
  {
    q: "¿Venden solo la cubierta, sin los muebles?",
    a: "Sí. Muchos clientes llegan solo por la marmolería: les cortamos e instalamos la cubierta sobre muebles existentes. Medimos en terreno para que calce exacto, incluyendo perforaciones de lavaplatos y encimera.",
  },
  {
    q: "¿Cuánto cuesta una cubierta de piedra?",
    a: "Como referencia por metro lineal instalado: el granito parte cerca de los ciento treinta mil pesos, el cuarzo algo más arriba y la piedra sinterizada es la línea premium. El valor exacto depende de la placa elegida, los cortes y las perforaciones.",
  },
  {
    q: "¿Cuánto demora el corte y la instalación?",
    a: "Al tener taller propio en Villarrica, una cubierta sola demora una a dos semanas desde la medición. La instalación toma medio día. Si es parte de una cocina completa, va dentro del plazo de 40 días del proyecto.",
  },
  {
    q: "¿Qué pasa si mi cubierta se mancha o se pica?",
    a: "El granito se puede repulir y volver a sellar. En cuarzo y sinterizado las manchas superficiales salen con limpieza normal. Si hay un daño mayor, evaluamos reparación en terreno antes de hablar de reemplazo.",
  },
];

export default function CubiertasPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Cubiertas de piedra para cocinas y baños",
          description: metadata.description!,
          path: "/cubiertas-de-piedra",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Cubiertas de piedra", path: "/cubiertas-de-piedra" },
        ]}
      />
      <PageHero
        kicker="Marmolería Venechi"
        title="Cubiertas de piedra cortadas en nuestro propio taller"
        lede="Partimos como marmolería hace más de una década y sigue siendo el corazón del negocio. Granito, cuarzo y piedra sinterizada, medidos, cortados e instalados por el mismo equipo, sin intermediarios."
        image="/images/marble-granite.jpg"
      />

      <section className="container-page py-20">
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Los cuatro materiales que trabajamos
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" />
        <div className="mt-12 space-y-16">
          {PIEDRAS.map((p, i) => (
            <div
              key={p.nombre}
              className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <span className="kicker text-gold">{p.resumen}</span>
                <h3 className="font-display mt-3 text-2xl font-medium text-foreground sm:text-3xl">{p.nombre}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{p.detalle}</p>
                <p className="mt-4 text-sm text-muted">
                  <span className="text-foreground/80">Ideal para:</span> {p.ideal}
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)]">
                <Image src={p.img} alt={`Cubierta de ${p.nombre.toLowerCase()}`} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                Por qué importa que la marmolería sea propia
              </h2>
              <div className="mt-3 h-px w-16 bg-gold" />
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  Cuando la cubierta se manda a cortar afuera, cualquier diferencia de milímetros
                  aparece el día de la instalación, y ahí ya es tarde. En Venechi el maestro que
                  fabricó tus muebles trabaja a metros de quien corta tu piedra, sobre la misma
                  medición.
                </p>
                <p>
                  Eso se traduce en junturas mínimas, perforaciones exactas para lavaplatos y
                  encimera, y un solo responsable de principio a fin. También es la razón de que
                  podamos cumplir plazos que en la industria parecen imposibles.
                </p>
                <p>
                  Atendemos {site.cities.join(", ")} y alrededores, tanto proyectos completos como
                  cubiertas sueltas sobre muebles existentes.
                </p>
              </div>
            </div>
            <div className="self-center">
              <div className="border border-line bg-black p-8">
                <p className="kicker text-gold">¿Aún no decides el material?</p>
                <p className="mt-4 text-muted">
                  Escribimos una guía que compara granito, cuarzo y piedra sinterizada en
                  durabilidad, mantención y precio, con recomendaciones honestas según tu caso.
                </p>
                <Link href="/guias/granito-cuarzo-o-piedra-sinterizada" className="link-cta mt-6 inline-flex">
                  Leer la comparación completa →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes sobre cubiertas" />

      <CtaBand
        title="Elige tu piedra y cotiza tu cubierta"
        note="Si es para una cocina completa, el configurador incluye la cubierta en la estimación."
        whatsappMessage="Hola Muebles Venechi, quiero cotizar una cubierta de piedra."
      />
      <SiteFooter />
    </>
  );
}
