import { Question } from "../../enterprises/entities/question.js";
import { AnswersRepository } from "../repositories/answers-repository.js";
import { QuestionsRepository } from "../repositories/questions-repository.js";

interface ChooseBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error("Question not found.");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("not allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
