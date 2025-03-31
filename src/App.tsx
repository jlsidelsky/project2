import "./Colors.css";
import "./App.css";

import MovementHeader from "./components/MovementHeader";
import GalleryWall from "./components/GalleryWall/GalleryWall";
import Box from "./components/Box/Box";
import Movements from "./data/Movements";
import BasicInfo from "./components/BasicInfo/BasicInfo";

import ImageView from "./components/ImageView/ImageView";
import MovementProps from "./utils/MovementProps";
import { useCallback, useEffect, useRef, useState } from "react";
import Direction from "./utils/Directions";
import MapView from "./components/Map/Map";
import Arrow from "./assets/arrow.svg?react";

// function App() {
//   const [trigger, setTrigger] = useState(false);

//   const [currentMovement, setCurrentMovement] = useState<MovementProps>(
//     Movements.romanticism
//   );
//   const [slideDirection, setSlideDirection] = useState<"up" | "down" | null>(
//     null
//   );

//   const [className, setClassName] = useState("");

//   // const move = useCallback(
//   //   (direction: Direction) => {
//   //     console.log(direction);
//   //     const nextMovementId = currentMovement[direction];
//   //     console.log(currentMovement.title, currentMovement[direction]);
//   //     if (nextMovementId) {
//   //       setClassName(`${direction}-1`);
//   //       setTimeout(() => {
//   //         setCurrentMovement(Movements[nextMovementId]);
//   //         setClassName(`${direction}-2`);
//   //       }, 1000);
//   //     }
//   //   },
//   //   [currentMovement]
//   // );
//   const moveInProgressRef = useRef(false);

//   const move = useCallback(
//     (direction: Direction) => {
//       if (moveInProgressRef.current) return; // Prevent overlapping moves
//       console.log("moving");
//       moveInProgressRef.current = true; // Set lock

//       const nextMovementId = currentMovement[direction];
//       console.log(currentMovement.title, direction, nextMovementId);
//       if (nextMovementId) {
//         setClassName(`${direction}-1`);
//         // Capture the new movement immediately
//         const newMovement = Movements[nextMovementId];
//         setTimeout(() => {
//           setCurrentMovement(newMovement);
//           setClassName(`${direction}-2`);
//         }, 1000);
//         setTimeout(() => {
//           setClassName("");
//           moveInProgressRef.current = false; // Release lock
//         }, 2000);
//       } else {
//         moveInProgressRef.current = false;
//       }
//     },
//     [currentMovement]
//   );

//   const onSelect = (id: string) => {
//     if (Movements[id]) {
//       setCurrentMovement(Movements[id]);
//     }
//   };

//   return (
//     <>
//       <MapView onSelect={onSelect} currentMovement={currentMovement}></MapView>
//       <button
//         style={{ position: "fixed", top: 100, cursor: "pointer", zIndex: 10 }}
//         onClick={() => setTrigger(!trigger)}
//       >
//         hi
//       </button>{" "}
//       <div
//         style={{
//           position: "relative",
//           height: "calc(100vh - 4em - 48px - 8px)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Current ImageView slides out */}
//         <ImageView
//           movement={currentMovement}
//           move={move}
//           direction={null}
//           trigger={trigger}
//           className={className}
//           // Apply a slide-out class if a slide direction is active
//         />
//       </div>
//       <div id="rightArrows">
//         <button
//           id="upArrow"
//           className="arrow-button"
//           onClick={() => move("up")}
//         >
//           <Arrow
//             height={32}
//             fill={currentMovement.up ? "var(--primary)" : "#ff000080"}
//           />
//         </button>
//         <button
//           id="downArrow"
//           className="arrow-button"
//           onClick={() => move("down")}
//         >
//           <Arrow
//             height={32}
//             fill={currentMovement.down ? "var(--primary)" : "#ff000080"}
//           />
//         </button>
//       </div>
//       <div id="bottomArrows">
//         <button
//           id="leftArrow"
//           className="arrow-button"
//           onClick={() => move("left")}
//         >
//           <Arrow
//             height={32}
//             fill={currentMovement.left ? "var(--primary)" : "#ff000080"}
//           />
//         </button>
//         <button
//           id="rightArrow"
//           className="arrow-button"
//           onClick={() => move("right")}
//         >
//           <Arrow
//             height={32}
//             fill={currentMovement.right ? "var(--primary)" : "#ff000080"}
//           />
//         </button>
//       </div>
//     </>
//   );
// }

function App() {
  const [currentMovement, setCurrentMovement] = useState<MovementProps>(
    Movements.romanticism
  );
  const [className, setClassName] = useState("");
  // Use a ref to always have the latest currentMovement
  const currentMovementRef = useRef(currentMovement);
  useEffect(() => {
    currentMovementRef.current = currentMovement;
  }, [currentMovement]);

  // Use a ref to prevent overlapping moves
  const moveInProgressRef = useRef(false);

  const move = useCallback((direction: Direction) => {
    if (moveInProgressRef.current) return; // prevent overlapping
    moveInProgressRef.current = true;

    // Always use the latest currentMovement from the ref
    const nextMovementId = currentMovementRef.current[direction];
    console.log(currentMovementRef.current.title, direction, nextMovementId);
    if (nextMovementId) {
      // Start exit animation
      setClassName(`${direction}-1`);
      const newMovement = Movements[nextMovementId];
      setTimeout(() => {
        // Update movement to the new one
        setCurrentMovement(newMovement);
        // Start entrance animation or clear animation class
        setClassName(`${direction}-2`);
        moveInProgressRef.current = false;
      }, 1000);
    } else {
      moveInProgressRef.current = false;
    }
  }, []);

  // ... rest of your App component rendering

  return (
    <>
      <MapView
        onSelect={(id) => {
          if (Movements[id]) setCurrentMovement(Movements[id]);
        }}
        currentMovement={currentMovement}
      />
      <div
        style={{
          position: "relative",
          height: "calc(100vh - 4em - 48px - 8px)",
          overflow: "hidden",
        }}
      >
        <ImageView
          movement={currentMovement}
          move={move}
          direction={null}
          trigger={false}
          className={className}
        />
      </div>
      <div id="rightArrows">
        <button id="upArrow" onClick={() => move("up")}>
          <Arrow
            height={32}
            fill={currentMovement.up ? "var(--primary)" : "#ff000080"}
          />
        </button>
        <button id="downArrow" onClick={() => move("down")}>
          <Arrow
            height={32}
            fill={currentMovement.down ? "var(--primary)" : "#ff000080"}
          />
        </button>
      </div>
      <div id="bottomArrows">
        <button
          id="leftArrow"
          className="arrow-button"
          onClick={() => move("left")}
        >
          <Arrow
            height={32}
            fill={currentMovement.left ? "var(--primary)" : "#ff000080"}
          />
        </button>
        <button
          id="rightArrow"
          className="arrow-button"
          onClick={() => move("right")}
        >
          <Arrow
            height={32}
            fill={currentMovement.right ? "var(--primary)" : "#ff000080"}
          />
        </button>
      </div>
      {/* other UI elements */}
    </>
  );
}

export default App;
