const { Payment, UserMembership, Membership } = require('../models');
const { generateTransactionId } = require('../utils/paymentUtils');
const { addDays } = require('../utils/dateUtils');

class PaymentService {
  static async createPayment(paymentData) {
    const { userId, membershipId, amount, paymentMethod } = paymentData;
    
    const payment = await Payment.create({
      userId,
      membershipId,
      amount,
      paymentMethod,
      transactionId: generateTransactionId(),
      status: 'completed'
    });

    // Get membership details for duration
    const membership = await Membership.findByPk(membershipId);
    
    // Create or update user membership
    await UserMembership.create({
      userId,
      membershipId,
      startDate: new Date(),
      endDate: addDays(new Date(), membership.duration),
      status: 'active'
    });

    return payment;
  }

  static async getUserPayments(userId) {
    return await Payment.findAll({
      where: { userId },
      order: [['paymentDate', 'DESC']]
    });
  }

  static async getPaymentById(paymentId) {
    return await Payment.findByPk(paymentId);
  }

  static async refundPayment(paymentId) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status === 'refunded') {
      throw new Error('Payment already refunded');
    }

    await payment.update({ status: 'refunded' });
    
    // Update user membership status
    const userMembership = await UserMembership.findOne({
      where: { 
        userId: payment.userId,
        membershipId: payment.membershipId,
        status: 'active'
      }
    });

    if (userMembership) {
      await userMembership.update({ status: 'cancelled' });
    }

    return payment;
  }
}

module.exports = PaymentService;