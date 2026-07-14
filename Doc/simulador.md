# Especificación del configurador de cocinas

Ubicación: `src/app/cotiza/`.

## Objetivo

Capturar la mayor cantidad de inputs del cotizante de forma autónoma y entregar una estimación
"desde" al instante, para acelerar el cierre y alimentar Kommo con leads calificados.

## Flujo (7 pasos)

| # | Paso | Captura |
|---|---|---|
| 1 | Distribución | `layout`: lineal / L / paralela / U / península / isla |
| 2 | Medidas | `baseMeters` (mín 2 m), `drawerMeters` (tramo con cajonera, 0..base), `wallMeters` (0 o ≥0,5 m) + `wallPosition` (izquierda/derecha/completo) |
| 3 | Cubierta | `countertop`: postformado / porcelánica / cuarzo / ultracompacto |
| 4 | Frentes | `front`: melamina lisa / símil madera / laqueado. Si laqueado → `lacquerColor`: blanco / crema / gris / grafito / negro |
| 5 | Extras | `extras[]`: campana ($0, solo espacio en diseño), lavaplatos, especiero, basurero retráctil, vitrinas, iluminación, salpicadero (`muro-cristal`) |
| 6 | Proyecto | `projectType`: nueva / remodelación · `timeframe` |
| 7 | Datos | nombre, teléfono/WhatsApp, correo (opcional), comuna |

Reglas de oferta (reunión cliente 2026-07): NO se ofrecen electrodomésticos ni griferías
(el lavaplatos va solo). Los cajones con riel telescópico van **incluidos** en la base y se
cotizan como metros de cajonera, no como extra. "Salpicadero" es el nombre comercial del
antiguo cubremuro (el id `muro-cristal` se mantiene por compatibilidad de datos).

## Preview en vivo

El preview de cocina tiene **dos vistas** con toggle (Planta | Corte) en el aside. La vista
cambia sola según el paso: Distribución → planta; Medidas y Extras → corte (el usuario puede
alternar manualmente cuando quiera).

**Corte** (`KitchenSectionPreview.tsx`, elevación frontal del tramo principal): muebles base
con zócalo y tramo de cajonera (3 cajones a la izquierda), cubierta con volado, salpicadero
si va el extra, muebles aéreos según posición con divisiones de puertas, vitrinas de vidrio,
espacio de campana punteado (solo se reserva), línea LED dorada bajo mueble, y refrigerador
fuera de la medida. Mismo escalado horizontal que la planta para que ambas vistas calcen.

**Planta** — `KitchenPreview.tsx` dibuja una **vista en planta** en SVG que reacciona a la configuración:
- Tramos de mueble según el layout: lineal, L, **paralela** (dos frentes enfrentados), U,
  **península** (stub perpendicular con pisos de desayunador), isla central.
- Colores de cubierta y frentes desde los swatches del catálogo; si el frente es laqueado,
  manda el color elegido (`frontSwatch()` en `kitchen-options.ts`).
- **Muebles aéreos**: banda punteada sobre el tramo inferior, proporcional a los metros y
  anclada según `wallPosition`, con etiqueta "aéreos X m".
- **Refrigerador**: siempre dibujado FUERA del tramo medido (a la derecha), con label
  "Refrig." — refuerza que los metros cotizados no incluyen su espacio (hay nota de copy
  en el paso Medidas).

Es esquemático (no a escala), pensado para dar feedback visual inmediato, no para plano técnico.

## Precio en vivo

Columna sticky con `calcPrice(config)` recalculado en cada cambio (`useMemo`). Muestra
"**desde $X + IVA**" y disclaimer de valores netos. Ver `Doc/precios.md`.

## Envío

`POST /api/lead` con la config + contacto. El servidor:
1. Valida con `leadSchema` (zod). Contacto obligatorio; config opcional (captura progresiva).
   Mínimos de cocina (base ≥2, aéreo 0 o ≥0,5, cajonera ≤ base) en `superRefine` — solo
   aplican a cocina porque `baseMeters` se reutiliza para el frente del closet.
2. Filtra ids de extras desconocidos (`isExtraId` / `isClosetExtraId`) — bundles antiguos
   cacheados aún pueden mandar "cajones"/"organizadores".
3. **Recalcula el precio** (nunca confía en el cliente).
4. Guarda en Neon (best-effort).
5. Crea lead + contacto en Kommo con nota de resumen — la nota dice "+ IVA" (best-effort / NO-OP sin token).
6. Devuelve `priceFromLabel` para la pantalla de resultado.

## Pantalla de resultado y /gracias

Ambas usan `src/components/ThankYouPanel.tsx` (sin hooks, sirve en client y RSC):
- Estimación "desde $X + IVA" (solo en ResultScreen).
- Card "Siguiente paso: **visita técnica de medición · $50.000**" (`site.visitPrice`).
- CTA primario "Conversar ahora por WhatsApp" (con resumen de cotización → cae a Kommo).
- CTA secundario "Agendar reunión online" → `site.bookingUrl` (appointment schedule de
  Google Calendar). **Con URL vacía el botón no se muestra** — pedirle al cliente que cree
  el appointment schedule y pegar la URL en `src/lib/site.ts`.
- Mapa embebido de la sede (Isabel Riquelme 241, Villarrica — `mapsEmbedUrl`, sin API key).

## Ideas para siguientes iteraciones

- Captura progresiva real: enviar el contacto apenas se ingresa (paso 7 → parcial) por si abandona.
- Subir foto del espacio actual (upload) para adjuntar a Kommo.
- Guardar/retomar cotización por link.
- Custom fields específicos en Kommo (mapear layout/materiales por `field_id`).

## Producto Closet (Fase 2)

El configurador tiene un selector Cocina | Closet sobre el wizard. El deep-link
`/cotiza?producto=closet` (usado por la página `/closets-y-vestidores`) preselecciona closet.

Flujo closet (7 pasos): Tipo (`closetType`) → Medidas (`baseMeters` = metros de frente +
`heightOption`) → Puertas (`doorType`) → Terminación (`front`, compartido con cocinas; si
laqueado → `lacquerColor` con la misma gama de 5 colores) → Interior (`extras[]` de closet) →
Proyecto (`timeframe`) → Datos.

Preview propio en elevación frontal (`ClosetPreview.tsx`): muestra puertas según sistema o el
interior (barra, ropa, cajonera, zapatera) cuando va sin puertas; el color de frentes respeta
el color de laqueado. Catálogo en `src/lib/closet-options.ts`, precios en
`src/lib/closet-pricing.ts` (aún placeholders). El payload lleva `product: "closet"` y el
server recalcula con `calcClosetPrice` (nunca confía en el cliente).
