import { Box } from "@mui/system";
import React from "react";
import "./MapPage.css";
import MapView from "../components/map/MapView.js";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';
import { MdDeviceHub } from 'react-icons/md';

function MapPage() {
  return (
    <div className="main-page">
      <div className="map-box">
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            width: 1200,
            height: 600,
            // mt: 9,
          }}
        >
          <MapView />
        </Box>
      </div>

      <div className="content">
        <div className="">content</div>
      
        <div className="footer">
          <BottomNavigationAction label="Map" showLabel={true} icon={<MdOutlineLocationOn />} sx={{fontSize: '35px'}} />
          <BottomNavigationAction label="Units" showLabel={true} icon={<MdDeviceHub />} sx={{fontSize: '35px'}} />
          <BottomNavigationAction label="Add" showLabel={true} icon={<MdOutlineAddLocationAlt />} sx={{fontSize: '35px'}} />
        </div>
      </div>

    </div>
  );
}

export default MapPage;
