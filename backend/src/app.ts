import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import router from "./routes";

const app = express();
app.use(json());

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect("mongodb://localhost:27017/mydatabase") // Just pass the connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API routes
app.use("/api", router);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
