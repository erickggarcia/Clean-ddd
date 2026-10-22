import { Either, left, right } from "@/core/either.js";
import { AnswersCommentRepository } from "../repositories/answers-comment-repository.js";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error.js";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answersCommentRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answersCommentRepository.delete(answerComment);

    return right({});
  }
}
