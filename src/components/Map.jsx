import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import data from "../assets/data";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "20px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
  margin: "20px 0",
};

const center = {
  lat: 39.8283, // Center of the US
  lng: -98.5795,
};

function Map({ onSelect }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAl9frXkZqpDMHFYJG5M81f6Gk2cqPFb0E",
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
      {data.map((entry) => (
        <Marker
          key={entry.id}
          position={{ lat: entry.latitude, lng: entry.longitude }}
          onClick={() => onSelect(entry.id)}
          title={entry.title}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
