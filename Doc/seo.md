# Estructura SEO del sitio

Fase 2 del proyecto: convertir el sitio de una landing única en una estructura
posicionable en Google para búsquedas locales e informacionales.

## Arquitectura de páginas

| Ruta | Keyword objetivo | Rol |
|---|---|---|
| `/` | marca + "cocinas a medida Villarrica y Pucón" | Home de conversión |
| `/cocinas-a-medida` | cocinas a medida (pilar principal) | Página pilar de servicio |
| `/closets-y-vestidores` | closets a medida Villarrica/Pucón | Página pilar |
| `/muebles-de-bano` | muebles de baño / vanitorios a medida | Página pilar |
| `/cubiertas-de-piedra` | cubiertas granito/cuarzo/sinterizada, marmolería | Página pilar |
| `/cocinas-a-medida-villarrica` | cocinas a medida Villarrica | Local (ángulo: taller propio, visita) |
| `/cocinas-a-medida-pucon` | cocinas a medida Pucón | Local (ángulo: 2ª vivienda, arriendo turístico) |
| `/guias` | — | Índice de contenido informacional |
| `/guias/cuanto-cuesta-una-cocina-a-medida` | cuánto cuesta una cocina a medida | Guía funnel superior |
| `/guias/granito-cuarzo-o-piedra-sinterizada` | granito vs cuarzo vs sinterizado | Guía comparativa |
| `/guias/como-medir-tu-cocina` | cómo medir cocina para cotizar | Guía práctica |

Las páginas locales tienen contenido genuinamente distinto entre sí (no son
plantillas con la ciudad cambiada) para no caer en doorway pages.

## Base técnica

- **`src/lib/seo.ts`** — pieza central: `pageMetadata()` (title, description,
  canonical, OG por página), el registro `PAGES` (alimenta el sitemap; al crear
  una página nueva HAY que agregarla ahí) y los builders de JSON-LD.
- **`src/app/sitemap.ts` / `src/app/robots.ts`** — generados desde `PAGES`.
  `/api/` y `/gracias` quedan fuera del índice.
- **JSON-LD**: `LocalBusiness` global (layout), `Service` + `BreadcrumbList` +
  `FAQPage` en pilares y locales, `Article` en guías (via `GuideLayout`).
- **Canonical** en todas las páginas via `alternates.canonical`.

## Componentes reutilizables

- `PageHero` — cabecera editorial de página interior.
- `Breadcrumbs` — miga visible + schema.
- `FaqSection` — `<details>` nativo + schema FAQPage.
- `CtaBand` — cierre con CTA a `/cotiza` + WhatsApp (`showConfigurator=false`
  en servicios sin configurador).
- `GuideLayout` — cascarón de guías (breadcrumbs + hero + Article + CTA), el
  cuerpo usa las clases `.guide-prose` de `globals.css`.

## Regla de contenido

Los precios que aparecen en páginas y guías se calculan con `calcPrice()` del
motor real (`lib/pricing.ts`), nunca se escriben a mano. Cuando el negocio
cargue sus precios reales, todo el contenido se actualiza solo.

## Pendientes SEO (siguiente etapa)

- Google Search Console: verificar propiedad y enviar sitemap.
- Google Business Profile enlazado al sitio (clave para local pack).
- Fotos reales de trabajos (las imágenes actuales son stock) con `alt` descriptivo.
- Evaluar página local de Lican Ray y guía de closets cuando haya tracción.
