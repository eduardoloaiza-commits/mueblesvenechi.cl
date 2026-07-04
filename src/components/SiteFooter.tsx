import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-pine text-white/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 font-display text-lg text-white">
              V
            </span>
            <span className="font-semibold text-white">Muebles Venechi</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Cocinas, closets y baños a medida con marmolería propia. {site.yearsExperience} años
            fabricando en el sur de Chile.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="font-semibold text-white">Contacto</h3>
          <ul className="mt-4 space-y-2 text-white/70">
            <li>{site.address}</li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-oak">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-oak">{site.email}</a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="font-semibold text-white">Cobertura</h3>
          <p className="mt-4 text-white/70">{site.cities.join(" · ")}</p>
          <Link href="/cotiza" className="btn-primary mt-5 text-sm">
            Cotiza tu cocina
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Muebles Venechi · {site.domain}</span>
          <span>Antes Espacio VCH y Marmolería Venechi. Ahora todo bajo un solo nombre.</span>
        </div>
      </div>
    </footer>
  );
}
