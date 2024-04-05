import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from "cors";


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

app.get("/", (req, res) => {
  res.send("API is running");
}
);


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));