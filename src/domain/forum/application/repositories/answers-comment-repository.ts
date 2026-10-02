import { AnswerComment } from "../../enterprises/entities/answer-comment.js";

export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
}
