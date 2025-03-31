// import Direction from "../../utils/Directions";
// import MovementProps from "../../utils/MovementProps";
// import BasicInfo from "../BasicInfo/BasicInfo";
// import Box from "../Box/Box";
// import GalleryWall from "../GalleryWall/GalleryWall";
// import styles from "./ImageView.module.css";
// import Arrow from "../../assets/arrow.svg?react";
// import { useState } from "react";

// const directions: Direction[] = ["left", "right", "up", "down"];

// interface ImageViewProps {
//   movement: MovementProps;
//   move: (direction: Direction) => void;
// }

// const ImageView = ({ movement, move }: ImageViewProps) => {
//   const paragraphs = movement.text.split("\n");

//   const [imageMode, setImageMode] = useState(false);
//   return (
//     <div className={styles.container}>
//       <button
//         style={{ position: "fixed", top: 100, cursor: "pointer", zIndex: 10 }}
//         onClick={() => setImageMode(!imageMode)}
//       >
//         {imageMode ? "img" : "text"}
//       </button>
//       <div
//         className={`${styles.titleContainer} ${
//           imageMode ? styles.imageTitleContainer : ""
//         }`}
//       >
//         <h1>{movement.title}</h1>
//         {/* {imageMode && ( */}
//         <GalleryWall
//           className={imageMode ? styles.show : styles.hide}
//           framesData={movement.images}
//         />
//         {/* )} */}
//       </div>

//       <BasicInfo {...movement}></BasicInfo>
//       {!imageMode && (
//         <Box title={"What?"} style={{ flex: 1 }}>
//           <div className={styles.textContainer}>
//             {paragraphs.map((paragraph, index) => (
//               <p key={index}>{paragraph}</p>
//             ))}
//           </div>
//         </Box>
//       )}
//     </div>
//   );
// };
// export default ImageView;

// import Direction from "../../utils/Directions";
// import MovementProps from "../../utils/MovementProps";
// import BasicInfo from "../BasicInfo/BasicInfo";
// import Box from "../Box/Box";
// import GalleryWall from "../GalleryWall/GalleryWall";
// import styles from "./ImageView.module.css";
// import Arrow from "../../assets/arrow.svg?react";
// import { useEffect, useRef, useState } from "react";

// const directions: Direction[] = ["left", "right", "up", "down"];

// interface ImageViewProps {
//   movement: MovementProps;
//   move: (direction: Direction) => void;
// }

// const ImageView = ({ movement, move }: ImageViewProps) => {
//   const [imageMode, setImageMode] = useState(true);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const paragraphs = movement.text.split("\n");

//   useEffect(() => {
//     const myDiv = containerRef.current;
//     if (!myDiv) return;

//     let lastScrollTop = myDiv.scrollTop;
//     const threshold = 45;

//     const handleScroll = () => {
//       const currentScrollTop = myDiv.scrollTop;
//       if (Math.abs(currentScrollTop - lastScrollTop) >= threshold) {
//         console.log("Scrolled at least 45px within the div!");
//         setImageMode(false);
//         lastScrollTop = currentScrollTop;
//       }
//     };

//     myDiv.addEventListener("scroll", handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       myDiv.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className={styles.container} id="imgView" ref={containerRef}>
//       <button
//         style={{ position: "fixed", top: 100, cursor: "pointer", zIndex: 10 }}
//         onClick={() => setImageMode(!imageMode)}
//       >
//         {imageMode ? "img" : "text"}
//       </button>

//       <h1 style={{ position: "absolute" }}>{movement.title}</h1>
//       {/* {imageMode && ( */}
//       <GalleryWall
//         className={imageMode ? styles.show : styles.hide}
//         framesData={movement.images}
//         hide={!imageMode}
//       />
//       {/* )} */}

//       <BasicInfo {...movement}></BasicInfo>
//       {/* {!imageMode && ( */}
//       <Box title={"What?"} style={{ flex: 1 }}>
//         <div className={styles.textContainer}>
//           {paragraphs.map((paragraph, index) => (
//             <p key={index}>{paragraph}</p>
//           ))}
//         </div>
//       </Box>
//       {/* )} */}
//     </div>
//   );
// };
// export default ImageView;

// const [imageMode, setImageMode] = useState(true);

// const containerRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   const myDiv = containerRef.current;
//   if (!myDiv) return;

//   let lastScrollTop = myDiv.scrollTop;
//   const threshold = 45;

//   const handleScroll = () => {
//     const currentScrollTop = myDiv.scrollTop;
//     if (Math.abs(currentScrollTop - lastScrollTop) >= threshold) {
//       console.log("Scrolled at least 45px within the div!");
//       setImageMode(false);
//       lastScrollTop = currentScrollTop;
//     }
//   };

//   myDiv.addEventListener("scroll", handleScroll);

//   // Clean up the event listener when the component unmounts
//   return () => {
//     myDiv.removeEventListener("scroll", handleScroll);
//   };
// }, []);

// useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;

//   const handleWheel = (event: WheelEvent) => {
//     console.log("User scrolled:", event.deltaY);
//     setImageMode((prevMode) => {
//       if (event.deltaY > 0) {
//         // Scrolling down
//         if (!prevMode) {
//           console.log("down");
//           return prevMode; // remains false
//         } else {
//           return false;
//         }
//       } else if (event.deltaY < 0) {
//         // Scrolling up
//         return true;
//       }
//       return prevMode;
//     });
//     // You can trigger your function here
//   };

//   container.addEventListener("wheel", handleWheel);
//   return () => {
//     container.removeEventListener("wheel", handleWheel);
//   };
// }, []);
// useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;
//   const wheelLockRef = useRef(false);

//   const handleWheel = (event: WheelEvent) => {
//     // If a gesture is currently "locked," ignore this wheel event.
//     if (wheelLockRef.current) return;

//     // Lock further wheel events
//     wheelLockRef.current = true;

//     setImageMode((prevMode) => {
//       if (event.deltaY > 0) {
//         // Scrolling down: if imageMode is true, switch it off.
//         if (prevMode) {
//           return false;
//         } else {
//           // Already false, log "down"
//           console.log("down");
//           return prevMode;
//         }
//       } else if (event.deltaY < 0) {
//         // Scrolling up: always set imageMode to true.
//         return true;
//       }
//       return prevMode;
//     });

//     // Release the lock after 1 second (adjust as needed)
//     setTimeout(() => {
//       wheelLockRef.current = false;
//     }, 1000);
//   };

//   container.addEventListener("wheel", handleWheel);
//   return () => {
//     container.removeEventListener("wheel", handleWheel);
//   };
// }, []);

// const containerRef = useRef<HTMLDivElement | null>(null);
// const [imageMode, setImageMode] = useState(true);
// // // A ref to track whether a scroll gesture is in progress
// const scrollingRef = useRef(false);
// // // A ref to always have the latest imageMode value in our event handler
// const imageModeRef = useRef(imageMode);

// useEffect(() => {
//   imageModeRef.current = imageMode;
// }, [imageMode]);

// useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;

//   const handleWheel = (event: WheelEvent) => {
//     // Only process the first wheel event of a scroll gesture
//     if (scrollingRef.current) return;
//     scrollingRef.current = true; // Lock further wheel events until mouseup

//     if (event.deltaY > 0) {
//       // Scrolling down:
//       // - If we're in image mode, disable it.
//       // - Otherwise, log "down".
//       if (imageModeRef.current) {
//         setImageMode(false);
//       } else {
//         console.log("down");
//       }
//     } else if (event.deltaY < 0) {
//       // Scrolling up: always enable image mode
//       setImageMode(true);
//     }
//   };

//   const handleMouseUp = () => {
//     // Reset the lock so that a new scroll gesture can be processed
//     scrollingRef.current = false;
//   };

//   container.addEventListener("wheel", handleWheel);
//   container.addEventListener("mouseup", handleMouseUp);
//   // If needed, also listen on the document in case the mouse is released outside the container:
//   // document.addEventListener("mouseup", handleMouseUp);

//   return () => {
//     container.removeEventListener("wheel", handleWheel);
//     container.removeEventListener("mouseup", handleMouseUp);
//     // document.removeEventListener("mouseup", handleMouseUp);
//   };
// }, []);
