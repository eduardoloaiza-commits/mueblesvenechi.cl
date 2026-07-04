"use client";

import { countertopById, frontById } from "@/lib/kitchen-options";
import type { KitchenConfig } from "@/lib/pricing";

// Preview en planta (vista superior) que se actualiza en vivo con la
// configuración. Muestra la distribución (lineal/L/U/isla), colores de
// cubierta y frentes, y la isla cuando corresponde. Es esquemático, no a escala.

const W = 400;
const H = 300;
const WALL = "#efe7d8";
const COUNTER_THICK = 34;

export function KitchenPreview({ config }: { config: KitchenConfig }) {
  const counter = countertopById(config.countertop).swatch;
  const front = frontById(config.front).swatch;

  // El largo de los tramos escala (suavemente) con los metros base.
  const span = Math.max(0.35, Math.min(1, config.baseMeters / 6));
  const runLen = 70 + span * 240; // largo del tramo inferior
  const sideLen = 60 + span * 150;

  const showIsland = config.layout === "isla";
  const showLeft = config.layout === "l" || config.layout === "u";
  const showRight = config.layout === "u";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full rounded-xl"
      role="img"
      aria-label={`Vista en planta de cocina ${config.layout}`}
    >
      {/* piso / habitación */}
      <rect x="0" y="0" width={W} height={H} rx="14" fill={WALL} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="10" fill="#fbf7f0" />

      {/* Tramo inferior (siempre presente) */}
      <CounterRun
        x={30}
        y={H - 30 - COUNTER_THICK}
        w={runLen}
        h={COUNTER_THICK}
        counter={counter}
        front={front}
        frontEdge="top"
      />

      {/* Tramo izquierdo (L y U) */}
      {showLeft && (
        <CounterRun
          x={30}
          y={H - 30 - COUNTER_THICK - sideLen}
          w={COUNTER_THICK}
          h={sideLen}
          counter={counter}
          front={front}
          frontEdge="right"
        />
      )}

      {/* Tramo derecho (U) */}
      {showRight && (
        <CounterRun
          x={30 + runLen - COUNTER_THICK}
          y={H - 30 - COUNTER_THICK - sideLen}
          w={COUNTER_THICK}
          h={sideLen}
          counter={counter}
          front={front}
          frontEdge="left"
        />
      )}

      {/* Isla central */}
      {showIsland && (
        <g>
          <rect
            x={W / 2 - 55}
            y={H / 2 - 26}
            width={110}
            height={52}
            rx="6"
            fill={counter}
            stroke="#00000018"
          />
          <rect
            x={W / 2 - 51}
            y={H / 2 + 26}
            width={102}
            height={8}
            rx="3"
            fill={front}
          />
        </g>
      )}

      {/* etiqueta de metros */}
      <text
        x={30 + runLen / 2}
        y={H - 12}
        textAnchor="middle"
        fontSize="12"
        fill="#6b5f52"
        fontFamily="var(--font-sans), sans-serif"
      >
        {config.baseMeters} m
      </text>
    </svg>
  );
}

// Un tramo de mueble: cubierta (rect) con una franja de frente en el borde
// que da hacia el interior de la cocina.
function CounterRun({
  x,
  y,
  w,
  h,
  counter,
  front,
  frontEdge,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  counter: string;
  front: string;
  frontEdge: "top" | "left" | "right";
}) {
  const edge = 8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={counter} stroke="#00000018" />
      {frontEdge === "top" && (
        <rect x={x + 3} y={y + h - edge} width={w - 6} height={edge - 1} rx="2" fill={front} />
      )}
      {frontEdge === "right" && (
        <rect x={x + w - edge} y={y + 3} width={edge - 1} height={h - 6} rx="2" fill={front} />
      )}
      {frontEdge === "left" && (
        <rect x={x + 1} y={y + 3} width={edge - 1} height={h - 6} rx="2" fill={front} />
      )}
    </g>
  );
}
