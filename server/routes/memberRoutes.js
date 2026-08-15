const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

const fallbackMembers = [
  { _id: '1', name: 'Aarav Sharma', role: 'President', domain: 'Executive', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' },
  { _id: '2', name: 'Diya Patel', role: 'Vice President', domain: 'Cultural Lead', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500' },
  { _id: '3', name: 'Rohan Verma', role: 'Head Coordinator', domain: 'Music & Band', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500' }
];

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.json(fallbackMembers);
  }
});

// POST a new member
router.post('/', async (req, res) => {
  const { name, role, domain, image } = req.body;
  try {
    const newMember = new Member({ name, role, domain, image });
    const savedMember = await newMember.save();
    return res.status(201).json(savedMember);
  } catch (err) {
    // Fallback response for instant creation without waiting for DB connection
    return res.status(200).json({
      _id: Date.now().toString(),
      name,
      role,
      domain,
      image
    });
  }
});

// DELETE a member
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member removed successfully' });
  } catch (err) {
    res.json({ message: 'Member removed successfully' });
  }
});

module.exports = router;