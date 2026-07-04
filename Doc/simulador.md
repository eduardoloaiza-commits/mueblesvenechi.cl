# Especificación del configurador de cocinas

Ubicación: `src/app/cotiza/`.

## Objetivo

Capturar la mayor cantidad de inputs del cotizante de forma autónoma y entregar una estimación
"desde" al instante, para acelerar el cierre y alimentar Kommo con leads calificados.

## Flujo (7 pasos)

| # | Paso | Captura |
|---|---|---|
| 1 | Distribución | `layout`: lineal / L / U / isla |
| 2 | Medidas | `baseMeters`, `wallMeters` (metros lineales, sliders + steppers) |
| 3 | Cubierta | `countertop`: postformado / granito / cuarzo / sinterizada |
| 4 | Frentes | `front`: melamina lisa / símil madera / laqueado |
| 5 | Extras | `extras[]`: campana, lavaplatos, cajones, organizadores, iluminación, cubremuro |
| 6 | Proyecto | `projectType`: nueva / remodelación · `timeframe` |
| 7 | Datos | nombre, teléfono/WhatsApp, correo (opcional), comuna |

## Preview en vivo

`KitchenPreview.tsx` dibuja una **vista en planta** en SVG que reacciona a la configuración:
tramos de mueble según el layout, colores de cubierta y frentes desde los swatches del catálogo,
isla central cuando corresponde. Es esquemático (no a escala), pensado para dar feedback visual
inmediato, no para plano técnico.

## Precio en vivo

Columna sticky con `calcPrice(config)` recalculado en cada cambio (`useMemo`). Muestra
"desde $X" y el techo del rango. Ver `Doc/precios.md`.

## Envío

`POST /api/lead` con la config + contacto. El servidor:
1. Valida con `leadSchema` (zod). Contacto obligatorio; config opcional (permite captura progresiva).
2. **Recalcula el precio** (nunca confía en el cliente).
3. Guarda en Neon (best-effort).
4. Crea lead + contacto en Kommo con nota de resumen (best-effort / NO-OP sin token).
5. Devuelve `priceFromLabel` para la pantalla de resultado.

La pantalla de resultado (`ResultScreen`) muestra el "desde" y ofrece continuar por WhatsApp.

## Ideas para siguientes iteraciones

- Captura progresiva real: enviar el contacto apenas se ingresa (paso 7 → parcial) por si abandona.
- Subir foto del espacio actual (upload) para adjuntar a Kommo.
- Guardar/retomar cotización por link.
- Custom fields específicos en Kommo (mapear layout/materiales por `field_id`).
