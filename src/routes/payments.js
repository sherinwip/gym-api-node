const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const PaymentController = require('../controllers/paymentController');

// Create payment (Members only)
router.post(
  '/',
  auth,
  authorize('member'),
  PaymentController.createPayment
);

// Get user payments (Members can view their own, Admin can view all)
router.get(
  '/user/:userId',
  auth,
  authorize('admin', 'member'),
  PaymentController.getUserPayments
);

// Get payment by ID (Admin only)
router.get(
  '/:id',
  auth,
  authorize('admin'),
  PaymentController.getPaymentById
);

// Refund payment (Admin only)
router.post(
  '/:id/refund',
  auth,
  authorize('admin'),
  PaymentController.refundPayment
);

module.exports = router;