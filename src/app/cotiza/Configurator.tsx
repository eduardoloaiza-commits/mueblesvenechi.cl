"use client";

import { useMemo, useState } from "react";
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
import { calcPrice, formatCLP, DEFAULT_CONFIG, type KitchenConfig } from "@/lib/pricing";
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

  async function submit() {
    setError(null);
    if (!canSubmit) {
      setError("Necesitamos tu nombre y un teléfono para enviarte la cotización.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error ?? "No pudimos enviar tu cotización.");
      }
      setDone({ priceFromLabel: data.priceFromLabel ?? formatCLP(price.from) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ocurrió un error. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return <ResultScreen priceFromLabel={done.priceFromLabel} contact={contact} />;
  }

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:py-14">
      {/* Columna de pasos */}
      <div>
        {/* progreso */}
        <ol className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                onClick={() => i <= step && setStep(i)}
                className={`rounded-full px-3 py-1 transition ${
                  i === step
                    ? "bg-pine text-white"
                    : i < step
                      ? "bg-pine-100 text-pine"
                      : "bg-surface-muted text-muted"
                }`}
              >
                {i + 1}. {s}
              </button>
            </li>
          ))}
        </ol>

        <div className="min-h-[280px]">
          {step === 0 && (
            <StepGrid
              title="¿Cómo es la forma de tu cocina?"
              hint="Elige la distribución que más se parezca a tu espacio."
            >
              {LAYOUTS.map((l) => (
                <Card
                  key={l.id}
                  active={config.layout === l.id}
                  title={l.label}
                  desc={l.desc}
                  onClick={() => set({ layout: l.id })}
                />
              ))}
            </StepGrid>
          )}

          {step === 1 && (
            <div>
              <StepHead
                title="¿Cuántos metros de mueble necesitas?"
                hint="Aproximado. Lo afinamos con la visita de medición."
              />
              <div className="mt-6 space-y-6">
                <MeterInput
                  label="Muebles base (piso)"
                  value={config.baseMeters}
                  onChange={(v) => set({ baseMeters: v })}
                />
                <MeterInput
                  label="Muebles murales (aéreos)"
                  value={config.wallMeters}
                  onChange={(v) => set({ wallMeters: v })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <StepGrid
              title="Elige la cubierta"
              hint="El material de la superficie de trabajo. Nuestra marmolería la fabrica e instala."
            >
              {COUNTERTOPS.map((c) => (
                <Swatch
                  key={c.id}
                  active={config.countertop === c.id}
                  color={c.swatch}
                  title={c.label}
                  desc={c.desc}
                  onClick={() => set({ countertop: c.id })}
                />
              ))}
            </StepGrid>
          )}

          {step === 3 && (
            <StepGrid
              title="Elige la terminación de los frentes"
              hint="Las puertas y cajones que se ven por fuera."
            >
              {FRONTS.map((f) => (
                <Swatch
                  key={f.id}
                  active={config.front === f.id}
                  color={f.swatch}
                  title={f.label}
                  desc={f.desc}
                  onClick={() => set({ front: f.id })}
                />
              ))}
            </StepGrid>
          )}

          {step === 4 && (
            <div>
              <StepHead
                title="¿Le sumamos algún extra?"
                hint="Puedes elegir varios o ninguno."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {EXTRAS.map((e) => (
                  <Toggle
                    key={e.id}
                    active={config.extras.includes(e.id)}
                    title={e.label}
                    desc={e.desc}
                    onClick={() => toggleExtra(e.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <StepHead title="Sobre tu proyecto" hint="Nos ayuda a preparar mejor la reunión." />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((p) => (
                  <Card
                    key={p.id}
                    active={config.projectType === p.id}
                    title={p.label}
                    desc={p.desc}
                    onClick={() => set({ projectType: p.id })}
                  />
                ))}
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-pine">¿Para cuándo la necesitas?</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMEFRAMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setContact((c) => ({ ...c, timeframe: t }))}
                      className={`rounded-full border px-4 py-2 text-sm ${
                        contact.timeframe === t
                          ? "border-oak bg-oak-100 text-oak-600"
                          : "border-border bg-surface text-muted"
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
              <StepHead
                title="¿A dónde te enviamos la cotización?"
                hint="Con esto te contactamos para afinar los detalles."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nombre y apellido" required>
                  <input
                    className="input"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Ej: María Paredes"
                  />
                </Field>
                <Field label="Teléfono / WhatsApp" required>
                  <input
                    className="input"
                    value={contact.phone}
                    inputMode="tel"
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="+56 9 ..."
                  />
                </Field>
                <Field label="Correo (opcional)">
                  <input
                    className="input"
                    value={contact.email}
                    inputMode="email"
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    placeholder="tucorreo@ejemplo.cl"
                  />
                </Field>
                <Field label="Comuna">
                  <input
                    className="input"
                    value={contact.comuna}
                    onChange={(e) => setContact((c) => ({ ...c, comuna: e.target.value }))}
                    placeholder="Villarrica, Pucón..."
                  />
                </Field>
              </div>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
          )}
        </div>

        {/* navegación */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-ghost disabled:opacity-40"
          >
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

      {/* Columna sticky: preview + precio en vivo */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-sm">
          <div className="aspect-[4/3] w-full">
            <KitchenPreview config={config} />
          </div>
          <div className="mt-4 rounded-xl bg-pine px-4 py-4 text-white">
            <p className="text-xs uppercase tracking-wide text-white/60">Estimación</p>
            <p className="font-display text-3xl font-semibold">desde {formatCLP(price.from)}</p>
            <p className="mt-1 text-xs text-white/60">
              Rango referencial hasta {formatCLP(price.to)}. Valor final tras la visita.
            </p>
          </div>
          <p className="mt-3 text-xs text-muted">
            Incluye fabricación e instalación en {site.cities.join(", ")}.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ---------- piezas de UI ---------- */

function StepHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-pine sm:text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
    </div>
  );
}

function StepGrid({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <StepHead title={title} hint={hint} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Card({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active ? "border-oak bg-oak-100" : "border-border bg-surface hover:border-oak"
      }`}
    >
      <p className="font-semibold text-pine">{title}</p>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </button>
  );
}

function Swatch({
  active,
  color,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  color: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        active ? "border-oak bg-oak-100" : "border-border bg-surface hover:border-oak"
      }`}
    >
      <span
        className="h-12 w-12 shrink-0 rounded-lg border border-black/10"
        style={{ background: color }}
      />
      <span>
        <span className="block font-semibold text-pine">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );
}

function Toggle({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active ? "border-oak bg-oak-100" : "border-border bg-surface hover:border-oak"
      }`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
          active ? "border-oak bg-oak text-white" : "border-border bg-surface"
        }`}
      >
        {active ? "✓" : ""}
      </span>
      <span>
        <span className="block font-semibold text-pine">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{desc}</span>
      </span>
    </button>
  );
}

function MeterInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const step = (delta: number) =>
    onChange(Math.max(0, Math.min(20, Math.round((value + delta) * 10) / 10)));
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-pine">{label}</p>
          <p className="text-sm text-muted">Metros lineales</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => step(-0.5)} className="h-9 w-9 rounded-full border border-border text-lg">
            −
          </button>
          <span className="w-16 text-center font-display text-2xl font-semibold text-pine">
            {value}
          </span>
          <button onClick={() => step(0.5)} className="h-9 w-9 rounded-full border border-border text-lg">
            +
          </button>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={12}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--oak)]"
      />
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-pine">
        {label} {required && <span className="text-oak">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function ResultScreen({
  priceFromLabel,
  contact,
}: {
  priceFromLabel: string | null;
  contact: Contact;
}) {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-xl rounded-[var(--radius-xl)] border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine-100 text-2xl">
          ✓
        </div>
        <h1 className="font-display mt-5 text-3xl font-semibold text-pine">
          ¡Listo, {contact.name.split(" ")[0] || "gracias"}!
        </h1>
        <p className="mt-3 text-muted">
          Recibimos tu cocina. {priceFromLabel && (
            <>Tu estimación es <strong className="text-pine">desde {priceFromLabel}</strong>. </>
          )}
          Te contactamos muy pronto para afinar los detalles y agendar la visita.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(
              `Hola ${site.brand}, acabo de cotizar mi cocina en la web (${priceFromLabel ?? ""}). Quiero avanzar.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Continuar por WhatsApp
          </a>
          <Link href="/" className="btn-ghost">
            Volver al inicio
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted">
          La estimación es referencial. El valor final se confirma tras la medición en terreno.
        </p>
      </div>
    </div>
  );
}
