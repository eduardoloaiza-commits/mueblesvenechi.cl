// Catálogo de opciones del configurador de closets.
// Misma filosofía que kitchen-options.ts: única fuente de verdad para las
// opciones que ve el cliente y los precios (en lib/closet-pricing.ts).
// Los frentes se comparten con cocinas (FRONTS de kitchen-options.ts).

export type ClosetTypeId = "empotrado" | "walk-in" | "esquina" | "abierto";
export type DoorTypeId = "sin-puertas" | "abatir" | "correderas";
export type HeightOptionId = "estandar" | "hasta-cielo";
export type ClosetExtraId =
  | "cajonera"
  | "zapatera"
  | "doble-barra"
  | "maletero"
  | "organizadores"
  | "iluminacion";

export interface ClosetTypeOption {
  id: ClosetTypeId;
  label: string;
  desc: string;
  // Factor de complejidad de fabricación/instalación aplicado al total.
  complexity: number;
}

export interface DoorTypeOption {
  id: DoorTypeId;
  label: string;
  desc: string;
}

export interface HeightOption {
  id: HeightOptionId;
  label: string;
  desc: string;
}

export interface ClosetExtraOption {
  id: ClosetExtraId;
  label: string;
  desc: string;
}

export const CLOSET_TYPES: ClosetTypeOption[] = [
  {
    id: "empotrado",
    label: "Empotrado",
    desc: "Aprovecha la pared completa, de piso a cielo.",
    complexity: 1,
  },
  {
    id: "walk-in",
    label: "Walk-in closet",
    desc: "Vestidor caminable con módulos en dos o más paredes.",
    complexity: 1.15,
  },
  {
    id: "esquina",
    label: "En esquina o bajo escala",
    desc: "Diseño especial para rincones y alturas difíciles.",
    complexity: 1.1,
  },
  {
    id: "abierto",
    label: "Vestidor abierto",
    desc: "Módulos a la vista, sin puertas. Look loft.",
    complexity: 0.95,
  },
];

export const DOOR_TYPES: DoorTypeOption[] = [
  {
    id: "abatir",
    label: "Puertas de abatir",
    desc: "Apertura clásica, acceso total al interior.",
  },
  {
    id: "correderas",
    label: "Puertas correderas",
    desc: "No ocupan espacio al abrir. Ideal frente a la cama.",
  },
  {
    id: "sin-puertas",
    label: "Sin puertas",
    desc: "Interior a la vista, el más económico.",
  },
];

export const HEIGHT_OPTIONS: HeightOption[] = [
  {
    id: "estandar",
    label: "Altura estándar",
    desc: "Hasta 2,4 m. El clásico con maletero arriba.",
  },
  {
    id: "hasta-cielo",
    label: "De piso a cielo",
    desc: "Sin espacio muerto arriba. Módulos superiores extra.",
  },
];

export const CLOSET_EXTRAS: ClosetExtraOption[] = [
  { id: "cajonera", label: "Cajonera interior", desc: "Módulo de 4 cajones con riel telescópico." },
  { id: "zapatera", label: "Zapatera", desc: "Repisas inclinadas para hasta 15 pares." },
  { id: "doble-barra", label: "Doble barra de colgado", desc: "Duplica la ropa corta colgada." },
  { id: "maletero", label: "Maletero superior", desc: "Guardado alto para maletas y temporada." },
  { id: "organizadores", label: "Organizadores interiores", desc: "Corbateros, joyeros y divisores." },
  { id: "iluminacion", label: "Iluminación LED con sensor", desc: "Se enciende al abrir la puerta." },
];

// ------- helpers de búsqueda -------
export const closetTypeById = (id: ClosetTypeId) => CLOSET_TYPES.find((t) => t.id === id)!;
export const doorTypeById = (id: DoorTypeId) => DOOR_TYPES.find((d) => d.id === id)!;
export const heightById = (id: HeightOptionId) => HEIGHT_OPTIONS.find((h) => h.id === id)!;
export const closetExtraById = (id: ClosetExtraId) => CLOSET_EXTRAS.find((e) => e.id === id)!;

// Filtro para payloads externos: descarta ids de extras desconocidos.
export const isClosetExtraId = (id: string): id is ClosetExtraId =>
  CLOSET_EXTRAS.some((e) => e.id === id);
