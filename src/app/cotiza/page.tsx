import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import { Configurator } from "./Configurator";

export const metadata = pageMetadata({
  title: "Cotiza tu cocina o closet a medida online",
  description:
    "Arma tu cocina o tu closet en pantalla: distribución, medidas, materiales y terminaciones. Recibe un valor estimado al instante, sin esperar días por una cotización.",
  path: "/cotiza",
});

export default function CotizaPage() {
  return (
    <>
      <SiteHeader />
      <div className="border-b border-line bg-surface">
        <div className="rule-gold" />
        <div className="container-page py-10">
          <p className="kicker text-gold">Simulador · Espacio VCH</p>
          <h1 className="font-display mt-4 text-3xl font-medium text-foreground sm:text-4xl">
            Arma tu cocina o tu closet y conoce el precio
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Toma un par de minutos. A medida que eliges, el diseño y el valor estimado se
            actualizan en vivo. Solo pedimos tus datos al final.
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <Configurator />
      </Suspense>
      <SiteFooter />
    </>
  );
}
