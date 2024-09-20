// import { VercelRequest, VercelResponse } from "@vercel/node";
// import mongoose from "mongoose";
// import User from "../../../../models/Schema";

const mongoose = require("mongoose");
const User = require("../../../../models/Schema.cjs");

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect("mongodb://localhost:27017/mydatabase") // Just pass the connection string
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
  if (req.method === "DELETE") {
    try {
      const user = await User.findOne({ username: req.query.username });
      if (!user) return res.status(404).json({ message: "User not found" });

      // Remove bot
      user.bots.pull({ tokenAddress: req.query.tokenAddress });
      await user.save();

      res.status(200).json({ message: "Bot deleted successfully", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error deleting bot" });
    }
  }
};
