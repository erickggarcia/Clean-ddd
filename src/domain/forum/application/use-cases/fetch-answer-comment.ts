import { AnswerComment } from "../../enterprises/entities/answer-comment.js";
import { AnswersCommentRepository } from "../repositories/answers-comment-repository.js";

interface FetchAnswerCommentRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentResponse {
  answerComments: AnswerComment[];
}

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
    return { answerComments };
  }
}
