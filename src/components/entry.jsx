import React, { useState, useEffect } from "react";
import Nav from "./nav";
import previous from "/public/Left.svg";
import next from "/public/Right.svg";
import Map from "./Map.jsx";
import data from "../assets/data";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqkcwbxs9/upload";
const CLOUDINARY_PRESET = "travel_journal";

function EntryLog({ log, entries = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState([]); // {url, type}
  const [uploading, setUploading] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAl9frXkZqpDMHFYJG5M81f6Gk2cqPFb0E",
  });

  useEffect(() => {
    setCurrentIndex(0);
    setMedia([]); // Reset media when log changes
  }, [log]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          setMedia((prev) => [
            ...prev,
            { url: data.secure_url, type: file.type.split("/")[0] },
          ]);
        }
      } catch (err) {
        alert("Upload failed: " + err.message);
      }
    }
    setUploading(false);
    e.target.value = null;
  };

  if (!log) {
    return (
      <section id="entrylog">
        <Nav title="Travel Log" />
        <div className="entry__placeholder">
          Select a travel log to see details and experiences.
        </div>
        <div style={{ margin: "24px 0" }}>
          <Map onSelect={() => {}} entries={entries} />
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
          <div style={{ margin: "24px 0 12px 0" }}>
            <label style={{ fontWeight: 600 }}>
              Add Media (photo, video, audio):
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                multiple
                onChange={handleUpload}
                style={{ display: "block", marginTop: 8 }}
                disabled={uploading}
              />
            </label>
            {uploading && (
              <div style={{ color: "#b24646", marginTop: 8 }}>Uploading...</div>
            )}
            <div className="entry__media-gallery">
              {media.map((m, i) =>
                m.type === "image" ? (
                  <img key={i} src={m.url} alt="uploaded" />
                ) : m.type === "video" ? (
                  <video key={i} src={m.url} controls />
                ) : m.type === "audio" ? (
                  <audio key={i} src={m.url} controls />
                ) : null
              )}
            </div>
          </div>
        </div>
        <div style={{ margin: "40px 0 0 0" }}>
          {isLoaded && !loadError && (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "220px",
                borderRadius: "16px",
                border: "1.5px solid #ececec",
                boxShadow: "0 2px 12px rgba(50,50,93,0.10)",
                marginTop: "10px",
              }}
              zoom={10}
              center={{ lat: log.latitude, lng: log.longitude }}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                gestureHandling: "greedy",
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            >
              <Marker
                position={{ lat: log.latitude, lng: log.longitude }}
                title={log.title}
              />
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  );
}

export default EntryLog;
