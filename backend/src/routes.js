import { Router } from "express";
import User from "./schemas.js";
const router = Router();

router.get("/test", (req, res) => {
  res.status(200).json({ info: "API is working!" });
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
    amount,
  } = req.body;

  const newObject = {
    privateKey,
    wallet1,
    wallet2,
    wallet3,
    wallet4,
    wallet5,
    tokenAddress,
    amount,
    active: true,
  };

  try {
    let user = await User.findOne({ username: req.params.username });
    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({
        username: req.params.username, // Set username field
        chatId: req.params.username,
        bots: [], // Initialize empty bots array
      });
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
router.put("/user/:username/edit/:index", async (req, res) => {
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
router.delete("/user/:username/delete/:index", async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the index of the object to remove
    const indexToRemove = parseInt(req.params.index, 10); // Assuming you're passing the index as a parameter

    if (
      isNaN(indexToRemove) ||
      indexToRemove < 0 ||
      indexToRemove >= user.bots.length
    ) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Remove the bot at the given index
    user.bots.splice(indexToRemove, 1);

    // Save the user after modification
    await user.save();

    res.status(200).json({ message: "Object deleted successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error deleting object" });
  }
});

router.put("/user/:username/activate/:index", async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the index of the object to modify
    const indexToUpdate = parseInt(req.params.index, 10); // Assuming you're passing the index as a parameter

    if (
      isNaN(indexToUpdate) ||
      indexToUpdate < 0 ||
      indexToUpdate >= user.bots.length
    ) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Get the new active state from the request body
    const { active } = req.body;

    if (typeof active !== "boolean") {
      return res.status(400).json({ message: "Invalid active state" });
    }

    // Update the active field for the specified bot
    user.bots[indexToUpdate].active = active;

    // Save the user after modification
    await user.save();

    res
      .status(200)
      .json({ message: "Active state updated successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating active state" });
  }
});

export default router; // Exporting 'router'
