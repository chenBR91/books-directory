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
app.get("/api/books/sort-pages/", getAllBooksSortByPagesController)
app.post("/api/books/create", createNewBookController);
app.delete("/api/books/delete/:id", deleteBookController);
app.put("/api/books/update/:id", updateBookController)
//app.post("/api/books/create-many-books", createManyBoobsControoler)


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
