// Motor de precios del configurador.
//
// Los precios por metro lineal de muebles y cubiertas son REALES (entregados
// por el negocio en julio 2026) y están expresados en valores NETOS: la UI
// siempre los muestra como "desde $X + IVA". Siguen siendo PLACEHOLDER los
// multiplicadores de frente, los extras, la isla y el recargo de remodelación
// (marcados abajo). El resultado se entrega siempre como un valor "desde"
// (estimación), sujeto a visita técnica y medición.

import type {
  CountertopId,
  ExtraId,
  FrontId,
  LacquerColorId,
  LayoutId,
  ProjectType,
  WallPosition,
} from "./kitchen-options";
import {
  countertopById,
  frontById,
  lacquerById,
  layoutById,
  EXTRAS,
  WALL_POSITIONS,
} from "./kitchen-options";

export interface KitchenConfig {
  layout: LayoutId;
  baseMeters: number; // metros lineales de mueble base
  drawerMeters: number; // metros de la base que llevan cajonera (subconjunto de baseMeters)
  wallMeters: number; // metros lineales de mueble mural (aéreo)
  wallPosition: WallPosition; // dónde va el tramo aéreo sobre el mesón
  countertop: CountertopId;
  front: FrontId;
  lacquerColor?: LacquerColorId; // solo cuando front === "laqueado"
  extras: ExtraId[];
  projectType: ProjectType;
}

export const DEFAULT_CONFIG: KitchenConfig = {
  layout: "l",
  baseMeters: 3,
  drawerMeters: 1,
  wallMeters: 2,
  wallPosition: "centro",
  countertop: "cuarzo",
  front: "melamina-madera",
  extras: ["lavaplatos"],
  projectType: "nueva",
};

// --- Tabla de precios (CLP, NETOS) ---
const PRICING = {
  // Mueble base por metro lineal (puerta abatible, sin cubierta). REAL.
  basePerMeter: 297_000,

  // Mueble base con cajonera por metro lineal (sin cubierta). REAL.
  // Rieles telescópicos incluidos.
  drawerBasePerMeter: 424_000,

  // Mueble aéreo (puerta abatible) por metro lineal. REAL.
  wallPerMeter: 249_000,

  // Multiplicador según terminación de los frentes, sobre la base melamina.
  // PLACEHOLDER: validar con el negocio.
  frontMultiplier: {
    "melamina-mate": 1,
    "melamina-madera": 1.08,
    laqueado: 1.35,
  } as Record<FrontId, number>,

  // Cubierta por metro lineal, según material. REALES.
  // Nota: el ultracompacto Laminam ($600.000/ml) existe como producto pero
  // NO se cotiza en el configurador; aquí va solo el genérico.
  countertopPerMeter: {
    postformado: 80_000,
    porcelanica: 180_000,
    cuarzo: 240_000,
    ultracompacto: 280_000,
  } as Record<CountertopId, number>,

  // Extras a precio fijo. PLACEHOLDER salvo campana: la campana no se vende,
  // solo se deja el espacio en el diseño, por eso vale $0.
  extras: {
    campana: 0,
    lavaplatos: 130_000,
    especiero: 45_000,
    "basurero-retractil": 60_000,
    vitrinas: 120_000,
    iluminacion: 65_000,
    "muro-cristal": 140_000,
  } as Record<ExtraId, number>,

  // Isla incluida cuando el layout la contempla. PLACEHOLDER.
  island: 680_000,

  // Recargo por remodelación (retiro de cocina antigua + ajustes). PLACEHOLDER.
  remodelSurcharge: 120_000,
} as const;

export interface PriceBreakdown {
  cabinets: number;
  countertop: number;
  extras: number;
  island: number;
  remodel: number;
  subtotal: number;
  from: number; // valor "desde" redondeado hacia abajo
  to: number; // techo estimado del rango
}

const clampMeters = (m: number) => Math.max(0, Math.min(20, Number.isFinite(m) ? m : 0));
const round = (n: number, step: number) => Math.round(n / step) * step;

export function calcPrice(config: KitchenConfig): PriceBreakdown {
  const layout = layoutById(config.layout);
  const baseM = clampMeters(config.baseMeters);
  const wallM = clampMeters(config.wallMeters);
  // La cajonera nunca puede superar los metros de base.
  const drawerM = Math.min(clampMeters(config.drawerMeters), baseM);
  const hingedM = baseM - drawerM;

  const cabinetsRaw =
    (hingedM * PRICING.basePerMeter +
      drawerM * PRICING.drawerBasePerMeter +
      wallM * PRICING.wallPerMeter) *
    PRICING.frontMultiplier[config.front] *
    layout.complexity;

  const countertop = baseM * PRICING.countertopPerMeter[config.countertop];

  const extras = config.extras.reduce((sum, id) => sum + (PRICING.extras[id] ?? 0), 0);

  const island = layout.hasIsland ? PRICING.island : 0;

  const remodel = config.projectType === "remodelacion" ? PRICING.remodelSurcharge : 0;

  const cabinets = Math.round(cabinetsRaw);
  const subtotal = cabinets + countertop + extras + island + remodel;

  // "Desde" redondeado a la baja; techo del rango +22%.
  const from = round(subtotal * 0.98, 10_000);
  const to = round(subtotal * 1.22, 10_000);

  return { cabinets, countertop, extras, island, remodel, subtotal, from, to };
}

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const formatCLP = (n: number) => CLP.format(n);

// Resumen legible de la configuración — para la nota de Kommo y la UI de gracias.
export function describeConfig(config: KitchenConfig): string {
  const layout = layoutById(config.layout);
  const frontLabel =
    config.front === "laqueado"
      ? `Laqueado ${lacquerById(config.lacquerColor ?? "negro").label.toLowerCase()}`
      : frontById(config.front).label;
  const wallPos = WALL_POSITIONS.find((p) => p.id === config.wallPosition)?.label ?? "";
  const lines = [
    `Distribución: ${layout.label}`,
    `Metros base: ${config.baseMeters} m (${config.drawerMeters} m con cajonera)`,
    `Muebles aéreos: ${config.wallMeters} m${wallPos ? ` · ${wallPos.toLowerCase()}` : ""}`,
    `Cubierta: ${countertopById(config.countertop).label}`,
    `Frentes: ${frontLabel}`,
    `Proyecto: ${config.projectType === "remodelacion" ? "Remodelación" : "Cocina nueva"}`,
  ];
  if (config.extras.length) {
    // Lookup tolerante: ignora ids que ya no existen en el catálogo.
    const labels = config.extras
      .map((id) => EXTRAS.find((e) => e.id === id)?.label)
      .filter(Boolean);
    if (labels.length) lines.push(`Extras: ${labels.join(", ")}`);
  }
  const price = calcPrice(config);
  lines.push(
    `Estimación: desde ${formatCLP(price.from)} + IVA (rango hasta ${formatCLP(price.to)} + IVA)`
  );
  return lines.join("\n");
}
