import { Either, left, right } from "@/core/either.js";
import { NotificationsRepository } from "../repositories/notifications-repository.js";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error.js";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error.js";
import { Notification } from "../../enterprise/entities/notification.js";

export interface ReadNotificationsUseCaseRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationsUseCaseRespose = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationsUseCaseRequest): Promise<ReadNotificationsUseCaseRespose> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    return right({ notification });
  }
}
