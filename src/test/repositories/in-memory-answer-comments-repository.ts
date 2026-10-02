import { PaginationParams } from "@/core/repositories/pagination-params.js";
import { AnswersCommentRepository } from "@/domain/forum/application/repositories/answers-comment-repository.js";
import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment.js";

export class InMemoryAnswerCommentsRepository implements AnswersCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId,
    );

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }
}
