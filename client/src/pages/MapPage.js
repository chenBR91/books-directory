import React, { useState, useEffect } from "react";
import MapContext from "../MapContext.js";
import MapView from "../components/map/MapView.js";
import AddLocation from "../components/AddLocation.js";
import UpdateUnits from "../components/UpdateUnits.js";
// import axios from "axios";
// material ui
import { Box } from "@mui/system";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// react icons
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdDeviceHub } from "react-icons/md";
import "./MapPage.css";

const MapPage = () => {
  const [rtusData, setRtusData] = useState([]);
  const [stateDetailNav, setStateDetailNav] = useState("");
  const [addLocationWhereClicked, setAddLocationWhereClicked] = useState([]);
  const [rtuDataPopup, setRtuDataPopup] = useState({
    macAddress: "",
    rssi: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });
  const [addDataNewRtu, setAddDataNewRtu] = useState({
    macAddress: "",
    rssi: "",
  });

  useEffect(() => {
    console.log("addLocationWhereClicked", addLocationWhereClicked);
  }, [addLocationWhereClicked]);

  const handdleClickOnMap = (e) => {
    const { lng, lat } = e["lngLat"];
    const updatedLocatioValue = {
      longitude: lng,
      latitude: lat,
      //anchor: "bottom",
    };

    // only one location
    setAddLocationWhereClicked(updatedLocatioValue);

    // add location to list every click on the map
    //setAllMarkerLocationObj([...allMarkerLocationObj, updatedLocatioValue]);

    // Add location to database
    // const url = "http://localhost:8000/api/location/create";
    // axios.post(url, { longitude: lng, latitude: lat }).then((res) => {
    //   console.log(res);
    // });
  };

  const stateOptionDetail = () => {
    if (stateDetailNav === "add location") {
      return <AddLocation />;
    } else if (stateDetailNav === "update units") {
      return <UpdateUnits />;
    }
  };

  const mapValue = {
    handdleClickOnMap,
    rtusData,
    setRtusData,
    addDataNewRtu,
    setAddDataNewRtu,
    addLocationWhereClicked,
    rtuDataPopup,
    setRtuDataPopup,
  };

  return (
    <MapContext.Provider value={mapValue}>
      <div className="main-page">
        <div className="map-box">
          <Box
            sx={{
              p: 2,
              border: "0px dashed grey",
              width: 1300,
              height: 600,
              // mt: 9,
            }}
          >
            <MapView />
          </Box>
        </div>

        {/* <AddLocation /> */}
        <div className="detail"> {stateOptionDetail()} </div>

        <div className="content">
          <div className="footer">
            <BottomNavigationAction
              label="Map"
              showLabel={true}
              icon={<MdOutlineLocationOn />}
              sx={{ fontSize: "45px" }}
            />
            <BottomNavigationAction
              label="Units"
              onClick={() => setStateDetailNav("update units")}
              showLabel={true}
              icon={<MdDeviceHub />}
              sx={{ fontSize: "45px" }}
            />
            <BottomNavigationAction
              label="Add"
              onClick={() => setStateDetailNav("add location")}
              showLabel={true}
              icon={<MdOutlineAddLocationAlt />}
              sx={{ fontSize: "45px" }}
            />
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
};

export default MapPage;
