const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const ClassController = require('../controllers/classController');

// Get all classes (authenticated users)
router.get('/', auth, ClassController.getClasses);

// Create new class (Admin and Trainer only)
router.post(
  '/',
  auth,
  authorize('admin', 'trainer'),
  ClassController.createClass
);

// Book a class (Members only)
router.post(
  '/:classId/book',
  auth,
  authorize('member'),
  ClassController.bookClass
);

// Update attendance (Admin and Trainer only)
router.patch(
  '/bookings/:bookingId/attendance',
  auth,
  authorize('admin', 'trainer'),
  ClassController.updateAttendance
);

module.exports = router;