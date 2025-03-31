import "./MovementHeader.css";
interface MovementHeaderProps {
  title: string;
  location: string;
  start: number;
  end: number;
  artists: string[];
}

const MovementHeader = ({
  title,
  location,
  start,
  end,
  artists,
}: MovementHeaderProps) => {
  const artistTags = artists.map((artist, index) => (
    <div className="artistTag" key={index}>
      <h6>{artist}</h6>
    </div>
  ));
  return (
    <div className="MovementHeader">
      <div>
        <h3>{location}</h3>
        <h3 className="italic">
          {start} - {end}
        </h3>
      </div>
      <h1>{title}</h1>
      <div>{artistTags}</div>
    </div>
  );
};
export default MovementHeader;
