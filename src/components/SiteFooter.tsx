import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-black">
      <div className="rule-gold" />
      <div className="container-page grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-1">
          <Image src="/logo-venechi.png" alt="Muebles Venechi" width={64} height={64} className="h-14 w-14" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Especialistas en superficies de cuarzo, mármol y granito para cocinas a medida de alto
            estándar. {site.yearsExperience} años de oficio en el sur de Chile.
          </p>
        </div>

        <div>
          <h3 className="kicker text-gold">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/cocinas-a-medida" className="transition hover:text-gold">Cocinas a medida</Link></li>
            <li><Link href="/closets-y-vestidores" className="transition hover:text-gold">Closets y vestidores</Link></li>
            <li><Link href="/muebles-de-bano" className="transition hover:text-gold">Muebles de baño</Link></li>
            <li><Link href="/cubiertas-de-piedra" className="transition hover:text-gold">Cubiertas de piedra</Link></li>
            <li><Link href="/guias" className="transition hover:text-gold">Guías</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="kicker text-gold">Sede</h3>
          <p className="mt-4 text-sm text-muted">Isabel Riquelme 241</p>
          <p className="text-sm text-muted">Villarrica, La Araucanía</p>
        </div>

        <div>
          <h3 className="kicker text-gold">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-gold">{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="kicker text-gold">Cobertura</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/cocinas-a-medida-villarrica" className="transition hover:text-gold">Cocinas en Villarrica</Link></li>
            <li><Link href="/cocinas-a-medida-pucon" className="transition hover:text-gold">Cocinas en Pucón</Link></li>
            <li>Lican Ray y alrededores</li>
          </ul>
          <Link href="/cotiza" className="btn-primary mt-5 text-sm">
            Cotiza tu cocina
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted/70 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Muebles Venechi · {site.domain}</span>
          <span className="kicker">Marmolería y Mueblería Venechi</span>
        </div>
      </div>
    </footer>
  );
}
