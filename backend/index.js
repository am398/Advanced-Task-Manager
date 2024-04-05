import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";


dotenv.config();
const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("DB connection established");
    } catch (error) {
      console.log("DB Error: " + error);
    }
  };

dbConnection();


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));