import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageHero } from "./PageHero";
import { Breadcrumbs } from "./Breadcrumbs";
import { CtaBand } from "./CtaBand";
import { JsonLd } from "./JsonLd";
import { articleJsonLd } from "@/lib/seo";

// Cascarón común de las guías: breadcrumbs + hero + schema Article + CTA.
// El contenido del artículo va como children, con las clases de .guide-prose.
export function GuideLayout({
  title,
  description,
  path,
  crumbName,
  datePublished,
  lede,
  ctaTitle,
  children,
}: {
  title: string;
  description: string;
  path: string;
  crumbName: string;
  datePublished: string;
  lede: string;
  ctaTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <JsonLd data={articleJsonLd({ title, description, path, datePublished })} />
      <Breadcrumbs
        crumbs={[
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
          { name: crumbName, path },
        ]}
      />
      <PageHero kicker="Guías Venechi" title={title} lede={lede} />
      <article className="container-page guide-prose max-w-3xl py-16">{children}</article>
      <CtaBand title={ctaTitle} />
      <SiteFooter />
    </>
  );
}
