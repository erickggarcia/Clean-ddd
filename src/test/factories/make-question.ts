import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprises/entities/question.js";

export function makeQuestion(overrides: Partial<QuestionProps>) {
  const newQuestion = Question.create({
    authorId: new UniqueEntityId(),
    title: "an example title",
    content: "an example content",
    ...overrides,
  });

  return newQuestion;
}
