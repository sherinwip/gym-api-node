const { Class, User, ClassBooking } = require('../models');
const { Op } = require('sequelize');

class ClassService {
  static async createClass(classData) {
    return await Class.create(classData);
  }

  static async getClasses(filters = {}) {
    const where = { isActive: true };
    
    if (filters.startDate) {
      where.startTime = {
        [Op.gte]: filters.startDate
      };
    }
    
    if (filters.trainerId) {
      where.trainerId = filters.trainerId;
    }

    return await Class.findAll({
      where,
      include: [{
        model: User,
        as: 'trainer',
        attributes: ['id', 'firstName', 'lastName']
      }]
    });
  }

  static async bookClass(userId, classId) {
    const classInstance = await Class.findByPk(classId);
    if (!classInstance) {
      throw new Error('Class not found');
    }

    const bookingsCount = await ClassBooking.count({
      where: { classId, status: 'booked' }
    });

    if (bookingsCount >= classInstance.capacity) {
      throw new Error('Class is full');
    }

    return await ClassBooking.create({
      userId,
      classId
    });
  }

  static async updateAttendance(bookingId, status) {
    const booking = await ClassBooking.findByPk(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    return await booking.update({ status });
  }
}

module.exports = ClassService;