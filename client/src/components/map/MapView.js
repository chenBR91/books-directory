import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import MapContext from "../../MapContext";
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
  //const [allMarkerLocationObj, setAllMarkerLocationObj] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const { handdleClickOnMap, rtusData, setRtusData, setRtuDataPopup } =
    useContext(MapContext);


  useEffect(() => {
    //uploadAllLocation();
    uploadAllRtus();
  }, []);

  useEffect(() => {
    console.log("rtusData", rtusData);
  }, [rtusData]);

 
  const uploadAllRtus = () => {
    axios.get("http://localhost:8000/api/rtus/all/show-all").then((res) => {
      setRtusData(res["data"]);
    });
  };

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  return (
    <div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 1,
        }}
        onClick={handdleClickOnMap}
        style={{ width: "100%", height: "600px" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(showMarker);
              setRtuDataPopup(showMarker);
            }}
          />
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.location.longitude)}
            latitude={Number(popupInfo.location.latitude)}
            onClose={() => {
              setPopupInfo(null);
            }}
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
