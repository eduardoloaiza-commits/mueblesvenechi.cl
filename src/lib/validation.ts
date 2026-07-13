import { z } from "zod";
import type {
  CountertopId,
  FrontId,
  LacquerColorId,
  LayoutId,
  WallPosition,
} from "./kitchen-options";

// Validación del payload que envía el configurador a /api/lead.
// Los campos de configuración son opcionales para permitir CAPTURA PROGRESIVA:
// guardamos el contacto aunque el cliente no haya completado todos los pasos.

// Listas espejo de los tipos del catálogo. El `satisfies` hace que una
// divergencia entre catálogo y validación falle en compilación.
const LAYOUT_IDS = ["lineal", "l", "paralela", "u", "peninsula", "isla"] as const satisfies readonly LayoutId[];
const COUNTERTOP_IDS = ["postformado", "porcelanica", "cuarzo", "ultracompacto"] as const satisfies readonly CountertopId[];
const FRONT_IDS = ["melamina-mate", "melamina-madera", "laqueado"] as const satisfies readonly FrontId[];
const LACQUER_IDS = ["blanco", "crema", "gris", "grafito", "negro"] as const satisfies readonly LacquerColorId[];
const WALL_POSITION_IDS = ["izquierda", "derecha", "completo"] as const satisfies readonly WallPosition[];

export const leadSchema = z
  .object({
    // Contacto (obligatorio)
    name: z.string().trim().min(2, "Ingresa tu nombre").max(120),
    phone: z
      .string()
      .trim()
      .min(8, "Ingresa un teléfono válido")
      .max(20)
      .regex(/^[0-9+\s()-]+$/, "Teléfono inválido"),
    email: z.string().trim().email("Correo inválido").max(160).optional().or(z.literal("")),
    comuna: z.string().trim().max(80).optional(),

    // Contexto
    product: z.enum(["cocina", "closet"]).optional(),
    projectType: z.enum(["nueva", "remodelacion"]).optional(),
    timeframe: z.string().trim().max(60).optional(),

    // Configuración cotizada (snapshot) — cocina
    layout: z.enum(LAYOUT_IDS).optional(),
    baseMeters: z.number().min(0).max(20).optional(),
    drawerMeters: z.number().min(0).max(20).optional(),
    wallMeters: z.number().min(0).max(20).optional(),
    wallPosition: z.enum(WALL_POSITION_IDS).optional(),
    countertop: z.enum(COUNTERTOP_IDS).optional(),

    // Configuración cotizada (snapshot) — closet
    closetType: z.enum(["empotrado", "walk-in", "esquina", "abierto"]).optional(),
    doorType: z.enum(["sin-puertas", "abatir", "correderas"]).optional(),
    heightOption: z.enum(["estandar", "hasta-cielo"]).optional(),

    // Compartidos por ambos productos
    front: z.enum(FRONT_IDS).optional(),
    lacquerColor: z.enum(LACQUER_IDS).optional(),
    extras: z.array(z.string().max(40)).max(12).optional(),

    // Precio estimado calculado en el cliente (se recalcula en el server igual)
    priceFrom: z.number().int().min(0).optional(),
    priceTo: z.number().int().min(0).optional(),

    // Origen del lead: "configurador" (completado) o "parcial" (captura progresiva)
    source: z.enum(["configurador", "parcial"]).optional(),
  })
  .superRefine((data, ctx) => {
    // Los mínimos de medidas aplican solo a cocina: en closet, baseMeters
    // reutiliza el campo para los metros de frente (sin mínimo comercial).
    const isKitchen = (data.product ?? "cocina") === "cocina";
    if (isKitchen && data.baseMeters !== undefined && data.baseMeters < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["baseMeters"],
        message: "El mueble base parte en 2 metros",
      });
    }
    if (
      isKitchen &&
      data.wallMeters !== undefined &&
      data.wallMeters !== 0 &&
      data.wallMeters < 0.5
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["wallMeters"],
        message: "El mueble aéreo mínimo es de 0,5 metros (o 0 si no llevas)",
      });
    }
    if (
      data.drawerMeters !== undefined &&
      data.baseMeters !== undefined &&
      data.drawerMeters > data.baseMeters
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["drawerMeters"],
        message: "Los metros con cajonera no pueden superar los metros de base",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
