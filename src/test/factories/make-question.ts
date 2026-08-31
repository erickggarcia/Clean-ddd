import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { faker } from "@faker-js/faker";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprises/entities/question.js";

export function makeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const newQuestion = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id,
  );

  return newQuestion;
}
