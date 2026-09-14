import { Answer } from "../../enterprises/entities/answer.js";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(answerId: string): Promise<Answer | null>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
