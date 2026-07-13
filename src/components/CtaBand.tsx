import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/lib/site";

// Banda de cierre con CTA doble: configurador + WhatsApp. En servicios sin
// configurador (closets, baños) se pasa showConfigurator=false y WhatsApp
// pasa a ser el botón principal.
export function CtaBand({
  title = "Arma tu cocina y conoce el precio hoy",
  note = "Estimación al instante, sin compromiso. El valor final se afina con la visita a terreno.",
  whatsappMessage = "Hola Muebles Venechi, quiero cotizar un proyecto a medida.",
  primaryLabel = "Cotiza tu cocina",
  primaryHref = "/cotiza",
  showConfigurator = true,
}: {
  title?: string;
  note?: string;
  whatsappMessage?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showConfigurator?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Image src="/images/marble-granite.jpg" alt="" fill className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="container-page relative py-20 text-center">
        <h2 className="font-display mx-auto max-w-2xl text-3xl font-medium leading-snug text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-5">
          {showConfigurator && (
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
          )}
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={showConfigurator ? "btn-ghost" : "btn-primary"}
          >
            Escríbenos por WhatsApp
          </a>
        </div>
        <p className="mt-6 text-xs text-muted">{note}</p>
      </div>
    </section>
  );
}
