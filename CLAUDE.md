# Muebles Venechi — Contexto del proyecto

> Nota de entorno: este proyecto usa **Next.js 16** (App Router, Turbopack). Hay una
> advertencia de breaking changes en `AGENTS.md`. Ante dudas de API, revisa
> `node_modules/next/dist/docs/`.

## Qué es

Web + **configurador visual de cocinas a medida** para Muebles Venechi (Villarrica, Pucón,
Lican Ray, sur de Chile). El negocio fabrica cocinas, closets y baños a medida con marmolería
propia. Diferenciador: **entrega en 40 días** a precio asequible.

El objetivo del sitio es resolver el cuello de botella comercial: el proceso de cotización era
lento y muy manual. El configurador captura los inputs del cliente de forma autónoma y entrega
una estimación "desde" al instante, llevando el lead a Kommo CRM.

**Unificación de marca:** el negocio aparecía como "Espacio VCH" (mueblesvenechi.cl) y
"Marmolería y Mueblería Venechi" (invenechi.cl). Todo se unifica bajo **Muebles Venechi** en el
dominio **mueblesvenechi.cl**.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Prisma 7 · PostgreSQL (Neon serverless via
`@prisma/adapter-pg`). Deploy en Vercel. Repo: `github.com/eduardoloaiza-commits/mueblesvenechi.cl`.

## Estructura clave

| Ruta | Rol |
|---|---|
| `src/app/page.tsx` | Home de conversión (hero, diferenciadores, proceso, cobertura) |
| `src/app/cotiza/` | Configurador visual (`Configurator.tsx` wizard + `KitchenPreview.tsx` SVG) |
| `src/app/gracias/page.tsx` | Página de agradecimiento de respaldo |
| `src/app/api/lead/route.ts` | Captura de lead: valida (zod) → DB → Kommo |
| `src/lib/site.ts` | **Marca y contacto** (WhatsApp, dirección, etc.) — editar aquí |
| `src/lib/kitchen-options.ts` | **Catálogo** de layouts, cubiertas, frentes, extras + colores del preview |
| `src/lib/pricing.ts` | **Motor de precios** (tabla `PRICING`) + `calcPrice` + `describeConfig` |
| `src/lib/kommo.ts` | Cliente Kommo headless (NO-OP si no hay token) |
| `src/lib/db.ts` | Prisma client con adapter pg |
| `prisma/schema.prisma` | Modelo `Lead` |

## Configurador (`/cotiza`)

Wizard de 7 pasos con **preview SVG en planta** y **precio en vivo** en una columna sticky:
Distribución → Medidas → Cubierta → Frentes → Extras → Proyecto → Datos de contacto.
Al enviar, hace `POST /api/lead`. El precio se **recalcula siempre en el servidor** (no se confía
en el cliente). Ver `Doc/simulador.md`.

## Precios

Los valores en `src/lib/pricing.ts` (`PRICING`) son **placeholders**. El negocio debe reemplazarlos
con sus números reales. Detalle y guía de edición en `Doc/precios.md`. La estimación siempre se
presenta como "desde" + rango, con disclaimer de que el valor final es tras visita y medición.

## Kommo CRM (headless)

Patrón reutilizado de `micasaconsubsidio.cl`. Crea lead + contacto con `POST /api/v4/leads/complex`
y adjunta una nota con el resumen de la cotización. Es **NO-OP** si faltan las variables de entorno,
así el formulario nunca se rompe.

Variables (ver `.env.example`):
```
KOMMO_BEARER_TOKEN   JWT de larga duración (Settings → Integraciones → API)
KOMMO_BASE_URL       https://<subdominio>.kommo.com/api/v4
KOMMO_PIPELINE_ID    id del pipeline web
KOMMO_STATUS_ID      id de la etapa inicial
```

## Base de datos

`DATABASE_URL` (Neon). Si no está configurada, `/api/lead` responde ok pero **no persiste** (loguea
un warning) para permitir la demo antes de conectar Neon. Aplicar el schema:
```
npm run db:push
```

## Estado actual (Fase 1)

Hecho: scaffold, home, configurador con preview + precio, API de leads con validación y motor de
precios, cliente Kommo, docs. Verificado: `npm run build` OK, flujo por HTTP OK.

Pendiente (requiere datos del negocio):
- Conectar Neon (`DATABASE_URL`) y correr `npm run db:push`.
- Conectar cuenta real de Kommo (token + pipeline/status ids).
- Reemplazar precios placeholder por reales (`src/lib/pricing.ts` / `Doc/precios.md`).
- Assets reales: logo, fotos de trabajos, datos de contacto en `src/lib/site.ts`.
