const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Completed'], default: 'Upcoming' },
  category: { type: String, required: true }, // Dance, Music, Rampwalk, Fest
  coverImage: { type: String, required: true },
  reportSummary: { type: String }, // Multi-paragraph report for past events
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);