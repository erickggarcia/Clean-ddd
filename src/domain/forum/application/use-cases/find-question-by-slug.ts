import { Question } from "../../enterprises/entities/question.js";
import { Slug } from "../../enterprises/entities/value-objects/slug.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";

interface FindQuestionBySlugUseCaseRequest {
  slug: string;
}

interface FindQuestionBySlugUseCaseResponse {
  question: Question;
}

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return { question };
  }
}
