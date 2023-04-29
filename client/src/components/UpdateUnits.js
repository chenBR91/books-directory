import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MapContext from "../MapContext";
// UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function UpdateUnits() {
  const { rtuDataPopup, setRtuDataPopup, rtusData, setRtusData } = useContext(MapContext);
  const [updateRtuUnit, setUpdateRtuUnit] = useState({
    macAddress: "",
    rssi: "",
    lantitude: "",
    longtitude: "",
  });

  const handleUpdateUnit = () => {
    console.log("update");
    console.log("rtuDataPopup", rtuDataPopup);

    const rtu = rtusData.find((rtu) => rtu.macAddress === rtuDataPopup.macAddress);
    const updateIndex = rtusData.findIndex((rtu => rtu.macAddress === rtuDataPopup.macAddress))

    if(!rtu) {
        console.log('mac address is not correct');
        return null;
    }
    rtusData[updateIndex] = {...rtuDataPopup}
    const rtuiId = rtu._id;
    const urlUpdateRtu = `http://localhost:8000/api/rtu/update/${rtuiId}`;

    axios.put(urlUpdateRtu, rtuDataPopup).then((res) => {
        console.log('res', res);
        setRtusData(rtusData)
    })
  };

  const handleInputDataRtu = (event) => {
    const { name, value } = event.target;
    setRtuDataPopup({ ...rtuDataPopup, [name]: value });
  };

  const handleInputLatLot = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setRtuDataPopup({
      ...rtuDataPopup,
      location: { ...rtuDataPopup.location, [name]: value },
    });
  };

  const handleClearInputField = () => {
    setRtuDataPopup({
      macAddress: "",
      rssi: "",
      location: {
        longitude: "",
        latitude: "",
      },
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <span>
          Unit{" "}
          <TextField
            name="macAddress"
            onChange={handleInputDataRtu}
            value={rtuDataPopup.macAddress}
          />
          rssi{" "}
          <TextField
            name="rssi"
            onChange={handleInputDataRtu}
            value={rtuDataPopup.rssi}
          />
          latitude{" "}
          <TextField
            name="latitude"
            onChange={handleInputLatLot}
            value={rtuDataPopup["location"].latitude}
          />
          longitude{" "}
          <TextField
            name="longitude"
            onChange={handleInputLatLot}
            value={rtuDataPopup["location"].longitude}
          />
        </span>
        <Button variant="contained" onClick={handleUpdateUnit}>
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearInputField}
        >
          Clear
        </Button>
      </Box>
    </div>
  );
}

export default UpdateUnits;
