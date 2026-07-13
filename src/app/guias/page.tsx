import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guías para tu proyecto de cocina",
  description:
    "Guías escritas por el equipo de Muebles Venechi: cuánto cuesta una cocina a medida, cómo elegir entre granito, cuarzo y piedra sinterizada, y cómo medir tu cocina antes de cotizar.",
  path: "/guias",
});

const GUIAS = [
  {
    href: "/guias/cuanto-cuesta-una-cocina-a-medida",
    kicker: "Precios",
    t: "¿Cuánto cuesta una cocina a medida en Chile?",
    d: "Valores de referencia reales por tamaño de cocina, qué encarece un proyecto y dónde conviene invertir cada peso.",
  },
  {
    href: "/guias/granito-cuarzo-o-piedra-sinterizada",
    kicker: "Materiales",
    t: "Granito, cuarzo o piedra sinterizada",
    d: "Comparamos las tres piedras en durabilidad, mantención y precio, con recomendaciones honestas según tu uso.",
  },
  {
    href: "/guias/como-medir-tu-cocina",
    kicker: "Paso a paso",
    t: "Cómo medir tu cocina para cotizar",
    d: "Con una huincha y diez minutos obtienes las medidas que necesitas para una estimación seria. Te mostramos cómo.",
  },
];

export default function GuiasPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
        ]}
      />
      <PageHero
        kicker="Guías Venechi"
        title="Aprende antes de cotizar"
        lede="Lo que respondemos todas las semanas por WhatsApp, escrito con calma y sin letra chica: precios, materiales y cómo preparar tu proyecto."
      />
      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {GUIAS.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col border border-line bg-surface p-7 transition hover:border-gold"
            >
              <span className="kicker text-gold">{g.kicker}</span>
              <h2 className="font-display mt-3 text-xl font-medium text-foreground">{g.t}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{g.d}</p>
              <span className="link-cta mt-6 self-start text-sm">Leer la guía →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
      <SiteFooter />
    </>
  );
}
