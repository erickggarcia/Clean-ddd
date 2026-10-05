import { Either, right } from "@/core/either.js";
import { Answer } from "../../enterprises/entities/answer.js";
import { AnswersRepository } from "../repositories/answers-repository.js";

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    );
    return right({ answers });
  }
}
