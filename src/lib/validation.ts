import { z } from "zod";

// Validación del payload que envía el configurador a /api/lead.
// Los campos de configuración son opcionales para permitir CAPTURA PROGRESIVA:
// guardamos el contacto aunque el cliente no haya completado todos los pasos.

export const leadSchema = z.object({
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
  projectType: z.enum(["nueva", "remodelacion"]).optional(),
  timeframe: z.string().trim().max(60).optional(),

  // Configuración cotizada (snapshot)
  layout: z.enum(["lineal", "l", "u", "isla"]).optional(),
  baseMeters: z.number().min(0).max(20).optional(),
  wallMeters: z.number().min(0).max(20).optional(),
  countertop: z.enum(["postformado", "cuarzo", "granito", "sinterizada"]).optional(),
  front: z.enum(["melamina-mate", "melamina-madera", "laqueado"]).optional(),
  extras: z.array(z.string().max(40)).max(12).optional(),

  // Precio estimado calculado en el cliente (se recalcula en el server igual)
  priceFrom: z.number().int().min(0).optional(),
  priceTo: z.number().int().min(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
