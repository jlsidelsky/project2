import { useLayoutEffect, useState } from "react";

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
  const containerDimensions = { width: width, height: height };

  // Now, compute the bounding box for all frames.

  // Shift positions so that the bounding box top-left is at (0,0)

  const [availableHeight, setAvailableHeight] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
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
