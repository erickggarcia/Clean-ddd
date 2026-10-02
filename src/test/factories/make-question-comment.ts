import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { QuestionComment } from "@/domain/forum/enterprises/entities/question-comment.js";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  overrrides: Partial<QuestionComment> = {},
  id?: UniqueEntityId,
): QuestionComment {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overrrides,
    },
    id,
  );

  return questionComment;
}
