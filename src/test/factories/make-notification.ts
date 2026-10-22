import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Notification } from "@/domain/notification/enterprise/entities/notification.js";
import { faker } from "@faker-js/faker";

export function makeNotification(
  overrides: Partial<Notification> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...overrides,
    },
    id,
  );

  return notification;
}
