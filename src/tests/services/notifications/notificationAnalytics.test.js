const { describe, it, expect, beforeEach, jest } = require('@jest/globals');
const NotificationAnalyticsService = require('../../../services/notifications/notificationAnalyticsService');
const { Notification } = require('../../../models');

jest.mock('../../../models');

describe('NotificationAnalyticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDeliveryStats', () => {
    it('should return notification delivery statistics', async () => {
      const mockStats = [
        {
          type: 'membership_expiry',
          get: jest.fn().mockImplementation((key) => {
            const values = { total: '10', read: '8' };
            return values[key];
          })
        }
      ];

      Notification.findAll.mockResolvedValue(mockStats);

      const result = await NotificationAnalyticsService.getDeliveryStats('24h');

      expect(result).toEqual([
        {
          type: 'membership_expiry',
          total: 10,
          read: 8,
          readRate: 80
        }
      ]);
    });
  });

  describe('getUserEngagement', () => {
    it('should return user engagement metrics', async () => {
      const mockEngagement = [
        {
          get: jest.fn().mockImplementation((key) => {
            const values = { date: '2024-01-01', total: '5', read: '4' };
            return values[key];
          })
        }
      ];

      Notification.findAll.mockResolvedValue(mockEngagement);

      const result = await NotificationAnalyticsService.getUserEngagement('123');

      expect(result).toEqual([
        {
          date: '2024-01-01',
          total: 5,
          read: 4,
          engagement: 80
        }
      ]);
    });
  });
});