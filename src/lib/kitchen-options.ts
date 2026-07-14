// Catálogo de opciones del configurador de cocinas.
// Este archivo es la única fuente de verdad para: las opciones que ve el
// cliente, los colores del preview SVG y los precios (en lib/pricing.ts).
// El negocio ajusta aquí labels, materiales y swatches sin tocar la UI.

export type LayoutId = "lineal" | "l" | "paralela" | "u" | "peninsula" | "isla";
export type CountertopId = "postformado" | "porcelanica" | "cuarzo" | "ultracompacto";
export type FrontId = "melamina-mate" | "melamina-madera" | "laqueado";
export type LacquerColorId = "blanco" | "crema" | "gris" | "grafito" | "negro";
export type WallPosition = "izquierda" | "centro" | "derecha";
export type ExtraId =
  | "campana"
  | "lavaplatos"
  | "especiero"
  | "basurero-retractil"
  | "vitrinas"
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
    id: "paralela",
    label: "Paralela",
    desc: "Dos frentes enfrentados, tipo pasillo.",
    complexity: 1.08,
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
    id: "peninsula",
    label: "Con península",
    desc: "Un tramo se proyecta como barra o desayunador.",
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
    id: "porcelanica",
    label: "Porcelánica",
    desc: "Superficie cerámica, resistente al calor y rayas.",
    swatch: "#cfc9bf",
  },
  {
    id: "cuarzo",
    label: "Cuarzo",
    desc: "Superficie uniforme, no porosa e higiénica.",
    swatch: "#e8e4dc",
  },
  {
    id: "ultracompacto",
    label: "Piedra ultracompacta",
    desc: "Alta gama: resiste calor, rayas y manchas.",
    swatch: "#2f2c28",
  },
];

export const FRONTS: MaterialOption<FrontId>[] = [
  {
    id: "melamina-mate",
    label: "Melamina lisa",
    desc: "Color sólido mate. Limpio y moderno.",
    swatch: "#d8d2c6",
  },
  {
    id: "melamina-madera",
    label: "Melamina símil madera",
    desc: "Textura de madera cálida del sur.",
    swatch: "#9c6b3f",
  },
  {
    id: "laqueado",
    label: "Laqueado",
    desc: "Terminación premium mate, en el color que elijas.",
    swatch: "#1c1c1c",
  },
];

// Gama de colores para la terminación laqueada (cocinas y closets).
export const LACQUER_COLORS: MaterialOption<LacquerColorId>[] = [
  { id: "blanco", label: "Blanco", desc: "Luminoso y atemporal.", swatch: "#f2f1ec" },
  { id: "crema", label: "Crema", desc: "Cálido, combina con madera.", swatch: "#e6dcc3" },
  { id: "gris", label: "Gris", desc: "Neutro contemporáneo.", swatch: "#9b9b97" },
  { id: "grafito", label: "Grafito", desc: "Oscuro sin ser negro.", swatch: "#474747" },
  { id: "negro", label: "Negro", desc: "El clásico editorial.", swatch: "#1c1c1c" },
];

// Posición del tramo de muebles aéreos sobre el mesón (para el plano).
// El ancho dibujado SIEMPRE es proporcional a los metros; esto solo ancla.
export const WALL_POSITIONS: { id: WallPosition; label: string }[] = [
  { id: "izquierda", label: "A la izquierda" },
  { id: "centro", label: "Al centro" },
  { id: "derecha", label: "A la derecha" },
];

// La campana no se vende: se deja el espacio listo en el diseño (precio $0).
// Los cajones con riel telescópico van incluidos en el mueble base, por eso
// ya no aparecen como extra (se cotizan como metros de cajonera en Medidas).
export const EXTRAS: ExtraOption[] = [
  { id: "campana", label: "Campana extractora", desc: "No se incluye la campana: dejamos el espacio listo en el diseño." },
  { id: "lavaplatos", label: "Lavaplatos", desc: "Acero inoxidable instalado." },
  { id: "especiero", label: "Especiero extraíble", desc: "Condimentos a mano, junto a la zona de cocción." },
  { id: "basurero-retractil", label: "Basurero retráctil", desc: "Oculto tras la puerta, se abre con el mueble." },
  { id: "vitrinas", label: "Vitrinas de vidrio", desc: "Puertas vidriadas para lucir vajilla y copas." },
  { id: "iluminacion", label: "Iluminación LED bajo mueble", desc: "Luz cálida sobre la cubierta." },
  { id: "muro-cristal", label: "Salpicadero de cristal", desc: "Fácil de limpiar, sin juntas." },
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
export const lacquerById = (id: LacquerColorId) => LACQUER_COLORS.find((c) => c.id === id)!;

// Color efectivo de los frentes para los previews: si es laqueado, manda el
// color elegido (negro por defecto).
export const frontSwatch = (front: FrontId, lacquerColor?: LacquerColorId) =>
  front === "laqueado" ? lacquerById(lacquerColor ?? "negro").swatch : frontById(front).swatch;

// Filtro para payloads externos: descarta ids de extras que ya no existen
// (ej. bundles antiguos cacheados que aún mandan "cajones"/"organizadores").
export const isExtraId = (id: string): id is ExtraId => EXTRAS.some((e) => e.id === id);
