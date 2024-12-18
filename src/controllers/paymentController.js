const PaymentService = require('../services/paymentService');
const { validatePayment } = require('../validators/paymentValidator');

class PaymentController {
  static async createPayment(req, res) {
    try {
      const validatedData = await validatePayment(req.body);
      const payment = await PaymentService.createPayment({
        ...validatedData,
        userId: req.user.id
      });
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserPayments(req, res) {
    try {
      const payments = await PaymentService.getUserPayments(req.user.id);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPaymentById(req, res) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async refundPayment(req, res) {
    try {
      const payment = await PaymentService.refundPayment(req.params.id);
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;