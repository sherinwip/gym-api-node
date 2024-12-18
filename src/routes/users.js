const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/User');

// Get all users (Admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create new user (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'password'];
    const isValidOperation = updates.every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    await req.user.update(req.body);
    const { password, ...userWithoutPassword } = req.user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;