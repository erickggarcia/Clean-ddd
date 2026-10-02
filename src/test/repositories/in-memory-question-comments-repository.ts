import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/questions-comment-repository.js";
import { QuestionComment } from "@/domain/forum/enterprises/entities/question-comment.js";

export class InMemoryQuestionCommentsRepository implements QuestionsCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === questionCommentId,
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id === questionComment.id,
    );

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
