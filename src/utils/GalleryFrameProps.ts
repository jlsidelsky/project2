import ArtInfo from "./ArtInfo";

interface GalleryFrame {
  id: string;
  img: string;
  // Absolute positioning if specified.
  x?: number;
  y?: number;
  // Dimensions for the Frame component.
  width: number;
  height: number;
  // Relative positioning properties:
  relativeTo?: string; // ID of the anchor frame.
  relativeHorizontal?: "left" | "right";
  alignHorizontal?: "left" | "center" | "right";
  relativeVertical?: "above" | "below";
  offsetX?: number;
  offsetY?: number;
  align?: "top" | "center" | "bottom";
  info: ArtInfo;
}

export default GalleryFrame;
