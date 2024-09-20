// import { VercelRequest, VercelResponse } from "@vercel/node";
// import mongoose from "mongoose";
// import User from "../../../models/Schema";

const mongoose = require("mongoose");
const User = require("../../../models/Schema.cjs");

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect(process.env.CONNECTION_STRING) // Just pass the connection string
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
  if (req.method === "POST") {
    const {
      privateKey,
      wallet1,
      wallet2,
      wallet3,
      wallet4,
      wallet5,
      tokenAddress,
    } = req.body;

    const newObject = {
      privateKey,
      wallet1,
      wallet2,
      wallet3,
      wallet4,
      wallet5,
      tokenAddress,
    };

    try {
      const user = await User.findOne({ username: req.query.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.bots.push(newObject); // Add new object to the array
      await user.save();

      res.status(200).json({ message: "Object added successfully", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error adding object" });
    }
  }
};
