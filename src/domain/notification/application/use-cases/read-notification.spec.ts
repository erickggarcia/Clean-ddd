import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository.js";
import { ReadNotificationUseCase } from "./read-notification.js";
import { makeNotification } from "@/test/factories/make-notification.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error.js";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("read notification use-case", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("It should be able to read a notification", async () => {
    const notification = makeNotification();

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("It should not be able to read a notification of another use", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId("recipient-1"),
    });

    inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: "recipient-2",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    await expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
