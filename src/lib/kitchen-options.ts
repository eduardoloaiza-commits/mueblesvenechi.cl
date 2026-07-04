// Catálogo de opciones del configurador de cocinas.
// Este archivo es la única fuente de verdad para: las opciones que ve el
// cliente, los colores del preview SVG y los precios (en lib/pricing.ts).
// El negocio ajusta aquí labels, materiales y swatches sin tocar la UI.

export type LayoutId = "lineal" | "l" | "u" | "isla";
export type CountertopId = "postformado" | "cuarzo" | "granito" | "sinterizada";
export type FrontId = "melamina-mate" | "melamina-madera" | "laqueado";
export type ExtraId =
  | "campana"
  | "lavaplatos"
  | "cajones"
  | "organizadores"
  | "iluminacion"
  | "muro-cristal";

export type ProjectType = "nueva" | "remodelacion";

export interface LayoutOption {
  id: LayoutId;
  label: string;
  desc: string;
  // Factor de complejidad de fabricación/instalación aplicado al total.
  complexity: number;
  // Si el layout ya incluye una isla como parte del mueble.
  hasIsland: boolean;
}

export interface MaterialOption<T extends string> {
  id: T;
  label: string;
  desc: string;
  swatch: string; // color para el preview SVG
}

export interface ExtraOption {
  id: ExtraId;
  label: string;
  desc: string;
}

export const LAYOUTS: LayoutOption[] = [
  {
    id: "lineal",
    label: "Lineal",
    desc: "Todo en una pared. Ideal para espacios acotados.",
    complexity: 1,
    hasIsland: false,
  },
  {
    id: "l",
    label: "En L",
    desc: "Dos paredes en ángulo. El clásico que rinde.",
    complexity: 1.05,
    hasIsland: false,
  },
  {
    id: "u",
    label: "En U",
    desc: "Tres frentes de trabajo. Máximo almacenamiento.",
    complexity: 1.12,
    hasIsland: false,
  },
  {
    id: "isla",
    label: "Con isla",
    desc: "Cocina abierta con isla central.",
    complexity: 1.15,
    hasIsland: true,
  },
];

export const COUNTERTOPS: MaterialOption<CountertopId>[] = [
  {
    id: "postformado",
    label: "Postformado",
    desc: "Económico y resistente al uso diario.",
    swatch: "#d9cbb3",
  },
  {
    id: "granito",
    label: "Granito",
    desc: "Piedra natural, cálida y muy durable.",
    swatch: "#4a4640",
  },
  {
    id: "cuarzo",
    label: "Cuarzo",
    desc: "Superficie uniforme, no porosa e higiénica.",
    swatch: "#e8e4dc",
  },
  {
    id: "sinterizada",
    label: "Piedra sinterizada",
    desc: "Alta gama: resiste calor, rayas y manchas.",
    swatch: "#2f2c28",
  },
];

export const FRONTS: MaterialOption<FrontId>[] = [
  {
    id: "melamina-mate",
    label: "Melamina lisa",
    desc: "Color sólido mate. Limpio y moderno.",
    swatch: "#e7e2d8",
  },
  {
    id: "melamina-madera",
    label: "Melamina símil madera",
    desc: "Textura de madera cálida del sur.",
    swatch: "#b0834e",
  },
  {
    id: "laqueado",
    label: "Laqueado",
    desc: "Terminación premium sin tiradores.",
    swatch: "#33473c",
  },
];

export const EXTRAS: ExtraOption[] = [
  { id: "campana", label: "Campana extractora", desc: "Empotrada, sin humos ni olores." },
  { id: "lavaplatos", label: "Lavaplatos + grifería", desc: "Acero inoxidable instalado." },
  { id: "cajones", label: "Cajones con riel telescópico", desc: "Cierre suave, apertura total." },
  { id: "organizadores", label: "Organizadores interiores", desc: "Cubiertos, especias y basura." },
  { id: "iluminacion", label: "Iluminación LED bajo mueble", desc: "Luz cálida sobre la cubierta." },
  { id: "muro-cristal", label: "Cubremuro de cristal", desc: "Fácil de limpiar, sin juntas." },
];

export const PROJECT_TYPES: { id: ProjectType; label: string; desc: string }[] = [
  { id: "nueva", label: "Cocina nueva", desc: "Construcción o primer amoblado." },
  { id: "remodelacion", label: "Remodelación", desc: "Reemplazo de una cocina existente." },
];

export const TIMEFRAMES = [
  "Lo antes posible",
  "En 1 a 2 meses",
  "En 3 a 6 meses",
  "Solo estoy cotizando",
] as const;

// ------- helpers de búsqueda -------
export const layoutById = (id: LayoutId) => LAYOUTS.find((l) => l.id === id)!;
export const countertopById = (id: CountertopId) => COUNTERTOPS.find((c) => c.id === id)!;
export const frontById = (id: FrontId) => FRONTS.find((f) => f.id === id)!;
export const extraById = (id: ExtraId) => EXTRAS.find((e) => e.id === id)!;
