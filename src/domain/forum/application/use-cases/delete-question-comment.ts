import { QuestionsCommentRepository } from "../repositories/questions-comment-repository.js";

interface DeleteQuestionsCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionsCommentUseCase {
  constructor(
    private readonly questionsCommentRepository: QuestionsCommentRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionsCommentUseCaseRequest) {
    const questionComment =
      await this.questionsCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("not allowed");
    }

    await this.questionsCommentRepository.delete(questionComment);

    return {};
  }
}
