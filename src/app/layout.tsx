import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { absoluteUrl, localBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Cocinas a medida en Villarrica y Pucón`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.brand,
    locale: "es_CL",
    type: "website",
    images: [{ url: absoluteUrl("/images/hero-kitchen.jpg"), width: 1200, height: 800 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  );
}
