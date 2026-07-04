// Motor de precios del configurador.
//
// IMPORTANTE: los valores son PLACEHOLDERS de referencia. El negocio debe
// reemplazar la tabla PRICING con sus números reales. El resultado se entrega
// siempre como un valor "desde" (estimación), sujeto a visita y medición.

import type {
  CountertopId,
  ExtraId,
  FrontId,
  LayoutId,
  ProjectType,
} from "./kitchen-options";
import {
  countertopById,
  extraById,
  frontById,
  layoutById,
} from "./kitchen-options";

export interface KitchenConfig {
  layout: LayoutId;
  baseMeters: number; // metros lineales de mueble base
  wallMeters: number; // metros lineales de mueble mural (aéreo)
  countertop: CountertopId;
  front: FrontId;
  extras: ExtraId[];
  projectType: ProjectType;
}

export const DEFAULT_CONFIG: KitchenConfig = {
  layout: "l",
  baseMeters: 3,
  wallMeters: 2,
  countertop: "cuarzo",
  front: "melamina-madera",
  extras: ["campana", "lavaplatos", "cajones"],
  projectType: "nueva",
};

// --- Tabla de precios (CLP) — EDITAR con valores reales del negocio ---
const PRICING = {
  // Mueble base por metro lineal, según terminación de los frentes.
  baseFrontPerMeter: {
    "melamina-mate": 190_000,
    "melamina-madera": 230_000,
    laqueado: 330_000,
  } as Record<FrontId, number>,

  // Mueble mural/aéreo: fracción del valor del mueble base.
  wallFactor: 0.7,

  // Cubierta por metro lineal, según material.
  countertopPerMeter: {
    postformado: 48_000,
    granito: 135_000,
    cuarzo: 165_000,
    sinterizada: 215_000,
  } as Record<CountertopId, number>,

  // Extras a precio fijo.
  extras: {
    campana: 180_000,
    lavaplatos: 130_000,
    cajones: 95_000,
    organizadores: 70_000,
    iluminacion: 65_000,
    "muro-cristal": 140_000,
  } as Record<ExtraId, number>,

  // Isla incluida cuando el layout la contempla.
  island: 680_000,

  // Recargo por remodelación (retiro de cocina antigua + ajustes).
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

  const basePerM = PRICING.baseFrontPerMeter[config.front];
  const cabinetsRaw =
    (baseM * basePerM + wallM * basePerM * PRICING.wallFactor) * layout.complexity;

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
  const lines = [
    `Distribución: ${layout.label}`,
    `Metros base: ${config.baseMeters} m · muebles murales: ${config.wallMeters} m`,
    `Cubierta: ${countertopById(config.countertop).label}`,
    `Frentes: ${frontById(config.front).label}`,
    `Proyecto: ${config.projectType === "remodelacion" ? "Remodelación" : "Cocina nueva"}`,
  ];
  if (config.extras.length) {
    lines.push(`Extras: ${config.extras.map((id) => extraById(id).label).join(", ")}`);
  }
  const price = calcPrice(config);
  lines.push(`Estimación: desde ${formatCLP(price.from)} (rango hasta ${formatCLP(price.to)})`);
  return lines.join("\n");
}
