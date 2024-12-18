const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Membership = require('../models/Membership');

// Get all memberships
router.get('/', auth, async (req, res) => {
  try {
    const memberships = await Membership.findAll({
      where: { isActive: true }
    });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
});

// Create new membership (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create membership' });
  }
});

// Update membership (Admin only)
router.patch('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const membership = await Membership.findByPk(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    await membership.update(req.body);
    res.json(membership);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update membership' });
  }
});

// Delete membership (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const membership = await Membership.findByPk(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: 'Membership not found' });
    }
    await membership.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete membership' });
  }
});

module.exports = router;