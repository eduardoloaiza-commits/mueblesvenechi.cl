"use client";

import { countertopById, frontSwatch } from "@/lib/kitchen-options";
import type { KitchenConfig } from "@/lib/pricing";

// Preview en corte (elevación frontal del tramo principal), A ESCALA REAL:
// una sola escala px/metro para horizontal y vertical, así 3 m de aéreos
// sobre 5,5 m de base se ven exactamente como son. Con cotas de medida tipo
// plano de arquitectura. Alturas reales: base 90 cm, cubierta 4 cm, aéreos
// de 70 cm colgados a 1,45 m del piso, refrigerador 1,80 × 0,75 m.

const W = 400;
const H = 300;
const FLOOR_BG = "#0e0e0e";
const ROOM = "#161616";
const COTA = "#8a8a8a";

const FLOOR_Y = 264;
const FRIDGE_GAP_M = 0.35;
const FRIDGE_W_M = 0.75;

// Formato chileno: coma decimal.
const m = (n: number) => `${String(n).replace(".", ",")} m`;

export function KitchenSectionPreview({ config }: { config: KitchenConfig }) {
  const counter = countertopById(config.countertop).swatch;
  const front = frontSwatch(config.front, config.lacquerColor);

  const baseM = Math.max(config.baseMeters, 1);
  const drawerM = Math.min(Math.max(config.drawerMeters, 0), baseM);
  const wallM = Math.max(0, config.wallMeters);

  // Escala única (px por metro): el ancho total (base + espacio + refrigerador)
  // debe caber en el lienzo, y 2,4 m de alto deben caber sobre el piso.
  const totalM = baseM + FRIDGE_GAP_M + FRIDGE_W_M;
  const s = Math.min(88, 336 / totalM);

  const x0 = Math.max(24, (W - totalM * s) / 2);
  const runW = baseM * s;
  const runX = x0;

  // Verticales a la misma escala.
  const baseH = 0.9 * s;
  const slabH = Math.max(3.5, 0.04 * s);
  const baseTop = FLOOR_Y - baseH;
  const wallBottom = FLOOR_Y - 1.45 * s;
  const wallTop = wallBottom - 0.7 * s;
  const ceilY = FLOOR_Y - 2.4 * s;

  // Aéreos: ancho SIEMPRE proporcional a sus metros, anclado según posición.
  const wallW = Math.min(wallM, baseM) * s;
  const wallX =
    config.wallPosition === "derecha"
      ? runX + runW - wallW
      : config.wallPosition === "centro"
        ? runX + (runW - wallW) / 2
        : runX;

  const drawerW = drawerM * s;

  const hasCampana = config.extras.includes("campana");
  const hasVitrinas = config.extras.includes("vitrinas");
  const hasLuz = config.extras.includes("iluminacion");
  const hasSalpicadero = config.extras.includes("muro-cristal");

  // Espacio de campana (60 cm), centrado en el tramo aéreo o en la base.
  const hoodW = 0.6 * s;
  const hoodX =
    wallM > 0 ? wallX + wallW / 2 - hoodW / 2 : runX + runW / 2 - hoodW / 2;

  const fridgeX = runX + runW + FRIDGE_GAP_M * s;
  const fridgeW = FRIDGE_W_M * s;
  const fridgeTop = FLOOR_Y - 1.8 * s;

  // Divisiones de puertas cada ~60 cm reales.
  const doorSlots = (xStart: number, w: number) => {
    const n = Math.max(1, Math.round(w / (0.6 * s)));
    return Array.from({ length: n - 1 }, (_, i) => xStart + ((i + 1) * w) / n);
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full rounded-xl"
      role="img"
      aria-label="Corte frontal de la cocina, a escala"
    >
      {/* muro / habitación */}
      <rect x="0" y="0" width={W} height={H} rx="6" fill={FLOOR_BG} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="4" fill={ROOM} stroke="#262626" />
      {/* cielo y piso */}
      <line x1="18" y1={ceilY} x2={W - 18} y2={ceilY} stroke="#2a2a2a" strokeWidth="1.5" />
      <rect x="14" y={FLOOR_Y} width={W - 28} height={H - 14 - FLOOR_Y} fill="#101010" />
      <line x1="14" y1={FLOOR_Y} x2={W - 14} y2={FLOOR_Y} stroke="#2c2c2c" strokeWidth="2" />

      {/* Salpicadero (cubierta → aéreos) */}
      {hasSalpicadero && (
        <rect
          x={runX}
          y={wallM > 0 ? wallBottom : wallTop}
          width={runW}
          height={(wallM > 0 ? baseTop - slabH - wallBottom : baseTop - slabH - wallTop)}
          fill="#9fb4b833"
          stroke="#9fb4b866"
        />
      )}

      {/* Muebles base */}
      <g>
        <rect x={runX} y={baseTop} width={runW} height={baseH} fill={front} stroke="#ffffff1f" />
        {/* zócalo */}
        <rect x={runX + 2} y={FLOOR_Y - Math.max(6, 0.1 * s)} width={runW - 4} height={Math.max(6, 0.1 * s)} fill="#00000066" />
        {/* tramo con cajonera (izquierda) */}
        {drawerW > 4 && (
          <g>
            {[1, 2].map((i) => (
              <line
                key={i}
                x1={runX + 2}
                y1={baseTop + (i * baseH * 0.9) / 3}
                x2={runX + drawerW - 2}
                y2={baseTop + (i * baseH * 0.9) / 3}
                stroke="#00000088"
                strokeWidth="1.5"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <rect
                key={`h${i}`}
                x={runX + drawerW / 2 - Math.min(9, drawerW / 5)}
                y={baseTop + 5 + (i * baseH * 0.9) / 3}
                width={Math.min(18, drawerW / 2.5)}
                height={2}
                rx="1"
                fill="#00000099"
              />
            ))}
            <line x1={runX + drawerW} y1={baseTop} x2={runX + drawerW} y2={FLOOR_Y} stroke="#000000aa" strokeWidth="2" />
          </g>
        )}
        {/* divisiones de puertas */}
        {doorSlots(runX + drawerW, runW - drawerW).map((x) => (
          <line key={x} x1={x} y1={baseTop} x2={x} y2={FLOOR_Y - 4} stroke="#00000066" strokeWidth="1.5" />
        ))}
      </g>

      {/* Cubierta */}
      <rect
        x={runX - 3}
        y={baseTop - slabH}
        width={runW + 6}
        height={slabH}
        fill={counter}
        stroke="#ffffff1f"
      />

      {/* Muebles aéreos */}
      {wallM > 0 && wallW > 4 && (
        <g>
          <rect x={wallX} y={wallTop} width={wallW} height={wallBottom - wallTop} fill={front} stroke="#ffffff1f" />
          {doorSlots(wallX, wallW).map((x) => (
            <line key={x} x1={x} y1={wallTop} x2={x} y2={wallBottom} stroke="#00000066" strokeWidth="1.5" />
          ))}
          {/* vitrinas: hasta 2 hojas con vidrio */}
          {hasVitrinas &&
            (() => {
              const n = Math.max(1, Math.round(wallW / (0.6 * s)));
              const w = wallW / n;
              return [0, 1].slice(0, Math.min(2, n)).map((i) => (
                <rect
                  key={i}
                  x={wallX + i * w + 4}
                  y={wallTop + 4}
                  width={w - 8}
                  height={wallBottom - wallTop - 8}
                  fill="#bcd3d877"
                  stroke="#ffffff44"
                />
              ));
            })()}
          {/* espacio de campana (solo se reserva) */}
          {hasCampana && (
            <g>
              <rect x={hoodX} y={wallTop - 1} width={hoodW} height={wallBottom - wallTop + 2} fill={ROOM} />
              <rect
                x={hoodX + 3}
                y={wallTop + 5}
                width={hoodW - 6}
                height={wallBottom - wallTop - 10}
                fill="none"
                stroke="#87878788"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </g>
          )}
          {/* iluminación LED bajo mueble */}
          {hasLuz && (
            <line
              x1={wallX + 3}
              y1={wallBottom + 3.5}
              x2={wallX + wallW - 3}
              y2={wallBottom + 3.5}
              stroke="#F9B233"
              strokeWidth="2.5"
              strokeDasharray="6 5"
              opacity="0.9"
            />
          )}
        </g>
      )}
      {hasCampana && wallM === 0 && (
        <rect
          x={hoodX + 3}
          y={wallTop + 5}
          width={hoodW - 6}
          height={wallBottom - wallTop - 10}
          fill="none"
          stroke="#87878788"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      )}

      {/* Refrigerador (fuera de la medida) */}
      <g>
        <rect x={fridgeX} y={fridgeTop} width={fridgeW} height={FLOOR_Y - fridgeTop} rx="2.5" fill="#303030" stroke="#ffffff1f" />
        <line
          x1={fridgeX + 2}
          y1={fridgeTop + (FLOOR_Y - fridgeTop) * 0.38}
          x2={fridgeX + fridgeW - 2}
          y2={fridgeTop + (FLOOR_Y - fridgeTop) * 0.38}
          stroke="#00000066"
          strokeWidth="1.5"
        />
        <rect x={fridgeX + fridgeW - 6} y={fridgeTop + 8} width={2} height={Math.min(20, 0.3 * s)} rx="1" fill="#00000088" />
        <text x={fridgeX + fridgeW / 2} y={fridgeTop - 6} textAnchor="middle" fontSize="8" fill="#6f6f6f" fontFamily="var(--font-sans), sans-serif">
          Refrig.
        </text>
      </g>

      {/* ---- Cotas ---- */}
      {/* base */}
      <Dim x1={runX} x2={runX + runW} y={FLOOR_Y + 12} label={`base ${m(config.baseMeters)}`} />
      {/* marca del tramo de cajonera sobre la cota de base */}
      {drawerM > 0 && (
        <g>
          <line x1={runX + drawerW} y1={FLOOR_Y + 8} x2={runX + drawerW} y2={FLOOR_Y + 16} stroke={COTA} strokeWidth="1" />
          <text
            x={runX + drawerW / 2}
            y={FLOOR_Y + 7}
            textAnchor="middle"
            fontSize="8"
            fill={COTA}
            fontFamily="var(--font-sans), sans-serif"
          >
            cajonera {m(config.drawerMeters)}
          </text>
        </g>
      )}
      {/* aéreos */}
      {wallM > 0 && wallW > 4 && (
        <Dim x1={wallX} x2={wallX + wallW} y={wallTop - 9} label={`aéreos ${m(config.wallMeters)}`} above />
      )}
    </svg>
  );
}

// Cota de medida estilo plano: línea con tiques en los extremos y etiqueta.
function Dim({
  x1,
  x2,
  y,
  label,
  above,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  above?: boolean;
}) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={COTA} strokeWidth="1" />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={COTA} strokeWidth="1" />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={COTA} strokeWidth="1" />
      <text
        x={(x1 + x2) / 2}
        y={above ? y - 6 : y + 12}
        textAnchor="middle"
        fontSize="9"
        fill={COTA}
        fontFamily="var(--font-sans), sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
