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

interface GalleryWall2Props extends React.HTMLAttributes<HTMLDivElement> {
  img: string;
  height: number;
  width: number;
  hide: boolean;
}

const GalleryWall2 = ({
  img,
  height,
  width,
  hide,

  ...props
}: GalleryWall2Props) => {
  const [positions, setPositions] = useState<Positions>({});
  const [containerDimensions, setContainerDimensions] =
    useState<ContainerDimensions>({ width: width, height: height });

  // Now, compute the bounding box for all frames.

  const containerWidth = width;
  const containerHeight = height;

  // Shift positions so that the bounding box top-left is at (0,0)

  const [availableHeight, setAvailableHeight] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const available = window.innerHeight - 313.5 - 33.5 + 2.5 - 33;
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
      <img
        src={img}
        style={{
          height: height,
          width: width,
          opacity: hide ? 0 : 1,
          transition: "opacity 1s",
        }}
        alt=""
      />
    </div>
  );
};

export default GalleryWall2;
