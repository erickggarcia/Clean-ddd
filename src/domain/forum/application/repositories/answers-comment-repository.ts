import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { QuestionComment } from "../../enterprises/entities/question-comment.js";
import { AnswerComment } from "../../enterprises/entities/answer-comment.js";

export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
