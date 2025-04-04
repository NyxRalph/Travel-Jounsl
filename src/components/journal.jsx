import marker from "../assets/Map pin.svg";
import fuji from "../assets/Mount Fuji.jpg";

function Journal() {
  return (
    <section id="logs">
      <div className="log">
        <div className="fuji__img__wrapper">
          <img className="fuji__img" src={fuji} alt="Mount Fugi" />
        </div>
        <div className="text__container">
          <div className="location">
            <img className="marker" src={marker} alt="Marker" />
            <h5 className="country">JAPAN</h5>
            <p className="googleMaps">
              <u>View On Google Maps</u>
            </p>
          </div>
          <div className="placename">
            <h2>Mount Fuji</h2>
          </div>
          <div className="traveldate">
            <p>12 Jan, 2021 - 24 Jan, 2021</p>
          </div>
          <div className="traveltext">
            <p>
              Mount Fuji is the highest mountain in Japan, standing at 3,776
              meters
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journal;
