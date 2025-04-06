const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true }
});

// Use correct export syntax
module.exports = mongoose.model("Url", urlSchema);
