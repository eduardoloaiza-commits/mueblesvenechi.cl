import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThankYouPanel } from "@/components/ThankYouPanel";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gracias por tu cotización",
  robots: { index: false },
};

// Página de agradecimiento de respaldo (el configurador muestra el resultado
// en pantalla; esta queda como destino alternativo / enlace directo).
export default function GraciasPage() {
  return (
    <>
      <SiteHeader />
      <section className="container-page py-24">
        <ThankYouPanel
          heading="Recibimos tu cotización"
          sub={`Gracias por confiar en ${site.brand}. Un asesor te contactará muy pronto para afinar los detalles.`}
          waHref={whatsappLink(
            `Hola ${site.brand}, acabo de enviar mi cotización desde la web. Quiero coordinar la visita técnica.`
          )}
        />
      </section>
      <SiteFooter />
    </>
  );
}
