import { Either, right } from "@/core/either.js";
import { AnswerComment } from "../../enterprises/entities/answer-comment.js";
import { AnswersCommentRepository } from "../repositories/answers-comment-repository.js";

interface FetchAnswerCommentRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answersCommentsRepository: AnswersCommentRepository,
  ) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentRequest): Promise<FetchAnswerCommentResponse> {
    const answerComments =
      await this.answersCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });
    return right({ answerComments });
  }
}
