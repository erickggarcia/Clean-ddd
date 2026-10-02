import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment.js";
import { faker } from "@faker-js/faker";

export function makeAnswerComment(
  overrrides: Partial<AnswerComment> = {},
  id?: UniqueEntityId,
): AnswerComment {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overrrides,
    },
    id,
  );

  return answerComment;
}
