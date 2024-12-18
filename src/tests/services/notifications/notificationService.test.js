const { describe, it, expect, beforeEach, jest } = require('@jest/globals');
const NotificationService = require('../../../services/notificationService');
const { Notification, User, NotificationPreference } = require('../../../models');

jest.mock('../../../models');

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNotification', () => {
    it('should create a notification successfully', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockPreferences = { emailEnabled: true, pushEnabled: false };
      const mockNotification = {
        id: '456',
        userId: '123',
        type: 'membership_expiry',
        title: 'Test',
        message: 'Test message'
      };

      User.findByPk.mockResolvedValue(mockUser);
      NotificationPreference.findOne.mockResolvedValue(mockPreferences);
      Notification.create.mockResolvedValue(mockNotification);

      const result = await NotificationService.createNotification({
        userId: '123',
        type: 'membership_expiry',
        title: 'Test',
        message: 'Test message'
      });

      expect(result).toEqual(mockNotification);
      expect(User.findByPk).toHaveBeenCalledWith('123');
      expect(NotificationPreference.findOne).toHaveBeenCalledWith({
        where: { userId: '123' }
      });
    });

    it('should throw error if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(
        NotificationService.createNotification({
          userId: '123',
          type: 'membership_expiry',
          title: 'Test',
          message: 'Test message'
        })
      ).rejects.toThrow('User or preferences not found');
    });
  });

  describe('getUserNotifications', () => {
    it('should return paginated notifications', async () => {
      const mockNotifications = {
        rows: [
          { id: '1', title: 'Test 1' },
          { id: '2', title: 'Test 2' }
        ],
        count: 2
      };

      Notification.findAndCountAll.mockResolvedValue(mockNotifications);

      const result = await NotificationService.getUserNotifications('123', {
        page: 1,
        limit: 10
      });

      expect(result).toEqual(mockNotifications);
      expect(Notification.findAndCountAll).toHaveBeenCalledWith({
        where: { userId: '123' },
        order: [['createdAt', 'DESC']],
        limit: 10,
        offset: 0
      });
    });
  });
});