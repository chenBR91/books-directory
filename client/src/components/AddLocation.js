import React, { useState, useContext, useEffect } from "react";
import MapContext from "../MapContext";
import axios from "axios";
// ui
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
// icons
import { AiOutlineArrowRight } from "react-icons/ai";

function AddLocation() {
  const [currentClickedMap, setCurrentClickedMap] = useState(false);
  const { addDataNewRtu, setAddDataNewRtu, addLocationWhereClicked, rtusData, setRtusData } = useContext(MapContext);


  const handleClickSave = (event) => {
    //event.preventDefault();
    const macAddressUnit =  addDataNewRtu.macAddress.toUpperCase()
    const {rssi} = addDataNewRtu;
    
    console.log("your location", addLocationWhereClicked, rssi);
    
    // validate a mac address if is empty
    if(macAddressUnit === "") {
        console.log('address is empty');
        return -1;
    }

    // validate a mac address range between E7-00-00-00 and E7-FF-FF-FF 
    // ignore lowers or upperes case
    const macAddressWithoutSpace = macAddressUnit.split('-').join("")
    if(!(macAddressWithoutSpace >= 'E7000000') && (macAddressWithoutSpace <= 'E7FFFFFF')) {
        console.log('without range');
        return -1
    }
    
    if( macAddressWithoutSpace.length !== 8 ) {
        console.log('mac address size error');
        return -1
    }

    
    // Add location to database
    const urlCreateLocation = "http://localhost:8000/api/location/create";
    axios.post(urlCreateLocation, { longitude: addLocationWhereClicked.longitude, latitude: addLocationWhereClicked.latitude }).then(resLocation => {
        const locationId = resLocation['data']['_id'] //locationId ['_id']
        const locationData = resLocation['data']      // contaion all data of location

        // Add RTU to database
        const urlCreateRtu = "http://localhost:8000/api/rtus/create/new-device";
        const rtuDataObj = {macAddress: macAddressUnit, rssi, location: locationId} 

        axios.post(urlCreateRtu, rtuDataObj).then(resRtu => {
            const {macAddress, rssi, _id} = resRtu['data'];
            const location = {id: locationId, latitude: locationData['latitude'], longitude: locationData['longitude']}
            setRtusData([...rtusData, {macAddress, rssi, location, _id}]);
        })
    })
  };

  const andleOnChangeInput = (e) => {
    const { name, value } = e.target;
    console.log("change", value, name);
    setAddDataNewRtu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      1 Select location on the map
    </Link>,
    <Typography key="4">Insert MAC Address</Typography>,
    <Box
      key="5"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="mac address"
        variant="outlined"
        name="macAddress"
        onChange={andleOnChangeInput}
      />
       <TextField
        id="outlined-basic"
        label="rssi"
        variant="outlined"
        name="rssi"
        onChange={andleOnChangeInput}
      />
    </Box>,
    <Typography key="6" color="text.primary">
      <Button variant="contained" onClick={handleClickSave}>
        Save
      </Button>
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<AiOutlineArrowRight fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <div>
        <span>latitude: {addLocationWhereClicked.latitude}</span>
        <br/>
        <span>longtitude: {addLocationWhereClicked.longitude}</span>
      </div>
    </Stack>
  );
}

export default AddLocation;
