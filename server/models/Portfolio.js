const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  performerName: { type: String, required: true },
  category: { type: String, required: true }, // Dance, Band, Rampwalk, Solo Singing
  videoUrl: { type: String, required: true }, // YouTube Embed or Video URL
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);