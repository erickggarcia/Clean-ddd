import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { Answer } from "../../enterprises/entities/answer.js";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(answerId: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    page: PaginationParams,
  ): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
