import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from "@/domain/forum/enterprises/entities/question-attachment.js";
import { faker } from "@faker-js/faker";

export function makeQuestionAttachment(
  overrides: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
): QuestionAttachment {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides,
    },
    id,
  );

  return questionAttachment;
}
