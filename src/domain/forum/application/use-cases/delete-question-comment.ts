import { Either, left, right } from "@/core/either.js";
import { QuestionsCommentRepository } from "../repositories/questions-comment-repository.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface DeleteQuestionsCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionsCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionsCommentUseCase {
  constructor(
    private readonly questionsCommentRepository: QuestionsCommentRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionsCommentUseCaseRequest): Promise<DeleteQuestionsCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsCommentRepository.delete(questionComment);

    return right({});
  }
}
