import Direction from "../../utils/Directions";
import MovementProps from "../../utils/MovementProps";

import Box from "../Box/Box";
// import GalleryWall from "../GalleryWall/GalleryWall";
import styles from "./ImageView.module.css";
// import Arrow from "../../assets/arrow.svg?react";
import { useEffect, useRef, useState } from "react";
import ArtistBubble from "../ArtistBubble/ArtistBubble";
import ArtInfo from "../../utils/ArtInfo";
// import GalleryWallSubstitute from "../GalleryWall/GalleryWallSubstitue";
import GalleryWall2 from "../GalleryWall/GalleryWall2";

// const directions: Direction[] = ["left", "right", "up", "down"];

interface ImageViewProps {
  movement: MovementProps;
  move: (direction: Direction) => void;
  direction: Direction | null;
  trigger: boolean;
  className: string;
}

const ImageView = ({
  movement,
  move,
  // direction,
  // trigger,
  className,
}: ImageViewProps) => {
  const paragraphs = movement.text.split("\n");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageMode, setImageMode] = useState(true);
  // This ref is used as a lock to ignore further wheel events for 1 second
  const wheelLockRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      // If a wheel event has been processed recently, ignore further events
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;

      setImageMode((prevMode) => {
        if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
          if (event.deltaY > 0) {
            // Scrolling down: If imageMode is true, disable it; if already false, log "down"
            if (prevMode) {
              setHover(null);
              return false;
            } else {
              move("down");
              return true;
            }
          } else if (event.deltaY < 0) {
            if (!prevMode) {
              return true;
            } else {
              move("up");
              return false;
            }
            // Scrolling up: always set imageMode to true
          }
        } else {
          if (event.deltaX > 0) {
            // Scrolling down: If imageMode is true, disable it; if already false, log "down"

            move("right");

            return prevMode;
          } else if (event.deltaX < 0) {
            move("left");
            return prevMode;

            // Scrolling up: always set imageMode to true
          }
        }

        return prevMode;
      });

      // Release the lock after 1 second (adjust delay as needed)
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 1000);
    };

    container.addEventListener("wheel", handleWheel);
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // const [animate, setAnimate] = useState(false);
  const animate = false;
  const [hover, setHover] = useState<ArtInfo | null>(null);
  useEffect(() => {
    // This code runs whenever the "movement" prop changes
    if (imageMode === false) {
      setHover(null);
    }
  }, [imageMode]);

  // const setImageHover = (info: ArtInfo | null) => {
  //   if (info && !imageMode) {
  //     setHover(null);
  //   } else {
  //     setHover(info);
  //   }
  // };
  return (
    <div
      className={`${styles.container} ${styles[className]}`}
      ref={containerRef}
      style={{}}
    >
      <div
        style={{ position: "absolute", display: "flex", flexFlow: "column" }}
      >
        <h1 style={{ marginBottom: "var(--gap)" }}>{movement.title}</h1>
        {hover && (
          <>
            <p
              style={{
                fontWeight: 800,
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              "{hover.title}"
            </p>
            <p
              style={{
                textTransform: "capitalize",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {hover.artist}, {hover.year}
            </p>
          </>
        )}
      </div>
      {/* {imageMode && ( */}
      {/* <div style={{ backgroundColor: "blue", height: 800, width: 200 }}></div> */}
      {/* <GalleryWall
        className={imageMode ? styles.show : styles.hide}
        framesData={movement.images}
        hide={!imageMode}
        setHover={setImageHover}
      /> */}
      <GalleryWall2
        className={imageMode ? styles.show : styles.hide}
        img={movement.image}
        width={movement.width}
        height={movement.height}
        hide={!imageMode}
      />

      <div>
        <img src="" alt="" />
      </div>

      {/* <BasicInfo {...movement}></BasicInfo> */}
      <div className={styles.rowOne}>
        <Box
          title="Where?"
          childProps={{ className: animate ? styles.animate : "" }}
        >
          <h3>{movement.location}</h3>
        </Box>
        <Box
          title="When?"
          childProps={{ className: animate ? styles.animate : "" }}
        >
          <h3>
            {movement.start} - {movement.end}
          </h3>
        </Box>
      </div>
      <Box
        title="Who?"
        childProps={{ className: animate ? styles.animate : "" }}
      >
        <div className={styles.artistsDiv}>
          {movement.artists.map((artist, index) => (
            <ArtistBubble key={index} name={artist} />
          ))}
        </div>
      </Box>
      <Box
        title={"What?"}
        style={{
          // borderBottom: imageMode ? "none" : "1.5px solid var(--primary)",
          flex: 1,

          overflow: "hidden",
        }}
        childProps={{
          className: animate ? styles.animate : "",
          style: {
            // height: imageMode ? 0 : "unset",
            // transition: "height 1s",
            // padding: "0",
            flex: 1,
            overflow: "auto",
            width: "100%",
            columns: "2 auto",
            columnGap: "1em",
            display: "block",
          },
        }}
      >
        {/* <div style={{ backgroundColor: "blue", flex: 1 }}> */}
        {/* <div style={{ backgroundColor: "red", height: 500, flex: 1 }}></div> */}
        {/* </div> */}
        {/* <div className={styles.textContainer}> */}

        {/* <div> */}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{ marginBottom: "var(--gap)", textIndent: "2em" }}
          >
            {paragraph}
          </p>
        ))}
        {/* </div> */}

        {/* </div> */}
      </Box>
    </div>
  );
};
export default ImageView;
