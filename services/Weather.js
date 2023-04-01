import dotenv from "dotenv";
import axios from "axios";


dotenv.config();
const { OPEN_WEATHER_API } = process.env;


export const getWeatherByCity = (city, unitType) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API}&units=${unitType}`)
};


export const getWeatherByLocation = (obj) => {
    const {latitude, longitude, unit} = {...obj}
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${OPEN_WEATHER_API}`)
}