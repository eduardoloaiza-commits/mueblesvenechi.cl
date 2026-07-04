import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Configurator } from "./Configurator";

export const metadata: Metadata = {
  title: "Cotiza tu cocina a medida",
  description:
    "Arma tu cocina en pantalla: distribución, medidas, cubierta y terminaciones. Recibe un valor estimado al instante.",
};

export default function CotizaPage() {
  return (
    <>
      <SiteHeader />
      <div className="border-b border-line bg-surface">
        <div className="rule-gold" />
        <div className="container-page py-10">
          <p className="kicker text-gold">Simulador · Espacio VCH</p>
          <h1 className="font-display mt-4 text-3xl font-medium text-foreground sm:text-4xl">
            Arma tu cocina y conoce el precio
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Toma un par de minutos. A medida que eliges, el diseño y el valor estimado se
            actualizan en vivo. Solo pedimos tus datos al final.
          </p>
        </div>
      </div>
      <Configurator />
      <SiteFooter />
    </>
  );
}
