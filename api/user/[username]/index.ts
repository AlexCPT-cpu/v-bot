import { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import User from "../../../models/Schema";

// MongoDB connection without useNewUrlParser and useUnifiedTopology
mongoose
  .connect("mongodb://localhost:27017/mydatabase") // Just pass the connection string
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
}
