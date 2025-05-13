import marker from "../assets/Map pin.svg";

function Journal(props) {
  return (
    <div className="log" onClick={props.onClick} style={{ cursor: "pointer" }}>
      <div className="fuji__img__wrapper">
        <img
          className="fuji__img"
          src={`/public/${props.data.img.src}`}
          alt={props.data.img.alt}
        />
      </div>
      <div className="text__container">
        <div className="location">
          <img className="marker" src={marker} alt="Marker" />
          <h5 className="country">{props.data.country}</h5>
          <p className="googleMaps">
            <a href={props.data.googleMaps}>
              <u> View On Google Maps</u>
            </a>
          </p>
        </div>
        <div className="placename">
          <h2>{props.data.title}</h2>
        </div>
        <div className="traveldate">
          <p>{props.data.dates}</p>
        </div>
        <div className="traveltext">
          <p>{props.data.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Journal;
