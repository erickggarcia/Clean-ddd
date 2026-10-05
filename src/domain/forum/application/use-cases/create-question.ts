import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { Either, right } from "@/core/either.js";
import { Question } from "../../enterprises/entities/question.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return right({
      question,
    });
  }
}
