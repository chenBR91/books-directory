import React, { useEffect, useState, useCallback, useRef } from "react";
import Map, {
  Marker,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import Pin from "./Pin.js";
import axios from "axios";

function MapView() {
  const mapRef = useRef();
  const [rtusData, setRtusData] = useState([])
  const [allMarkerLocationObj, setAllMarkerLocationObj] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);


  useEffect(() => {
    //uploadAllLocation();
    uploadAllRtus();
  }, []);

  useEffect(() => {
    console.log("allMarkerLocationObj", allMarkerLocationObj);
  }, [allMarkerLocationObj]);


  // const uploadAllLocation = () => {
  //   axios.get("http://localhost:8000/api/location/all").then((res) => {
  //     setAllMarkerLocationObj(res["data"]);
  //   });
  // };

  const uploadAllRtus = () => {
    axios.get("http://localhost:8000/api/rtus/all/show-all").then(res => {
      setRtusData(res["data"])
    })
  }

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const handdleClickOnMap = (e) => {
    const { lng, lat } = e["lngLat"];
    const updatedLocatioValue = {
      longitude: lng,
      latitude: lat,
      anchor: "bottom",
    };
    setAllMarkerLocationObj([...allMarkerLocationObj, updatedLocatioValue]);

    // Add location to database
    const url = "http://localhost:8000/api/location/create";
    axios.post(url, { longitude: lng, latitude: lat }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 1,
        }}
        //onClick={handdleClickOnMap}
        style={{ width: "100%", height: "600px" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken="pk.eyJ1IjoiY2hlbmJyOTEiLCJhIjoiY2xnNHZ0a2xiMDBvZjNlcGNkZWpoZjZiNSJ9.feWt9wScK17G2YobIyQePA"
      >
        <FullscreenControl />
        <GeolocateControl position="top-left" ref={geolocateControlRef} />
        <NavigationControl />
        <ScaleControl />
        {/* <Marker longitude={34.98} latitude={39.48} anchor="bottom">
          <Pin />
        </Marker> */}

        {rtusData.map((showMarker, index) => (
          <Marker
            key={index}
            longitude={showMarker.location["longitude"]}
            latitude={showMarker.location["latitude"]}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(showMarker);
            }}
          />
        ))}


        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.location.longitude)}
            latitude={Number(popupInfo.location.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.location.longitude}, {popupInfo.location.latitude}
              <div>Unit: {popupInfo.macAddress}</div>
              <div>Rssi: {popupInfo.rssi}</div>
            </div>
          </Popup>
        )}

      </Map>
    </div>
  );
}

export default MapView;
