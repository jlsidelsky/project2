import styles from "./ArtistBubble.module.css";

interface ArtistBubbleProps {
  name: string;
}

const ArtistBubble = ({ name }: ArtistBubbleProps) => {
  return (
    <div className={styles.container}>
      <h5 style={{ textWrap: "nowrap" }}>{name}</h5>
    </div>
  );
};
export default ArtistBubble;
