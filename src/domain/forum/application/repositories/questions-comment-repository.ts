import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { QuestionComment } from "../../enterprise/entities/question-comment.js";

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(questionCommentId: string): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]>;
}
