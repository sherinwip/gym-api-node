const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClassBooking = sequelize.define('ClassBooking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  classId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('booked', 'cancelled', 'attended', 'no-show'),
    defaultValue: 'booked'
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true
});

module.exports = ClassBooking;