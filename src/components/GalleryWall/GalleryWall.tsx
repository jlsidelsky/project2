import { useEffect, useLayoutEffect, useState } from "react";
import GalleryFrame from "../../utils/GalleryFrameProps";
import styles from "./GalleryWall.module.css";
import MovementProps from "../../utils/MovementProps";
import ArtInfo from "../../utils/ArtInfo";

interface Position {
  x: number;
  y: number;
}

interface Positions {
  [id: string]: Position;
}

interface ContainerDimensions {
  width: number;
  height: number;
}

interface GalleryWallProps extends React.HTMLAttributes<HTMLDivElement> {
  framesData: GalleryFrame[];
  hide: boolean;
  setHover: (arg0: ArtInfo | null) => void;
}

const GalleryWall = ({
  framesData,
  hide,
  setHover,
  ...props
}: GalleryWallProps) => {
  const [positions, setPositions] = useState<Positions>({});
  const [containerDimensions, setContainerDimensions] =
    useState<ContainerDimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const newPositions: Positions = {};

    // First, add frames with absolute positions.
    framesData.forEach((frame) => {
      if (frame.x !== undefined && frame.y !== undefined) {
        newPositions[frame.id] = { x: frame.x, y: frame.y };
      }
    });

    // Next, compute positions for frames relative to another frame.
    framesData.forEach((frame) => {
      if (frame.relativeTo) {
        const anchor = framesData.find((f) => f.id === frame.relativeTo);
        if (anchor && newPositions[anchor.id]) {
          const anchorPos = newPositions[anchor.id];
          let x = anchorPos.x;
          let y = anchorPos.y;

          // Horizontal positioning:
          if (frame.relativeHorizontal === "left") {
            x = anchorPos.x - frame.width - (frame.offsetX ?? 0);
          } else if (frame.relativeHorizontal === "right") {
            x = anchorPos.x + anchor.width + (frame.offsetX ?? 0);
          } else if (frame.alignHorizontal) {
            if (frame.alignHorizontal === "left") {
              x = anchorPos.x;
            } else if (frame.alignHorizontal === "center") {
              x = anchorPos.x + (anchor.width - frame.width) / 2;
            } else if (frame.alignHorizontal === "right") {
              x = anchorPos.x + anchor.width - frame.width;
            }
          } else if (frame.offsetX !== undefined) {
            // Fallback: if offsetX is provided without a specific direction, assume to the right.
            x = anchorPos.x + anchor.width + frame.offsetX;
          }

          // Vertical positioning:
          if (frame.relativeVertical === "above") {
            y = anchorPos.y - frame.height - (frame.offsetY ?? 0);
          } else if (frame.relativeVertical === "below") {
            y = anchorPos.y + anchor.height + (frame.offsetY ?? 0);
          } else {
            if (frame.align === "bottom") {
              y = anchorPos.y + anchor.height - frame.height;
            } else if (frame.align === "center") {
              y = anchorPos.y + (anchor.height - frame.height) / 2;
            } else if (frame.align === "top") {
              y = anchorPos.y;
            }
          }

          newPositions[frame.id] = { x, y };
        }
      }
    });

    // Now, compute the bounding box for all frames.
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    framesData.forEach((frame) => {
      const pos = newPositions[frame.id] || { x: 0, y: 0 };
      minX = Math.min(minX, pos.x);
      minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x + frame.width);
      maxY = Math.max(maxY, pos.y + frame.height);
    });

    const containerWidth = maxX - minX;
    const containerHeight = maxY - minY;

    // Shift positions so that the bounding box top-left is at (0,0)
    Object.keys(newPositions).forEach((key) => {
      newPositions[key].x = newPositions[key].x - minX;
      newPositions[key].y = newPositions[key].y - minY;
    });

    setPositions(newPositions);
    setContainerDimensions({ width: containerWidth, height: containerHeight });
  }, []);

  const [availableHeight, setAvailableHeight] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      // margin =  4 rem = 64
      // row one boxes = 76.5
      //row 2 boxes = 77
      // gaps 3 = 36

      //bottom arrows = 48 + gap = 60

      //top of text box - 33.5

      // const available =
      //   window.innerHeight -
      //   4 * rootFontSize -
      //   2 * 33.5 -
      //   48 -
      //   12 -
      //   40 * 2 -
      //   12 -
      //   48;
      const available = window.innerHeight - 313.5 - 33.5 + 2.5;
      setAvailableHeight(available);
      console.log(available);
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // initial calculation
    return () => window.removeEventListener("resize", updateScale);
  }, [containerDimensions.height]);

  return (
    <div
      style={{
        position: "relative",
        width: containerDimensions.width,
        flexShrink: 0,
        // height: containerDimensions.height,
        height: hide ? 48 : availableHeight,
        transition: "height 1s",

        // height: 100,
        // top: hide
        //   ? -48 -
        //     12 -
        //     (availableHeight * availableHeight) / containerDimensions.height -
        //     8
        //   : -48 - 12,
        zIndex: 1,
        // backgroundColor: "blue",
        transformOrigin: "top left",
        transform: `scale(${
          availableHeight /
          (containerDimensions.height > 1 ? containerDimensions.height : 1)
        })`,
      }}
      {...props}
    >
      {framesData.map((frame, index) => {
        const pos = positions[frame.id] || { x: 0, y: 0 };
        return (
          <div
            className={hide ? styles.hide : styles.show}
            key={frame.id}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: frame.width,
              height: frame.height,
              // animation: "fadeIn 0.5s forwards", // Animation to bring opacity to 1
              animationDelay: `${
                hide ? index * 0.2 : (index > 3 ? index : index * 1.5) * 0.2 + 1
              }s`, // Each frame delayed by its index in seconds
            }}
          >
            <img
              className="frame-img"
              src={frame.img}
              height={frame.height}
              width={frame.width}
              // onMouseEnter={() => console.log("!!!!")}
              onMouseEnter={() => setHover(frame.info)}
              onMouseLeave={() => setHover(null)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GalleryWall;
