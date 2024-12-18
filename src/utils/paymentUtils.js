const crypto = require('crypto');

const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(4).toString('hex');
  return `TXN-${timestamp}-${random}`;
};

const calculateProration = (originalAmount, totalDays, remainingDays) => {
  return (originalAmount * remainingDays) / totalDays;
};

module.exports = {
  generateTransactionId,
  calculateProration
};