const User = require('./User');
const Membership = require('./Membership');
const Class = require('./Class');
const ClassBooking = require('./ClassBooking');
const Payment = require('./Payment');
const UserMembership = require('./UserMembership');

// Existing relationships
Class.belongsTo(User, { as: 'trainer', foreignKey: 'trainerId' });
User.hasMany(Class, { as: 'classes', foreignKey: 'trainerId' });

Class.belongsToMany(User, { 
  through: ClassBooking,
  as: 'attendees',
  foreignKey: 'classId'
});
User.belongsToMany(Class, { 
  through: ClassBooking,
  as: 'bookedClasses',
  foreignKey: 'userId'
});

// Payment relationships
Payment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Payment, { foreignKey: 'userId' });

Payment.belongsTo(Membership, { foreignKey: 'membershipId' });
Membership.hasMany(Payment, { foreignKey: 'membershipId' });

// UserMembership relationships
UserMembership.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserMembership, { foreignKey: 'userId' });

UserMembership.belongsTo(Membership, { foreignKey: 'membershipId' });
Membership.hasMany(UserMembership, { foreignKey: 'membershipId' });

module.exports = {
  User,
  Membership,
  Class,
  ClassBooking,
  Payment,
  UserMembership
};