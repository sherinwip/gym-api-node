const ClassService = require('../services/classService');
const { validateClass } = require('../validators/classValidator');

class ClassController {
  static async createClass(req, res) {
    try {
      const validatedData = await validateClass(req.body);
      const newClass = await ClassService.createClass({
        ...validatedData,
        trainerId: req.body.trainerId
      });
      res.status(201).json(newClass);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getClasses(req, res) {
    try {
      const filters = {
        startDate: req.query.startDate,
        trainerId: req.query.trainerId
      };
      const classes = await ClassService.getClasses(filters);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async bookClass(req, res) {
    try {
      const booking = await ClassService.bookClass(
        req.user.id,
        req.params.classId
      );
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateAttendance(req, res) {
    try {
      const booking = await ClassService.updateAttendance(
        req.params.bookingId,
        req.body.status
      );
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ClassController;