import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Answer,
  AnswerProps,
} from "@/domain/forum/enterprise/entities/answer.js";
import { faker } from "@faker-js/faker";

export function makeAnswer(
  overrides: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.paragraphs(),
      ...overrides,
    },
    id,
  );
  return answer;
}
