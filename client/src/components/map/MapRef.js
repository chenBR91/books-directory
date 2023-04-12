import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./MapRef.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hlbmJyOTEiLCJhIjoiY2xnNHZ0a2xiMDBvZjNlcGNkZWpoZjZiNSJ9.feWt9wScK17G2YobIyQePA";

function MapRef() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(8.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

     // Add navigation control (the +/- zoom buttons)
     map.addControl(new mapboxgl.NavigationControl(), 'top-right');

     
  },[]);


  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}

export default MapRef;
