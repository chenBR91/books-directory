import React from "react";
import "./MapPage.css";
import MapView from "../components/map/MapView.js";
// material ui
import { Box } from "@mui/system";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// react icons
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdDeviceHub } from "react-icons/md";
import AddLocation from "../components/AddLocation.js";


function MapPage() {
  return (
    <div className="main-page">
      <div className="map-box">
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            width: 1300,
            height: 600,
            // mt: 9,
          }}
        >
          <MapView />
        </Box>
      </div>
      <div className="detail">detail - {AddLocation()}</div>

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
            showLabel={true}
            icon={<MdDeviceHub />}
            sx={{ fontSize: "45px" }}
          />
          <BottomNavigationAction
            label="Add"
            onClick={()=>console.log("add unit")}
            showLabel={true}
            icon={<MdOutlineAddLocationAlt />}
            sx={{ fontSize: "45px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
