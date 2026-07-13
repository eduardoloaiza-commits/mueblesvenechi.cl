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
  title: "Cocinas a medida en Pucón",
  description:
    "Cocinas a medida para casas, cabañas y departamentos en Pucón. Fabricación en nuestro taller de Villarrica, a 25 minutos, y montaje completo en 40 días, ideal entre temporadas.",
  path: "/cocinas-a-medida-pucon",
});

const FAQ: FaqItem[] = [
  {
    q: "¿Instalan en Pucón o hay recargo por traslado?",
    a: "Instalamos en Pucón de forma habitual: nuestro taller está en Villarrica, a 25 minutos. El flete y la instalación están incluidos en la cotización, sin recargos sorpresa.",
  },
  {
    q: "No vivo en Pucón todo el año. ¿Pueden coordinar el proyecto a distancia?",
    a: "Sí, es un caso muy común. Muchos de nuestros clientes administran su casa de Pucón desde Santiago u otra ciudad. Coordinamos la medición con quien cuide la propiedad, te mantenemos al tanto por WhatsApp con fotos de avance y agendamos el montaje para cuando te acomode.",
  },
  {
    q: "¿Alcanzan a tener la cocina lista antes de la temporada alta?",
    a: "Si cerramos diseño y medición con al menos 40 días de anticipación, sí. La ventana ideal para renovar una cocina de arriendo turístico es entre marzo y noviembre. Mientras antes cotices, mejor fecha de montaje aseguras.",
  },
  {
    q: "¿Qué materiales recomiendan para arriendo turístico?",
    a: "Para cocinas que reciben arrendatarios todo el año recomendamos cuarzo o piedra sinterizada en la cubierta, que aguantan el trato de personas que no cuidan la casa como tú, y frentes de melamina de buena calidad, fáciles de mantener y reparar.",
  },
];

export default function CocinasPuconPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Cocinas a medida en Pucón",
          description: metadata.description!,
          path: "/cocinas-a-medida-pucon",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Cocinas a medida", path: "/cocinas-a-medida" },
          { name: "Pucón", path: "/cocinas-a-medida-pucon" },
        ]}
      />
      <PageHero
        kicker="Pucón · La Araucanía"
        title="Cocinas a medida en Pucón, sin depender de Santiago"
        lede="Casas de lago, cabañas y departamentos de Pucón tienen algo en común: espacios que merecen más que muebles de catálogo. Fabricamos tu cocina a 25 minutos, en nuestro taller de Villarrica, y la montamos completa en 40 días."
        image="/images/hero-kitchen.jpg"
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              Pensadas para cómo se vive en Pucón
            </h2>
            <div className="mt-3 h-px w-16 bg-gold" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Una cocina en Pucón trabaja distinto: recibe la casa llena en verano y en las
                semanas de nieve, convive con la estufa a leña y la humedad del lago, y muchas veces
                atiende arrendatarios que no la cuidan como el dueño. Los materiales y el diseño
                tienen que estar a la altura de ese uso.
              </p>
              <p>
                Por eso en Pucón recomendamos cubiertas de piedra no porosa, frentes fáciles de
                mantener y herrajes que aguanten años de apertura sin desajustarse. Todo fabricado
                en nuestro taller de Villarrica, con {site.yearsExperience} años de oficio en la
                zona lacustre.
              </p>
              <p>
                Si administras la propiedad a distancia, nos adaptamos: medición coordinada con tu
                gente de confianza, avance por WhatsApp y montaje agendado para tu próxima visita o
                antes de la temporada.
              </p>
            </div>
          </div>
          <div className="self-center">
            <div className="border border-line bg-surface p-8">
              <p className="kicker text-gold">Datos útiles</p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>Taller en Villarrica, a 25 minutos de Pucón.</li>
                <li>Flete e instalación incluidos en la cotización.</li>
                <li>Cocina montada y funcionando en {site.deliveryDays} días.</li>
                <li>Proyecto coordinable 100% a distancia.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Renueva entre temporadas
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <p className="mt-5 max-w-2xl text-muted">
            El mejor momento para cambiar la cocina de una propiedad de arriendo es cuando el
            calendario está vacío. Con 40 días de plazo real, una cocina cotizada en marzo está
            funcionando mucho antes del invierno, y una cotizada en septiembre queda lista para
            el verano.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Cotiza online hoy", d: "Cinco minutos en el configurador y tienes un valor estimado para decidir." },
              { t: "Medimos y cerramos", d: "Coordinamos la visita a Pucón y fijamos diseño, precio y fecha de montaje." },
              { t: "Entrega en 40 días", d: "La cocina queda instalada y funcionando, lista para la temporada." },
            ].map((x) => (
              <div key={x.t} className="border border-line bg-black p-6">
                <h3 className="font-medium text-foreground">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-muted">
            ¿Quieres ver materiales y precios en detalle? Revisa{" "}
            <Link href="/cocinas-a-medida" className="link-cta">cocinas a medida</Link> y{" "}
            <Link href="/cubiertas-de-piedra" className="link-cta">cubiertas de piedra</Link>.
          </p>
        </div>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes en Pucón" />

      <CtaBand
        title="Tu cocina de Pucón, lista en 40 días"
        whatsappMessage="Hola Espacio VCH, quiero cotizar una cocina a medida en Pucón."
      />
      <SiteFooter />
    </>
  );
}
