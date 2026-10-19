import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from "@/domain/forum/enterprises/entities/answer-attachment.js";

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
) {
  const answerAttachment = AnswerAttachment.create({
    answerId: new UniqueEntityId(),
    attachmentId: new UniqueEntityId(),
    ...override,
  });

  return answerAttachment;
}
