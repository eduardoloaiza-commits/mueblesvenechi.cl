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

export const metadata = pageMetadata({
  title: "Muebles de baño a medida en Villarrica y Pucón",
  description:
    "Vanitorios y muebles de baño a medida con cubierta de piedra de nuestra marmolería. Materiales resistentes a la humedad, fabricados e instalados en la zona lacustre.",
  path: "/muebles-de-bano",
  ogImage: "/images/marble-sintered.jpg",
});

const PIEZAS = [
  {
    t: "Vanitorio con cubierta de piedra",
    d: "El mueble bajo lavamanos, con cubierta de cuarzo, granito o piedra sinterizada cortada en nuestra marmolería. Con o sin cajones, colgado o a piso.",
  },
  {
    t: "Mueble columna y repisas",
    d: "Guardado vertical para toallas y artículos de aseo, aprovechando la altura del baño sin invadir la circulación.",
  },
  {
    t: "Botiquín y espejo con mueble",
    d: "Espejos con guardado detrás o marco de mueble, a la medida exacta del muro sobre el vanitorio.",
  },
  {
    t: "Baño completo remodelado",
    d: "Si estás renovando el baño entero, coordinamos vanitorio, columna y accesorios como un solo proyecto con una sola instalación.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "¿Los muebles resisten la humedad del baño?",
    a: "Sí. Usamos tableros con cantos sellados en todas las caras, bisagras inoxidables y cubiertas de piedra no porosa. En la zona lacustre la humedad es alta todo el año, así que ese estándar no es opcional para nosotros.",
  },
  {
    q: "¿Puedo elegir la piedra de la cubierta?",
    a: "Sí. Al tener marmolería propia puedes elegir granito, cuarzo o piedra sinterizada, y definir el tipo de borde y la posición del lavamanos. Cortamos la cubierta a la medida exacta del mueble.",
  },
  {
    q: "¿Cuánto cuesta un vanitorio a medida?",
    a: "Un vanitorio con cubierta de cuarzo parte en torno a los quinientos mil pesos, dependiendo del tamaño, el tipo de piedra y el guardado interior. Escríbenos con las medidas de tu muro y te damos una referencia rápida.",
  },
  {
    q: "¿Cuánto demora?",
    a: "Entre dos y cuatro semanas desde la medición, según el proyecto. La instalación de un vanitorio toma medio día.",
  },
  {
    q: "¿Trabajan con gasfíter para la conexión?",
    a: "Nosotros dejamos el mueble y la cubierta instalados con las perforaciones listas para grifería y desagüe. La conexión final la hace tu gasfíter, o te recomendamos uno de confianza en la zona.",
  },
];

export default function MueblesDeBanoPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Muebles de baño a medida",
          description: metadata.description!,
          path: "/muebles-de-bano",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Muebles de baño", path: "/muebles-de-bano" },
        ]}
      />
      <PageHero
        kicker="Muebles de baño"
        title="Muebles de baño a medida, a prueba de humedad"
        lede="Vanitorios con cubierta de piedra real, columnas de guardado y espejos con mueble, fabricados para las medidas exactas de tu baño y para el clima del sur."
        image="/images/marble-sintered.jpg"
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              La ventaja de la marmolería propia
            </h2>
            <div className="mt-3 h-px w-16 bg-gold" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                En un baño la cubierta lo es todo: recibe agua, cosméticos y calor todos los días.
                Por eso los vanitorios Venechi llevan piedra de verdad, cortada y pulida en nuestra
                marmolería de Villarrica, con la perforación exacta para tu lavamanos y grifería.
              </p>
              <p>
                El mueble se fabrica con tableros sellados y herrajes preparados para ambientes
                húmedos. Es la misma calidad de nuestras cocinas, adaptada al punto más exigente de
                la casa.
              </p>
              <p>
                Instalamos en {site.cities.join(", ")} y alrededores, en baños nuevos y en
                remodelaciones.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] self-center overflow-hidden border border-white/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)]">
            <Image src="/images/marble-sintered.jpg" alt="Cubierta de piedra sinterizada para mueble de baño" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Lo que fabricamos para tu baño
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PIEZAS.map((p) => (
              <div key={p.t} className="border border-line bg-black p-6">
                <h3 className="font-medium text-foreground">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-muted">
            ¿Quieres comparar las piedras disponibles? Revisa la guía de{" "}
            <a href="/cubiertas-de-piedra" className="link-cta">cubiertas de piedra</a>. Y si el
            proyecto incluye la cocina, cotízala online en{" "}
            <a href="/cocinas-a-medida" className="link-cta">cocinas a medida</a>.
          </p>
        </div>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes sobre muebles de baño" />

      <CtaBand
        title="Cuéntanos cómo es tu baño y te cotizamos"
        note={`Atendemos ${site.cities.join(", ")} y alrededores. Respondemos el mismo día.`}
        whatsappMessage="Hola Espacio VCH, quiero cotizar un mueble de baño a medida."
        showConfigurator={false}
      />
      <SiteFooter />
    </>
  );
}
