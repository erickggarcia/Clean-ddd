import { Question } from "../../enterprises/entities/question.js";

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
}
