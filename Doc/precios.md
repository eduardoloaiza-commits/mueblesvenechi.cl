# Tabla de precios del configurador

> **IMPORTANTE:** los valores actuales son PLACEHOLDERS de referencia. El negocio debe
> reemplazarlos con sus números reales antes de publicar. Todos viven en la constante
> `PRICING` de `src/lib/pricing.ts`.

## Cómo se calcula (`calcPrice`)

```
gabinetes   = (baseM × valorBasePorMetro[front]
              + wallM × valorBasePorMetro[front] × wallFactor) × complejidadLayout
cubierta    = baseM × valorCubiertaPorMetro[countertop]
extras      = suma de extras seleccionados
isla        = si el layout la incluye
remodelacion= recargo fijo si projectType = "remodelacion"

subtotal    = gabinetes + cubierta + extras + isla + remodelacion
desde (from)= redondear(subtotal × 0.98) a 10.000
techo (to)  = redondear(subtotal × 1.22) a 10.000
```

Se muestra **"desde {from}"** como valor principal, con el rango hasta `to` como referencia.

## Valores placeholder actuales (CLP)

| Concepto | Valor |
|---|---|
| Base — melamina lisa / m | 190.000 |
| Base — símil madera / m | 230.000 |
| Base — laqueado / m | 330.000 |
| Factor mueble mural | 0,70 |
| Cubierta postformado / m | 48.000 |
| Cubierta granito / m | 135.000 |
| Cubierta cuarzo / m | 165.000 |
| Cubierta sinterizada / m | 215.000 |
| Extra campana | 180.000 |
| Extra lavaplatos | 130.000 |
| Extra cajones telescópicos | 95.000 |
| Extra organizadores | 70.000 |
| Extra iluminación LED | 65.000 |
| Extra cubremuro cristal | 140.000 |
| Isla | 680.000 |
| Recargo remodelación | 120.000 |
| Complejidad: lineal / L / U / isla | 1,00 / 1,05 / 1,12 / 1,15 |

## Ejemplo verificado

Cocina en L, 4 m base + 2,5 m mural, cuarzo, símil madera, con campana + lavaplatos + cajones +
iluminación, nueva → **desde $2.470.000** (techo $3.070.000).

## Para editar

Solo cambiar los números en `PRICING` dentro de `src/lib/pricing.ts`. La UI y el preview no
necesitan cambios. Si se agregan materiales o extras nuevos, agregarlos también en
`src/lib/kitchen-options.ts` (con su `swatch` de color para el preview).
