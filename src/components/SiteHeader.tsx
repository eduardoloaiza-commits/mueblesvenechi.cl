import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-vch.png"
            alt="Espacio VCH"
            width={40}
            height={40}
            className="h-9 w-9"
            priority
          />
          <span className="hidden text-sm font-medium tracking-[0.18em] text-foreground sm:inline">
            ESPACIO VCH
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#lineas" className="kicker text-muted transition hover:text-foreground">Materiales</a>
          <a href="/#proceso" className="kicker text-muted transition hover:text-foreground">Proceso</a>
          <a href="/#trabajos" className="kicker text-muted transition hover:text-foreground">Trabajos</a>
          <a href="/#cobertura" className="kicker text-muted transition hover:text-foreground">Contacto</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={whatsappLink(`Hola ${site.brand}, quiero cotizar una cocina a medida.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="kicker hidden text-muted transition hover:text-gold sm:inline"
          >
            WhatsApp
          </a>
          <Link href="/cotiza" className="btn-primary !py-2.5 !px-4 text-sm">
            Cotiza tu cocina
          </Link>
        </div>
      </div>
    </header>
  );
}
