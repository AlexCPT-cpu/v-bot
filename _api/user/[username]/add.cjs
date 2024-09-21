// import { VercelRequest, VercelResponse } from "@vercel/node";
// import mongoose from "mongoose";
// import User from "../../../models/Schema";

const mongoose = require("mongoose");
const User = require("../../../models/Schema.cjs");
require("dotenv").config();

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
  if (req.method === "POST") {
    const {
      privateKey,
      wallet1,
      wallet2,
      wallet3,
      wallet4,
      wallet5,
      amount,
      tokenAddress,
    } = req.body;

    try {
      const { username } = req.query;
      const newObject = {
        privateKey,
        wallet1,
        wallet2,
        wallet3,
        wallet4,
        wallet5,
        tokenAddress,
        amount,
      };
      // Find user by username
      let user = await User.findOne({ username });
      // If user doesn't exist, create a new user
      if (!user) {
        user = new User({
          username, // Set username field
          chatId: username,
          bots: [], // Initialize empty bots array
        });
      }

      // Add the new object to the bots array
      user.bots.push(newObject);
      await user.save();

      // Return success response
      res.status(200).json({ message: "Object added successfully", user });
    } catch (err) {
      console.error("Error adding object:", err);
      res.status(500).json({ error: "Error adding object" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
