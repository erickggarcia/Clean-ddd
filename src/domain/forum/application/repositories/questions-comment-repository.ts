import { QuestionComment } from "../../enterprises/entities/question-comment.js";

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(questionCommentId: string): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
}
