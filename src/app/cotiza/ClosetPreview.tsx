"use client";

import { frontSwatch } from "@/lib/kitchen-options";
import type { ClosetConfig } from "@/lib/closet-pricing";

// Preview en elevación (vista frontal) del closet, actualizado en vivo.
// Con puertas muestra los paneles según el sistema; sin puertas muestra el
// interior (barra, repisas y los extras elegidos). Esquemático, no a escala.

const W = 400;
const H = 300;
const FLOOR = "#0e0e0e";
const ROOM = "#161616";
const CARCASS = "#242424";
const INTERIOR = "#1b1b1b";
const BAR = "#8a8a8a";

export function ClosetPreview({ config }: { config: ClosetConfig }) {
  const front = frontSwatch(config.front, config.lacquerColor);

  // Ancho del mueble escala con los metros de frente.
  const span = Math.max(0.35, Math.min(1, config.widthMeters / 5));
  const bodyW = 120 + span * 220;
  const x0 = (W - bodyW) / 2;

  // Altura: estándar deja aire arriba; hasta cielo llega al borde superior.
  const yTop = config.height === "hasta-cielo" ? 22 : 62;
  const yBottom = H - 32;
  const bodyH = yBottom - yTop;

  const open = config.doors === "sin-puertas";
  const hasDrawers = config.extras.includes("cajonera");
  const hasShoes = config.extras.includes("zapatera");
  const hasDoubleBar = config.extras.includes("doble-barra");
  const hasLoft = config.extras.includes("maletero") || config.height === "hasta-cielo";

  // Nº de módulos/puertas según el ancho.
  const panels = Math.max(2, Math.round(bodyW / 92));
  const panelW = bodyW / panels;

  const loftH = hasLoft ? Math.min(46, bodyH * 0.18) : 0;
  const innerTop = yTop + loftH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full rounded-xl"
      role="img"
      aria-label={`Vista frontal de closet ${config.closetType}`}
    >
      {/* muro / habitación */}
      <rect x="0" y="0" width={W} height={H} rx="6" fill={FLOOR} />
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="4" fill={ROOM} stroke="#262626" />

      {/* carcasa */}
      <rect x={x0 - 5} y={yTop - 5} width={bodyW + 10} height={bodyH + 10} rx="4" fill={CARCASS} stroke="#ffffff1f" />

      {/* maletero / módulos superiores */}
      {hasLoft && (
        <g>
          {Array.from({ length: Math.max(2, Math.floor(panels / 1.5)) }).map((_, i, arr) => {
            const w = bodyW / arr.length;
            return (
              <rect
                key={i}
                x={x0 + i * w + 2}
                y={yTop + 2}
                width={w - 4}
                height={loftH - 4}
                rx="2"
                fill={front}
                stroke="#00000055"
              />
            );
          })}
        </g>
      )}

      {open ? (
        /* interior a la vista */
        <g>
          <rect x={x0} y={innerTop} width={bodyW} height={yBottom - innerTop} fill={INTERIOR} />
          {/* división central */}
          <rect x={x0 + bodyW * 0.55 - 2} y={innerTop} width={4} height={yBottom - innerTop} fill={CARCASS} />

          {/* zona de colgado (izquierda): barra + ropa */}
          <rect x={x0 + 8} y={innerTop + 14} width={bodyW * 0.55 - 18} height={4} rx="2" fill={BAR} />
          {Array.from({ length: 5 }).map((_, i) => {
            const hx = x0 + 22 + i * ((bodyW * 0.55 - 44) / 4);
            const hangH = hasDoubleBar ? 44 : 92;
            return <rect key={i} x={hx} y={innerTop + 20} width={12} height={hangH} rx="3" fill={front} opacity={0.85} />;
          })}
          {hasDoubleBar && (
            <>
              <rect x={x0 + 8} y={innerTop + 78} width={bodyW * 0.55 - 18} height={4} rx="2" fill={BAR} />
              {Array.from({ length: 5 }).map((_, i) => {
                const hx = x0 + 22 + i * ((bodyW * 0.55 - 44) / 4);
                return <rect key={i} x={hx} y={innerTop + 84} width={12} height={44} rx="3" fill={front} opacity={0.7} />;
              })}
            </>
          )}

          {/* columna derecha: repisas / cajones / zapatera */}
          {(() => {
            const cx = x0 + bodyW * 0.55 + 6;
            const cw = bodyW * 0.45 - 14;
            const items: React.ReactNode[] = [];
            let y = innerTop + 10;
            // repisas
            for (let i = 0; i < 2; i++) {
              items.push(<rect key={`s${i}`} x={cx} y={y} width={cw} height={4} rx="2" fill={CARCASS} stroke="#ffffff14" />);
              y += 26;
            }
            // cajonera
            if (hasDrawers) {
              for (let i = 0; i < 3; i++) {
                items.push(
                  <g key={`d${i}`}>
                    <rect x={cx} y={y} width={cw} height={18} rx="2" fill={front} stroke="#00000055" />
                    <rect x={cx + cw / 2 - 8} y={y + 8} width={16} height={2.5} rx="1" fill="#00000066" />
                  </g>
                );
                y += 21;
              }
            }
            // zapatera: repisas inclinadas
            if (hasShoes) {
              for (let i = 0; i < 2 && y < yBottom - 18; i++) {
                items.push(
                  <line
                    key={`z${i}`}
                    x1={cx}
                    y1={y + 10}
                    x2={cx + cw}
                    y2={y + 2}
                    stroke={BAR}
                    strokeWidth="3"
                  />
                );
                y += 18;
              }
            }
            return items;
          })()}
        </g>
      ) : (
        /* puertas cerradas */
        <g>
          {Array.from({ length: panels }).map((_, i) => (
            <g key={i}>
              <rect
                x={x0 + i * panelW + 2}
                y={innerTop + 2}
                width={panelW - 4}
                height={yBottom - innerTop - 4}
                rx="2"
                fill={front}
                stroke="#00000055"
              />
              {config.doors === "abatir" ? (
                /* tirador vertical al borde de cada hoja */
                <rect
                  x={i % 2 === 0 ? x0 + (i + 1) * panelW - 12 : x0 + i * panelW + 8}
                  y={(innerTop + yBottom) / 2 - 22}
                  width={4}
                  height={44}
                  rx="2"
                  fill="#00000066"
                />
              ) : (
                /* riel superior + huella de traslape de correderas */
                <rect
                  x={x0 + i * panelW + 2}
                  y={innerTop + 2}
                  width={panelW - 4}
                  height={6}
                  fill="#00000040"
                />
              )}
            </g>
          ))}
          {config.doors === "correderas" && (
            /* panel delantero levemente desplazado para sugerir el traslape */
            <rect
              x={x0 + panelW * 0.6}
              y={innerTop - 2}
              width={panelW}
              height={yBottom - innerTop + 2}
              rx="2"
              fill={front}
              stroke="#00000088"
            />
          )}
        </g>
      )}

      {/* etiqueta de metros */}
      <text
        x={x0 + bodyW / 2}
        y={H - 12}
        textAnchor="middle"
        fontSize="12"
        fill="#878787"
        fontFamily="var(--font-sans), sans-serif"
      >
        {config.widthMeters} m de frente
      </text>
    </svg>
  );
}
