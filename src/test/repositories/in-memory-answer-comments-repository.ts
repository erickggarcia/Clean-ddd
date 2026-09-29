import { AnswersCommentRepository } from "@/domain/forum/application/repositories/answers-comment-repository.js";
import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment.js";

export class InMemoryAnswerCommentsRepository implements AnswersCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}
