import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { AnswerComment } from "../../enterprise/entities/answer-comment.js";

export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
  findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]>;
}
