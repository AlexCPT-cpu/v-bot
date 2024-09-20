// import { VercelRequest, VercelResponse } from "@vercel/node";
const mongoose = require("mongoose");
const User = require("../../models/Schema.cjs");
// import mongoose from "mongoose";
// import User from "../../../models/Schema";

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
  if (req.method === "GET") {
    try {
      const users = await User.find({}); // This fetches all users from the collection
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error retrieving users" });
    }
    // try {
    //   const user = await User.findOne({ username: req.query.username });
    //   if (!user) return res.status(404).json({ message: "User not found" });
    //   res.status(200).json(user);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({ error: "Error fetching user data" });
    // }
  }
};
