import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
        <div className="mx-auto max-w-xl border border-line bg-surface p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-2xl text-gold">
            ✓
          </div>
          <h1 className="font-display mt-6 text-3xl font-medium text-foreground">
            Recibimos tu cotización
          </h1>
          <p className="mt-3 text-muted">
            Gracias por confiar en {site.brand}. Un asesor te contactará muy pronto para afinar
            los detalles y coordinar la visita de medición.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(`Hola ${site.brand}, acabo de enviar mi cotización desde la web.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Escribir por WhatsApp
            </a>
            <Link href="/" className="btn-ghost">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
