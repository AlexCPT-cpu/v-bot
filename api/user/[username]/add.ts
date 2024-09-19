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
}
