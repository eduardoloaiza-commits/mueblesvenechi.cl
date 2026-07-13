"use client";

import { countertopById, frontSwatch } from "@/lib/kitchen-options";
import type { KitchenConfig } from "@/lib/pricing";

// Preview en planta (vista superior) que se actualiza en vivo con la
// configuración. Muestra la distribución (lineal/L/paralela/U/península/isla),
// colores de cubierta y frentes, el tramo de muebles aéreos (banda punteada
// sobre el mesón, según posición) y el refrigerador fuera del tramo medido.
// Es esquemático, no a escala.

const W = 400;
const H = 300;
const FLOOR = "#0e0e0e";
const ROOM = "#161616";
const COUNTER_THICK = 34;

export function KitchenPreview({ config }: { config: KitchenConfig }) {
  const counter = countertopById(config.countertop).swatch;
  const front = frontSwatch(config.front, config.lacquerColor);

  // El largo de los tramos escala (suavemente) con los metros base.
  // El máximo deja espacio a la derecha para el refrigerador.
  const span = Math.max(0.35, Math.min(1, config.baseMeters / 6));
  const runLen = 70 + span * 220; // largo del tramo inferior
  const sideLen = 60 + span * 150;

  const runX = 30;
  const runY = H - 30 - COUNTER_THICK;

  const showIsland = config.layout === "isla";
  const showLeft = config.layout === "l" || config.layout === "u";
  const showRight = config.layout === "u";
  const showTop = config.layout === "paralela";
  const showPeninsula = config.layout === "peninsula";

  // Banda de muebles aéreos sobre el tramo inferior: proporcional a los
  // metros murales, anclada según la posición elegida.
  const wallM = Math.max(0, config.wallMeters);
  const bandFull = runLen - 8;
  const bandLen =
    config.wallPosition === "completo"
      ? bandFull
      : Math.max(28, bandFull * Math.min(1, wallM / Math.max(config.baseMeters, 0.5)));
  const bandX =
    config.wallPosition === "derecha" ? runX + 4 + (bandFull - bandLen) : runX + 4;

  // Refrigerador: siempre fuera del tramo medido, a la derecha.
  const fridgeX = runX + runLen + 12;
  const fridgeW = 34;
  const fridgeH = 40;
  const fridgeY = runY + COUNTER_THICK - fridgeH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full rounded-xl"
      role="img"
      aria-label={`Vista en planta de cocina ${config.layout}`}
    >
      {/* piso / habitación */}
      <rect x="0" y="0" width={W} height={H} rx="6" fill={FLOOR} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="4" fill={ROOM} stroke="#262626" />

      {/* Tramo inferior (siempre presente) */}
      <CounterRun
        x={runX}
        y={runY}
        w={runLen}
        h={COUNTER_THICK}
        counter={counter}
        front={front}
        frontEdge="top"
      />

      {/* Tramo izquierdo (L y U) */}
      {showLeft && (
        <CounterRun
          x={runX}
          y={runY - sideLen}
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
          x={runX + runLen - COUNTER_THICK}
          y={runY - sideLen}
          w={COUNTER_THICK}
          h={sideLen}
          counter={counter}
          front={front}
          frontEdge="left"
        />
      )}

      {/* Tramo superior (paralela): segundo frente enfrentado al inferior */}
      {showTop && (
        <CounterRun
          x={runX}
          y={30}
          w={runLen}
          h={COUNTER_THICK}
          counter={counter}
          front={front}
          frontEdge="top"
        />
      )}

      {/* Península: tramo que se proyecta hacia el interior como desayunador */}
      {showPeninsula && (
        <g>
          <CounterRun
            x={runX + runLen - COUNTER_THICK}
            y={runY - 90}
            w={COUNTER_THICK}
            h={90}
            counter={counter}
            front={front}
            frontEdge="left"
          />
          {/* pisos del desayunador */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={runX + runLen + 10}
              cy={runY - 78 + i * 26}
              r="7"
              fill="#3a3a3a"
              stroke="#ffffff1f"
            />
          ))}
        </g>
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
            stroke="#ffffff1f"
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

      {/* Muebles aéreos: banda punteada sobre el tramo inferior */}
      {wallM > 0 && (
        <g>
          <rect
            x={bandX}
            y={runY + 6}
            width={bandLen}
            height={COUNTER_THICK - 12}
            rx="3"
            fill={front}
            opacity="0.22"
            stroke="#ffffff66"
            strokeDasharray="5 4"
          />
          <text
            x={bandX + bandLen / 2}
            y={runY - 6}
            textAnchor="middle"
            fontSize="9"
            fill="#6f6f6f"
            fontFamily="var(--font-sans), sans-serif"
          >
            aéreos {config.wallMeters} m
          </text>
        </g>
      )}

      {/* Refrigerador: fuera de la medida de la cocina */}
      <g>
        <rect
          x={fridgeX}
          y={fridgeY}
          width={fridgeW}
          height={fridgeH}
          rx="3"
          fill="#303030"
          stroke="#ffffff1f"
        />
        <line
          x1={fridgeX + fridgeW / 2}
          y1={fridgeY + 4}
          x2={fridgeX + fridgeW / 2}
          y2={fridgeY + fridgeH - 4}
          stroke="#00000066"
          strokeWidth="2"
        />
        <text
          x={fridgeX + fridgeW / 2}
          y={fridgeY - 6}
          textAnchor="middle"
          fontSize="8"
          fill="#6f6f6f"
          fontFamily="var(--font-sans), sans-serif"
        >
          Refrig.
        </text>
      </g>

      {/* etiqueta de metros */}
      <text
        x={runX + runLen / 2}
        y={H - 12}
        textAnchor="middle"
        fontSize="12"
        fill="#878787"
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
      <rect x={x} y={y} width={w} height={h} rx="4" fill={counter} stroke="#ffffff1f" />
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
