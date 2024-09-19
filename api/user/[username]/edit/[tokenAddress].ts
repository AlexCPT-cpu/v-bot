import { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import User from "../../../../models/Schema";

interface Bot {
  tokenAddress: string;
  privateKey: string;
  wallet1: string;
  wallet2: string;
  wallet3: string;
  wallet4: string;
  wallet5: string;
}

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
  if (req.method === "PUT") {
    const {
      privateKey,
      wallet1,
      wallet2,
      wallet3,
      wallet4,
      wallet5,
      tokenAddress,
    } = req.body;

    try {
      const user = await User.findOne({ username: req.query.username });
      if (!user) return res.status(404).json({ message: "User not found" });

      const bot = user.bots.find(
        (obj: Bot) => obj.tokenAddress === req.query.tokenAddress
      );
      if (!bot) return res.status(404).json({ message: "Bot not found" });

      // Update fields
      bot.set({
        privateKey,
        wallet1,
        wallet2,
        wallet3,
        wallet4,
        wallet5,
        tokenAddress,
      });

      await user.save();
      res.status(200).json({ message: "Bot updated successfully", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error updating bot" });
    }
  }
}
