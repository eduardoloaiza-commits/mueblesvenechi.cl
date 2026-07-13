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

export const metadata = pageMetadata({
  title: "Cocinas a medida en Villarrica",
  description:
    "Fabricamos cocinas a medida en nuestro taller de Villarrica, en Isabel Riquelme 241. Visita la marmolería, elige tu piedra en persona y recibe tu cocina montada en 40 días.",
  path: "/cocinas-a-medida-villarrica",
});

const FAQ: FaqItem[] = [
  {
    q: "¿Puedo visitar el taller en Villarrica?",
    a: "Sí, y lo recomendamos. Estamos en Isabel Riquelme 241, Villarrica. Puedes ver placas de granito, cuarzo y piedra sinterizada en persona, tocar las terminaciones de los frentes y conversar el proyecto con quien realmente lo va a fabricar.",
  },
  {
    q: "¿Cuánto demora la visita de medición dentro de Villarrica?",
    a: "Al estar en la misma ciudad, normalmente agendamos la medición dentro de la misma semana en que cotizas. Ese es el primer paso para activar el plazo de 40 días.",
  },
  {
    q: "¿Trabajan remodelaciones de casas antiguas de Villarrica?",
    a: "Sí, es gran parte de lo que hacemos. Las casas de más años suelen tener muros fuera de escuadra y pisos desnivelados; fabricar a medida es justamente lo que permite que la cocina calce perfecto igual.",
  },
  {
    q: "¿Atienden los sectores rurales alrededor de Villarrica?",
    a: "Sí. Instalamos en los caminos Villarrica Pucón, Villarrica Lican Ray y sectores como Molco o Pedregoso. Si tu proyecto está más lejos, escríbenos y lo evaluamos.",
  },
];

export default function CocinasVillarricaPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Cocinas a medida en Villarrica",
          description: metadata.description!,
          path: "/cocinas-a-medida-villarrica",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Cocinas a medida", path: "/cocinas-a-medida" },
          { name: "Villarrica", path: "/cocinas-a-medida-villarrica" },
        ]}
      />
      <PageHero
        kicker="Villarrica · La Araucanía"
        title="Cocinas a medida en Villarrica, hechas en Villarrica"
        lede="Nuestro taller y marmolería están en Isabel Riquelme 241. Tu cocina no viaja en camión desde Santiago: se fabrica a minutos de tu casa, por maestros que llevan años haciendo muebles para las casas del lago."
        image="/images/hero-kitchen.jpg"
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              El fabricante local, no el intermediario
            </h2>
            <div className="mt-3 h-px w-16 bg-gold" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                En Villarrica es común cotizar una cocina y descubrir que quien te atiende solo
                revende algo fabricado a cientos de kilómetros. Cada ajuste se convierte en semanas
                de espera y cada problema, en llamadas sin respuesta.
              </p>
              <p>
                Venechi es lo contrario: {site.yearsExperience} años fabricando aquí mismo, con
                marmolería propia. Puedes venir al taller, ver tu piedra antes de que la cortemos y
                conocer a las personas que harán tus muebles. Si algo necesita ajuste después de la
                entrega, estamos a minutos, no a un call center de distancia.
              </p>
              <p>
                Trabajamos casas nuevas de los sectores en crecimiento, remodelaciones del centro y
                casas de lago que se renuevan para la temporada.
              </p>
            </div>
          </div>
          <div className="self-center">
            <div className="border border-line bg-surface p-8">
              <p className="kicker text-gold">Taller y sala de piedras</p>
              <p className="mt-4 text-lg text-foreground">{site.address.split(",")[0]}</p>
              <p className="text-muted">Villarrica, Región de La Araucanía</p>
              <div className="mt-6 space-y-2 text-sm text-muted">
                <p>Medición en terreno dentro de la semana.</p>
                <p>Cocina montada y funcionando en {site.deliveryDays} días.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Empieza online, termina en el taller
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <p className="mt-5 max-w-2xl text-muted">
            El camino más corto: arma tu cocina en el{" "}
            <Link href="/cotiza" className="link-cta">configurador online</Link> para tener un valor
            estimado, y después pasa por el taller a ver materiales en persona. Llegas a la reunión
            con el proyecto ya conversado y nosotros llegamos con los números claros.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Cotiza desde tu casa", d: "Cinco minutos en el configurador y sabes el orden de magnitud de tu proyecto." },
              { t: "Ve la piedra real", d: "En el taller eliges la placa exacta de granito, cuarzo o sinterizado para tu cubierta." },
              { t: "Seguimiento cercano", d: "Tu cocina se fabrica aquí mismo: puedes ver el avance sin depender de nadie más." },
            ].map((x) => (
              <div key={x.t} className="border border-line bg-black p-6">
                <h3 className="font-medium text-foreground">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes en Villarrica" />

      <CtaBand
        title="Tu cocina se fabrica a minutos de tu casa"
        whatsappMessage="Hola Espacio VCH, quiero cotizar una cocina a medida en Villarrica."
      />
      <SiteFooter />
    </>
  );
}
