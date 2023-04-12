import { getWeatherByCity, getWeatherByLocation } from "../services/Weather.js";

export const getWeatherByCityController = async (req, res) => {
  try {
    console.log("request", req.header);
    const city = "Rovaniemi";
    const unit = "metric";
    const weatherCity = await getWeatherByCity(city, unit);

    res.status(200).send(weatherCity["data"]);
  } catch (err) {
    res.status(500).send(err);
  }
};


export const weatherByLatitudeandLongitude = async (req, res) => {
  try {
    // const currentLocation = req.body;
    const {latitude, longitude} = {...req.body}
    const unit = 'metric'

    const weatherByLocation = await getWeatherByLocation({latitude, longitude, unit})
    
    res.status(200).send(weatherByLocation['data'])

  } catch (err) {
    console.log("err", err);
  }
};
