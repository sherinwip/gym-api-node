const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const membershipRoutes = require('./memberships');
const classRoutes = require('./classes');
const paymentRoutes = require('./payments');
const notificationRoutes = require('./notifications');
const analyticsRoutes = require('./analytics');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/memberships', membershipRoutes);
router.use('/classes', classRoutes);
router.use('/payments', paymentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;