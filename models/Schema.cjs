const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  privateKey: { type: String, required: true },
  wallet1: { type: String, required: true },
  wallet2: { type: String, required: true },
  wallet3: { type: String, required: true },
  wallet4: { type: String, required: true },
  wallet5: { type: String, required: true },
  tokenAddress: { type: String, required: true },
  amount: { type: number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  chatId: { type: String, required: true },
  bots: [walletSchema], // Array of objects that each user can store
});

const User = mongoose.model("User", userSchema);

module.exports = User;
