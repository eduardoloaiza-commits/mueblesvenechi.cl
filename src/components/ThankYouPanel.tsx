import Link from "next/link";
import { site, mapsEmbedUrl } from "@/lib/site";
import { formatCLP } from "@/lib/pricing";

// Panel de confirmación post-cotización, compartido entre el ResultScreen del
// configurador (client) y la página /gracias (server). Sin hooks a propósito.
// Releva el siguiente paso comercial: la visita técnica de medición, con
// WhatsApp directo y agendamiento online (si hay bookingUrl configurada).
export function ThankYouPanel({
  heading,
  sub,
  priceFromLabel,
  waHref,
}: {
  heading: string;
  sub?: React.ReactNode;
  priceFromLabel?: string | null;
  waHref: string;
}) {
  return (
    <div className="mx-auto max-w-xl border border-line bg-surface p-8 sm:p-10">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-2xl text-gold">
          ✓
        </div>
        <h1 className="font-display mt-6 text-3xl font-medium text-foreground">{heading}</h1>
        {sub && <p className="mt-3 text-muted">{sub}</p>}
        {priceFromLabel && (
          <p className="mt-3 text-lg text-foreground">
            Tu estimación: <span className="text-gold">desde {priceFromLabel}</span>{" "}
            <span className="text-sm text-muted">+ IVA</span>
          </p>
        )}
      </div>

      {/* Siguiente paso: visita técnica */}
      <div className="mt-8 border border-line bg-surface-2 p-5">
        <p className="kicker text-gold">Siguiente paso</p>
        <p className="font-display mt-1 text-xl text-foreground">
          Visita técnica de medición · {formatCLP(site.visitPrice)}
        </p>
        <p className="mt-2 text-sm text-muted">
          Medimos en terreno, cerramos el diseño contigo y confirmamos el valor final de tu
          proyecto.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Conversar ahora por WhatsApp
          </a>
          {site.bookingUrl && (
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Agendar reunión online
            </a>
          )}
        </div>
      </div>

      {/* Mapa de la sede */}
      <div className="mt-6">
        <iframe
          src={mapsEmbedUrl}
          loading="lazy"
          title={`Mapa: ${site.address}`}
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[4/3] w-full border border-line"
        />
        <p className="mt-2 text-xs text-muted">
          Nuestra sede: {site.address}. También puedes visitarnos directamente.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted">
          La estimación es referencial, en valores netos (+ IVA). El valor final se confirma tras
          la visita técnica en terreno.
        </p>
        <Link href="/" className="btn-ghost mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
