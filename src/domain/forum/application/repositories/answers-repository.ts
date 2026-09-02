import { Answer } from "../../enterprises/entities/answer.js";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(answerId: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
}
