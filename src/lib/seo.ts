// Utilidades SEO: metadata por página y builders de JSON-LD.
// Toda URL pública se declara acá (PAGES) y alimenta sitemap, canonicals
// y navegación, para que no se desincronicen.

import type { Metadata } from "next";
import { site } from "./site";

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

/** Metadata consistente por página: title, description, canonical y OG. */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/images/hero-kitchen.jpg",
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.brand,
      locale: "es_CL",
      type: "website",
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 800 }],
    },
  };
}

// ------- Registro de páginas públicas (fuente del sitemap y del footer) -------

export interface PublicPage {
  path: string;
  /** Prioridad relativa para el sitemap. */
  priority: number;
  changeFrequency: "weekly" | "monthly";
}

export const PAGES: PublicPage[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/cotiza", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cocinas-a-medida", priority: 0.9, changeFrequency: "monthly" },
  { path: "/closets-y-vestidores", priority: 0.8, changeFrequency: "monthly" },
  { path: "/muebles-de-bano", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cubiertas-de-piedra", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cocinas-a-medida-villarrica", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cocinas-a-medida-pucon", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guias", priority: 0.6, changeFrequency: "weekly" },
  { path: "/guias/cuanto-cuesta-una-cocina-a-medida", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guias/granito-cuarzo-o-piedra-sinterizada", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guias/como-medir-tu-cocina", priority: 0.6, changeFrequency: "monthly" },
];

// ------- JSON-LD -------

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#negocio`,
    name: "Muebles Venechi",
    alternateName: "Espacio VCH",
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/logo-venechi.png"),
    image: absoluteUrl("/images/hero-kitchen.jpg"),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Isabel Riquelme 241",
      addressLocality: "Villarrica",
      addressRegion: "Región de La Araucanía",
      addressCountry: "CL",
    },
    areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
    sameAs: [site.instagram, site.facebook],
    knowsAbout: [
      "cocinas a medida",
      "closets a medida",
      "muebles de baño",
      "cubiertas de granito",
      "cubiertas de cuarzo",
      "piedra sinterizada",
      "marmolería",
    ],
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "es-CL",
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl("/images/hero-kitchen.jpg"),
    author: { "@type": "Organization", name: "Muebles Venechi", url: site.url },
    publisher: {
      "@type": "Organization",
      name: "Muebles Venechi",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo-venechi.png") },
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${site.url}/#negocio` },
    areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
  };
}
