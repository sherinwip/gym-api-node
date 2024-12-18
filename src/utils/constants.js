module.exports = {
  ROLES: {
    ADMIN: 'admin',
    TRAINER: 'trainer',
    MEMBER: 'member'
  },
  NOTIFICATION_TYPES: {
    MEMBERSHIP_EXPIRY: 'membership_expiry',
    CLASS_REMINDER: 'class_reminder',
    PAYMENT_CONFIRMATION: 'payment_confirmation',
    SYSTEM_ANNOUNCEMENT: 'system_announcement'
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  },
  PAYMENT_METHODS: {
    CASH: 'cash',
    CARD: 'card',
    BANK_TRANSFER: 'bank_transfer'
  },
  CLASS_BOOKING_STATUS: {
    BOOKED: 'booked',
    CANCELLED: 'cancelled',
    ATTENDED: 'attended',
    NO_SHOW: 'no-show'
  }
};