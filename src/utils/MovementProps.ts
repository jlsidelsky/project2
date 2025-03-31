import GalleryFrame from "./GalleryFrameProps";

interface MovementProps {
  id: string;
  title: string; //serves as unique id
  location: string;
  start: number;
  end: number;
  artists: string[];
  // images: GalleryFrame[];
  image: string;
  height: number;
  width: number;
  text: string;

  // graph
  left?: string;
  right?: string;
  up?: string;
  down?: string;

  //map
  row: number;
  col: number;
}
export default MovementProps;
