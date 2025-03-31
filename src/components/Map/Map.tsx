/// <reference types="vite-plugin-svgr/client" />

import {
  //  React,
  // useEffect,
  useLayoutEffect,
  // useMemo,
  // useRef,
  useState,
} from "react";
// import Movements from "../data/Movements";
import Movements from "../../data/Movements";
// import MovementProps from "../utils/MovementProps";
import Star from "../../assets/star.svg?react";
import Box from "../Box/Box";
import styles from "./Map.module.css";
import MovementProps from "../../utils/MovementProps";

const CELL_SIZE = 24;

const GAP_H = 10;
const GAP_V = 24;

const GAP = 4;

interface MapViewProps {
  onSelect: (id: string) => void;
  currentMovement: MovementProps;
}

function MapView({ onSelect, currentMovement }: MapViewProps) {
  const [hoverID, setHoverID] = useState<string | null>(null);
  const movementVals = Object.values(Movements);

  const maxRow = Math.max(...movementVals.map((m) => m.row));
  const maxCol = Math.max(...movementVals.map((m) => m.col));
  const width = maxCol * (CELL_SIZE + GAP_H + 2 * GAP) + CELL_SIZE;
  const height = maxRow * (CELL_SIZE + GAP_V + 2 * GAP) + CELL_SIZE;

  const horizontalEdges = movementVals.flatMap((m) =>
    (["right"] as const)
      .filter((dir) => m[dir])
      .map((dir) => ({ start: m, end: Movements[m[dir]!] }))
  );
  const verticalEdges = movementVals.flatMap((m) =>
    (["down"] as const)
      .filter((dir) => m[dir])
      .map((dir) => ({ start: m, end: Movements[m[dir]!] }))
  );

  const [availableHeight, setAvailableHeight] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const available =
        window.innerHeight - 4 * rootFontSize - 33.5 - 48 - 12 - 16;
      setAvailableHeight(available);
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // initial calculation
    return () => window.removeEventListener("resize", updateScale);
  }, [height]);

  return (
    <Box title={"Map"} childProps={{ style: { flex: 1 } }}>
      <div
        style={{
          position: "relative",
          width,
          height: availableHeight,
          transformOrigin: "top center",
          transform: `scale(${
            (availableHeight > 750 ? 750 : availableHeight) / height
          })`,
        }}
      >
        <svg
          style={{ position: "absolute", top: 0, left: 0 }}
          width={width}
          height={height}
        >
          {horizontalEdges.map(({ start, end }) => {
            const x1 =
              start.col * (CELL_SIZE + GAP_H + GAP * 2) + CELL_SIZE + GAP;
            const y1 =
              start.row * (CELL_SIZE + GAP_V + GAP * 2) + CELL_SIZE / 2;
            const x2 = end.col * (CELL_SIZE + GAP_H + GAP * 2);
            const y2 = end.row * (CELL_SIZE + GAP_V + GAP * 2) + CELL_SIZE / 2;
            return (
              <line
                key={`${start.id}-${end.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--primary)"
                strokeDasharray="10 4"
                strokeWidth={2.5}
              />
            );
          })}
          {verticalEdges.map(({ start, end }) => {
            const x1 =
              start.col * (CELL_SIZE + GAP_H + GAP * 2) + CELL_SIZE / 2;
            const y1 =
              start.row * (CELL_SIZE + GAP_V + GAP * 2) + CELL_SIZE + GAP;
            const x2 = end.col * (CELL_SIZE + GAP_H + GAP * 2) + CELL_SIZE / 2;
            const y2 = end.row * (CELL_SIZE + GAP_V + GAP * 2) - GAP;
            return (
              <line
                key={`${start.id}-${end.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--primary)"
                strokeDasharray="10 4"
                strokeWidth="2.5"
              />
            );
          })}
        </svg>

        {movementVals.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            onMouseEnter={() => setHoverID(m.id)}
            onMouseLeave={() => setHoverID(null)}
            className={`${styles.starButton} ${
              currentMovement.id === m.id ? styles.starButtonSelected : ""
            }`}
            style={{
              left: m.col * (CELL_SIZE + GAP_H + 2 * GAP),
              top: m.row * (CELL_SIZE + GAP_V + 2 * GAP),
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          >
            <Star width={21} height={20} style={{ flexShrink: 0 }}></Star>

            {hoverID === m.id && (
              <div className={styles.tooltip}>
                <h6> {m.title}</h6>
              </div>
            )}
          </button>
        ))}
      </div>
      {/* </div> */}
    </Box>
  );
}

export default MapView;
