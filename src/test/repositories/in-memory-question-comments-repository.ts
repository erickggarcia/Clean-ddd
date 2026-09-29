import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/questions-coment-repository.js";
import { QuestionComment } from "@/domain/forum/enterprises/entities/question-comment.js";

export class InMemoryQuestionCommentsRepository implements QuestionsCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}
