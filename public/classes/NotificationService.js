export class NotificationService {
  constructor(NotificationManager) {
    this.NotificationManager = NotificationManager;
  }

  showCategoryNotification(category) {
    return new this.NotificationManager(category);
  }
}
