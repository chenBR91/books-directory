import React, { useEffect, useContext, useState } from "react";
import LocationContext from "../../LocationContext";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

function Header() {
    const [temperature, setTemperature] = useState(null)
    const [country, setCountry] = useState("")
    const { location } = useContext(LocationContext);

  useEffect(() => {
    currentWeather()
  }, []);


  useEffect(() => {
    currentWeather()
  }, [location]);


  const currentWeather = async() => {
    try {
        const url = 'http://localhost:8000/api/weather/current-location'
        const getCurrentWeather = await axios.post(url, location)
        const temperature = getCurrentWeather['data']['main']['temp']
        const {name} = getCurrentWeather['data']
        setCountry(name) 
        setTemperature(temperature)
    }

    catch(err) {
        console.log('err', err);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
          <div>{country} {temperature}</div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
