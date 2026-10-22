import { SendNotificationUseCase } from "./send-notification.js";
import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository.js";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("create question", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("It should be able to create a question", async () => {
    const result = await sut.execute({
      recipientId: "author-1",
      title: "New notification",
      content: "New notification content",
    });

    expect(result.isRight()).toBe(true);
  });
});
