// import { VercelRequest, VercelResponse } from "@vercel/node";
const mongoose = require("mongoose");
const User = require("../../../models/Schema.cjs");
require("dotenv").config();
// import mongoose from "mongoose";
// import User from "../../../models/Schema";

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect(process.env.VITE_CONNECTION_STRING) // Just pass the connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = async function handler(
  req,
  // : VercelRequest
  res
  // : VercelResponse
) {
  if (req.method === "GET") {
    try {
      const user = await User.findOne({ username: req.query.username });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error fetching user data" });
    }
  }
};
