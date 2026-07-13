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
import {
  calcClosetPrice,
  describeClosetConfig,
  type ClosetConfig,
} from "@/lib/closet-pricing";
import { isExtraId } from "@/lib/kitchen-options";
import { isClosetExtraId } from "@/lib/closet-options";

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
  const product = data.product ?? "cocina";
  let priceFrom = data.priceFrom ?? null;
  let priceTo = data.priceTo ?? null;
  let summary: string | undefined;

  if (product === "closet" && data.closetType && data.doorType && data.front) {
    const config: ClosetConfig = {
      closetType: data.closetType,
      widthMeters: data.baseMeters ?? 0,
      height: data.heightOption ?? "estandar",
      doors: data.doorType,
      front: data.front,
      lacquerColor: data.lacquerColor,
      // Filtra ids que ya no existen (bundles antiguos cacheados en clientes).
      extras: (data.extras ?? []).filter(isClosetExtraId),
    };
    const price = calcClosetPrice(config);
    priceFrom = price.from;
    priceTo = price.to;
    summary = describeClosetConfig(config);
  } else if (product === "cocina" && data.layout && data.countertop && data.front) {
    const config: KitchenConfig = {
      layout: data.layout,
      baseMeters: data.baseMeters ?? 0,
      drawerMeters: data.drawerMeters ?? 0,
      wallMeters: data.wallMeters ?? 0,
      wallPosition: data.wallPosition ?? "completo",
      countertop: data.countertop,
      front: data.front,
      lacquerColor: data.lacquerColor,
      // Filtra ids que ya no existen (bundles antiguos cacheados en clientes).
      extras: (data.extras ?? []).filter(isExtraId),
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
          product,
          projectType: data.projectType || null,
          timeframe: data.timeframe || null,
          layout: data.layout || null,
          baseMeters: data.baseMeters ?? null,
          drawerMeters: data.drawerMeters ?? null,
          wallMeters: data.wallMeters ?? null,
          wallPosition: data.wallPosition || null,
          countertop: data.countertop || null,
          closetType: data.closetType || null,
          doorType: data.doorType || null,
          heightOption: data.heightOption || null,
          front: data.front || null,
          lacquerColor: data.lacquerColor || null,
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
      product === "closet"
        ? "closet"
        : data.projectType === "remodelacion"
          ? "remodelacion"
          : "cocina-nueva",
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
