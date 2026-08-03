# Marca — Muebles Venechi

## Identidad

**Se descartó la marca "Espacio VCH"** (2026-08-03): el cliente pidió volver al logo
original de Venechi, sin nada de VCH. Marca visible: **Venechi** (wordmark en script
dorado + arco de estrellas, sello circular fondo oscuro). Dominio: **mueblesvenechi.cl**.

Logo activo: `public/logo-venechi-2.png` (fuente `Doc/Logo-venechi-circular-med.png`,
cuadrado 550×550 con fondo transparente; se nombró `-2` para forzar la invalidación de
caché de navegadores/CDN que ya tenían cacheado el logo VCH en la ruta `logo-venechi.png`).
Se eliminaron del repo `public/logo-vch.png`, `Doc/logo-venechi.png` (versión anterior
"Muebles VCH") y `Doc/logo-muebles-vch.svg` — quedan en el historial de git si hace falta
recuperarlos.

El brandbook oficial (`Doc/Brandbook - Venechi.pdf`, "Manual Norma Gráfica" de Espacio VCH)
ya no aplica a la identidad visual, pero la paleta negro/dorado que definía coincide con la
del logo antiguo, así que **el sistema de color y tipografía del sitio no cambia**.

## Paleta EXACTA del brandbook

| Color | Hex | Uso |
|---|---|---|
| Negro | `#000000` | Fondo principal |
| Dorado / ámbar | `#F9B233` (R249 G178 B51) | Acento único: CTAs, filetes, detalles |
| Gris | `#878787` (R135) | Texto secundario, anillos, bordes |
| Blanco | `#FFFFFF` | Texto sobre negro |
| Mármol blanco veteado | textura | Fotografía / superficies |

Definida en `src/app/globals.css`.

## Tipografía

- Titulares: **Playfair Display** (serif elegante), como stand-in web de la 'Felix Titling' del logo.
- Cuerpo / etiquetas: **Montserrat** (sans, fina), evocando la 'Helvetica 35 Thin' del 'VCH'.
- Etiquetas/kicker: mayúsculas con tracking amplio (clase `.kicker`).

## Dirección visual

**Oscuro editorial**: fondo negro, dorado como oro (con moderación), fotografía a sangre de cocinas y
mármol, layouts asimétricos tipo revista de arquitectura, filetes dorados de 1px, numeración de índice
01/02/03. Se eliminó el look genérico de IA (nada de degradados pastel, tarjetas redondeadas SaaS,
emojis, blobs, simetría de plantilla).

## Maquetas de referencia

Generadas en Google Stitch (proyecto "Espacio VCH — Web + Simulador de cocinas", nombre
histórico del proyecto en Stitch). Screenshots en `Doc/mockups/stitch-home.png` y
`Doc/mockups/stitch-configurador.png`. El código sigue esta dirección visual (oscuro
editorial), solo cambió el logo.

## Negocio

Empresa familiar ~15 años. Cocinas, closets y baños a medida + marmolería propia (granito, cuarzo,
mármol, piedra sinterizada). Isabel Riquelme 241, Villarrica. Cobertura Villarrica, Pucón, Lican Ray.
Diferenciador: cocina montada y funcional en 40 días.

## Pendiente del cliente

- Fotos reales de closets y baños (hoy siguen con placeholders de marca en `public/images/`;
  las de cocinas ya son reales, ver `Doc/imagenes-cocina/` y `public/images/kitchen-*.jpg`).
- Datos de contacto reales (WhatsApp, teléfono, correo, redes) en `src/lib/site.ts`.
