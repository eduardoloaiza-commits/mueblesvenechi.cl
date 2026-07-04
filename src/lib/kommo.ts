// Integración headless con Kommo CRM.
// Patrón reutilizado de micasaconsubsidio.cl: crea lead + contacto de forma
// atómica con POST /api/v4/leads/complex y guarda kommoLeadId/kommoContactId.
//
// Es NO-OP si KOMMO_BEARER_TOKEN no está configurado, de modo que el formulario
// nunca se rompe en local o antes de tener la cuenta real conectada.
//
// Config vía variables de entorno (ver .env.example):
//   KOMMO_BEARER_TOKEN  — JWT de larga duración (Settings → Integraciones → API)
//   KOMMO_BASE_URL      — https://<subdominio>.kommo.com/api/v4
//   KOMMO_PIPELINE_ID   — id del pipeline web
//   KOMMO_STATUS_ID     — id de la etapa inicial ("Lead nuevo")

const BASE_URL = process.env.KOMMO_BASE_URL ?? "";
const PIPELINE_ID = Number(process.env.KOMMO_PIPELINE_ID) || undefined;
const STATUS_ID = Number(process.env.KOMMO_STATUS_ID) || undefined;

function isEnabled() {
  return Boolean(process.env.KOMMO_BEARER_TOKEN && BASE_URL);
}

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.KOMMO_BEARER_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export interface KommoLeadData {
  name: string;
  phone: string;
  email?: string;
  price?: number; // valor "desde" estimado → campo price del lead
  // Resumen legible de la configuración (va como nota del lead).
  summary?: string;
  tags?: string[];
}

/**
 * Crea un lead + contacto en Kommo. Devuelve los IDs para persistir en la DB,
 * o nulls si la integración no está configurada. Nunca lanza si está deshabilitada.
 */
export async function createKommoLead(
  data: KommoLeadData
): Promise<{ kommoLeadId: number | null; kommoContactId: number | null }> {
  if (!isEnabled()) return { kommoLeadId: null, kommoContactId: null };

  const contactFields: Record<string, unknown>[] = [
    { field_code: "PHONE", values: [{ value: data.phone, enum_code: "WORK" }] },
  ];
  if (data.email) {
    contactFields.push({
      field_code: "EMAIL",
      values: [{ value: data.email, enum_code: "WORK" }],
    });
  }

  const lead: Record<string, unknown> = {
    name: `Cocina — ${data.name}`,
    _embedded: {
      contacts: [{ name: data.name, custom_fields_values: contactFields }],
    },
  };
  if (PIPELINE_ID) lead.pipeline_id = PIPELINE_ID;
  if (STATUS_ID) lead.status_id = STATUS_ID;
  if (typeof data.price === "number") lead.price = data.price;
  if (data.tags?.length) lead.tags_to_add = data.tags.map((name) => ({ name }));

  const res = await fetch(`${BASE_URL}/leads/complex`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify([lead]),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`[Kommo] Create lead failed ${res.status}: ${text}`);
  }

  const json = JSON.parse(text);
  const created = Array.isArray(json) ? json[0] : json?._embedded?.leads?.[0];
  const kommoLeadId: number | null = created?.id ?? null;
  const kommoContactId: number | null =
    created?.contact_id ?? created?._embedded?.contacts?.[0]?.id ?? null;

  // Nota con el detalle de la cotización (best-effort, no bloquea).
  if (kommoLeadId && data.summary) {
    await addLeadNote(kommoLeadId, data.summary).catch(() => {});
  }

  return { kommoLeadId, kommoContactId };
}

async function addLeadNote(kommoLeadId: number, text: string): Promise<void> {
  if (!isEnabled()) return;
  await fetch(`${BASE_URL}/leads/${kommoLeadId}/notes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify([
      { entity_id: kommoLeadId, note_type: "common", params: { text } },
    ]),
  });
}
