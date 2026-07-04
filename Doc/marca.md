# Brief de marca — Muebles Venechi

## Unificación

El negocio tenía la identidad dispersa:

- `mueblesvenechi.cl` → "Espacio VCH – Transformamos tus espacios con muebles a medida"
- `invenechi.cl` + Facebook `marmoleriavenechi` → "Marmolería y Mueblería Venechi"
- Referencias sueltas a "espaciovenechi"

**Decisión:** todo se unifica bajo el nombre **Muebles Venechi** y el dominio **mueblesvenechi.cl**.
Los datos editables de marca y contacto viven en `src/lib/site.ts`.

## Negocio

- Empresa familiar, ~15 años. Cocinas, closets y baños a medida + marmolería propia
  (granito, cuarzo, mármol, piedra sinterizada).
- Ubicación: Isabel Riquelme 241, Villarrica, Región de La Araucanía.
- Cobertura: Villarrica, Pucón, Lican Ray y alrededores.
- Diferenciador central: **cocina montada y funcional en 40 días** a precio asequible.

## Tono de voz

Cercano, claro y humano. Nada de tono de plantilla ni de IA. Sin guiones largos. Frases directas,
como hablaría un maestro que conoce su oficio y respeta el tiempo del cliente.

## Sistema visual (v1)

- **Verde bosque** (`--pine #1f3d2f`) como color de marca: evoca el sur, la Araucanía, la madera.
- **Roble / ámbar** (`--oak #c8863f`) como acento: calidez, la madera trabajada, el CTA.
- **Crema cálida** (`--background #faf6f0`) de fondo.
- Tipografías: **Fraunces** (display, artesanal) para títulos + **Manrope** (sans) para el cuerpo.

Definido en `src/app/globals.css`. Es una base editable; se ajusta cuando lleguen logo y fotos reales.

## Pendiente del cliente

- Logo (actualmente placeholder: "V" en cuadro).
- Fotos reales de trabajos para la galería de la home.
- Datos de contacto reales (WhatsApp, teléfono, correo, redes) en `src/lib/site.ts`.
