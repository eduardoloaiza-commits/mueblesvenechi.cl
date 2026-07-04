import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color:var(--background)]/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-pine text-white font-display text-lg">
            V
          </span>
          <span className="font-semibold text-pine leading-tight">
            Muebles <span className="text-oak">Venechi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          <a href="/#lineas" className="hover:text-foreground">Qué hacemos</a>
          <a href="/#proceso" className="hover:text-foreground">Cómo trabajamos</a>
          <a href="/#trabajos" className="hover:text-foreground">Trabajos</a>
          <a href="/#cobertura" className="hover:text-foreground">Dónde estamos</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(`Hola ${site.brand}, quiero cotizar una cocina a medida.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-pine hover:text-oak sm:inline"
          >
            WhatsApp
          </a>
          <Link href="/cotiza" className="btn-primary text-sm !py-2.5 !px-4">
            Cotiza tu cocina
          </Link>
        </div>
      </div>
    </header>
  );
}
