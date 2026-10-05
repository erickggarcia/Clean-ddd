import { Either, right } from "@/core/either.js";
import { QuestionComment } from "../../enterprises/entities/question-comment.js";
import { QuestionsCommentRepository } from "../repositories/questions-comment-repository.js";

interface FetchQuestionCommentRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionsCommentsRepository: QuestionsCommentRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentRequest): Promise<FetchQuestionCommentResponse> {
    const questionComments =
      await this.questionsCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });
    return right({ questionComments });
  }
}
