import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

// Miga de pan visible + schema BreadcrumbList. El último crumb es la página actual.
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Miga de pan" className="container-page pt-6">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-muted/50">/</span>}
              {last ? (
                <span aria-current="page" className="text-foreground/80">{c.name}</span>
              ) : (
                <Link href={c.path} className="transition hover:text-gold">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
