import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/validation";
import { createKommoLead } from "@/lib/kommo";
import {
  calcPrice,
  describeConfig,
  formatCLP,
  type KitchenConfig,
} from "@/lib/pricing";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const data = parsed.data;

  // Recalcular el precio en el servidor (nunca confiar en el cliente) cuando
  // la configuración viene completa.
  let priceFrom = data.priceFrom ?? null;
  let priceTo = data.priceTo ?? null;
  let summary: string | undefined;

  if (data.layout && data.countertop && data.front) {
    const config: KitchenConfig = {
      layout: data.layout,
      baseMeters: data.baseMeters ?? 0,
      wallMeters: data.wallMeters ?? 0,
      countertop: data.countertop,
      front: data.front,
      extras: (data.extras ?? []) as KitchenConfig["extras"],
      projectType: data.projectType ?? "nueva",
    };
    const price = calcPrice(config);
    priceFrom = price.from;
    priceTo = price.to;
    summary = describeConfig(config);
  }

  // 1) Guardar en la base de datos (respaldo propio + analítica).
  // Best-effort: si la DB aún no está conectada (antes del deploy con Neon),
  // no rompemos el flujo del cliente; el error queda logueado.
  let lead: { id: string } = { id: "sin-persistir" };
  let persisted = false;
  if (process.env.DATABASE_URL) {
    try {
      lead = await db.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          comuna: data.comuna || null,
          projectType: data.projectType || null,
          timeframe: data.timeframe || null,
          layout: data.layout || null,
          baseMeters: data.baseMeters ?? null,
          wallMeters: data.wallMeters ?? null,
          countertop: data.countertop || null,
          front: data.front || null,
          extras: data.extras ?? [],
          priceFrom: priceFrom ?? undefined,
          priceTo: priceTo ?? undefined,
          source: data.source ?? "configurador",
        },
      });
      persisted = true;
    } catch (err) {
      console.error("[lead] DB write failed:", err);
    }
  } else {
    console.warn("[lead] DATABASE_URL no configurada — lead no persistido:", data.name);
  }

  // 2) Enviar a Kommo (no bloquea la respuesta si falla o está deshabilitado).
  try {
    const tags = [
      data.source === "parcial" ? "cotizacion-parcial" : "web-configurador",
      data.comuna,
      data.projectType === "remodelacion" ? "remodelacion" : "cocina-nueva",
    ].filter(Boolean) as string[];

    const { kommoLeadId, kommoContactId } = await createKommoLead({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      price: priceFrom ?? undefined,
      summary: summary
        ? `${summary}\n\nContacto: ${data.phone}${data.comuna ? ` · ${data.comuna}` : ""}`
        : undefined,
      tags,
    });

    if (persisted && (kommoLeadId || kommoContactId)) {
      await db.lead.update({
        where: { id: lead.id },
        data: { kommoLeadId, kommoContactId },
      });
    }
  } catch (err) {
    console.error("[lead] Kommo sync failed:", err);
  }

  return NextResponse.json({
    ok: true,
    id: lead.id,
    persisted,
    priceFrom,
    priceTo,
    priceFromLabel: priceFrom != null ? formatCLP(priceFrom) : null,
  });
}
