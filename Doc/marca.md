# Marca — Espacio VCH (Venechi)

## Identidad (según brandbook oficial)

Marca visible: **ESPACIO VCH**. Marmolería y Mueblería Venechi es la razón detrás.
Dominio: **mueblesvenechi.cl**. El sello circular VCH (en `public/logo-vch.png` y `Doc/logo-venechi.png`)
es la marca principal.

Brandbook oficial en `Doc/Brandbook - Venechi.pdf` (5 páginas, "Manual Norma Gráfica").

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

Generadas en Google Stitch (proyecto "Espacio VCH — Web + Simulador de cocinas"). Screenshots en
`Doc/mockups/stitch-home.png` y `Doc/mockups/stitch-configurador.png`. El código las sigue.

## Negocio

Empresa familiar ~15 años. Cocinas, closets y baños a medida + marmolería propia (granito, cuarzo,
mármol, piedra sinterizada). Isabel Riquelme 241, Villarrica. Cobertura Villarrica, Pucón, Lican Ray.
Diferenciador: cocina montada y funcional en 40 días.

## Pendiente del cliente

- Fotos reales de trabajos (hoy hay placeholders de marca en `public/images/`).
- Datos de contacto reales (WhatsApp, teléfono, correo, redes) en `src/lib/site.ts`.
