const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET all showcase performances
router.get('/', async (req, res) => {
  try {
    const showcases = await Portfolio.find().sort({ createdAt: -1 });
    res.json(showcases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new video performance
router.post('/', async (req, res) => {
  const { title, performerName, category, videoUrl, description } = req.body;
  try {
    const newShowcase = new Portfolio({ title, performerName, category, videoUrl, description });
    const savedShowcase = await newShowcase.save();
    res.status(201).json(savedShowcase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a performance item
router.delete('/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Performance showcase removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;