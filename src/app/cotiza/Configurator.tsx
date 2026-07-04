"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  COUNTERTOPS,
  EXTRAS,
  FRONTS,
  LAYOUTS,
  PROJECT_TYPES,
  TIMEFRAMES,
  type ExtraId,
} from "@/lib/kitchen-options";
import {
  calcPrice,
  describeConfig,
  formatCLP,
  DEFAULT_CONFIG,
  type KitchenConfig,
} from "@/lib/pricing";
import { site, whatsappLink } from "@/lib/site";
import { KitchenPreview } from "./KitchenPreview";

interface Contact {
  name: string;
  phone: string;
  email: string;
  comuna: string;
  timeframe: string;
}

const STEPS = [
  "Distribución",
  "Medidas",
  "Cubierta",
  "Frentes",
  "Extras",
  "Proyecto",
  "Tus datos",
] as const;

export function Configurator() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<KitchenConfig>(DEFAULT_CONFIG);
  const [contact, setContact] = useState<Contact>({
    name: "",
    phone: "",
    email: "",
    comuna: "",
    timeframe: TIMEFRAMES[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | { priceFromLabel: string | null }>(null);

  const price = useMemo(() => calcPrice(config), [config]);

  const set = (patch: Partial<KitchenConfig>) => setConfig((c) => ({ ...c, ...patch }));
  const toggleExtra = (id: ExtraId) =>
    setConfig((c) => ({
      ...c,
      extras: c.extras.includes(id) ? c.extras.filter((e) => e !== id) : [...c.extras, id],
    }));

  const isLast = step === STEPS.length - 1;
  const canSubmit = contact.name.trim().length >= 2 && contact.phone.trim().length >= 8;

  // Payload compartido para envío final y captura progresiva.
  const buildPayload = (source: "configurador" | "parcial") => ({
    ...contact,
    email: contact.email || undefined,
    layout: config.layout,
    baseMeters: config.baseMeters,
    wallMeters: config.wallMeters,
    countertop: config.countertop,
    front: config.front,
    extras: config.extras,
    projectType: config.projectType,
    priceFrom: price.from,
    priceTo: price.to,
    source,
  });

  // Captura progresiva: si el usuario deja un teléfono válido y abandona sin
  // enviar, mandamos el lead parcial con sendBeacon para no perderlo.
  const doneRef = useRef(false);
  const sentPartialRef = useRef(false);
  useEffect(() => {
    doneRef.current = done !== null;
  }, [done]);

  useEffect(() => {
    const handler = () => {
      if (doneRef.current || sentPartialRef.current) return;
      if (contact.name.trim().length >= 2 && contact.phone.trim().length >= 8) {
        sentPartialRef.current = true;
        const blob = new Blob([JSON.stringify(buildPayload("parcial"))], {
          type: "application/json",
        });
        navigator.sendBeacon?.("/api/lead", blob);
      }
    };
    window.addEventListener("pagehide", handler);
    return () => window.removeEventListener("pagehide", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact, config, price]);

  const waMessage = () =>
    `Hola ${site.brand}, cotizé mi cocina en la web:\n\n${describeConfig(config)}\n\nMi nombre: ${contact.name}. Quiero avanzar.`;

  async function submit() {
    setError(null);
    if (!canSubmit) {
      setError("Necesitamos tu nombre y un WhatsApp para enviarte la cotización.");
      return;
    }
    setSubmitting(true);
    sentPartialRef.current = true; // evita duplicar con el beacon
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload("configurador")),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error ?? "No pudimos enviar tu cotización.");
      setDone({ priceFromLabel: data.priceFromLabel ?? formatCLP(price.from) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ocurrió un error. Intenta de nuevo.");
      sentPartialRef.current = false;
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return <ResultScreen priceFromLabel={done.priceFromLabel} contact={contact} waMessage={waMessage()} />;
  }

  return (
    <div className="container-page grid gap-10 py-10 pb-28 lg:grid-cols-[1fr_400px] lg:py-14 lg:pb-14">
      {/* Columna de pasos */}
      <div>
        {/* progreso */}
        <ol className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                onClick={() => i <= step && setStep(i)}
                className={`kicker flex items-center gap-1.5 transition ${
                  i === step ? "text-gold" : i < step ? "text-foreground" : "text-muted/50"
                }`}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="hidden sm:inline">{s}</span>
                {i < step && <span className="text-gold">✓</span>}
              </button>
            </li>
          ))}
        </ol>

        <div className="min-h-[300px]">
          {step === 0 && (
            <StepGrid title="¿Cómo es la forma de tu cocina?" hint="Elige la distribución que más se parezca a tu espacio.">
              {LAYOUTS.map((l) => (
                <Card key={l.id} active={config.layout === l.id} title={l.label} desc={l.desc} onClick={() => set({ layout: l.id })} />
              ))}
            </StepGrid>
          )}

          {step === 1 && (
            <div>
              <StepHead title="¿Cuántos metros de mueble necesitas?" hint="Aproximado. Lo afinamos con la visita de medición." />
              <div className="mt-8 space-y-5">
                <MeterInput label="Muebles base (piso)" value={config.baseMeters} onChange={(v) => set({ baseMeters: v })} />
                <MeterInput label="Muebles murales (aéreos)" value={config.wallMeters} onChange={(v) => set({ wallMeters: v })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <StepGrid title="Elige tu cubierta" hint="El material de la superficie de trabajo. Nuestra marmolería la fabrica e instala." single>
              {COUNTERTOPS.map((c) => (
                <Swatch key={c.id} active={config.countertop === c.id} color={c.swatch} title={c.label} desc={c.desc} onClick={() => set({ countertop: c.id })} />
              ))}
            </StepGrid>
          )}

          {step === 3 && (
            <StepGrid title="Elige la terminación de los frentes" hint="Las puertas y cajones que se ven por fuera." single>
              {FRONTS.map((f) => (
                <Swatch key={f.id} active={config.front === f.id} color={f.swatch} title={f.label} desc={f.desc} onClick={() => set({ front: f.id })} />
              ))}
            </StepGrid>
          )}

          {step === 4 && (
            <div>
              <StepHead title="¿Le sumamos algún extra?" hint="Puedes elegir varios o ninguno." />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {EXTRAS.map((e) => (
                  <Toggle key={e.id} active={config.extras.includes(e.id)} title={e.label} desc={e.desc} onClick={() => toggleExtra(e.id)} />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <StepHead title="Sobre tu proyecto" hint="Nos ayuda a preparar mejor la reunión." />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((p) => (
                  <Card key={p.id} active={config.projectType === p.id} title={p.label} desc={p.desc} onClick={() => set({ projectType: p.id })} />
                ))}
              </div>
              <div className="mt-8">
                <span className="kicker text-muted">¿Para cuándo la necesitas?</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIMEFRAMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setContact((c) => ({ ...c, timeframe: t }))}
                      className={`rounded border px-4 py-2 text-sm transition ${
                        contact.timeframe === t ? "border-gold text-gold" : "border-line text-muted hover:border-line-strong"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <StepHead title="¿A dónde te enviamos la cotización?" hint="Con esto te contactamos para afinar los detalles. Solo nombre y WhatsApp son obligatorios." />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Field label="Nombre y apellido" required>
                  <input className="input" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Ej: María Paredes" />
                </Field>
                <Field label="WhatsApp" required>
                  <input className="input" value={contact.phone} inputMode="tel" onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} placeholder="+56 9 ..." />
                </Field>
                <Field label="Correo (opcional)">
                  <input className="input" value={contact.email} inputMode="email" onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder="tucorreo@ejemplo.cl" />
                </Field>
                <Field label="Comuna (opcional)">
                  <input className="input" value={contact.comuna} onChange={(e) => setContact((c) => ({ ...c, comuna: e.target.value }))} placeholder="Villarrica, Pucón..." />
                </Field>
              </div>
              <p className="mt-4 text-xs text-muted">
                Sin compromiso · la visita de medición no se cobra · respondemos el mismo día.
              </p>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            </div>
          )}
        </div>

        {/* navegación (desktop) */}
        <div className="mt-10 hidden items-center justify-between lg:flex">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost disabled:opacity-30">
            Atrás
          </button>
          {isLast ? (
            <button onClick={submit} disabled={submitting} className="btn-primary disabled:opacity-60">
              {submitting ? "Enviando..." : "Recibir mi cotización"}
            </button>
          ) : (
            <button onClick={() => setStep((s) => s + 1)} className="btn-primary">
              Continuar
            </button>
          )}
        </div>
      </div>

      {/* Columna sticky: preview + precio (desktop) */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="border border-line bg-surface p-4">
          <div className="aspect-[4/3] w-full">
            <KitchenPreview config={config} />
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="kicker text-gold">Estimación</p>
            <p className="font-display mt-1 text-4xl text-foreground">desde {formatCLP(price.from)}</p>
            <p className="mt-2 text-xs text-muted">
              Valor referencial. Lo afinamos con la visita de medición.
            </p>
          </div>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <Row k="Distribución" v={LAYOUTS.find((l) => l.id === config.layout)!.label} />
            <Row k="Medidas" v={`${config.baseMeters} m base`} />
            <Row k="Cubierta" v={COUNTERTOPS.find((c) => c.id === config.countertop)!.label} gold />
          </dl>
        </div>
      </aside>

      {/* Barra fija mobile: precio + acción */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/95 backdrop-blur lg:hidden">
        <div className="container-page flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="kicker text-gold">Desde</p>
            <p className="font-display truncate text-xl text-foreground">{formatCLP(price.from)}</p>
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost !px-4 !py-2.5 text-sm">
                Atrás
              </button>
            )}
            {isLast ? (
              <button onClick={submit} disabled={submitting} className="btn-primary !px-4 !py-2.5 text-sm disabled:opacity-60">
                {submitting ? "..." : "Recibir"}
              </button>
            ) : (
              <button onClick={() => setStep((s) => s + 1)} className="btn-primary !px-5 !py-2.5 text-sm">
                Continuar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- piezas de UI ---------- */

function StepHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">{title}</h2>
      {hint && <p className="mt-3 max-w-xl text-sm text-muted">{hint}</p>}
    </div>
  );
}

function StepGrid({
  title,
  hint,
  children,
  single,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  single?: boolean;
}) {
  return (
    <div>
      <StepHead title={title} hint={hint} />
      <div className={`mt-8 grid gap-3 ${single ? "" : "sm:grid-cols-2"}`}>{children}</div>
    </div>
  );
}

function Card({ active, title, desc, onClick }: { active: boolean; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`border p-5 text-left transition ${active ? "border-gold bg-surface-2" : "border-line bg-surface hover:border-line-strong"}`}
    >
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </button>
  );
}

function Swatch({ active, color, title, desc, onClick }: { active: boolean; color: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-5 border p-4 text-left transition ${active ? "border-gold bg-surface-2" : "border-line bg-surface hover:border-line-strong"}`}
    >
      <span className="h-14 w-14 shrink-0 border border-white/10" style={{ background: color }} />
      <span>
        <span className="font-display block text-lg text-foreground">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );
}

function Toggle({ active, title, desc, onClick }: { active: boolean; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 border p-4 text-left transition ${active ? "border-gold bg-surface-2" : "border-line bg-surface hover:border-line-strong"}`}
    >
      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border text-xs ${active ? "border-gold bg-gold text-black" : "border-line-strong"}`}>
        {active ? "✓" : ""}
      </span>
      <span>
        <span className="block font-medium text-foreground">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );
}

function MeterInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const step = (delta: number) => onChange(Math.max(0, Math.min(20, Math.round((value + delta) * 10) / 10)));
  return (
    <div className="border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted">Metros lineales</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => step(-0.5)} className="h-9 w-9 border border-line-strong text-lg text-foreground hover:border-gold">−</button>
          <span className="font-display w-14 text-center text-2xl text-foreground">{value}</span>
          <button onClick={() => step(0.5)} className="h-9 w-9 border border-line-strong text-lg text-foreground hover:border-gold">+</button>
        </div>
      </div>
      <input type="range" min={0} max={12} step={0.5} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-4 w-full accent-[var(--gold)]" />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="kicker text-muted">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Row({ k, v, gold }: { k: string; v: string; gold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{k}</dt>
      <dd className={gold ? "text-gold" : "text-foreground"}>{v}</dd>
    </div>
  );
}

function ResultScreen({
  priceFromLabel,
  contact,
  waMessage,
}: {
  priceFromLabel: string | null;
  contact: Contact;
  waMessage: string;
}) {
  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-xl border border-line bg-surface p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-2xl text-gold">✓</div>
        <h1 className="font-display mt-6 text-3xl font-medium text-foreground">
          Listo, {contact.name.split(" ")[0] || "gracias"}.
        </h1>
        <p className="mt-4 text-muted">
          Recibimos tu cocina.{" "}
          {priceFromLabel && (
            <>
              Tu estimación es <span className="text-gold">desde {priceFromLabel}</span>.{" "}
            </>
          )}
          Continúa por WhatsApp y coordinamos la visita el mismo día.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Continuar por WhatsApp
          </a>
          <Link href="/" className="btn-ghost">Volver al inicio</Link>
        </div>
        <p className="mt-6 text-xs text-muted">
          La estimación es referencial. El valor final se confirma tras la medición en terreno.
        </p>
      </div>
    </div>
  );
}
