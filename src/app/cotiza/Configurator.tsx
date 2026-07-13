"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  COUNTERTOPS,
  EXTRAS,
  FRONTS,
  LACQUER_COLORS,
  LAYOUTS,
  PROJECT_TYPES,
  TIMEFRAMES,
  WALL_POSITIONS,
  lacquerById,
  type ExtraId,
  type LacquerColorId,
} from "@/lib/kitchen-options";
import {
  CLOSET_EXTRAS,
  CLOSET_TYPES,
  DOOR_TYPES,
  HEIGHT_OPTIONS,
  closetTypeById,
  doorTypeById,
  type ClosetExtraId,
} from "@/lib/closet-options";
import {
  calcPrice,
  describeConfig,
  formatCLP,
  DEFAULT_CONFIG,
  type KitchenConfig,
} from "@/lib/pricing";
import {
  calcClosetPrice,
  describeClosetConfig,
  DEFAULT_CLOSET_CONFIG,
  type ClosetConfig,
} from "@/lib/closet-pricing";
import { site, whatsappLink } from "@/lib/site";
import { ThankYouPanel } from "@/components/ThankYouPanel";
import { KitchenPreview } from "./KitchenPreview";
import { ClosetPreview } from "./ClosetPreview";

type Product = "cocina" | "closet";

interface Contact {
  name: string;
  phone: string;
  email: string;
  comuna: string;
  timeframe: string;
}

const STEPS: Record<Product, readonly string[]> = {
  cocina: ["Distribución", "Medidas", "Cubierta", "Frentes", "Extras", "Proyecto", "Tus datos"],
  closet: ["Tipo", "Medidas", "Puertas", "Terminación", "Interior", "Proyecto", "Tus datos"],
};

export function Configurator() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product>(
    searchParams.get("producto") === "closet" ? "closet" : "cocina"
  );
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<KitchenConfig>(DEFAULT_CONFIG);
  const [closet, setCloset] = useState<ClosetConfig>(DEFAULT_CLOSET_CONFIG);
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

  const steps = STEPS[product];
  const price = useMemo(
    () => (product === "closet" ? calcClosetPrice(closet) : calcPrice(config)),
    [product, config, closet]
  );

  const set = (patch: Partial<KitchenConfig>) => setConfig((c) => ({ ...c, ...patch }));
  const setC = (patch: Partial<ClosetConfig>) => setCloset((c) => ({ ...c, ...patch }));
  const toggleExtra = (id: ExtraId) =>
    setConfig((c) => ({
      ...c,
      extras: c.extras.includes(id) ? c.extras.filter((e) => e !== id) : [...c.extras, id],
    }));
  const toggleClosetExtra = (id: ClosetExtraId) =>
    setCloset((c) => ({
      ...c,
      extras: c.extras.includes(id) ? c.extras.filter((e) => e !== id) : [...c.extras, id],
    }));

  const switchProduct = (p: Product) => {
    if (p !== product) {
      setProduct(p);
      setStep(0);
    }
  };

  const isLast = step === steps.length - 1;
  const canSubmit = contact.name.trim().length >= 2 && contact.phone.trim().length >= 8;

  // Payload compartido para envío final y captura progresiva.
  const buildPayload = (source: "configurador" | "parcial") => ({
    ...contact,
    email: contact.email || undefined,
    product,
    ...(product === "closet"
      ? {
          closetType: closet.closetType,
          baseMeters: closet.widthMeters,
          heightOption: closet.height,
          doorType: closet.doors,
          front: closet.front,
          lacquerColor: closet.front === "laqueado" ? (closet.lacquerColor ?? "negro") : undefined,
          extras: closet.extras,
        }
      : {
          layout: config.layout,
          baseMeters: config.baseMeters,
          drawerMeters: config.drawerMeters,
          wallMeters: config.wallMeters,
          wallPosition: config.wallPosition,
          countertop: config.countertop,
          front: config.front,
          lacquerColor: config.front === "laqueado" ? (config.lacquerColor ?? "negro") : undefined,
          extras: config.extras,
          projectType: config.projectType,
        }),
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
  }, [contact, config, closet, product, price]);

  const waMessage = () => {
    const detail = product === "closet" ? describeClosetConfig(closet) : describeConfig(config);
    const item = product === "closet" ? "mi closet" : "mi cocina";
    return `Hola ${site.brand}, cotizé ${item} en la web:\n\n${detail}\n\nMi nombre: ${contact.name}. Quiero avanzar.`;
  };

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
    return (
      <ResultScreen
        priceFromLabel={done.priceFromLabel}
        contact={contact}
        waMessage={waMessage()}
        product={product}
      />
    );
  }

  return (
    <div className="container-page grid gap-10 py-10 pb-28 lg:grid-cols-[1fr_400px] lg:py-14 lg:pb-14">
      {/* Columna de pasos */}
      <div>
        {/* selector de producto */}
        <div className="mb-8 inline-flex border border-line">
          {(
            [
              ["cocina", "Cocina"],
              ["closet", "Closet"],
            ] as const
          ).map(([p, label]) => (
            <button
              key={p}
              onClick={() => switchProduct(p)}
              className={`px-6 py-2.5 text-sm font-medium transition ${
                product === p ? "bg-gold text-black" : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* progreso */}
        <ol className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
          {steps.map((s, i) => (
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
          {product === "cocina" ? (
            <KitchenSteps
              step={step}
              config={config}
              contact={contact}
              set={set}
              setContact={setContact}
              toggleExtra={toggleExtra}
              error={error}
            />
          ) : (
            <ClosetSteps
              step={step}
              closet={closet}
              contact={contact}
              setC={setC}
              setContact={setContact}
              toggleExtra={toggleClosetExtra}
              error={error}
            />
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
            {product === "closet" ? <ClosetPreview config={closet} /> : <KitchenPreview config={config} />}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="kicker text-gold">Estimación</p>
            <p className="font-display mt-1 text-4xl text-foreground">
              desde {formatCLP(price.from)} <span className="text-lg text-muted">+ IVA</span>
            </p>
            <p className="mt-2 text-xs text-muted">
              Valores netos, no incluyen IVA. Lo afinamos con la visita técnica de medición.
            </p>
          </div>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            {product === "closet" ? (
              <>
                <Row k="Tipo" v={closetTypeById(closet.closetType).label} />
                <Row k="Medidas" v={`${closet.widthMeters} m de frente`} />
                <Row k="Puertas" v={doorTypeById(closet.doors).label} gold />
              </>
            ) : (
              <>
                <Row k="Distribución" v={LAYOUTS.find((l) => l.id === config.layout)!.label} />
                <Row k="Medidas" v={`${config.baseMeters} m base · ${config.wallMeters} m aéreos`} />
                <Row
                  k="Frentes"
                  v={
                    config.front === "laqueado"
                      ? `Laqueado ${lacquerById(config.lacquerColor ?? "negro").label.toLowerCase()}`
                      : FRONTS.find((f) => f.id === config.front)!.label
                  }
                />
                <Row k="Cubierta" v={COUNTERTOPS.find((c) => c.id === config.countertop)!.label} gold />
              </>
            )}
          </dl>
        </div>
      </aside>

      {/* Barra fija mobile: precio + acción */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/95 backdrop-blur lg:hidden">
        <div className="container-page flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="kicker text-gold">Desde</p>
            <p className="font-display truncate text-xl text-foreground">
              {formatCLP(price.from)} <span className="text-xs text-muted">+ IVA</span>
            </p>
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

/* ---------- pasos por producto ---------- */

function KitchenSteps({
  step,
  config,
  contact,
  set,
  setContact,
  toggleExtra,
  error,
}: {
  step: number;
  config: KitchenConfig;
  contact: Contact;
  set: (patch: Partial<KitchenConfig>) => void;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  toggleExtra: (id: ExtraId) => void;
  error: string | null;
}) {
  return (
    <>
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
            <MeterInput
              label="Muebles base (piso)"
              value={config.baseMeters}
              min={2}
              onChange={(v) => set({ baseMeters: v, drawerMeters: Math.min(config.drawerMeters, v) })}
            />
            <MeterInput
              label="Tramo con cajonera"
              sub="Metros de la base que llevan cajones en vez de puertas. Rieles telescópicos incluidos."
              value={config.drawerMeters}
              max={config.baseMeters}
              onChange={(v) => set({ drawerMeters: v })}
            />
            <div className="border border-line bg-surface p-5">
              <MeterInput
                label="Muebles murales (aéreos)"
                value={config.wallMeters}
                onChange={(v) => set({ wallMeters: v })}
                bare
              />
              {config.wallMeters > 0 && (
                <div className="mt-4">
                  <span className="kicker text-muted">¿Dónde van los aéreos?</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {WALL_POSITIONS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => set({ wallPosition: p.id })}
                        className={`rounded border px-4 py-2 text-sm transition ${
                          config.wallPosition === p.id
                            ? "border-gold text-gold"
                            : "border-line text-muted hover:border-line-strong"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Los metros no incluyen el espacio del refrigerador: va fuera de la medida de la cocina
            y en el plano lo mostramos aparte.
          </p>
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
        <div>
          <StepGrid title="Elige la terminación de los frentes" hint="Las puertas y cajones que se ven por fuera." single>
            {FRONTS.map((f) => (
              <Swatch key={f.id} active={config.front === f.id} color={f.swatch} title={f.label} desc={f.desc} onClick={() => set({ front: f.id })} />
            ))}
          </StepGrid>
          {config.front === "laqueado" && (
            <LacquerPicker
              value={config.lacquerColor ?? "negro"}
              onChange={(c) => set({ lacquerColor: c })}
            />
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <StepHead title="¿Le sumamos algún extra?" hint="Puedes elegir varios o ninguno." />
          <p className="mt-4 text-sm text-muted">
            <span className="text-gold">Incluido en el precio base:</span> cajones con rieles
            telescópicos de cierre suave.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
          <TimeframePicker contact={contact} setContact={setContact} />
        </div>
      )}

      {step === 6 && <ContactStep contact={contact} setContact={setContact} error={error} />}
    </>
  );
}

function ClosetSteps({
  step,
  closet,
  contact,
  setC,
  setContact,
  toggleExtra,
  error,
}: {
  step: number;
  closet: ClosetConfig;
  contact: Contact;
  setC: (patch: Partial<ClosetConfig>) => void;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  toggleExtra: (id: ClosetExtraId) => void;
  error: string | null;
}) {
  return (
    <>
      {step === 0 && (
        <StepGrid title="¿Qué tipo de closet necesitas?" hint="Elige el que más se parezca a tu espacio.">
          {CLOSET_TYPES.map((t) => (
            <Card key={t.id} active={closet.closetType === t.id} title={t.label} desc={t.desc} onClick={() => setC({ closetType: t.id })} />
          ))}
        </StepGrid>
      )}

      {step === 1 && (
        <div>
          <StepHead title="¿Cuánto mide el frente del closet?" hint="El ancho total de la pared que ocupará. Aproximado, lo afinamos midiendo." />
          <div className="mt-8 space-y-5">
            <MeterInput label="Frente del closet" value={closet.widthMeters} onChange={(v) => setC({ widthMeters: v })} max={8} />
          </div>
          <div className="mt-8">
            <span className="kicker text-muted">Altura</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {HEIGHT_OPTIONS.map((h) => (
                <Card key={h.id} active={closet.height === h.id} title={h.label} desc={h.desc} onClick={() => setC({ height: h.id })} />
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <StepGrid title="¿Con qué puertas?" hint="Las correderas no ocupan espacio al abrir; sin puertas es el más económico." single>
          {DOOR_TYPES.map((d) => (
            <Card key={d.id} active={closet.doors === d.id} title={d.label} desc={d.desc} onClick={() => setC({ doors: d.id })} />
          ))}
        </StepGrid>
      )}

      {step === 3 && (
        <div>
          <StepGrid title="Elige la terminación" hint="Lo que se ve por fuera: puertas y costados vistos." single>
            {FRONTS.map((f) => (
              <Swatch key={f.id} active={closet.front === f.id} color={f.swatch} title={f.label} desc={f.desc} onClick={() => setC({ front: f.id })} />
            ))}
          </StepGrid>
          {closet.front === "laqueado" && (
            <LacquerPicker
              value={closet.lacquerColor ?? "negro"}
              onChange={(c) => setC({ lacquerColor: c })}
            />
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <StepHead title="Arma el interior" hint="El diseño interior es la mitad del valor de un buen closet. Elige lo que usas." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {CLOSET_EXTRAS.map((e) => (
              <Toggle key={e.id} active={closet.extras.includes(e.id)} title={e.label} desc={e.desc} onClick={() => toggleExtra(e.id)} />
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <StepHead title="Sobre tu proyecto" hint="Nos ayuda a preparar mejor la reunión." />
          <TimeframePicker contact={contact} setContact={setContact} />
        </div>
      )}

      {step === 6 && <ContactStep contact={contact} setContact={setContact} error={error} />}
    </>
  );
}

/* ---------- piezas de UI ---------- */

function TimeframePicker({
  contact,
  setContact,
}: {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
}) {
  return (
    <div className="mt-8">
      <span className="kicker text-muted">¿Para cuándo lo necesitas?</span>
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
  );
}

function ContactStep({
  contact,
  setContact,
  error,
}: {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  error: string | null;
}) {
  return (
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
        Sin compromiso · visita técnica de medición {formatCLP(site.visitPrice)} · respondemos el
        mismo día.
      </p>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}

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

function MeterInput({
  label,
  sub,
  value,
  onChange,
  min = 0,
  max = 12,
  bare,
}: {
  label: string;
  sub?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  // bare: sin borde/fondo propio, para anidarlo en una tarjeta compuesta.
  bare?: boolean;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, Math.round(v * 10) / 10));
  const step = (delta: number) => onChange(clamp(value + delta));
  return (
    <div className={bare ? "" : "border border-line bg-surface p-5"}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted">{sub ?? "Metros lineales"}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => step(-0.5)} className="h-9 w-9 border border-line-strong text-lg text-foreground hover:border-gold">−</button>
          <span className="font-display w-14 text-center text-2xl text-foreground">{value}</span>
          <button onClick={() => step(0.5)} className="h-9 w-9 border border-line-strong text-lg text-foreground hover:border-gold">+</button>
        </div>
      </div>
      <input type="range" min={min} max={max} step={0.5} value={value} onChange={(e) => onChange(clamp(Number(e.target.value)))} className="mt-4 w-full accent-[var(--gold)]" />
    </div>
  );
}

function LacquerPicker({
  value,
  onChange,
}: {
  value: LacquerColorId;
  onChange: (c: LacquerColorId) => void;
}) {
  return (
    <div className="mt-6 border border-line bg-surface p-5">
      <span className="kicker text-muted">Color del laqueado</span>
      <div className="mt-3 flex flex-wrap gap-3">
        {LACQUER_COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            title={c.desc}
            className={`flex items-center gap-2 border px-3 py-2 text-sm transition ${
              value === c.id ? "border-gold text-gold" : "border-line text-muted hover:border-line-strong"
            }`}
          >
            <span
              className="h-6 w-6 shrink-0 rounded-full border border-white/15"
              style={{ background: c.swatch }}
            />
            {c.label}
          </button>
        ))}
      </div>
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
  product,
}: {
  priceFromLabel: string | null;
  contact: Contact;
  waMessage: string;
  product: Product;
}) {
  return (
    <div className="container-page py-20">
      <ThankYouPanel
        heading={`Listo, ${contact.name.split(" ")[0] || "gracias"}.`}
        sub={`Recibimos tu ${product === "closet" ? "closet" : "cocina"}. Coordinemos la visita técnica para cerrar el diseño.`}
        priceFromLabel={priceFromLabel}
        waHref={whatsappLink(waMessage)}
      />
    </div>
  );
}
