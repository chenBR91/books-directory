import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import {
  getAllBooksController,
  createManyBoobsControoler,
  getDetailBookController,
  createNewBookController,
  deleteBookController,
  updateBookController,
  getAllBooksSortByPagesController,
} from "./controller/Bookes.js";

import {
  getWeatherByCityController,
  weatherByLatitudeandLongitude,
} from "./controller/Weather.js";

import {
  getIpAdressController,
  getLocationByAddressController,
} from "./controller/IpAdress.js";

import {
  createNewLocationControoler,
  getAllLocationsControoler,
  deleteOneLocationController,
  deleteAllLocationsController,
} from "./controller/Locations.js";

import {
  createNewRtuController,
  getAllRtusController,
  deleteOneRtuByIdController
} from "./controller/Rtus.js";

dotenv.config();
const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const app = express();

// middleware for the server
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

// Routes for Books
app.get("/api/books/all-books", getAllBooksController);
app.get("/api/books/detail/:id", getDetailBookController);
app.get("/api/books/sort-pages/", getAllBooksSortByPagesController);
app.post("/api/books/create", createNewBookController);
app.delete("/api/books/delete/:id", deleteBookController);
app.put("/api/books/update/:id", updateBookController);
//app.post("/api/books/create-many-books", createManyBoobsControoler)

// Routes for Weather
app.get("/api/weather/city", getWeatherByCityController);
app.post("/api/weather/current-location", weatherByLatitudeandLongitude);

// Routes for ip address
app.get("/api/ip/address", getIpAdressController);
app.get("/api/ip/location", getLocationByAddressController);

// Routes for location
app.post("/api/location/create", createNewLocationControoler);
app.get("/api/location/all", getAllLocationsControoler);
app.delete("/api/location/delete/one/:id", deleteOneLocationController);
app.delete("/api/location/delete/all", deleteAllLocationsController);

// Routes for Rtus
app.post("/api/rtus/create/new-device", createNewRtuController);
app.get("/api/rtus/all/show-all", getAllRtusController)
app.delete("/api/rtu/delete/one-unit/:id", deleteOneRtuByIdController)


mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log("err", err);
    app.listen(PORT, () => {
      console.log(`Server lisiting`);
    });
  }
);
