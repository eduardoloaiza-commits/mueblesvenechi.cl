import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, type FaqItem } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Closets y vestidores a medida en Villarrica y Pucón",
  description:
    "Closets, walk-in closets y vestidores fabricados a la medida exacta de tu dormitorio. Diseño e instalación en Villarrica, Pucón y Lican Ray, con 15 años de oficio.",
  path: "/closets-y-vestidores",
});

const TIPOS = [
  {
    t: "Closet empotrado",
    d: "Aprovecha la pared completa, de piso a cielo. Puertas de abatir o correderas según el espacio disponible frente a la cama.",
  },
  {
    t: "Walk-in closet",
    d: "Un vestidor caminable con módulos abiertos, cajoneras y barras a distintas alturas. Ideal para dormitorios principales y lofts.",
  },
  {
    t: "Vestidor en esquina o bajo escala",
    d: "Los rincones difíciles son nuestra especialidad. Diseñamos módulos que convierten espacios perdidos en guardado real.",
  },
  {
    t: "Closet infantil y de pasillo",
    d: "Interiores reconfigurables que crecen con los niños, y muebles de pasillo poco profundos para ropa de estación.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "¿Cuánto cuesta un closet a medida?",
    a: "Depende de los metros de frente, la altura, las puertas y el equipamiento interior. Un closet empotrado de dos metros parte en torno al millón de pesos y un walk-in completo puede llegar a tres o más. Puedes armar el tuyo en el configurador online y ver el valor estimado al instante.",
  },
  {
    q: "¿Cuánto demora la fabricación e instalación?",
    a: "Entre tres y cinco semanas desde la medición en terreno, según la complejidad. La instalación misma toma uno o dos días y dejamos el dormitorio limpio y funcionando.",
  },
  {
    q: "¿Qué materiales usan para el sur de Chile?",
    a: "Tableros de melamina de 18 mm con cantos sellados, pensados para la humedad de la zona lacustre. Los herrajes son con cierre suave y las barras metálicas. En terminaciones premium trabajamos frentes laqueados.",
  },
  {
    q: "¿Diseñan el interior del closet conmigo?",
    a: "Sí. Antes de fabricar definimos juntos cuánta ropa colgada, cuántos cajones, dónde van los zapatos y qué queda a mano. El diseño interior es la mitad del valor de un closet bien hecho.",
  },
  {
    q: "¿Hacen closets en Pucón y Lican Ray?",
    a: "Sí, instalamos en toda la zona lacustre: Villarrica, Pucón y Lican Ray. Muchos de nuestros closets van en segundas viviendas y casas de arriendo turístico de la zona.",
  },
];

export default function ClosetsPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={serviceJsonLd({
          name: "Closets y vestidores a medida",
          description: metadata.description!,
          path: "/closets-y-vestidores",
        })}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Closets y vestidores", path: "/closets-y-vestidores" },
        ]}
      />
      <PageHero
        kicker="Closets y vestidores"
        title="Closets a medida que ordenan de verdad"
        lede="Cada dormitorio tiene medidas distintas y cada familia guarda distinto. Fabricamos closets y vestidores para tu espacio exacto, con el interior pensado para tu ropa y tu rutina, no para un catálogo."
        image="/images/marble-quartz.jpg"
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
              El problema no es el espacio, es el mueble
            </h2>
            <div className="mt-3 h-px w-16 bg-gold" />
            <div className="mt-6 space-y-4 text-muted">
              <p>
                Un closet comprado en el retail deja aire arriba, huecos a los costados y un
                interior genérico que nunca calza con lo que realmente guardas. A medida es al
                revés: partimos por tu pared, tu altura de cielo y tu ropa, y el mueble se fabrica
                para eso.
              </p>
              <p>
                Llevamos {site.yearsExperience} años fabricando muebles en Villarrica. Los mismos
                maestros que hacen nuestras cocinas fabrican los closets, con los mismos tableros,
                herrajes y estándar de terminación.
              </p>
              <p>
                Diseñamos contigo el interior completo: barras a doble altura, cajoneras con riel
                telescópico, zapateras, maleteros y módulos abiertos donde tenga sentido.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] self-center overflow-hidden border border-white/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)]">
            <Image src="/images/marble-quartz.jpg" alt="Closet a medida con terminación clara" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Lo que fabricamos
          </h2>
          <div className="mt-3 h-px w-16 bg-gold" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TIPOS.map((t) => (
              <div key={t.t} className="border border-line bg-black p-6">
                <h3 className="font-medium text-foreground">{t.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-muted">
            ¿Estás renovando la casa completa? Los closets suelen ir de la mano con la cocina y el
            baño. Mira también nuestras{" "}
            <a href="/cocinas-a-medida" className="link-cta">cocinas a medida</a> y{" "}
            <a href="/muebles-de-bano" className="link-cta">muebles de baño</a>.
          </p>
        </div>
      </section>

      <FaqSection items={FAQ} title="Preguntas frecuentes sobre closets a medida" />

      <CtaBand
        title="Arma tu closet online y conoce el precio"
        note={`Estimación al instante, sin compromiso. Atendemos ${site.cities.join(", ")} y alrededores.`}
        whatsappMessage="Hola Espacio VCH, quiero cotizar un closet a medida."
        primaryLabel="Cotiza tu closet"
        primaryHref="/cotiza?producto=closet"
      />
      <SiteFooter />
    </>
  );
}
