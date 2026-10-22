import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository.js";
import { Notification } from "@/domain/notification/enterprise/entities/notification.js";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find((notification) => {
      return notification.id.toString() === notificationId;
    });

    if (!notification) return null;

    return notification;
  }
}
