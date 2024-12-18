const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NotificationPreference = sequelize.define('NotificationPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },
  emailEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  pushEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  membershipAlerts: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  classReminders: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  paymentAlerts: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true
});

module.exports = NotificationPreference;