# Tabla de precios del configurador

> **Estado (2026-07-13):** los precios por metro lineal de **muebles y cubiertas de cocina
> son REALES**, entregados por el cliente en reunión. Todos son valores **NETOS**: la UI
> siempre muestra "desde $X **+ IVA**". Siguen siendo **PLACEHOLDER** (a validar con el
> cliente): multiplicadores de frente, extras, isla, recargo de remodelación y toda la
> tabla de closets. Todo vive en `PRICING` de `src/lib/pricing.ts`.

## Cómo se calcula (`calcPrice`)

```
drawerM     = min(drawerMeters, baseMeters)      // metros de base con cajonera
hingedM     = baseMeters − drawerM               // metros de base con puerta abatible

gabinetes   = (hingedM × 297.000
              + drawerM × 424.000
              + wallM × 249.000) × multFrente[front] × complejidadLayout
cubierta    = baseM × valorCubiertaPorMetro[countertop]
extras      = suma de extras seleccionados
isla        = si el layout la incluye
remodelacion= recargo fijo si projectType = "remodelacion"

subtotal    = gabinetes + cubierta + extras + isla + remodelacion   (todo NETO)
desde (from)= redondear(subtotal × 0.98) a 10.000
techo (to)  = redondear(subtotal × 1.22) a 10.000
```

Se muestra **"desde {from} + IVA"** como valor principal, con el rango hasta `to` como
referencia. Los montos que llegan a Kommo/DB también son netos; la nota del lead dice
"+ IVA" explícitamente para que ventas no cotice con IVA incluido por error.

## Valores actuales (CLP netos)

| Concepto | Valor | Origen |
|---|---|---|
| Base puerta abatible / ml (sin cubierta) | 297.000 | **REAL** |
| Base con cajonera / ml (sin cubierta, rieles telescópicos incluidos) | 424.000 | **REAL** |
| Aéreo puerta abatible / ml | 249.000 | **REAL** |
| Mult. frente melamina lisa | ×1,00 | baseline |
| Mult. frente símil madera | ×1,08 | PLACEHOLDER |
| Mult. frente laqueado | ×1,35 | PLACEHOLDER |
| Cubierta postformado / ml | 80.000 | **REAL** |
| Cubierta porcelánica / ml | 180.000 | **REAL** |
| Cubierta cuarzo / ml | 240.000 | **REAL** |
| Cubierta ultracompacta genérica / ml | 280.000 | **REAL** |
| Extra campana | 0 (no se vende; solo se deja el espacio en el diseño) | REGLA |
| Extra lavaplatos (sin grifería) | 130.000 | PLACEHOLDER |
| Extra especiero extraíble | 45.000 | PLACEHOLDER |
| Extra basurero retráctil | 60.000 | PLACEHOLDER |
| Extra vitrinas de vidrio | 120.000 | PLACEHOLDER |
| Extra iluminación LED | 65.000 | PLACEHOLDER |
| Extra salpicadero de cristal (id `muro-cristal`) | 140.000 | PLACEHOLDER |
| Isla | 680.000 | PLACEHOLDER |
| Recargo remodelación | 120.000 | PLACEHOLDER |
| Complejidad: lineal / L / paralela / U / península / isla | 1,00 / 1,05 / 1,08 / 1,12 / 1,12 / 1,15 | PLACEHOLDER (salvo lineal) |

Fuera del configurador: la cubierta ultracompacta **Laminam®** ($600.000/ml neto) existe
como producto, pero NO se cotiza en el simulador — solo se usa el genérico de 280.000.

No se ofrecen en el configurador: **electrodomésticos** ni **griferías**. Los cajones con
riel telescópico van **incluidos** en el mueble base (se cotizan como metros de cajonera
en el paso Medidas, no como extra).

## Ejemplo verificado (2026-07-13)

Cocina en L, 3 m base (1 m con cajonera) + 2 m aéreos, cuarzo, melamina lisa, con
lavaplatos, nueva:

```
gabinetes = (2×297.000 + 1×424.000 + 2×249.000) × 1,00 × 1,05 = 1.591.800
cubierta  = 3 × 240.000 = 720.000
extras    = 130.000
subtotal  = 2.441.800  →  desde $2.390.000 + IVA (techo $2.980.000 + IVA)
```

Verificado contra `POST /api/lead` en local: responde `priceFrom: 2390000`.

## Para editar

Solo cambiar los números en `PRICING` dentro de `src/lib/pricing.ts`. La UI y el preview no
necesitan cambios. Si se agregan materiales o extras nuevos, agregarlos también en
`src/lib/kitchen-options.ts` (con su `swatch` de color para el preview) y en los enums de
`src/lib/validation.ts` (el `satisfies` avisa en compilación si quedan desincronizados).

## Visita técnica

La visita técnica de medición se cobra: **$50.000** (`site.visitPrice` en `src/lib/site.ts`).
Se releva en la pantalla de resultado y en `/gracias`, junto al botón de agendamiento
online (`site.bookingUrl`, appointment schedule de Google Calendar — vacío hasta que el
cliente lo cree; con URL vacía el botón no se muestra).

## Closets (`src/lib/closet-pricing.ts`)

El configurador también cotiza closets. Misma lógica: tabla `CLOSET_PRICING` — **todo
placeholder, el cliente aún no entrega precios de closet**. También en netos + IVA.

```
cuerpo   = frenteM × valorCuerpoPorMetro[front] × factorAltura[height] × complejidadTipo
puertas  = frenteM × valorPuertasPorMetro[doors]
extras   = suma de extras interiores seleccionados

subtotal = cuerpo + puertas + extras
desde/techo: mismo criterio que cocinas (×0.98 y ×1.22, redondeo a 10.000)
```

| Concepto | Valor placeholder |
|---|---|
| Cuerpo — melamina lisa / m | 240.000 |
| Cuerpo — símil madera / m | 280.000 |
| Cuerpo — laqueado / m | 390.000 |
| Puertas abatir / m | 95.000 |
| Puertas correderas / m | 130.000 |
| Sin puertas / m | 0 |
| Factor piso a cielo | ×1,18 |
| Complejidad: empotrado / esquina / walk-in / abierto | 1 / 1,1 / 1,15 / 0,95 |
| Cajonera | 95.000 |
| Zapatera | 60.000 |
| Doble barra | 35.000 |
| Maletero | 55.000 |
| Organizadores | 70.000 |
| Iluminación LED sensor | 75.000 |
