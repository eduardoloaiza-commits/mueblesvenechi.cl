import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-venechi.png"
            alt="Muebles Venechi"
            width={56}
            height={56}
            className="h-14 w-14"
            priority
          />
          <span className="hidden text-sm font-medium tracking-[0.18em] text-foreground sm:inline">
            MUEBLES VENECHI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/cocinas-a-medida" className="kicker text-muted transition hover:text-foreground">Cocinas</Link>
          <Link href="/closets-y-vestidores" className="kicker text-muted transition hover:text-foreground">Closets</Link>
          <Link href="/muebles-de-bano" className="kicker text-muted transition hover:text-foreground">Baños</Link>
          <Link href="/cubiertas-de-piedra" className="kicker text-muted transition hover:text-foreground">Cubiertas</Link>
          <Link href="/guias" className="kicker text-muted transition hover:text-foreground">Guías</Link>
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
