const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., President, Cultural Lead
  domain: { type: String, required: true }, // Dance, Band, Rampwalk, Singing, Executive
  image: { type: String, required: true }, // Cloudinary Image URL or direct link
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);