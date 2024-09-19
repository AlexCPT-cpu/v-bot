import { Router } from "express";
import User from "./schemas";
const router = Router();

router.get("/test", (req, res) => {
  res.send("API is working!");
});

// GET all data for a specific user by username
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// POST: Add an object to a user's collection
router.post("/user/:username/add", async (req, res) => {
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
    const user = await User.findOne({ username: req.params.username });
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
});

// PUT: Edit an object in the user's collection
router.put("/user/:username/edit/:tokenAddress", async (req, res) => {
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
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the object in the user's bots array by tokenAddress
    const bot = user.bots.find(
      (obj) => obj.tokenAddress === req.params.tokenAddress
    );

    if (!bot) return res.status(404).json({ message: "Bot not found" });

    // Use the set method to update fields on the subdocument
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
});
// DELETE: Remove an object from a user's collection
router.delete("/user/:username/delete/:tokenAddress", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Use the pull method to remove the object by tokenAddress
    user.bots.pull({ tokenAddress: req.params.tokenAddress });

    await user.save();

    res.status(200).json({ message: "Object deleted successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error deleting object" });
  }
});

export default router; // Exporting 'router'
