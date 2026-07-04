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
      <div className="border-b border-border bg-surface-muted">
        <div className="container-page py-8">
          <h1 className="font-display text-3xl font-semibold text-pine sm:text-4xl">
            Arma tu cocina y conoce el precio
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Toma un par de minutos. A medida que eliges, el diseño y el valor estimado se
            actualizan en vivo.
          </p>
        </div>
      </div>
      <Configurator />
      <SiteFooter />
    </>
  );
}
