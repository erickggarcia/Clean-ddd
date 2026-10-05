import { Either, left, right } from "@/core/either.js";
import { Question } from "../../enterprises/entities/question.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface FindQuestionBySlugUseCaseRequest {
  slug: string;
}

type FindQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({ question });
  }
}
