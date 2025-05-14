import React, { useState, useEffect } from "react";
import Nav from "./nav";
import previous from "/public/Left.svg";
import next from "/public/Right.svg";
import Map from "./Map.jsx";
import data from "../assets/data";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function EntryLog({ log }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAl9frXkZqpDMHFYJG5M81f6Gk2cqPFb0E",
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [log]);

  if (!log) {
    return (
      <section id="entrylog">
        <Nav title="Travel Log" />
        <div className="entry__placeholder">
          Select a travel log to see details and experiences.
        </div>
        <div style={{ margin: "24px 0" }}>
          <Map onSelect={() => {}} />
        </div>
      </section>
    );
  }

  const images = log.experience?.photos || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="entrylog">
      <Nav title={log.title + " Log"} />
      <div className="entry">
        <div className="entry__img__slider__wrapper">
          {images.length > 0 && (
            <>
              <button onClick={handlePrev} className="slider__button prev">
                <img
                  className="arrows left_arrow"
                  src={previous}
                  alt="Previous"
                />
              </button>
              <img
                className="slide"
                src={`/public/${images[currentIndex]}`}
                alt={log.title + " experience photo " + (currentIndex + 1)}
              />
              <button onClick={handleNext} className="slider__button next">
                <img className="arrows right_arrow" src={next} alt="Next" />
              </button>
            </>
          )}
        </div>
        <div className="entry__details">
          <h2>{log.title}</h2>
          <h4>{log.country}</h4>
          <p>
            <strong>Dates:</strong> {log.dates}
          </p>
          <p>
            <strong>About:</strong> {log.text}
          </p>
          <p>
            <strong>Personal Experience:</strong>{" "}
            {log.experience?.text || "No experience recorded yet."}
          </p>
          <div style={{ margin: "24px 0" }}>
            {isLoaded && !loadError && (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "14px",
                }}
                zoom={10}
                center={{ lat: log.latitude, lng: log.longitude }}
              >
                <Marker
                  position={{ lat: log.latitude, lng: log.longitude }}
                  title={log.title}
                />
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EntryLog;
