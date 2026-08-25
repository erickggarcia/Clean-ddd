import { Answer } from "../../enterprises/entities/answer.js";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
}
