import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// middleware for the server
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);


app.listen(8000, ()=>{
    console.log('server listen');
})
