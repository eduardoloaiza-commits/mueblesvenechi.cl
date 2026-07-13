// Motor de precios del configurador de closets.
//
// IMPORTANTE: igual que en pricing.ts, los valores son PLACEHOLDERS de
// referencia. El negocio debe reemplazar la tabla CLOSET_PRICING con sus
// números reales. El resultado se entrega siempre como valor "desde".

import type { FrontId, LacquerColorId } from "./kitchen-options";
import { frontById, lacquerById } from "./kitchen-options";
import type {
  ClosetExtraId,
  ClosetTypeId,
  DoorTypeId,
  HeightOptionId,
} from "./closet-options";
import { closetTypeById, doorTypeById, heightById, closetExtraById } from "./closet-options";
import { formatCLP, type PriceBreakdown } from "./pricing";

export interface ClosetConfig {
  closetType: ClosetTypeId;
  widthMeters: number; // metros lineales de frente de closet
  height: HeightOptionId;
  doors: DoorTypeId;
  front: FrontId;
  lacquerColor?: LacquerColorId; // solo cuando front === "laqueado"
  extras: ClosetExtraId[];
}

export const DEFAULT_CLOSET_CONFIG: ClosetConfig = {
  closetType: "empotrado",
  widthMeters: 2.4,
  height: "estandar",
  doors: "correderas",
  front: "melamina-madera",
  extras: ["cajonera", "doble-barra"],
};

// --- Tabla de precios (CLP) — EDITAR con valores reales del negocio ---
const CLOSET_PRICING = {
  // Estructura interior por metro lineal (módulos, repisas, una barra),
  // según terminación de los frentes/costados vistos.
  bodyPerMeter: {
    "melamina-mate": 240_000,
    "melamina-madera": 280_000,
    laqueado: 390_000,
  } as Record<FrontId, number>,

  // Recargo de puertas por metro lineal, según sistema.
  doorsPerMeter: {
    "sin-puertas": 0,
    abatir: 95_000,
    correderas: 130_000,
  } as Record<DoorTypeId, number>,

  // Factor por altura: de piso a cielo agrega módulos superiores.
  heightFactor: {
    estandar: 1,
    "hasta-cielo": 1.18,
  } as Record<HeightOptionId, number>,

  // Extras a precio fijo.
  extras: {
    cajonera: 95_000,
    zapatera: 60_000,
    "doble-barra": 35_000,
    maletero: 55_000,
    organizadores: 70_000,
    iluminacion: 75_000,
  } as Record<ClosetExtraId, number>,
} as const;

const clampMeters = (m: number) => Math.max(0, Math.min(12, Number.isFinite(m) ? m : 0));
const round = (n: number, step: number) => Math.round(n / step) * step;

export function calcClosetPrice(config: ClosetConfig): PriceBreakdown {
  const type = closetTypeById(config.closetType);
  const widthM = clampMeters(config.widthMeters);

  const bodyRaw =
    widthM *
    CLOSET_PRICING.bodyPerMeter[config.front] *
    CLOSET_PRICING.heightFactor[config.height] *
    type.complexity;

  const doors = widthM * CLOSET_PRICING.doorsPerMeter[config.doors];

  const extras = config.extras.reduce((sum, id) => sum + (CLOSET_PRICING.extras[id] ?? 0), 0);

  const cabinets = Math.round(bodyRaw + doors);
  const subtotal = cabinets + extras;

  // Mismo criterio que cocinas: "desde" a la baja, techo +22%.
  const from = round(subtotal * 0.98, 10_000);
  const to = round(subtotal * 1.22, 10_000);

  return {
    cabinets,
    countertop: 0,
    extras,
    island: 0,
    remodel: 0,
    subtotal,
    from,
    to,
  };
}

// Resumen legible de la configuración — para la nota de Kommo y WhatsApp.
export function describeClosetConfig(config: ClosetConfig): string {
  const frontLabel =
    config.front === "laqueado"
      ? `Laqueado ${lacquerById(config.lacquerColor ?? "negro").label.toLowerCase()}`
      : frontById(config.front).label;
  const lines = [
    `Producto: Closet a medida`,
    `Tipo: ${closetTypeById(config.closetType).label}`,
    `Frente: ${config.widthMeters} m · ${heightById(config.height).label}`,
    `Puertas: ${doorTypeById(config.doors).label}`,
    `Terminación: ${frontLabel}`,
  ];
  if (config.extras.length) {
    lines.push(`Interior: ${config.extras.map((id) => closetExtraById(id).label).join(", ")}`);
  }
  const price = calcClosetPrice(config);
  lines.push(
    `Estimación: desde ${formatCLP(price.from)} + IVA (rango hasta ${formatCLP(price.to)} + IVA)`
  );
  return lines.join("\n");
}
