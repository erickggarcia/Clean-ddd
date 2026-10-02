import { AnswersCommentRepository } from "../repositories/answers-comment-repository.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment =
      await this.answersCommentRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("not allowed");
    }

    await this.answersCommentRepository.delete(answerComment);

    return {};
  }
}
