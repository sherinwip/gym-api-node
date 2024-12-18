class NotificationQueue {
  constructor() {
    this.queue = new Map();
  }

  add(notification) {
    this.queue.set(notification.id, notification);
  }

  remove(notificationId) {
    this.queue.delete(notificationId);
  }

  get(notificationId) {
    return this.queue.get(notificationId);
  }

  getAll() {
    return Array.from(this.queue.values());
  }

  clear() {
    this.queue.clear();
  }
}

// Singleton instance
const notificationQueue = new NotificationQueue();

module.exports = notificationQueue;