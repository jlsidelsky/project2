import MovementProps from "../../utils/MovementProps";
import ArtistBubble from "../ArtistBubble/ArtistBubble";
import Box from "../Box/Box";
import styles from "./BasicInfo.module.css";

const BasicInfo = ({ artists, location, start, end }: MovementProps) => {
  return (
    <>
      <div className={styles.rowOne}>
        <Box title="Where?">
          <h3>{location}</h3>
        </Box>
        <Box title="When?">
          <h3>
            {start} - {end}
          </h3>
        </Box>
      </div>
      <Box title="Who?">
        <div className={styles.artistsDiv} style={{ overflowX: "auto" }}>
          {artists.map((artist, index) => (
            <ArtistBubble key={index} name={artist} />
          ))}
        </div>
      </Box>
    </>
  );
};

export default BasicInfo;
