import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes.js";
import dotenv from "dotenv";
import cors from "cors";

const { json } = bodyParser;

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect(
    process.env.CONNECTION_STRING || "mongodb://localhost:27017/mydatabase"
  ) // Just pass the connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API routes
app.use("/api", router);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
