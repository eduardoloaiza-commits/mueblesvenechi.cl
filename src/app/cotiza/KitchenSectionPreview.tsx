"use client";

import { countertopById, frontSwatch } from "@/lib/kitchen-options";
import type { KitchenConfig } from "@/lib/pricing";

// Preview en corte (elevación frontal del tramo principal), complementario a
// la vista en planta. Muestra lo que la planta no puede: muebles aéreos con
// su posición, tramo de cajonera, cubierta, salpicadero, espacio de campana,
// iluminación bajo mueble y el refrigerador fuera de la medida.
// Es esquemático, no a escala.

const W = 400;
const H = 300;
const FLOOR = "#0e0e0e";
const ROOM = "#161616";

// Verticales (px): piso en y=270, escala ~0.9 px/cm.
const FLOOR_Y = 270;
const BASE_TOP = 189; // base de 90 cm
const TOP_SLAB = 6; // cubierta
const WALL_TOP = 78; // borde superior de aéreos
const WALL_BOTTOM = 140; // borde inferior de aéreos (~50 cm sobre cubierta)

export function KitchenSectionPreview({ config }: { config: KitchenConfig }) {
  const counter = countertopById(config.countertop).swatch;
  const front = frontSwatch(config.front, config.lacquerColor);

  // Mismo escalado horizontal que la planta, para que ambas vistas calcen.
  const span = Math.max(0.35, Math.min(1, config.baseMeters / 6));
  const runW = 70 + span * 220;
  const runX = 30;

  const baseM = Math.max(config.baseMeters, 0.5);
  const drawerW = runW * Math.min(1, Math.max(0, config.drawerMeters) / baseM);

  // Aéreos: ancho proporcional, anclado según posición.
  const wallM = Math.max(0, config.wallMeters);
  const wallW =
    config.wallPosition === "completo" ? runW : Math.max(30, runW * Math.min(1, wallM / baseM));
  const wallX = config.wallPosition === "derecha" ? runX + runW - wallW : runX;

  const hasCampana = config.extras.includes("campana");
  const hasVitrinas = config.extras.includes("vitrinas");
  const hasLuz = config.extras.includes("iluminacion");
  const hasSalpicadero = config.extras.includes("muro-cristal");

  // Espacio de campana: hueco centrado en el tramo aéreo (o en el tramo base
  // si no hay aéreos), dibujado punteado porque solo se reserva el espacio.
  const hoodW = 52;
  const hoodX = wallM > 0 ? wallX + wallW / 2 - hoodW / 2 : runX + runW / 2 - hoodW / 2;

  // Refrigerador: fuera del tramo medido, a la derecha.
  const fridgeX = runX + runW + 12;
  const fridgeW = 38;
  const fridgeTop = FLOOR_Y - 160;

  // Divisiones de puertas (~60 cm por hoja).
  const doorSlots = (x0: number, w: number) => {
    const n = Math.max(1, Math.round(w / 52));
    return Array.from({ length: n - 1 }, (_, i) => x0 + ((i + 1) * w) / n);
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full rounded-xl"
      role="img"
      aria-label="Corte frontal de la cocina"
    >
      {/* muro / habitación */}
      <rect x="0" y="0" width={W} height={H} rx="6" fill={FLOOR} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="4" fill={ROOM} stroke="#262626" />
      {/* línea de piso */}
      <rect x="14" y={FLOOR_Y} width={W - 28} height={H - 14 - FLOOR_Y} fill="#101010" />
      <line x1="14" y1={FLOOR_Y} x2={W - 14} y2={FLOOR_Y} stroke="#2c2c2c" strokeWidth="2" />

      {/* Salpicadero (entre cubierta y aéreos) */}
      {hasSalpicadero && (
        <rect
          x={runX}
          y={BASE_TOP - TOP_SLAB - 44}
          width={runW}
          height={44}
          fill="#9fb4b822"
          stroke="#9fb4b855"
        />
      )}

      {/* Muebles base */}
      <g>
        <rect
          x={runX}
          y={BASE_TOP}
          width={runW}
          height={FLOOR_Y - BASE_TOP}
          fill={front}
          stroke="#ffffff1f"
        />
        {/* zócalo */}
        <rect x={runX + 3} y={FLOOR_Y - 9} width={runW - 6} height={9} fill="#00000066" />
        {/* tramo con cajonera (izquierda): 3 cajones */}
        {drawerW > 6 && (
          <g>
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={runX + 2}
                y1={BASE_TOP + ((i + 1) * (FLOOR_Y - 9 - BASE_TOP)) / 3}
                x2={runX + drawerW - 2}
                y2={BASE_TOP + ((i + 1) * (FLOOR_Y - 9 - BASE_TOP)) / 3}
                stroke="#00000088"
                strokeWidth="2"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <rect
                key={`h${i}`}
                x={runX + drawerW / 2 - 7}
                y={BASE_TOP + 8 + (i * (FLOOR_Y - 9 - BASE_TOP)) / 3}
                width={14}
                height={2.5}
                rx="1"
                fill="#00000088"
              />
            ))}
            <line
              x1={runX + drawerW}
              y1={BASE_TOP}
              x2={runX + drawerW}
              y2={FLOOR_Y - 9}
              stroke="#00000088"
              strokeWidth="2"
            />
          </g>
        )}
        {/* divisiones de puertas en el resto de la base */}
        {doorSlots(runX + drawerW, runW - drawerW).map((x) => (
          <line
            key={x}
            x1={x}
            y1={BASE_TOP}
            x2={x}
            y2={FLOOR_Y - 9}
            stroke="#00000066"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Cubierta */}
      <rect
        x={runX - 4}
        y={BASE_TOP - TOP_SLAB}
        width={runW + 8}
        height={TOP_SLAB}
        fill={counter}
        stroke="#ffffff1f"
      />

      {/* Muebles aéreos */}
      {wallM > 0 && (
        <g>
          <rect
            x={wallX}
            y={WALL_TOP}
            width={wallW}
            height={WALL_BOTTOM - WALL_TOP}
            fill={front}
            stroke="#ffffff1f"
          />
          {doorSlots(wallX, wallW).map((x) => (
            <line
              key={x}
              x1={x}
              y1={WALL_TOP}
              x2={x}
              y2={WALL_BOTTOM}
              stroke="#00000066"
              strokeWidth="2"
            />
          ))}
          {/* vitrinas: primeras hojas con vidrio */}
          {hasVitrinas &&
            (() => {
              const n = Math.max(1, Math.round(wallW / 52));
              const w = wallW / n;
              return [0, 1].slice(0, Math.min(2, n)).map((i) => (
                <rect
                  key={i}
                  x={wallX + i * w + 5}
                  y={WALL_TOP + 5}
                  width={w - 10}
                  height={WALL_BOTTOM - WALL_TOP - 10}
                  fill="#bcd3d888"
                  stroke="#ffffff44"
                />
              ));
            })()}
          {/* espacio de campana: hueco punteado en el tramo aéreo */}
          {hasCampana && (
            <g>
              <rect
                x={hoodX}
                y={WALL_TOP - 1}
                width={hoodW}
                height={WALL_BOTTOM - WALL_TOP + 2}
                fill={ROOM}
              />
              <rect
                x={hoodX + 4}
                y={WALL_TOP + 6}
                width={hoodW - 8}
                height={WALL_BOTTOM - WALL_TOP - 12}
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
              x1={wallX + 4}
              y1={WALL_BOTTOM + 4}
              x2={wallX + wallW - 4}
              y2={WALL_BOTTOM + 4}
              stroke="#F9B233"
              strokeWidth="2.5"
              strokeDasharray="6 5"
              opacity="0.9"
            />
          )}
        </g>
      )}
      {/* campana sin aéreos: igual se reserva el espacio */}
      {hasCampana && wallM === 0 && (
        <rect
          x={hoodX + 4}
          y={WALL_TOP + 6}
          width={hoodW - 8}
          height={WALL_BOTTOM - WALL_TOP - 12}
          fill="none"
          stroke="#87878788"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      )}

      {/* Refrigerador (fuera de la medida) */}
      <g>
        <rect
          x={fridgeX}
          y={fridgeTop}
          width={fridgeW}
          height={FLOOR_Y - fridgeTop}
          rx="3"
          fill="#303030"
          stroke="#ffffff1f"
        />
        <line
          x1={fridgeX + 3}
          y1={fridgeTop + (FLOOR_Y - fridgeTop) * 0.38}
          x2={fridgeX + fridgeW - 3}
          y2={fridgeTop + (FLOOR_Y - fridgeTop) * 0.38}
          stroke="#00000066"
          strokeWidth="2"
        />
        <rect
          x={fridgeX + fridgeW - 8}
          y={fridgeTop + 12}
          width={2.5}
          height={22}
          rx="1"
          fill="#00000088"
        />
        <text
          x={fridgeX + fridgeW / 2}
          y={fridgeTop - 7}
          textAnchor="middle"
          fontSize="8"
          fill="#6f6f6f"
          fontFamily="var(--font-sans), sans-serif"
        >
          Refrig.
        </text>
      </g>

      {/* etiquetas de metros */}
      {wallM > 0 && (
        <text
          x={wallX + wallW / 2}
          y={WALL_TOP - 8}
          textAnchor="middle"
          fontSize="9"
          fill="#6f6f6f"
          fontFamily="var(--font-sans), sans-serif"
        >
          aéreos {config.wallMeters} m
        </text>
      )}
      <text
        x={runX + runW / 2}
        y={H - 12}
        textAnchor="middle"
        fontSize="12"
        fill="#878787"
        fontFamily="var(--font-sans), sans-serif"
      >
        base {config.baseMeters} m{config.drawerMeters > 0 ? ` · cajonera ${config.drawerMeters} m` : ""}
      </text>
    </svg>
  );
}
